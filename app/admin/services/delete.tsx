"use client"
import { Services } from "@/app/types"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { getCookie } from "cookies-next"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Loader2, Trash2, AlertCircle, Sparkles, X } from "lucide-react"

const DeleteService = ({ selectedData }: { selectedData: Services }) => {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleDelete = async (e: React.MouseEvent) => {
        try {
            e.preventDefault()
            setIsLoading(true)

            const token = getCookie('accessToken')
            const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/services/${selectedData.id}`
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || "",
                    "Authorization": `Bearer ${token}`,
                }
            })

            const result = await response.json()

            if (response.ok && result?.success) {
                toast.success("Layanan berhasil dihapus ✨")
                setOpen(false)
                router.refresh()
            } else {
                toast.warning("Gagal menghapus data")
            }
        } catch (error) {
            toast.error("Terjadi kesalahan jaringan")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-2xl hover:bg-slate-50 group transition-all duration-300">
                    <Trash2 className="w-5 h-5 text-slate-300 group-hover:text-slate-600 transition-colors" />
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent className="rounded-[3rem] border-none p-0 overflow-hidden bg-white max-w-[420px] shadow-2xl block">

                {/* 1. HEADER: Chic & Playful Gradient */}
                <div className="bg-gradient-to-br from-[#F0F7FF] via-[#F5F3FF] to-white pt-14 pb-8 flex flex-col items-center relative">
                    <button
                        onClick={() => setOpen(false)}
                        className="absolute right-7 top-7 p-2 rounded-full hover:bg-white/50 transition-colors text-slate-400"
                    >
                        <X size={20} />
                    </button>

                    <Sparkles className="absolute top-10 right-14 text-indigo-300 animate-pulse" size={20} />

                    {/* Icon Container with Glassmorphism effect */}
                    <div className="w-20 h-20 bg-white rounded-[2.2rem] shadow-xl shadow-indigo-100/50 flex items-center justify-center mb-6 border border-white">
                        <div className="w-14 h-14 bg-slate-50 rounded-[1.5rem] flex items-center justify-center">
                            <AlertCircle className="text-indigo-400 w-8 h-8" />
                        </div>
                    </div>

                    <AlertDialogHeader className="px-10 text-center space-y-3">
                        <AlertDialogTitle className="text-3xl font-black text-[#1A1F2C] tracking-tight">
                            Hapus Layanan?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-slate-400 font-medium leading-relaxed text-[15px]">
                            Layanan <span className="text-indigo-500 font-black bg-indigo-50 px-2.5 py-1 rounded-xl mx-0.5 inline-block">"{selectedData.name}"</span> akan dihapus permanen.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                </div>

                {/* 2. FOOTER: Premium Navy & Soft Grey Buttons */}
                <div className="px-10 pb-12 pt-4 flex gap-4">
                    <AlertDialogCancel asChild>
                        <Button
                            variant="ghost"
                            disabled={isLoading}
                            className="flex-1 rounded-full bg-slate-50 text-slate-400 font-bold h-16 hover:bg-slate-100 hover:text-slate-600 transition-all text-base border-none m-0"
                        >
                            Batal
                        </Button>
                    </AlertDialogCancel>

                    <AlertDialogAction asChild>
                        <Button
                            onClick={handleDelete}
                            disabled={isLoading}
                            className="flex-1 rounded-full bg-[#1A1F2C] hover:bg-indigo-950 h-16 font-black text-white shadow-xl shadow-indigo-100 transition-all active:scale-95 border-none text-base m-0"
                        >
                            {isLoading ? (
                                <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                                "Ya, Hapus"
                            )}
                        </Button>
                    </AlertDialogAction>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteService