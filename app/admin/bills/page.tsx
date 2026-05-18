import { getCookies } from "@/lib/server-cookie";
import { Bill } from "@/app/types";
import AddBill from "./add";
import EditBill from "./edit";
import DeleteBill from "./delete";
import Search from "@/components/search";
import Pagination from "@/components/pagination";
import { CreditCard, CheckCircle2, Timer, Wallet, Leaf, Sparkles, Activity, Gem, ChevronRight, Fingerprint } from "lucide-react";
import VerifyBill from "./verify";
import FilterStatus from "./filter";
import Link from "next/link";

async function getBills(page: number, quantity: number, search: string) {
    const token = await getCookies("accessToken");
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/bills?page=${page}&quantity=${quantity}&search=${search}`, {
        headers: {
            "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || "",
            Authorization: `Bearer ${token}`
        },
        cache: "no-store"
    });
    return res.json();
}

async function getCustomers() {
    const token = await getCookies("accessToken");
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/customers?quantity=1000`, {
        headers: {
            "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || "",
            Authorization: `Bearer ${token}`
        },
    });
    const result = await res.json();
    return result.data || [];
}

export default async function BillsPage({ searchParams }: any) {
    const params = await searchParams;
    const page = Number(params?.page) || 1;
    const search = params?.search || "";
    const status = params?.status || "";

    const [billsData, customers] = await Promise.all([
        getBills(page, 10, search),
        getCustomers()
    ]);

    const allBills = billsData?.data || [];
    const bills = allBills.filter((item: Bill) => {
        if (status === "paid") return item.paid === true;
        if (status === "unpaid") return item.paid === false && (!item.payments);
        if (status === "pending") return item.paid === false && (item.payments);
        return true;
    });

    const count = billsData?.count || 0;
    const token = await getCookies("accessToken");

    const totalIncome = allBills
        .filter((b: any) => b.paid)
        .reduce((acc: number, curr: any) => acc + (Number(curr.amount) || 0), 0);

    return (
        <div className="w-full min-h-screen p-10 bg-[#F4F5F0] animate-in fade-in duration-1000 relative overflow-hidden font-sans">
            
            {/* Background Decor - Organic Glow */}
            <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-emerald-100/30 rounded-full blur-[120px] -z-10"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-slate-200/40 rounded-full blur-[100px] -z-10"></div>
            
            {/* MAIN CONTAINER */}
            <div className="relative w-full max-w-7xl mx-auto rounded-[3rem] overflow-hidden bg-white shadow-[0_40px_100px_rgba(20,40,30,0.08)] border border-emerald-50 z-10">
                
                {/* HEADER SECTION - DEEP EMERALD */}
                <div className="h-64 bg-[#062C24] p-16 flex items-start justify-between relative overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.04] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
                    
                    <div className="flex items-center gap-8 relative z-10">
                        <div className="w-20 h-20 bg-emerald-900/50 backdrop-blur-xl rounded-[2rem] flex items-center justify-center border border-emerald-700/30 shadow-2xl rotate-3">
                            <CreditCard className="text-emerald-400" size={32} />
                        </div>
                        <div>
                            <h1 className="text-5xl font-serif font-medium text-emerald-50 tracking-tight">
                                Bills <span className="italic font-light opacity-60">Ledger</span>
                            </h1>
                            <div className="flex items-center gap-3 mt-3">
                                <Leaf className="text-emerald-500" size={14} />
                                <p className="text-emerald-300/60 text-[11px] font-bold tracking-[0.4em] uppercase">
                                    Financial Asset Monitoring
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="hidden lg:block relative z-10">
                        <div className="px-6 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20 backdrop-blur-md">
                            <p className="text-emerald-400 text-[10px] font-black tracking-widest uppercase flex items-center gap-2">
                                <Sparkles size={12} /> Treasury System
                            </p>
                        </div>
                    </div>
                </div>

                {/* CONTENT AREA */}
                <div className="mt-[-80px] mx-12 mb-14 bg-white rounded-[3rem] p-12 relative z-10 shadow-2xl border border-emerald-50/50">
                    
                    {/* STATS CARDS */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        <div className="bg-[#F9FAF7] p-8 rounded-[2rem] border border-emerald-100/50 flex items-center gap-6 group hover:bg-white hover:shadow-xl transition-all duration-500">
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm text-emerald-800/30 group-hover:scale-110 transition-transform">
                                <Timer className="w-8 h-8" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-emerald-800/40 uppercase tracking-widest mb-1">Awaiting</p>
                                <p className="text-4xl font-serif font-bold text-emerald-950">{allBills.filter((b: any) => !b.paid).length}</p>
                            </div>
                        </div>
                        <div className="bg-[#F9FAF7] p-8 rounded-[2rem] border border-emerald-100/50 flex items-center gap-6 group hover:bg-white hover:shadow-xl transition-all duration-500">
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm text-emerald-500 group-hover:scale-110 transition-transform">
                                <CheckCircle2 className="w-8 h-8" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-emerald-800/40 uppercase tracking-widest mb-1">Cleared</p>
                                <p className="text-4xl font-serif font-bold text-emerald-950">{allBills.filter((b: any) => b.paid).length}</p>
                            </div>
                        </div>
                        <div className="bg-[#062C24] p-8 rounded-[2rem] flex items-center gap-6 shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Gem size={80} className="text-white" />
                            </div>
                            <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg relative z-10 group-hover:rotate-12 transition-transform">
                                <Wallet className="w-8 h-8 text-[#062C24]" />
                            </div>
                            <div className="relative z-10">
                                <p className="text-[10px] font-black text-emerald-400/60 uppercase tracking-widest mb-1">Total Revenue</p>
                                <p className="text-2xl font-bold text-white tracking-tighter">Rp {totalIncome.toLocaleString('id-ID')}</p>
                            </div>
                        </div>
                    </div>

                    {/* SEARCH & FILTER */}
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mb-12 pb-10 border-b border-emerald-50/50">
                        <div className="flex flex-col md:flex-row items-center gap-5 w-full max-w-3xl">
                            <div className="flex-1 w-full p-1.5 bg-[#F9FAF7] rounded-[2rem] border border-emerald-100/50">
                                <Search url="/admin/bills" search={search} />
                            </div>
                            <div className="w-full md:w-auto">
                                <FilterStatus currentStatus={status} />
                            </div>
                        </div>
                        <div className="shrink-0 scale-125 lg:mr-6">
                            <AddBill customers={customers} token={token} />
                        </div>
                    </div>

                    {/* BILLS LIST */}
                    <div className="space-y-6">
                        {bills.length > 0 ? (
                            bills.map((item: Bill) => (
                                <div key={item.id} className="group bg-[#F9FAF7] rounded-[2.5rem] p-8 border border-emerald-100/30 hover:bg-white hover:shadow-[0_20px_40px_rgba(6,44,36,0.06)] transition-all duration-700">
                                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-16 rounded-[1.5rem] bg-[#062C24] flex items-center justify-center font-serif italic text-emerald-400 text-2xl shadow-xl group-hover:scale-105 transition-transform">
                                                {item.customer?.name?.charAt(0).toUpperCase() || "C"}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-emerald-950 tracking-tight font-serif italic">{item.customer?.name}</h3>
                                                <div className="flex items-center gap-3 mt-2">
                                                    <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full tracking-widest border border-emerald-100">
                                                        #{item.measurement_number || '-'}
                                                    </span>
                                                    <span className="text-emerald-100 text-xs">|</span>
                                                    <p className="text-[10px] font-black text-emerald-800/30 uppercase tracking-[0.2em]">
                                                        Period: {item.month}/{item.year}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-10 lg:gap-16">
                                            <div className="hidden sm:block">
                                                <p className="text-[8px] font-black text-emerald-800/20 uppercase tracking-widest mb-1">Volume</p>
                                                <p className="text-base font-bold text-emerald-800 font-serif italic">{item.usage_value} m³</p>
                                            </div>
                                            <div>
                                                <p className="text-[8px] font-black text-emerald-800/20 uppercase tracking-widest mb-1">Total Bill</p>
                                                <p className="text-2xl font-light text-emerald-950 tracking-tighter">Rp {item.amount?.toLocaleString('id-ID')}</p>
                                            </div>

                                            {/* Status Badge */}
                                            <div className={`px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.15em] border transition-all 
                                                ${item.paid
                                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                                                    : (item.payments)
                                                        ? 'bg-amber-50 text-amber-700 border-amber-100'
                                                        : 'bg-white text-slate-400 border-emerald-50 shadow-sm'
                                                }`}>
                                                <span className="flex items-center gap-2">
                                                    <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${item.paid ? 'bg-emerald-500' : (item.payments ? 'bg-amber-500' : 'bg-slate-300')}`}></div>
                                                    {item.paid ? 'Paid' : (item.payments ? 'Pending' : 'Unpaid')}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-3 justify-end lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-500">
                                            {item.paid && (
                                                <Link
                                                    href={`/admin/bills/${item.id}`}
                                                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest px-5 py-3 rounded-2xl bg-[#062C24] text-white hover:bg-emerald-800 transition-all shadow-lg"
                                                >
                                                    Detail <ChevronRight size={14} />
                                                </Link>
                                            )}

                                            {!item.paid && item.payments && (
                                                <VerifyBill selectedData={item} />
                                            )}
                                            <div className="flex items-center gap-1 bg-white p-1.5 rounded-2xl border border-emerald-50 shadow-sm">
                                                <EditBill bill={item} token={token} />
                                                <DeleteBill billId={item.id} token={token} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-32 bg-[#F9FAF7] rounded-[3rem] border-2 border-dashed border-emerald-100 flex flex-col items-center">
                                <Activity className="w-16 h-16 text-emerald-100 mb-4" />
                                <h3 className="text-sm font-black text-emerald-800/20 uppercase tracking-[0.3em]">No Transactions Found</h3>
                            </div>
                        )}
                    </div>

                    {/* PAGINATION SECTION */}
                    <div className="mt-20 flex flex-col sm:flex-row justify-between items-center gap-8 pt-10 border-t border-emerald-50">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-[#062C24] flex items-center justify-center shadow-lg">
                                <Fingerprint className="text-emerald-400" size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Audit Ready</p>
                                <p className="text-sm font-bold text-emerald-950 italic font-serif">Registry: {count} Bills</p>
                            </div>
                        </div>
                        <div className="bg-[#F9FAF7] p-2 rounded-[2rem] border border-emerald-50 shadow-inner">
                            <Pagination count={count} currentPage={page} perPage={10} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}