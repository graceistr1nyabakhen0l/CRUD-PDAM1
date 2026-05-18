"use client"

import { Services } from "@/app/types"
import { Input } from "@/components/ui/input"
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
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Sparkles, UserPlus, Heart } from "lucide-react"

const AddCustomer = ({
    serviceData,
}: {
    serviceData: Services[]
}) => {
    const router = useRouter()

    const [open, setOpen] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [customerNumber, setCustomerNumber] = useState("")
    const [address, setAddress] = useState("")
    const [serviceId, setServiceId] = useState(0)
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [loading, setLoading] = useState(false)

    const openModal = () => {
        setOpen(true)
        setUsername("")
        setPassword("")
        setCustomerNumber("")
        setAddress("")
        setServiceId(0)
        setName("")
        setPhone("")
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        const payload = {
            username,
            password,
            customer_number: customerNumber,
            address,
            service_id: serviceId,
            name,
            phone,
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/customers`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || "",
                },
                body: JSON.stringify(payload),
            })

            if (response.ok) {
                setOpen(false)
                router.refresh()
                alert("Berhasil menambah customer!")
            } else {
                const errorData = await response.json()
                alert(`Gagal: ${errorData.message || "Terjadi kesalahan"}`)
            }
        } catch (error) {
            console.error("Error:", error)
            alert("Koneksi ke server gagal!")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button
                        onClick={openModal}
                        className="bg-[#1A1F2C] hover:bg-indigo-900 text-white rounded-full px-8 py-7 shadow-xl transition-all font-bold active:scale-95 flex items-center gap-2 tracking-tight"
                    >
                        <UserPlus size={18} strokeWidth={2.5} />
                        Add Data Customer
                    </Button>
                </DialogTrigger>

                {/* Modal Container dengan Rounded Super Halus */}
                <DialogContent className="sm:max-w-md rounded-[3rem] border-none shadow-2xl overflow-hidden p-0 bg-white">

                    {/* Header: Soft Gradient ala Referensi (Blue to Purple) */}
                    <div className="bg-gradient-to-br from-[#E0F2FF] via-[#F0E7FF] to-white p-10 pb-6 relative">
                        {/* Aksen Ikon Kecil yang Lucu */}
                        <div className="absolute top-8 right-10">
                            <Sparkles className="text-indigo-300 animate-pulse" size={24} />
                        </div>
                        <div className="absolute top-12 right-20 opacity-20">
                            <Heart className="text-pink-400 fill-pink-400" size={16} />
                        </div>

                        <DialogHeader className="relative z-10 text-center sm:text-left">
                            <DialogTitle className="text-3xl font-black text-[#2D3748] tracking-tight flex items-center gap-2">
                                New Customer <span className="text-indigo-400">✨</span>
                            </DialogTitle>
                            <DialogDescription className="text-slate-400 font-medium italic mt-1 pl-1">
                                — Let's grow the community!
                            </DialogDescription>
                        </DialogHeader>
                    </div>

                    <form onSubmit={handleSubmit} className="p-10 pt-4 bg-white">
                        <div className="space-y-5 max-h-[55vh] overflow-y-auto px-2 scrollbar-hide">
                            {[
                                { label: "FULL NAME", id: "name", val: name, set: setName, type: "text", icon: "👤", color: "bg-indigo-50 text-indigo-500" },
                                { label: "USERNAME", id: "username", val: username, set: setUsername, type: "text", icon: "@", color: "bg-blue-50 text-blue-500" },
                                { label: "PASSWORD", id: "password", val: password, set: setPassword, type: "password", icon: "🔑", color: "bg-purple-50 text-purple-500" },
                                { label: "CUSTOMER ID", id: "customerNumber", val: customerNumber, set: setCustomerNumber, type: "text", icon: "🆔", color: "bg-slate-50 text-slate-500" },
                                { label: "PHONE NUMBER", id: "phone", val: phone, set: setPhone, type: "text", icon: "📞", color: "bg-cyan-50 text-cyan-500" },
                                { label: "ADDRESS", id: "address", val: address, set: setAddress, type: "text", icon: "🏠", color: "bg-rose-50 text-rose-500" },
                            ].map((field) => (
                                <div key={field.id} className="space-y-2 group">
                                    <Label htmlFor={field.id} className="text-[10px] font-black text-slate-300 uppercase tracking-[0.15em] ml-3 transition-colors group-focus-within:text-indigo-400">
                                        {field.label}
                                    </Label>
                                    <div className="relative">
                                        <div className={`absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 ${field.color} rounded-2xl flex items-center justify-center text-sm font-bold shadow-sm transition-transform group-focus-within:scale-110`}>
                                            {field.icon}
                                        </div>
                                        <Input
                                            id={field.id}
                                            type={field.type}
                                            value={field.val}
                                            onChange={(e) => field.set(e.target.value)}
                                            required={field.id !== "phone" && field.id !== "address"}
                                            placeholder="..."
                                            className="pl-14 rounded-[1.5rem] border-slate-100 bg-[#F8FAFC] focus:bg-white focus:ring-[5px] focus:ring-indigo-50 focus:border-indigo-200 transition-all py-7 font-semibold text-slate-700 placeholder:text-slate-300"
                                        />
                                    </div>
                                </div>
                            ))}

                            <div className="space-y-2">
                                <Label htmlFor="service" className="text-[10px] font-black text-slate-300 uppercase tracking-[0.15em] ml-3">Service Type</Label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center text-sm shadow-sm">
                                        💎
                                    </div>
                                    <select
                                        id="service"
                                        className="w-full pl-14 bg-[#F8FAFC] border border-slate-100 rounded-[1.5rem] p-4 text-sm font-bold text-slate-700 focus:ring-[5px] focus:ring-indigo-50 outline-none transition-all appearance-none cursor-pointer"
                                        value={serviceId}
                                        onChange={(e) => setServiceId(Number(e.target.value))}
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        {serviceData.map((service) => (
                                            <option key={service.id} value={service.id}>{service.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Footer: Menggunakan tombol Dark ala Referensi */}
                        <DialogFooter className="mt-10 gap-3 flex-row sm:justify-center">
                            <DialogClose asChild>
                                <Button variant="ghost" type="button" disabled={loading} className="rounded-full px-8 font-bold text-slate-400 hover:bg-slate-50">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                disabled={loading}
                                className="bg-[#1A1F2C] hover:bg-indigo-900 text-white rounded-full px-12 font-black shadow-xl shadow-indigo-100 transition-all active:scale-95 py-6 tracking-tight"
                            >
                                {loading ? "✨ Saving..." : "Create Customer ✨"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddCustomer;