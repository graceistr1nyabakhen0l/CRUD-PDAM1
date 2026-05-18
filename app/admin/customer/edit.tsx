"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { getCookie } from "@/lib/client-cookies"
import { customer } from "@/app/types"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pencil, RotateCcw, Loader2, Sparkles, User, Phone, MapPin } from "lucide-react"

export default function EditCustomer({ selectedData }: { selectedData: customer }) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const [name, setName] = useState(selectedData.name)
    const [phone, setPhone] = useState(selectedData.phone)
    const [address, setAddress] = useState(selectedData.address || "")

    const router = useRouter()

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const token = getCookie("accessToken")
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/customers/${selectedData.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || ""
                },
                body: JSON.stringify({ name, phone, address }),
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
            alert("Terjadi kesalahan jaringan.")
        } finally {
            setLoading(false)
        }
    }

    const handleResetPassword = async () => {
        if (!confirm(`Reset password untuk ${selectedData.name}?`)) return
        try {
            const token = getCookie("accessToken")
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/customers/${selectedData.id}/reset-password`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || ""
                }
            })
            if (res.ok) alert("Password Customer berhasil direset!")
            else alert("Gagal reset password customer.")
        } catch (error) {
            alert("Terjadi kesalahan sistem.")
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-2xl hover:bg-indigo-50 group transition-all duration-300">
                    <Pencil className="w-4 h-4 text-slate-400 group-hover:text-indigo-500" />
                </Button>
            </DialogTrigger>

            <DialogContent className="rounded-[3rem] border-none p-0 overflow-hidden bg-white max-w-[450px] shadow-2xl">
                {/* Header: Chic & Dreamy Gradient (Blue to Purple) */}
                <div className="bg-gradient-to-br from-[#E0F2FF] via-[#F0E7FF] to-white pt-12 pb-6 flex flex-col items-center relative">
                    <Sparkles className="absolute top-8 right-10 text-indigo-300 animate-pulse" size={20} />

                    <DialogHeader className="flex flex-col items-center space-y-3">
                        <div className="w-16 h-16 bg-white/80 backdrop-blur-sm rounded-[1.8rem] flex items-center justify-center text-indigo-500 shadow-sm border border-white">
                            <Pencil className="w-7 h-7" />
                        </div>
                        <DialogTitle className="text-2xl font-black text-[#2D3748] tracking-tight">
                            Edit Customer Info
                        </DialogTitle>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">Update profile details ✨</p>
                    </DialogHeader>
                </div>

                <form onSubmit={handleUpdate} className="p-10 pt-2 bg-white">
                    <div className="space-y-6">
                        {/* Name Input */}
                        <div className="space-y-2 group">
                            <Label className="text-[10px] font-black text-slate-300 uppercase tracking-[0.15em] ml-3 group-focus-within:text-indigo-400 transition-colors">Nama Lengkap</Label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center shadow-sm">
                                    <User size={16} />
                                </div>
                                <Input
                                    className="pl-14 rounded-[1.5rem] border-slate-100 bg-[#F8FAFC] focus:bg-white focus:ring-[5px] focus:ring-indigo-50 focus:border-indigo-200 h-14 font-bold text-slate-700 transition-all"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Phone Input */}
                        <div className="space-y-2 group">
                            <Label className="text-[10px] font-black text-slate-300 uppercase tracking-[0.15em] ml-3 group-focus-within:text-blue-400 transition-colors">Nomor Telepon</Label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center shadow-sm">
                                    <Phone size={16} />
                                </div>
                                <Input
                                    className="pl-14 rounded-[1.5rem] border-slate-100 bg-[#F8FAFC] focus:bg-white focus:ring-[5px] focus:ring-blue-50 focus:border-blue-200 h-14 font-bold text-slate-700 transition-all"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Address Input */}
                        <div className="space-y-2 group">
                            <Label className="text-[10px] font-black text-slate-300 uppercase tracking-[0.15em] ml-3 group-focus-within:text-purple-400 transition-colors">Alamat Lengkap</Label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-purple-50 text-purple-500 rounded-2xl flex items-center justify-center shadow-sm">
                                    <MapPin size={16} />
                                </div>
                                <Input
                                    className="pl-14 rounded-[1.5rem] border-slate-100 bg-[#F8FAFC] focus:bg-white focus:ring-[5px] focus:ring-purple-50 focus:border-purple-200 h-14 font-bold text-slate-700 transition-all"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Jl. Merdeka No. 1..."
                                />
                            </div>
                        </div>

                        {/* Reset Password Button */}
                        <div className="pt-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleResetPassword}
                                className="w-full border-dashed border-indigo-100 text-indigo-400 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-300 rounded-[1.2rem] h-12 font-bold transition-all text-xs"
                            >
                                <RotateCcw className="w-3.5 h-3.5 mr-2" /> Reset Member Password
                            </Button>
                        </div>
                    </div>

                    <DialogFooter className="mt-10 sm:justify-center flex-col gap-3">
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#1A1F2C] hover:bg-indigo-900 h-14 rounded-full font-black text-white shadow-xl shadow-indigo-100 transition-all active:scale-95 tracking-tight"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin h-5 w-5" />
                            ) : (
                                "Save Changes ✨"
                            )}
                        </Button>

                        <DialogClose asChild>
                            <Button variant="ghost" className="text-slate-400 font-bold hover:bg-transparent hover:text-slate-600">
                                Dismiss
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}