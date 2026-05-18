"use client"
import { customer } from "@/app/types"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { getCookie } from "@/lib/client-cookies"
import { useState } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { Loader2, Trash2, AlertCircle, Sparkles } from "lucide-react"

const DeleteCustomer = ({ selectedData }: { selectedData: customer }) => {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleDelete = async (e: React.MouseEvent) => {
        try {
            e.preventDefault()
            setIsLoading(true)

            const token = await getCookie('accessToken')
            const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/customers/${selectedData.id}`

            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || "",
                    "Authorization": `Bearer ${token}`,
                }
            })

            const result = await response.json()

            if (response.ok && result?.success) {
                toast.success(result.message || "Data berhasil dihapus")
                setOpen(false)
                router.refresh()
            } else {
                toast.error(result.message || "Gagal menghapus data (Server Error)")
            }
        } catch (error) {
            toast.error("Terjadi kesalahan koneksi")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                {/* Trigger Button yang bersih & elegan */}
                <Button variant="ghost" className="h-10 w-10 p-0 rounded-2xl hover:bg-slate-50 group transition-all duration-300">
                    <Trash2 className="w-5 h-5 text-slate-300 group-hover:text-slate-600 transition-colors" />
                </Button>
            </AlertDialogTrigger>

            {/* Dialog Content dengan tema Soft Blue/Purple Gradient sesuai gambar */}
            <AlertDialogContent className="rounded-[3rem] border-none p-0 overflow-hidden bg-white max-w-[420px] shadow-2xl">

                {/* Header Area: Dreamy Gradient Style */}
                <div className="bg-gradient-to-br from-[#E0F2FF] via-[#F0E7FF] to-white pt-12 pb-8 flex flex-col items-center relative">
                    {/* Aksen hiasan kecil */}
                    <Sparkles className="absolute top-8 right-10 text-indigo-300 opacity-50" size={20} />

                    <div className="w-20 h-20 bg-white/80 backdrop-blur-sm rounded-[2.2rem] shadow-sm flex items-center justify-center mb-5 border border-white">
                        <div className="w-14 h-14 bg-slate-50 rounded-[1.5rem] flex items-center justify-center">
                            <AlertCircle className="text-slate-400 w-8 h-8" />
                        </div>
                    </div>

                    <AlertDialogHeader className="px-10 text-center">
                        <AlertDialogTitle className="text-2xl font-black text-[#2D3748] tracking-tight">
                            Hapus Customer?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-slate-400 font-medium leading-relaxed mt-2 text-[15px]">
                            Data <span className="text-indigo-500 font-bold bg-indigo-50/50 px-2 py-0.5 rounded-lg">"{selectedData.name}"</span> akan dihapus permanen dari sistem.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                </div>

                {/* Footer Action: Menggunakan Tombol Dark ala Referensi */}
                <AlertDialogFooter className="p-10 pt-2 gap-3 sm:justify-center flex-row">
                    <AlertDialogCancel
                        disabled={isLoading}
                        className="flex-1 rounded-full border-none bg-[#F8FAFC] text-slate-400 font-bold h-14 hover:bg-slate-100 hover:text-slate-600 transition-all m-0"
                    >
                        Batal
                    </AlertDialogCancel>

                    <AlertDialogAction
                        onClick={handleDelete}
                        disabled={isLoading}
                        className="flex-1 rounded-full bg-[#1A1F2C] hover:bg-indigo-950 h-14 font-black text-white shadow-xl shadow-indigo-100 transition-all active:scale-95 border-none m-0"
                    >
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            "Ya, Hapus ✨"
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteCustomer;