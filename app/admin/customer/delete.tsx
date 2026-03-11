"use client"
import { customer } from "@/app/types"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { getCookie } from "@/lib/client-cookies"
import { useState } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { Loader2, Trash2 } from "lucide-react"

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

            if (result?.success) {
                toast.success(result.message)
                setOpen(false)
                router.refresh()
            } else {
                toast.warning(result.message)
            }
        } catch (error) {
            toast.error("Gagal menghapus data")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button variant="ghost" className="h-9 w-9 p-0 rounded-xl hover:bg-red-50 hover:text-red-500">
                    <Trash2 className="w-4 h-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-[2rem] border-none p-8">
                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-2xl">⚠️</div>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-xl font-bold">Hapus Customer?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Data <span className="font-bold text-red-500">{selectedData.name}</span> akan dihapus permanen.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                </div>
                <AlertDialogFooter className="mt-6 gap-2 sm:justify-center">
                    <AlertDialogCancel disabled={isLoading} className="rounded-xl border-none bg-slate-100">Batal</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} disabled={isLoading} className="rounded-xl bg-red-500 hover:bg-red-600 min-w-[120px]">
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Ya, Hapus"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteCustomer