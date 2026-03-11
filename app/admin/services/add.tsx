"use client"; //tanda kalau dia client component

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
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
            console.log(url);
            
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
                    "Authorization": `Bearer  ${token}`,
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
   // ... (keep your imports and logic)

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button 
                        onClick={openModal} 
                        className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-8 py-6 shadow-lg shadow-orange-200 transition-all active:scale-95 font-bold"
                    >
                        <span className="mr-2 text-xl">+</span> Add Data Service
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md rounded-[2.5rem] border-none shadow-2xl p-0 overflow-hidden">
                    <div className="bg-gradient-to-br from-orange-400 to-amber-500 p-8 text-white">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-black">New Service ✨</DialogTitle>
                            <DialogDescription className="text-orange-50 opacity-90 italic">
                                Buat kategori layanan baru yang menarik.
                            </DialogDescription>
                        </DialogHeader>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="p-8 space-y-6 bg-white">
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <Label className="ml-2 text-[10px] font-bold uppercase text-slate-400">Service Name</Label>
                                <Input 
                                    className="rounded-2xl border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-orange-100 py-6 transition-all" 
                                    placeholder="Contoh: Domestik A"
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <Label className="ml-2 text-[10px] font-bold uppercase text-slate-400">Price (Rp)</Label>
                                    <Input 
                                        type="number"
                                        className="rounded-2xl border-slate-100 bg-slate-50 py-6 focus:ring-4 focus:ring-orange-100 transition-all" 
                                        value={price} 
                                        onChange={(e) => setPrice(Number(e.target.value))} 
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label className="ml-2 text-[10px] font-bold uppercase text-slate-400">Min Usage</Label>
                                    <Input 
                                        type="number"
                                        className="rounded-2xl border-slate-100 bg-slate-50 py-6 focus:ring-4 focus:ring-orange-100 transition-all" 
                                        value={min_usage} 
                                        onChange={(e) => setMinUsage(Number(e.target.value))} 
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <Label className="ml-2 text-[10px] font-bold uppercase text-slate-400">Max Usage</Label>
                                <Input 
                                    type="number"
                                    className="rounded-2xl border-slate-100 bg-slate-50 py-6 focus:ring-4 focus:ring-orange-100 transition-all" 
                                    value={max_usage} 
                                    onChange={(e) => setMaxUsage(Number(e.target.value))} 
                                />
                            </div>
                        </div>

                        <DialogFooter className="gap-3 sm:justify-center mt-4">
                            <DialogClose asChild>
                                <Button variant="ghost" className="rounded-2xl font-bold text-slate-400">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" className="bg-slate-900 hover:bg-orange-600 text-white rounded-2xl px-8 font-black shadow-lg shadow-slate-200">
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