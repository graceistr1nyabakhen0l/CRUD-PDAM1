import { getCookies } from "@/lib/server-cookie";
import { customer, Services } from "@/app/types";
import AddCustomer from "./add";
import EditCustomer from "./edit";
import DeleteCustomer from "./delete";
import Search from "@/components/search";
import Pagination from "@/components/pagination";
import ResetPassword from "./reset";
import { MapPin, Phone, User, ShieldCheck, Leaf, Fingerprint, Compass, Zap } from "lucide-react";

// --- 1. DEFINISI TIPE DATA (Agar TypeScript tidak error) ---
type ResultData = {
    success: boolean;
    message: string;
    data: customer[];
    count: number;
};

type ServiceData = {
    success: boolean;
    message: string;
    data: Services[];
    count: number;
};

// --- 2. FUNGSI AMBIL DATA DARI API (Backend) ---

// Fungsi mengambil daftar Customer
async function getCustomers(page: number, quantity: number, search: string): Promise<ResultData> {
    try {
        const token = await getCookies("accessToken");
        const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/customers?page=${page}&quantity=${quantity}&search=${search}`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || "",
                Authorization: `Bearer ${token}`
            },
            cache: "no-store",
        });

        const responseData: ResultData = await response.json();
        if (!response.ok) return { success: false, message: responseData.message, data: [], count: 0 };
        return responseData;
    } catch (error) {
        return { success: false, message: "Gagal terhubung ke server", data: [], count: 0 };
    }
}

// Fungsi mengambil daftar Layanan (untuk dropdown di tambah customer)
async function getServices(): Promise<Services[]> {
    try {
        const token = await getCookies("accessToken");
        const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/services?quantity=1000`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || "",
                Authorization: `Bearer ${token}`
            },
            cache: "no-store",
        });

        const responseData: ServiceData = await response.json();
        return response.ok ? responseData.data : [];
    } catch (error) {
        return [];
    }
}

// --- 3. KOMPONEN UTAMA HALAMAN ---
type Props = {
    searchParams: Promise<{
        page?: number;
        quantity?: number;
        search?: string;
    }>;
};

