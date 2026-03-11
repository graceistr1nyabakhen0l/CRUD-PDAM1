"use client"
import { customer } from "@/app/types"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { getCookie } from "@/lib/client-cookies"
import { useState } from "react"
import { toast } from "react-toastify"
import { KeyRound, Loader2 } from "lucide-react"

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
                },
                 body: JSON.stringify({ password: "123456" })
            })

            const result = await response.json()
            console.log(result)
            if (result.success) {
                alert("Password berhasil direset!")
                setOpen(false)
            } else {
                toast.error(result.message)
            }
        } catch (error) {
            toast.error("Gagal reset password")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button variant="ghost" className="h-9 w-9 p-0 rounded-xl hover:bg-amber-50 hover:text-amber-500" title="Reset Password">
                    <KeyRound className="w-4 h-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-[2rem] p-8">
                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center text-2xl">🔑</div>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-xl font-bold">Reset Password?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Password untuk <b>{selectedData.name}</b> akan dikembalikan ke pengaturan awal 123456 (biasanya nomor telepon atau default).
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                </div>
                <AlertDialogFooter className="mt-6 gap-2 sm:justify-center">
                    <AlertDialogCancel disabled={isLoading} className="rounded-xl border-none bg-slate-100">Batal</AlertDialogCancel>
                    <AlertDialogAction onClick={handleReset} disabled={isLoading} className="rounded-xl bg-amber-500 hover:bg-amber-600 min-w-[120px]">
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Ya, Reset"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default ResetPassword