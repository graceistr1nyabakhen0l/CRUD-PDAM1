"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { getCookie } from "@/lib/client-cookies"
import { Admin } from "@/app/types"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pencil, RotateCcw, Loader2, User, Phone, Sparkles, X } from "lucide-react"
import { toast } from "react-toastify"

export default function EditAdmin({ selectedData }: { selectedData: Admin }) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const [name, setName] = useState(selectedData.name)
    const [phone, setPhone] = useState(selectedData.phone)

    const router = useRouter()

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const token = getCookie("accessToken")
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/admins/${selectedData.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || ""
                },
                body: JSON.stringify({ name, phone }),
            })

            if (res.ok) {
                setOpen(false)
                router.refresh()
                toast.success("Profil Admin diperbarui ✨")
            } else {
                const errorData = await res.json()
                toast.error(errorData.message || "Gagal memperbarui data")
            }
        } catch (error) {
            toast.error("Terjadi kesalahan jaringan.")
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
                toast.success("Password berhasil direset!")
            } else {
                toast.error("Gagal reset password.")
            }
        } catch (error) {
            toast.error("Terjadi kesalahan sistem.")
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-2xl hover:bg-indigo-50 group transition-all duration-300">
                    <Pencil className="w-4 h-4 text-slate-400 group-hover:text-indigo-500" />
                </Button>
            </DialogTrigger>

            <DialogContent className="rounded-[3rem] border-none p-0 overflow-hidden bg-white max-w-[480px] shadow-2xl block">
                {/* 1. HEADER SECTION (Gunakan Tinggi Tetap & Spacing Jelas) */}
                <div className="bg-gradient-to-br from-[#F0F7FF] via-[#F5F3FF] to-white pt-14 pb-8 flex flex-col items-center relative">
                    <DialogClose className="absolute right-6 top-6 p-2 rounded-full hover:bg-white/50 transition-colors">
                        <X className="w-5 h-5 text-slate-400" />
                    </DialogClose>

                    <Sparkles className="absolute top-10 right-14 text-indigo-300 animate-pulse" size={20} />

                    <div className="w-20 h-20 bg-white shadow-xl shadow-indigo-100/50 rounded-[2rem] flex items-center justify-center text-indigo-500 mb-4 border border-white">
                        <User className="w-10 h-10" />
                    </div>

                    <DialogHeader>
                        <DialogTitle className="text-3xl font-black text-[#1A1F2C] tracking-tight text-center">
                            Edit Admin
                        </DialogTitle>
                        <p className="text-slate-400 text-[11px] font-black uppercase tracking-[0.2em] text-center mt-1">
                            Update Security & Profile ✨
                        </p>
                    </DialogHeader>
                </div>

                {/* 2. FORM SECTION (Padding yang lega & input yang rapi) */}
                <form onSubmit={handleUpdate} className="px-10 pb-12 pt-6 space-y-8 bg-white">
                    <div className="space-y-6">
                        {/* Name Field */}
                        <div className="space-y-3 group">
                            <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 group-focus-within:text-indigo-500 transition-colors">
                                Full Name
                            </Label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center shadow-sm">
                                    <User size={18} />
                                </div>
                                <Input
                                    className="pl-16 rounded-[1.6rem] border-slate-100 bg-[#F8FAFC] focus:bg-white focus:ring-[6px] focus:ring-indigo-50 focus:border-indigo-200 h-16 font-bold text-slate-700 transition-all text-base"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter full name"
                                    required
                                />
                            </div>
                        </div>

                        {/* Phone Field */}
                        <div className="space-y-3 group">
                            <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 group-focus-within:text-blue-500 transition-colors">
                                Phone Number
                            </Label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center shadow-sm">
                                    <Phone size={18} />
                                </div>
                                <Input
                                    className="pl-16 rounded-[1.6rem] border-slate-100 bg-[#F8FAFC] focus:bg-white focus:ring-[6px] focus:ring-blue-50 focus:border-blue-200 h-16 font-bold text-slate-700 transition-all text-base"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="0812xxxx"
                                    required
                                />
                            </div>
                        </div>

                        {/* Reset Password Action */}
                        <div className="pt-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleResetPassword}
                                className="w-full border-dashed border-slate-200 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 rounded-[1.4rem] h-14 font-bold transition-all text-xs"
                            >
                                <RotateCcw className="w-4 h-4 mr-2" /> Reset Admin Password
                            </Button>
                        </div>
                    </div>

                    {/* 3. FOOTER SECTION (Aksi utama) */}
                    <div className="flex flex-col gap-4 pt-4">
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#1A1F2C] hover:bg-indigo-950 h-16 rounded-full font-black text-white shadow-2xl shadow-indigo-200 transition-all active:scale-95 text-base tracking-tight"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin h-6 w-6" />
                            ) : (
                                "Save Changes ✨"
                            )}
                        </Button>

                        <DialogClose asChild>
                            <Button variant="ghost" className="text-slate-400 font-bold hover:bg-transparent hover:text-slate-600 h-10">
                                Dismiss
                            </Button>
                        </DialogClose>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}