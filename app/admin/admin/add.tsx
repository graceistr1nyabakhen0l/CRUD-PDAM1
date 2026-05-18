"use client"

import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { getCookie } from "@/lib/client-cookies"
import { Sparkles, UserPlus, Phone, User as UserIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

function AddAdmin() {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [loading, setLoading] = useState(false)

    const openModal = () => {
        setOpen(true)
        setName("")
        setPhone("")
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        try {
            const token = getCookie("accessToken")
            const username = phone
            const password = phone

            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/admins`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || "",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ username, password, name, phone }),
            })

            const result = await response.json()

            if (response.ok && result?.success) {
                setOpen(false)
                router.refresh()
            } else {
                alert(`Gagal menambah admin: ${result?.message || "Terjadi kesalahan"}`)
            }

        } catch (error) {
            console.error(error)
            alert("Terjadi kesalahan saat koneksi ke server")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    onClick={openModal}
                    className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-6 py-6 h-auto font-bold tracking-wide shadow-lg shadow-slate-200 transition-all hover:scale-105 active:scale-95 flex gap-2"
                >
                    <UserPlus size={18} />
                    Add Admin
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[400px] rounded-[2.5rem] border-none shadow-2xl p-0 overflow-hidden bg-white/95 backdrop-blur-xl">
                <form onSubmit={handleSubmit}>
                    {/* Header dengan Background Lucu */}
                    <div className="bg-gradient-to-br from-indigo-50 via-rose-50 to-sky-50 p-8 pb-6 relative">
                        <div className="absolute top-4 right-6 text-rose-200">
                            <Sparkles size={20} />
                        </div>
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-black text-slate-800 tracking-tight">
                                New Admin ✨
                            </DialogTitle>
                            <DialogDescription className="text-slate-400 font-medium italic pt-1">
                                Let&apos;s grow the team!
                            </DialogDescription>
                        </DialogHeader>
                    </div>

                    <div className="p-8 space-y-6">
                        {/* Input Name */}
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">
                                Full Name
                            </Label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-400 transition-colors">
                                    <UserIcon size={18} />
                                </div>
                                <Input
                                    id="name"
                                    placeholder="Enter full name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="pl-12 h-14 bg-slate-50/50 border-none rounded-2xl focus-visible:ring-2 focus-visible:ring-indigo-100 placeholder:text-slate-300 font-medium"
                                />
                            </div>
                        </div>

                        {/* Input Phone */}
                        <div className="space-y-2">
                            <Label htmlFor="phone" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">
                                Phone Number
                            </Label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-rose-400 transition-colors">
                                    <Phone size={18} />
                                </div>
                                <Input
                                    id="phone"
                                    type="tel"
                                    placeholder="0812xxxx"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                    className="pl-12 h-14 bg-slate-50/50 border-none rounded-2xl focus-visible:ring-2 focus-visible:ring-rose-100 placeholder:text-slate-300 font-medium"
                                />
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="p-8 pt-0 flex gap-3 sm:justify-center">
                        <DialogClose asChild>
                            <Button
                                variant="ghost"
                                type="button"
                                disabled={loading}
                                className="flex-1 h-12 rounded-2xl font-bold text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all"
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="flex-[2] h-12 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-indigo-500 hover:to-rose-400 text-white rounded-2xl font-bold shadow-lg shadow-slate-100 transition-all active:scale-95"
                        >
                            {loading ? "Creating..." : "Create Admin ✨"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddAdmin