"use client";

import { getCookie } from "@/lib/client-cookies";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Sparkles, Layers } from "lucide-react";

const AddService = () => {
    const router = useRouter()
    const [open, setOpen] = useState<boolean>(false)
    const [name, setName] = useState<string>("")
    const [min_usage, setMinUsage] = useState<number>(0)
    const [max_usage, setMaxUsage] = useState<number>(0)
    const [price, setPrice] = useState<number>(0)

    const openModal = () => {
        setOpen(true)
        setName("")
        setMinUsage(0)
        setMaxUsage(0)
        setPrice(0)
    }

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            const token = await getCookie('accessToken');
            const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/services`;

            const playload = JSON.stringify({
                name,
                min_usage,
                max_usage,
                price
            })

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || "",
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: playload
            })

            const result = await response.json()
            if (result?.success) {
                setOpen(false)
                toast.success(result.message)
                setTimeout(() => {
                    router.refresh()
                }, 1000);
            } else {
                toast.warning(result.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(`Sorry, something went wrong, ${error}`)
        }
    }

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button
                        onClick={openModal}
                        className="bg-gradient-to-r from-[#a78bfa] to-[#f4aebb] hover:opacity-90 text-white rounded-[1.5rem] px-8 py-7 shadow-lg shadow-purple-100 transition-all active:scale-95 font-bold border-2 border-white"
                    >
                        <Plus className="mr-2 w-5 h-5" /> Add Data Service
                    </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-md rounded-[3rem] border-none shadow-2xl p-0 overflow-hidden bg-[#f8f9fd]">
                    {/* Header dengan Gradasi Pastel Sesuai Tema Profil */}
                    <div className="bg-gradient-to-br from-[#f2e7fe] via-[#fdf2f8] to-[#e6f4fe] p-10 text-[#4a5568] relative">
                        <div className="absolute top-4 right-8 opacity-20">
                            <Sparkles size={40} className="text-[#a78bfa]" />
                        </div>
                        <DialogHeader>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-white/60 backdrop-blur-md rounded-xl shadow-sm">
                                    <Layers className="text-[#a78bfa] w-5 h-5" />
                                </div>
                                <DialogTitle className="text-2xl font-black tracking-tight">New Service ✨</DialogTitle>
                            </div>
                            <DialogDescription className="text-[#a0aec0] font-medium italic">
                                Buat kategori layanan baru yang menarik.
                            </DialogDescription>
                        </DialogHeader>
                    </div>

                    {/* Body Form */}
                    <form onSubmit={handleSubmit} className="p-10 space-y-6 bg-white rounded-t-[3rem] -mt-6 relative z-10 shadow-[0_-20px_50px_rgba(0,0,0,0.02)]">
                        <div className="space-y-5">
                            <div className="space-y-2 group">
                                <Label className="ml-3 text-[11px] font-black uppercase tracking-widest text-[#cbd5e0] group-focus-within:text-[#a78bfa] transition-colors">Service Name</Label>
                                <Input
                                    className="rounded-2xl border-[#f1f5f9] bg-[#f8fafc] focus:bg-white focus:ring-4 focus:ring-purple-50 py-7 px-5 transition-all text-[#4a5568] font-medium placeholder:text-[#cbd5e0]"
                                    placeholder="Contoh: Domestik A"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-5">
                                <div className="space-y-2 group">
                                    <Label className="ml-3 text-[11px] font-black uppercase tracking-widest text-[#cbd5e0] group-focus-within:text-[#f4aebb] transition-colors">Price (Rp)</Label>
                                    <Input
                                        type="number"
                                        className="rounded-2xl border-[#f1f5f9] bg-[#f8fafc] py-7 px-5 focus:ring-4 focus:ring-pink-50 transition-all text-[#4a5568] font-medium"
                                        value={price}
                                        onChange={(e) => setPrice(Number(e.target.value))}
                                    />
                                </div>
                                <div className="space-y-2 group">
                                    <Label className="ml-3 text-[11px] font-black uppercase tracking-widest text-[#cbd5e0] group-focus-within:text-[#a78bfa] transition-colors">Min Usage</Label>
                                    <Input
                                        type="number"
                                        className="rounded-2xl border-[#f1f5f9] bg-[#f8fafc] py-7 px-5 focus:ring-4 focus:ring-purple-50 transition-all text-[#4a5568] font-medium"
                                        value={min_usage}
                                        onChange={(e) => setMinUsage(Number(e.target.value))}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 group">
                                <Label className="ml-3 text-[11px] font-black uppercase tracking-widest text-[#cbd5e0] group-focus-within:text-[#a78bfa] transition-colors">Max Usage</Label>
                                <Input
                                    type="number"
                                    className="rounded-2xl border-[#f1f5f9] bg-[#f8fafc] py-7 px-5 focus:ring-4 focus:ring-purple-50 transition-all text-[#4a5568] font-medium"
                                    value={max_usage}
                                    onChange={(e) => setMaxUsage(Number(e.target.value))}
                                />
                            </div>
                        </div>

                        <DialogFooter className="gap-3 sm:justify-center mt-6 pt-2">
                            <DialogClose asChild>
                                <Button variant="ghost" className="rounded-2xl font-bold text-[#a0aec0] hover:text-[#4a5568] hover:bg-[#f8fafc]">Cancel</Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                className="bg-[#2d3748] hover:bg-[#1a202c] text-white rounded-2xl px-10 py-6 font-black shadow-xl shadow-slate-200 transition-all active:scale-95"
                            >
                                Save Service
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddService;