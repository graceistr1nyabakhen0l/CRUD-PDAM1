"use client"
import { Bill } from "@/app/types"
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { verifyPayment } from "@/app/services/bills.admin"
import { Vote, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { toast } from "sonner"

const VerifyBill = ({ selectedData }: { selectedData: Bill }) => {
    const router = useRouter()
    const [open, setOpen] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        // 1. Ambil Payment ID
        const paymentId = Array.isArray(selectedData.payments)
            ? selectedData.payments[0]?.id
            : (selectedData.payments as any)?.id;

        if (!paymentId) {
            console.error("DEBUG: Payment ID tidak ditemukan di data tagihan", selectedData);
            toast.error("Gagal: ID Pembayaran tidak ditemukan.");
            return;
        }

        try {
            setIsLoading(true);
            console.log("DEBUG: Mengirim permintaan verifikasi untuk Payment ID:", paymentId);

            const result = await verifyPayment(paymentId);

            // Log hasil dari API ke console browser untuk cek isinya
            console.log("DEBUG: Respons API diterima:", result);

            // 2. Cek apakah result null atau undefined (penyebab "No Response")
            if (!result) {
                toast.error("Server tidak memberikan respons. Cek koneksi internet atau API.");
                return;
            }

            // 3. Tangani hasil berdasarkan struktur data di screenshot sebelumnya
            // (status: false, message: "PATCH REQUEST FAILED")
            if (result.status === true || result.success === true) {
                toast.success(result.message || "Pembayaran berhasil diverifikasi!");
                setOpen(false);

                // Refresh data dashboard
                setTimeout(() => {
                    router.refresh();
                }, 500);
            } else {
                // Munculkan pesan error dari server (contoh: PATCH REQUEST FAILED)
                toast.error(result.message || "Gagal memverifikasi di server.");
            }
        } catch (error: any) {
            // Jika API mati atau timeout
            console.error("DEBUG: Terjadi Error Jaringan/Sistem:", error);
            toast.error("Terjadi kesalahan fatal saat menghubungi server.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button variant="outline" className="bg-emerald-500 text-white hover:bg-emerald-600 border-none rounded-full px-4 flex gap-2">
                    <Vote size={16} /> Verify
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-[2rem] border-none shadow-2xl">
                <form onSubmit={handleSubmit}>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-xl font-black text-slate-800">
                            Konfirmasi Verifikasi
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-slate-500 text-base">
                            Verifikasi pembayaran milik <strong>{selectedData.customer?.name}</strong>?
                            Tindakan ini akan mengubah status menjadi Lunas.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-8">
                        <AlertDialogCancel disabled={isLoading} className="rounded-full">
                            Batal
                        </AlertDialogCancel>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="bg-slate-900 text-white rounded-full min-w-[160px] font-bold"
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="animate-spin" size={18} /> Memproses...
                                </span>
                            ) : "Verifikasi Sekarang"}
                        </Button>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default VerifyBill