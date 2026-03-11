"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { getCookie } from "@/lib/client-cookies"
import { customer } from "@/app/types" // Pastikan tipe Customer sudah ada di types
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pencil, RotateCcw, Loader2 } from "lucide-react"

export default function EditCustomer({ selectedData }: { selectedData: customer }) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    // Inisialisasi state sesuai data Customer
    const [name, setName] = useState(selectedData.name)
    const [phone, setPhone] = useState(selectedData.phone)
    const [address, setAddress] = useState(selectedData.address || "") // Tambahan field alamat jika ada

    const router = useRouter()

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const token = getCookie("accessToken")
            // Endpoint diganti ke /customers/
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/customers/${selectedData.id}`, {
                method: "PATCH", // Tetap gunakan PATCH karena Admin berhasil dengan ini
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || ""
                },
                body: JSON.stringify({
                    name: name,
                    phone: phone,
                    address: address
                }),
            })

            if (res.ok) {
                setOpen(false)
                router.refresh()
                alert("Data Customer berhasil diperbarui!")
            } else {
                const errorData = await res.json()
                alert(`Gagal Update: ${errorData.message || 'Cek koneksi database'}`)
            }
        } catch (error) {
            alert("Terjadi kesalahan jaringan atau server mati.")
        } finally {
            setLoading(false)
        }
    }

    const handleResetPassword = async () => {
        if (!confirm(`Reset password untuk ${selectedData.name}?`)) return

        try {
            const token = getCookie("accessToken")
            // Endpoint reset password untuk customer
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/customers/${selectedData.id}/reset-password`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || ""
                }
            })
            if (res.ok) {
                alert("Password Customer berhasil direset!");
            } else {
                alert("Gagal reset password customer.");
            }
        } catch (error) {
            alert("Terjadi kesalahan sistem.");
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:text-blue-600">
                    <Pencil className="w-4 h-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="rounded-[2rem] p-8">
                <form onSubmit={handleUpdate}>
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">Edit Data Customer</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-6">
                        <div className="space-y-2">
                            <Label>Nama Lengkap</Label>
                            <Input value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className="space-y-2">
                            <Label>Nomor Telepon</Label>
                            <Input value={phone} onChange={(e) => setPhone(e.target.value)} required />
                        </div>
                        <div className="space-y-2">
                            <Label>Alamat</Label>
                            <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Alamat lengkap" />
                        </div>

                        <div className="pt-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleResetPassword}
                                className="w-full border-dashed text-orange-600 border-orange-200"
                            >
                                <RotateCcw className="w-4 h-4 mr-2" /> Reset Password Customer
                            </Button>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={loading} className="w-full bg-blue-600">
                            {loading ? <Loader2 className="animate-spin mr-2" /> : "Simpan Perubahan"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}