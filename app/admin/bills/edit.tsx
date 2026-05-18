"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Bill } from "@/app/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Pencil } from "lucide-react"
import { Label } from "@/components/ui/label"

export default function EditBill({ bill, token }: { bill: Bill; token: string }) {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [usage, setUsage] = useState(bill.usage_value.toString())
    const [loading, setLoading] = useState(false)

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/bills/${bill.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || "",
                    // TAMBAHKAN BARIS DI BAWAH INI:
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ usage_value: Number(usage) })
            })

            if (response.ok) {
                setOpen(false)
                router.refresh()
            } else {
                // Tambahkan alert untuk melihat pesan error jika gagal lagi
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) {
            console.error(error);
            alert("Terjadi kesalahan koneksi");
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="bg-blue-50 text-blue-600 rounded-lg">
                    <Pencil className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <form onSubmit={handleUpdate}>
                    <DialogHeader><DialogTitle>Edit Usage</DialogTitle></DialogHeader>
                    <div className="py-4">
                        <Label>New Usage (m³)</Label>
                        <Input type="number" value={usage} onChange={(e) => setUsage(e.target.value)} />
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={loading}>Update</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}