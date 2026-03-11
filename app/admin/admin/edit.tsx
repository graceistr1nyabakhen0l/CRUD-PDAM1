"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { getCookie } from "@/lib/client-cookies"
import { Admin } from "@/app/types"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pencil, RotateCcw, Loader2 } from "lucide-react"

export default function EditAdmin({ selectedData }: { selectedData: Admin }) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    // Inisialisasi state dengan data yang sudah ada
    const [name, setName] = useState(selectedData.name)
    const [phone, setPhone] = useState(selectedData.phone)

    const router = useRouter()

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        // Debug: Cek apakah ID dan Data ada sebelum kirim
        console.log("Mengupdate Admin ID:", selectedData.id);
        console.log("Data dikirim:", { name, phone });

        try {
            const token = getCookie("accessToken")
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/admins/${selectedData.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || ""
                },
                body: JSON.stringify({
                    name: name,
                    phone: phone
                }),
            })

            if (res.ok) {
                setOpen(false)
                router.refresh()
                alert("Data Admin berhasil diperbarui!")
            } else {
                const errorData = await res.json()
                alert(`Gagal Update: ${errorData.message || 'Cek koneksi database'}`)
            }
        } catch (error) {
            console.error("Error update:", error)
            alert("Terjadi kesalahan jaringan atau server mati.")
        } finally {
            setLoading(false)
        }
    }

    const handleResetPassword = async () => {
        if (!confirm(`Reset password untuk ${selectedData.name}?`)) return

        try {
            const token = getCookie("accessToken")
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/admins/${selectedData.id}/reset-password`, {
                method: "POST",
                headers: { "Authorization": `Bearer ${token}` }
            })
            if (res.ok) {
                alert("Password berhasil direset ke default!")
            } else {
                alert("Gagal reset password. Fitur ini mungkin belum ada di Backend.")
            }
        } catch (error) {
            alert("Terjadi kesalahan sistem.")
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
                        <DialogTitle className="text-2xl font-bold">Edit Data Admin</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-6">
                        <div className="space-y-2">
                            <Label>Nama Lengkap</Label>
                            <Input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Masukkan nama"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Nomor Telepon</Label>
                            <Input
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="081xxx"
                                required
                            />
                        </div>

                        {/* Tombol Reset Password sesuai Checklist Tugas */}
                        <div className="pt-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleResetPassword}
                                className="w-full border-dashed text-orange-600 border-orange-200 hover:bg-orange-50"
                            >
                                <RotateCcw className="w-4 h-4 mr-2" /> Reset Password Admin
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