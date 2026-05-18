"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, ChevronDown } from "lucide-react";

export default function AddBill({ customers, token }: { customers: any[], token: string | undefined }) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const currentYear = new Date().getFullYear();

    const months = [
        { value: "1", label: "January" }, { value: "2", label: "February" },
        { value: "3", label: "March" }, { value: "4", label: "April" },
        { value: "5", label: "May" }, { value: "6", label: "June" },
        { value: "7", label: "July" }, { value: "8", label: "August" },
        { value: "9", label: "September" }, { value: "10", label: "October" },
        { value: "11", label: "November" }, { value: "12", label: "December" },
    ];

    const years = Array.from({ length: 5 }, (_, i) => (currentYear - 2 + i).toString());

    const [form, setForm] = useState({
        customer_id: "",
        month: "",
        year: currentYear.toString(),
        usage_value: "",
        measurement_number: ""
    });

    const save = async () => {
        // Validasi input
        if (!form.customer_id || !form.month || !form.usage_value || !form.measurement_number) {
            alert("Please complete all fields!");
            return;
        }

        // Validasi Token
        if (!token) {
            alert("Session expired. Please re-login.");
            return;
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/bills`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || "",
                    "Authorization": `Bearer ${token}` // Spasi setelah Bearer sangat krusial
                },
                body: JSON.stringify({
                    customer_id: Number(form.customer_id),
                    month: Number(form.month),
                    year: Number(form.year),
                    usage_value: Number(form.usage_value),
                    measurement_number: form.measurement_number
                })
            });

            const result = await res.json();

            if (res.ok) {
                setOpen(false);
                router.refresh();
                alert("Bill generated successfully!");
            } else {
                // Ini akan menangkap pesan "Unknown Admin" dari backend
                alert(`Error ${res.status}: ${result.message}`);
            }
        } catch (error) {
            alert("Network error. Please check your connection.");
        }
    };

    const CustomSelect = ({ label, value, onChange, options, placeholder }: any) => (
        <div className="space-y-2 flex-1">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-[0.2em]">{label}</label>
            <div className="relative group">
                <select
                    className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold outline-none focus:ring-2 ring-purple-500 transition-all appearance-none cursor-pointer text-slate-700 pr-10"
                    value={value}
                    onChange={onChange}
                >
                    {placeholder && <option value="">{placeholder}</option>}
                    {options.map((opt: any) => (
                        <option key={opt.value || opt} value={opt.value || opt}>{opt.label || opt}</option>
                    ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-focus-within:text-purple-500">
                    <ChevronDown size={18} strokeWidth={3} />
                </div>
            </div>
        </div>
    );

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-[#5B21B6] hover:bg-[#4C1D95] text-white rounded-2xl px-6 py-6 shadow-lg flex gap-2 font-bold transition-all active:scale-95">
                    <Plus size={18} /> New Invoice
                </Button>
            </DialogTrigger>
            <DialogContent className="rounded-[2.5rem] p-10 max-w-md border-none shadow-2xl">
                <DialogHeader>
                    <DialogTitle className="text-3xl font-black text-slate-800 tracking-tight">Add New Bill</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 mt-6">
                    <CustomSelect
                        label="Customer"
                        value={form.customer_id}
                        placeholder="Select Customer"
                        options={customers.map(c => ({ value: c.id, label: c.name }))}
                        onChange={(e: any) => setForm({ ...form, customer_id: e.target.value })}
                    />
                    <div className="flex gap-4">
                        <CustomSelect
                            label="Month"
                            value={form.month}
                            placeholder="Select Month"
                            options={months}
                            onChange={(e: any) => setForm({ ...form, month: e.target.value })}
                        />
                        <CustomSelect
                            label="Year"
                            value={form.year}
                            options={years}
                            onChange={(e: any) => setForm({ ...form, year: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-[0.2em]">Measurement Number</label>
                        <Input
                            type="text"
                            placeholder="Enter measurement number..."
                            className="rounded-2xl bg-slate-50 border-2 border-slate-100 py-6 font-bold focus:ring-2 ring-purple-500 transition-all outline-none"
                            value={form.measurement_number}
                            onChange={e => setForm({ ...form, measurement_number: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-[0.2em]">Usage Value (m³)</label>
                        <Input
                            type="number"
                            placeholder="0"
                            className="rounded-2xl bg-slate-50 border-2 border-slate-100 py-8 text-2xl font-black text-[#5B21B6] focus:ring-2 ring-purple-500 transition-all outline-none"
                            value={form.usage_value}
                            onChange={e => setForm({ ...form, usage_value: e.target.value })}
                        />
                    </div>
                    <Button onClick={save} className="w-full bg-slate-900 hover:bg-black text-white py-8 rounded-2xl font-black text-lg mt-4 shadow-xl">
                        Generate Bill
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}