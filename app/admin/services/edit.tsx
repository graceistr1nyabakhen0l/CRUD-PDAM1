"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Edit3, Loader2, Sparkles, Layers } from "lucide-react";
import { getCookie } from "@/lib/client-cookies";
import { useRouter } from "next/navigation";
import { Services } from "@/app/types";

export default function EditService({ selectedData }: { selectedData: Services }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);

        const payload = {
            name: formData.get("name"),
            price: Number(formData.get("price")),
            min_usage: Number(formData.get("min_usage")),
            max_usage: Number(formData.get("max_usage")),
        };

        try {
            const token = getCookie("accessToken");
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/services/${selectedData.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || ""
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setOpen(false);
                router.refresh();
                alert("Layanan Berhasil Diperbarui!");
            } else {
                const err = await response.json();
                alert(`Gagal: ${err.message || "Periksa data input"}`);
            }
        } catch (error) {
            alert("Kesalahan jaringan.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-[#a78bfa] to-[#f4aebb] hover:opacity-90 text-white rounded-2xl px-4 py-2 font-bold flex gap-2 text-xs shadow-md shadow-purple-100 transition-all active:scale-95 border border-white/20">
                    <Edit3 className="w-4 h-4" /> Edit Data Service
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
                            <DialogTitle className="text-2xl font-black tracking-tight text-[#2d3748]">Edit Service ✨</DialogTitle>
                        </div>
                        <p className="text-[#a0aec0] font-medium italic text-sm">
                            Perbarui detail kategori layanan Anda.
                        </p>
                    </DialogHeader>
                </div>

                {/* Body Form dengan Styling Input Konsisten */}
                <form onSubmit={handleSubmit} className="p-10 space-y-6 bg-white rounded-t-[3rem] -mt-6 relative z-10 shadow-[0_-20px_50px_rgba(0,0,0,0.02)]">
                    <div className="space-y-5">
                        <div className="space-y-2 group">
                            <Label className="ml-3 text-[11px] font-black uppercase tracking-widest text-[#cbd5e0] group-focus-within:text-[#a78bfa] transition-colors">Service Name</Label>
                            <Input
                                name="name"
                                defaultValue={selectedData.name}
                                placeholder="Service Name"
                                required
                                className="rounded-2xl border-[#f1f5f9] bg-[#f8fafc] focus:bg-white focus:ring-4 focus:ring-purple-50 py-7 px-5 transition-all text-[#4a5568] font-medium placeholder:text-[#cbd5e0]"
                            />
                        </div>

                        <div className="space-y-2 group">
                            <Label className="ml-3 text-[11px] font-black uppercase tracking-widest text-[#cbd5e0] group-focus-within:text-[#f4aebb] transition-colors">Price (Rp)</Label>
                            <Input
                                name="price"
                                type="number"
                                defaultValue={selectedData.price}
                                placeholder="Price"
                                required
                                className="rounded-2xl border-[#f1f5f9] bg-[#f8fafc] py-7 px-5 focus:ring-4 focus:ring-pink-50 transition-all text-[#4a5568] font-medium"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                            <div className="space-y-2 group">
                                <Label className="ml-3 text-[11px] font-black uppercase tracking-widest text-[#cbd5e0] group-focus-within:text-[#a78bfa] transition-colors">Min Usage</Label>
                                <Input
                                    name="min_usage"
                                    type="number"
                                    defaultValue={selectedData.min_usage}
                                    placeholder="Min"
                                    required
                                    className="rounded-2xl border-[#f1f5f9] bg-[#f8fafc] py-7 px-5 focus:ring-4 focus:ring-purple-50 transition-all text-[#4a5568] font-medium"
                                />
                            </div>
                            <div className="space-y-2 group">
                                <Label className="ml-3 text-[11px] font-black uppercase tracking-widest text-[#cbd5e0] group-focus-within:text-[#a78bfa] transition-colors">Max Usage</Label>
                                <Input
                                    name="max_usage"
                                    type="number"
                                    defaultValue={selectedData.max_usage}
                                    placeholder="Max"
                                    required
                                    className="rounded-2xl border-[#f1f5f9] bg-[#f8fafc] py-7 px-5 focus:ring-4 focus:ring-purple-50 transition-all text-[#4a5568] font-medium"
                                />
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="gap-3 sm:justify-center mt-6 pt-2">
                        <DialogClose asChild>
                            <Button variant="ghost" className="rounded-2xl font-bold text-[#a0aec0] hover:text-[#4a5568] hover:bg-[#f8fafc]">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            disabled={loading}
                            type="submit"
                            className="bg-[#2d3748] hover:bg-[#1a202c] text-white rounded-2xl px-10 py-6 font-black shadow-xl shadow-slate-200 transition-all active:scale-95 min-w-[160px]"
                        >
                            {loading ? <Loader2 className="animate-spin mx-auto" /> : "Update Changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}