export default async function CustomersPage(props: Props) {
    const params = await props.searchParams;
    const page = params?.page || 1;
    const quantity = params?.quantity || 6;
    const search = params?.search || "";

    const { count: totalData, data: customers } = await getCustomers(page, quantity, search);
    const services = await getServices();

    return (
        // Latar belakang Soft Linen (#F4F5F0)
        <div className="w-full p-10 bg-[#F4F5F0] min-h-screen animate-in fade-in duration-1000 relative overflow-hidden font-sans">
            
            {/* Dekorasi Organik Background */}
            <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-emerald-100/30 rounded-full blur-[120px] -z-10 animate-pulse"></div>

            {/* CONTAINER UTAMA */}
            <div className="relative w-full max-w-7xl mx-auto rounded-[3rem] overflow-hidden bg-white shadow-[0_40px_100px_rgba(20,40,30,0.08)] border border-emerald-50 z-10">

                {/* HEADER - DEEP EMERALD */}
                <div className="h-64 bg-[#062C24] p-16 flex items-center justify-between relative overflow-hidden">
                    {/* Texture Overlay */}
                    <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
                    
                    <div className="flex items-center gap-8 relative z-10">
                        <div className="w-24 h-24 bg-emerald-900/50 backdrop-blur-xl rounded-[2.5rem] flex items-center justify-center border border-emerald-700/30 shadow-2xl rotate-6 group-hover:rotate-0 transition-all duration-700">
                            <Fingerprint className="text-emerald-400" size={44} />
                        </div>
                        <div>
                            <div className="flex items-center gap-4">
                                <h1 className="text-5xl font-serif font-medium text-emerald-50 tracking-tight">
                                    Customer <span className="italic font-light opacity-60">Directory</span>
                                </h1>
                            </div>
                            <div className="flex items-center gap-3 mt-3">
                                <Leaf className="text-emerald-500" size={16} />
                                <p className="text-emerald-300/60 text-[11px] font-bold tracking-[0.4em] uppercase">
                                    {totalData} Registered Personnel
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="hidden xl:flex flex-col items-end gap-2 relative z-10">
                        <div className="px-6 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20 backdrop-blur-md">
                            <p className="text-emerald-400 text-[10px] font-black tracking-widest uppercase">Encryption Active</p>
                        </div>
                    </div>
                </div>

                 {/* AREA KONTEN UTAMA */}
                <div className="mx-12 -mt-14 mb-14 bg-white rounded-[3rem] p-14 relative z-10 shadow-2xl border border-emerald-50/50">


                    {/* SEARCH & ACTION BAR */}
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-10 mb-16 pb-10 border-b border-emerald-50/50">
                        <div className="w-full max-w-xl">
                            <p className="ml-6 mb-3 text-[10px] font-black text-emerald-800/30 uppercase tracking-[0.3em]">Identity Search</p>
                            <div className="p-1.5 bg-[#F9FAF7] rounded-[2rem] border border-emerald-100/50 focus-within:ring-4 focus-within:ring-emerald-50 transition-all duration-500">
                                <Search url="/admin/customer" search={search} />
                            </div>
                        </div>
                        <div className="shrink-0 scale-125 mr-6">
                            <AddCustomer serviceData={services} />
                        </div>
                    </div>

                    {/* GRID DAFTAR CUSTOMER */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
                        {customers.map((item: customer) => (
                            <div key={item.id} className="group p-1.5 bg-[#F9FAF7] rounded-[2.5rem] border border-emerald-100/30 hover:bg-white hover:shadow-[0_30px_60px_rgba(6,44,36,0.1)] transition-all duration-700">
                                <div className="p-8">
                                    
                                    {/* Top Row: Personnel Identity */}
                                    <div className="flex justify-between items-start mb-10">
                                        <div className="flex items-center gap-6">
                                            <div className="h-16 w-16 rounded-[2rem] bg-emerald-900 flex items-center justify-center text-emerald-50 font-serif italic text-2xl shadow-lg group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500">
                                                {item.name.substring(0, 1).toUpperCase()}
                                            </div>
                                            <div>
                                                <h2 className="font-bold text-emerald-950 text-xl tracking-tight leading-none">
                                                    {item.name}
                                                </h2>
                                                <div className="flex items-center gap-1.5 mt-2 opacity-40 group-hover:opacity-100 transition-opacity">
                                                    <ShieldCheck size={12} className="text-emerald-600" />
                                                    <p className="text-[9px] text-emerald-800 font-black uppercase tracking-widest">Master Key Access</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Data Rows: Elegant & Clean */}
                                    <div className="space-y-5">
                                        <div className="flex items-center justify-between py-1 group/row">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover/row:bg-emerald-500 transition-colors">
                                                    <User size={12} className="text-emerald-800 group-hover/row:text-white" />
                                                </div>
                                                <span className="text-[10px] font-black text-emerald-900/20 uppercase tracking-widest">Username</span>
                                            </div>
                                            <span className="text-sm font-bold text-emerald-950/70 tracking-tight">@{item.user.username}</span>
                                        </div>

                                        <div className="flex items-center justify-between py-1 group/row">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover/row:bg-emerald-500 transition-colors">
                                                    <Phone size={12} className="text-emerald-800 group-hover/row:text-white" />
                                                </div>
                                                <span className="text-[10px] font-black text-emerald-900/20 uppercase tracking-widest">Channel</span>
                                            </div>
                                            <span className="text-sm font-bold text-emerald-950/70 tracking-tight italic">{item.phone}</span>
                                        </div>

                                        <div className="flex items-center justify-between py-1 group/row">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover/row:bg-emerald-500 transition-colors">
                                                    <MapPin size={12} className="text-emerald-800 group-hover/row:text-white" />
                                                </div>
                                                <span className="text-[10px] font-black text-emerald-900/20 uppercase tracking-widest">Domain</span>
                                            </div>
                                            <span className="text-xs font-medium text-emerald-950/50 line-clamp-1 max-w-[140px] italic">
                                                {item.address}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Footer Actions: Floating Style */}
                                    <div className="mt-10 flex justify-center gap-3 py-3 px-2 bg-white rounded-3xl border border-emerald-50 shadow-sm opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                        <ResetPassword selectedData={item} />
                                        <div className="w-[1px] h-4 bg-emerald-50 self-center"></div>
                                        <EditCustomer selectedData={item} />
                                        <div className="w-[1px] h-4 bg-emerald-50 self-center"></div>
                                        <DeleteCustomer selectedData={item} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* PAGINATION EXECUTIVE STYLE */}
                    <div className="mt-20 flex flex-col sm:flex-row justify-between items-center gap-8 pt-10 border-t border-emerald-50">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-900 flex items-center justify-center shadow-lg">
                                <Compass className="text-emerald-400 animate-spin-slow" size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Archive Navigation</p>
                                <p className="text-sm font-bold text-emerald-900 italic font-serif leading-none">Record of {totalData} Entries</p>
                            </div>
                        </div>
                        <div className="bg-[#F9FAF7] p-2 rounded-[2rem] border border-emerald-50 shadow-inner">
                            <Pagination count={totalData} currentPage={page} perPage={quantity} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}