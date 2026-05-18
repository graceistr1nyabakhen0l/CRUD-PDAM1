"use client"
import { customer } from "@/app/types"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { getCookie } from "@/lib/client-cookies"
import { useState } from "react"
import { toast } from "react-toastify"
import { KeyRound, Loader2, Sparkles, ShieldCheck } from "lucide-react"

const ResetPassword = ({ selectedData }: { selectedData: customer }) => {
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleReset = async (e: React.MouseEvent) => {
        try {
            e.preventDefault()
            setIsLoading(true)
            const token = await getCookie('accessToken')
            const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/customers/${selectedData.id}`

            const response = await fetch(url, {
                method: "PATCH",
                headers: {
                    "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || "",
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ password: "123456" })
            })

            const result = await response.json()

            if (response.ok && result.success) {
                toast.success("Password berhasil direset ke default!")
                setOpen(false)
            } else {
                toast.error(result.message || "Gagal melakukan reset")
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
                {/* Trigger Button yang elegan */}
                <Button variant="ghost" className="h-10 w-10 p-0 rounded-2xl hover:bg-indigo-50 group transition-all duration-300" title="Reset Password">
                    <KeyRound className="w-5 h-5 text-slate-300 group-hover:text-indigo-400 transition-colors" />
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent className="rounded-[3rem] border-none p-0 overflow-hidden bg-white max-w-[420px] shadow-2xl">

                {/* Header Area dengan Dreamy Gradient khas New Admin/Customer */}
                <div className="bg-gradient-to-br from-[#F0F7FF] via-[#F5F3FF] to-white pt-12 pb-8 flex flex-col items-center relative">
                    <Sparkles className="absolute top-8 right-10 text-indigo-300 opacity-50" size={20} />

                    <div className="w-20 h-20 bg-white/80 backdrop-blur-sm rounded-[2.2rem] shadow-sm flex items-center justify-center mb-5 border border-indigo-50">
                        <div className="w-14 h-14 bg-indigo-50 rounded-[1.5rem] flex items-center justify-center">
                            <KeyRound className="text-indigo-400 w-7 h-7" />
                        </div>
                    </div>

                    <AlertDialogHeader className="px-10 text-center">
                        <AlertDialogTitle className="text-2xl font-black text-[#2D3748] tracking-tight">
                            Reset Password?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-slate-400 font-medium leading-relaxed mt-2 text-[15px]">
                            Password untuk <span className="text-indigo-500 font-bold bg-indigo-50/50 px-2 py-0.5 rounded-lg">"{selectedData.name}"</span> akan diatur ulang menjadi <code className="text-indigo-600 font-bold">123456</code>.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                </div>

                {/* Footer Action dengan gaya tombol Dark Navy rounded-full */}
                <AlertDialogFooter className="p-10 pt-2 gap-3 sm:justify-center flex-row">
                    <AlertDialogCancel
                        disabled={isLoading}
                        className="flex-1 rounded-full border-none bg-[#F8FAFC] text-slate-400 font-bold h-14 hover:bg-slate-100 transition-all m-0"
                    >
                        Batal
                    </AlertDialogCancel>

                    <AlertDialogAction
                        onClick={handleReset}
                        disabled={isLoading}
                        className="flex-1 rounded-full bg-[#1A1F2C] hover:bg-indigo-950 h-14 font-black text-white shadow-xl shadow-indigo-100 transition-all active:scale-95 border-none m-0"
                    >
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            "Ya, Reset 🔑"
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default ResetPassword;