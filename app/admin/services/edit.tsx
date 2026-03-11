"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Edit3, Loader2 } from "lucide-react";
import { getCookie } from "@/lib/client-cookies"; // Sesuaikan dengan lib kamu
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

        // Pastikan field name sesuai dengan database (name atau title)
        const payload = {
            name: formData.get("name"),
            price: Number(formData.get("price")),
            min_usage: Number(formData.get("min_usage")),
            max_usage: Number(formData.get("max_usage")),
        };

        try {
            const token = getCookie("accessToken");
            // PERBAIKAN: Ganti PUT ke PATCH jika PUT ditolak (seperti kasus Admin)
            // Hilangkan /api/ jika BASE_API_URL kamu sudah mengandung /api
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
                <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-2xl px-4 py-2 font-bold flex gap-2 text-xs">
                    <Edit3 className="w-4 h-4" /> Edit Data Service
                </Button>
            </DialogTrigger>
            <DialogContent className="rounded-[2.5rem] p-8 max-w-md bg-white">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black text-slate-800">Edit Service</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-6">
                        {/* Gunakan defaultValue dari selectedData */}
                        <Input name="name" defaultValue={selectedData.name} placeholder="Service Name" required className="rounded-2xl bg-slate-50 border-none p-6" />
                        <Input name="price" type="number" defaultValue={selectedData.price} placeholder="Price" required className="rounded-2xl bg-slate-50 border-none p-6" />
                        <div className="grid grid-cols-2 gap-4">
                            <Input name="min_usage" type="number" defaultValue={selectedData.min_usage} placeholder="Min" required className="rounded-2xl bg-slate-50 border-none p-6" />
                            <Input name="max_usage" type="number" defaultValue={selectedData.max_usage} placeholder="Max" required className="rounded-2xl bg-slate-50 border-none p-6" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button disabled={loading} type="submit" className="w-full bg-orange-500 text-white font-bold rounded-2xl h-12">
                            {loading ? <Loader2 className="animate-spin mx-auto" /> : "Update Changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}