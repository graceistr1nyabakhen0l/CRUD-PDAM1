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
import { getCookies } from "@/lib/server-cookie" // Pastikan fungsi ini bisa dipanggil di client atau gunakan document.cookie

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
            // Kita ambil token (Sesuaikan cara ambil cookie di project kamu)
            // Jika getCookies hanya untuk server, kamu bisa pakai library 'js-cookie' 
            // atau bypass sementara jika API belum pakai Token.
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/customers`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || "",
                    // "Authorization": `Bearer ${token}` // Buka ini jika butuh login
                },
                body: JSON.stringify(payload),
            })

            if (response.ok) {
                setOpen(false)
                router.refresh() // Supaya data di tabel otomatis nambah
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
                        className="bg-slate-900 hover:bg-sky-600 text-white rounded-full px-8 py-6 shadow-xl hover:shadow-sky-200 transition-all font-bold active:scale-95"
                    >
                        <span className="mr-2 text-lg">+</span> Add Data Customer
                    </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-md rounded-[2.5rem] border-none shadow-2xl overflow-hidden p-0">
                    <div className="bg-gradient-to-r from-sky-500 to-blue-600 p-8 text-white">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-extrabold text-white">New Customer ✨</DialogTitle>
                            <DialogDescription className="text-sky-100 italic">
                                Let's add a new member to our community!
                            </DialogDescription>
                        </DialogHeader>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 bg-white">
                        <div className="space-y-5 max-h-[50vh] overflow-y-auto px-1 scrollbar-hide">
                            {[
                                { label: "Username", id: "username", val: username, set: setUsername, type: "text", icon: "👤" },
                                { label: "Password", id: "password", val: password, set: setPassword, type: "password", icon: "🔑" },
                                { label: "Full Name", id: "name", val: name, set: setName, type: "text", icon: "📝" },
                                { label: "Customer ID", id: "customerNumber", val: customerNumber, set: setCustomerNumber, type: "text", icon: "🆔" },
                                { label: "Phone", id: "phone", val: phone, set: setPhone, type: "text", icon: "📞" },
                                { label: "Address", id: "address", val: address, set: setAddress, type: "text", icon: "🏠" },
                            ].map((field) => (
                                <div key={field.id} className="space-y-1.5">
                                    <Label htmlFor={field.id} className="text-xs font-bold text-slate-400 uppercase ml-2">
                                        {field.label}
                                    </Label>
                                    <div className="relative group">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 grayscale group-focus-within:grayscale-0 transition-all">
                                            {field.icon}
                                        </span>
                                        <Input
                                            id={field.id}
                                            type={field.type}
                                            value={field.val}
                                            onChange={(e) => field.set(e.target.value)}
                                            required={field.id !== "phone" && field.id !== "address"}
                                            className="pl-12 rounded-2xl border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-sky-100 transition-all py-6"
                                        />
                                    </div>
                                </div>
                            ))}

                            <div className="space-y-1.5">
                                <Label htmlFor="service" className="text-xs font-bold text-slate-400 uppercase ml-2">Service</Label>
                                <select
                                    id="service"
                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-3.5 text-sm focus:ring-4 focus:ring-sky-100 outline-none transition-all"
                                    value={serviceId}
                                    onChange={(e) => setServiceId(Number(e.target.value))}
                                    required
                                >
                                    <option value="">Select Service Type</option>
                                    {serviceData.map((service) => (
                                        <option key={service.id} value={service.id}>{service.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <DialogFooter className="mt-8 gap-3 sm:justify-center">
                            <DialogClose asChild>
                                <Button variant="ghost" type="button" disabled={loading} className="rounded-2xl px-6 font-semibold">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                disabled={loading}
                                className="bg-sky-500 hover:bg-sky-600 text-white rounded-2xl px-10 font-bold shadow-lg shadow-sky-200"
                            >
                                {loading ? "✨ Saving..." : "Save Data"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddCustomer;