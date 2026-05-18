"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Trash2 } from "lucide-react"

export default function DeleteBill({ billId, token }: { billId: number; token: string }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const handleDelete = async () => {
        setLoading(true)
        try {
            await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/bills/${billId}`, {
                method: "DELETE",
                headers: {
                    "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || "",
                    Authorization: `Bearer ${token}`
                }
            })
            router.refresh()
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="bg-red-50 text-red-600 rounded-lg">
                    <Trash2 className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader><DialogTitle>Hapus Tagihan?</DialogTitle></DialogHeader>
                <DialogFooter>
                    <Button variant="destructive" onClick={handleDelete} disabled={loading}>Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}