"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export default function PaymentDetails({ data }: { data: any }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="bg-[#1E1B4B] hover:bg-black text-white rounded-xl font-bold px-8 py-2.5 transition-all tracking-tight active:scale-95">
                    Detail
                </button>
            </DialogTrigger>
            <DialogContent className="rounded-[2.5rem] p-10 border-none shadow-2xl max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black text-slate-800">Payment Details</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                    <div className="flex justify-between border-b pb-2">
                        <span className="text-slate-400 font-bold">Customer</span>
                        <span className="font-black text-slate-800">{data.customer?.name}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                        <span className="text-slate-400 font-bold">Bill ID</span>
                        <span className="font-black text-slate-800">#{data.bill_id}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                        <span className="text-slate-400 font-bold">Total Amount</span>
                        <span className="font-black text-blue-700 text-lg">Rp {data.total_amount?.toLocaleString()}</span>
                    </div>
                    {/* Kamu bisa tambah info lainnya di sini */}
                </div>
            </DialogContent>
        </Dialog>
    );
}