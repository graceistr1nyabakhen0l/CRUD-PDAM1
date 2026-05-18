import { customer } from "@/app/types";
import { getCookies } from "@/lib/server-cookie";
import { getBillsByCustomer } from "@/app/services/bills.customer";
import { BillChart } from "./chart";
import {
    User, Phone, AtSign, MapPin,
    ChevronRight, Camera, Settings, Star, BarChart3
} from "lucide-react";

type ResultData = {
    success: boolean,
    message: string,
    data: customer,
};

async function getCustomerProfile(): Promise<customer | null> {
    try {
        const token = await getCookies("accessToken");
        const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/customers/me`;
        const response = await fetch(url, {
            method: `GET`,
            headers: {
                "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || "",
                "Authorization": `Bearer ${token}`,
            },
            cache: "no-store",
        });
        const responseData: ResultData = await response.json();
        if (!response.ok) return null;
        return responseData.data;
    } catch (error) {
        return null;
    }
}

export default async function CustomerDashboardPage() {
    // Fetch data secara paralel untuk performa lebih baik
    const [customerData, billData] = await Promise.all([
        getCustomerProfile(),
        getBillsByCustomer({ page: 1, quantity: 1000, search: "" })
    ]);

    if (!customerData) return null;

    const initial = customerData.name?.charAt(0).toUpperCase() || "C";

    return (
        <div className="w-full min-h-screen bg-white p-4 md:p-10 font-sans">
            <div className="max-w-6xl mx-auto bg-[#F9F9FF] rounded-[3rem] overflow-hidden shadow-sm border border-slate-100">

                {/* --- HEADER SECTION --- */}
                <div className="bg-gradient-to-r from-[#FDEFF4] via-[#F3E8FF] to-[#E7F0FF] p-8 md:p-12">
                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm text-rose-400">
                            <Settings size={28} />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Customer Dashboard</h1>
                                <Star size={18} className="text-yellow-400 fill-current" />
                            </div>
                            <p className="text-xs font-bold text-rose-300 uppercase tracking-widest mt-1">
                                — Manage profile and track your bills —
                            </p>
                        </div>
                    </div>
                </div>

                {/* --- CONTENT AREA --- */}
                <div className="space-y-6 p-4 md:p-8">

                    {/* 1. Profile Section */}
                    <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-inner-sm border border-slate-50">
                        <div className="max-w-4xl mx-auto">
                            <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
                                <div className="relative">
                                    <div className="w-32 h-32 rounded-[2.5rem] bg-slate-50 border-4 border-white shadow-xl flex items-center justify-center text-5xl font-light text-rose-300">
                                        {initial}
                                    </div>
                                    <button className="absolute -bottom-2 -right-2 bg-white p-2.5 rounded-2xl shadow-md border border-slate-50 text-slate-400 hover:text-rose-400 transition-all">
                                        <Camera size={18} />
                                    </button>
                                </div>
                                <div className="text-center md:text-left">
                                    <h2 className="text-2xl font-bold text-slate-800">{customerData.name}</h2>
                                    <p className="text-slate-400 font-medium italic">@{customerData.user?.username || customerData.username}</p>
                                    <div className="flex gap-3 mt-4">
                                        <span className="px-4 py-1.5 bg-rose-50 text-rose-400 text-[10px] font-bold rounded-full uppercase tracking-wider">Verified Member</span>
                                        <span className="px-4 py-1.5 bg-slate-50 text-slate-400 text-[10px] font-bold rounded-full uppercase tracking-wider">Active</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { label: "Full Name", value: customerData.name, icon: <User size={16} /> },
                                    { label: "Email Address", value: customerData.user?.email || "N/A", icon: <AtSign size={16} /> },
                                    { label: "Phone Number", value: customerData.phone, icon: <Phone size={16} /> },
                                    { label: "Location", value: customerData.address || "No Address Provided", icon: <MapPin size={16} /> },
                                ].map((item, idx) => (
                                    <div key={idx} className="bg-[#FBFBFF] border border-slate-50 p-5 rounded-[2rem] group hover:border-rose-100 transition-all">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="p-2 bg-white rounded-xl text-rose-300 group-hover:text-rose-400 shadow-sm">
                                                {item.icon}
                                            </div>
                                            <ChevronRight size={14} className="text-slate-200" />
                                        </div>
                                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">{item.label}</p>
                                        <p className="text-sm font-bold text-slate-700">{item.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 2. Chart Section (Bill Statistics) */}
                    <div className="bg-white rounded-[2.5rem] p-6 md:p-10 shadow-sm border-t-4 border-t-rose-400">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-rose-50 text-rose-500 rounded-lg">
                                <BarChart3 size={20} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800">Bill Statistics</h3>
                        </div>

                        <div className="w-full">
                            <BillChart data={billData.bills} />
                        </div>

                        {/* Summary Mini Cards (Optional) */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                                <p className="text-[10px] text-slate-400 uppercase font-bold">Total Bills</p>
                                <p className="text-xl font-bold text-slate-700">{billData.counts}</p>
                            </div>
                            {/* Tambahkan card summary lain di sini jika ada */}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export const dynamic = "force-dynamic";