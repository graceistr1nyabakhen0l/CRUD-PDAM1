"use client"
import { Services } from "@/app/types" // Gunakan tipe Services
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { getCookie } from "cookies-next" // Sesuaikan dengan library cookie yang kamu pakai
import { useState } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { Loader2, Trash2 } from "lucide-react"

const DeleteService = ({ selectedData }: { selectedData: Services }) => {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleDelete = async (e: React.MouseEvent) => {
        try {
            e.preventDefault()
            setIsLoading(true)

            const token = getCookie('accessToken')
            // Endpoint diubah menjadi /services sesuai konteks layanan
            const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/services/${selectedData.id}`
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || "",
                    "Authorization": `Bearer ${token}`,
                }
            })

            // Cek jika response kosong/bukan JSON untuk menghindari error parsing
            const result = await response.json()

            if (response.ok && result?.success) {
                toast.success(result.message || "Layanan berhasil dihapus")
                setOpen(false)
                router.refresh() // Refresh data di server component
            } else {
                toast.warning(result.message || `Gagal: Server merespon ${response.status}`)
            }
        } catch (error) {
            toast.error("Gagal menghapus data layanan")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                {/* Ikon sampah di dalam card layanan */}
                <Button variant="ghost" className="h-9 w-9 p-0 rounded-xl hover:bg-red-50 hover:text-red-500 transition-colors">
                    <Trash2 className="w-5 h-5 text-slate-400 group-hover:text-red-500" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-[2.5rem] border-none p-8 bg-white">
                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-2xl animate-pulse">⚠️</div>
                    <AlertDialogHeader>
                        {/* Nama diubah menjadi Service */}
                        <AlertDialogTitle className="text-xl font-bold text-slate-800">Hapus Layanan?</AlertDialogTitle>
                        <AlertDialogDescription className="text-slate-500">
                            Layanan <span className="font-bold text-red-500">"{selectedData.name}"</span> akan dihapus permanen dan tidak bisa dikembalikan.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                </div>
                <AlertDialogFooter className="mt-6 gap-2 sm:justify-center">
                    <AlertDialogCancel disabled={isLoading} className="rounded-xl border-none bg-slate-100 font-bold hover:bg-slate-200">
                        Batal
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        disabled={isLoading}
                        className="rounded-xl bg-red-500 hover:bg-red-600 min-w-[120px] font-bold text-white transition-all active:scale-95"
                    >
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Ya, Hapus Saja"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteService