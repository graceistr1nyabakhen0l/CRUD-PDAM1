import { Services } from "@/app/types";
import { getCookies } from "@/lib/server-cookie";
import AddService from "./add";
import DeleteService from "./delete";
import EditService from "./edit";
import Search from "@/components/search";
import Pagination from "@/components/pagination";
import { ArrowUpRight, Leaf, Package, Tag, Fingerprint, Gem, Activity, Sparkles } from "lucide-react";

type ResultData = {
    success: boolean
    message: string
    data: Services[]
    count: number
}

async function getServices(
    page: number,
    quantity: number,
    search: string
): Promise<ResultData> {

    try {

        const token = await getCookies("accessToken")

        const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/services?page=${page}&quantity=${quantity}&search=${search}`

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || "",
                Authorization: `Bearer ${token}`
            },
            cache: "no-store",
        })

        const responseData: ResultData = await response.json()

        if (!response.ok) {

            return {
                success: false,
                message: responseData.message,
                data: [],
                count: 0
            }

        }

        return responseData

    } catch (error) {

        console.error(error)

        return {
            success: false,
            message: "Failed to fetch services",
            data: [],
            count: 0
        }

    }

}

type Props = {
    searchParams: Promise<{
        page?: number
        quantity?: number
        search?: string
    }>
}

export default async function ServicesPage(props: Props) {
    const page = (await props.searchParams)?.page || 1;
    const quantity = (await props.searchParams)?.quantity || 6;
    const search = (await props.searchParams)?.search || "";

    const { count: counts, data: services } = await getServices(page, quantity, search);

    return (
        <div className="w-full p-10 animate-in fade-in duration-1000 bg-[#F4F5F0] min-h-screen relative overflow-hidden font-sans">
            
            {/* Background Decor - Organic Glow */}
            <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-emerald-100/30 rounded-full blur-[120px] -z-10"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-slate-200/40 rounded-full blur-[100px] -z-10"></div>

            {/* MAIN CONTAINER */}
            <div className="relative w-full max-w-7xl mx-auto rounded-[3rem] overflow-hidden bg-white shadow-[0_40px_100px_rgba(20,40,30,0.08)] border border-emerald-50 z-10">

                {/* HEADER - DEEP EMERALD */}
                <div className="h-64 bg-[#062C24] p-16 flex items-center justify-between relative overflow-hidden">
                    {/* Subtle Stardust Pattern */}
                    <div className="absolute inset-0 opacity-[0.04] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
                    
                    <div className="flex items-center gap-10 relative z-10">
                        <div className="w-24 h-24 bg-emerald-900/50 backdrop-blur-xl rounded-[2.5rem] flex items-center justify-center border border-emerald-700/30 shadow-2xl rotate-6 group-hover:rotate-0 transition-all duration-700">
                            <Gem className="text-emerald-400" size={40} />
                        </div>
                        <div>
                            <h1 className="text-5xl font-serif font-medium text-emerald-50 tracking-tight">
                                Service <span className="italic font-light opacity-60">Portfolio</span>
                            </h1>
                            <div className="flex items-center gap-3 mt-3">
                                <Leaf className="text-emerald-500" size={16} />
                                <p className="text-emerald-300/60 text-[11px] font-bold tracking-[0.4em] uppercase">
                                    {counts} Tiered Solutions Available
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="hidden lg:block relative z-10">
                        <div className="px-6 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20 backdrop-blur-md">
                            <p className="text-emerald-400 text-[10px] font-black tracking-widest uppercase flex items-center gap-2">
                                <Sparkles size={12} /> Premium Catalog
                            </p>
                        </div>
                    </div>
                </div>

                {/* AREA KONTEN UTAMA */}
                <div className="mx-12 -mt-14 mb-14 bg-white rounded-[3rem] p-14 relative z-10 shadow-2xl border border-emerald-50/50">

                    {/* SEARCH & ACTION BAR */}
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-10 mb-16 pb-10 border-b border-emerald-50/50">
                        <div className="w-full max-w-xl group">
                            <p className="ml-6 mb-3 text-[10px] font-black text-emerald-800/30 uppercase tracking-[0.3em]">Directory Filter</p>
                            <div className="p-1.5 bg-[#F9FAF7] rounded-[2rem] border border-emerald-100/50 focus-within:ring-4 focus-within:ring-emerald-50 transition-all duration-500">
                                <Search url="/admin/services" search={search} />
                            </div>
                        </div>
                        <div className="shrink-0 scale-125 mr-6">
                            <AddService />
                        </div>
                    </div>

                    {/* CONTENT SECTION */}
                    {services.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-32 bg-[#F9FAF7] rounded-[3rem] border-2 border-dashed border-emerald-100">
                            <Package className="w-16 h-16 text-emerald-100 mb-4" />
                            <p className="text-emerald-900/30 font-serif italic text-xl">The catalog is currently empty.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {services.map((service) => (
                                <div
                                    key={service.id}
                                    className="group relative bg-[#F9FAF7] rounded-[2.5rem] border border-emerald-100/30 p-10 hover:bg-white hover:shadow-[0_30px_60px_rgba(6,44,36,0.1)] transition-all duration-700"
                                >
                                    {/* Action Float Bar (Top Right) */}
                                    <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-[-10px] group-hover:translate-y-0">
                                        <div className="flex p-1.5 bg-white rounded-2xl shadow-sm border border-emerald-50">
                                            <EditService selectedData={service} />
                                            <DeleteService selectedData={service} />
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <div className="flex items-center gap-3 mb-8">
                                            <div className="w-10 h-10 rounded-2xl bg-emerald-900 flex items-center justify-center text-emerald-400 shadow-lg">
                                                <Tag size={18} />
                                            </div>
                                            <span className="text-[10px] font-black text-emerald-800/40 uppercase tracking-[0.2em]">Asset #{service.id.toString().padStart(3, '0')}</span>
                                        </div>

                                        <h3 className="text-2xl font-bold text-emerald-950 mb-8 tracking-tight font-serif italic">
                                            {service.name}
                                        </h3>

                                        <div className="space-y-8">
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-xs font-serif italic text-emerald-600">IDR</span>
                                                <span className="text-5xl font-light text-emerald-950 leading-none tracking-tighter">
                                                    {service.price.toLocaleString()}
                                                </span>
                                            </div>

                                            {/* Capacity Pills */}
                                            <div className="flex gap-3 pt-4">
                                                <div className="flex-1 bg-white p-4 rounded-[1.5rem] border border-emerald-50 shadow-sm">
                                                    <p className="text-[8px] font-black text-emerald-800/30 uppercase tracking-widest mb-1">Min</p>
                                                    <p className="font-bold text-emerald-950 text-base">{service.min_usage}</p>
                                                </div>
                                                <div className="flex-1 bg-white p-4 rounded-[1.5rem] border border-emerald-50 shadow-sm">
                                                    <p className="text-[8px] font-black text-emerald-800/30 uppercase tracking-widest mb-1">Max</p>
                                                    <p className="font-bold text-emerald-950 text-base">{service.max_usage}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Indicator */}
                                        <div className="mt-10 pt-6 border-t border-emerald-50 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Activity size={14} className="text-emerald-500" />
                                                <span className="text-[10px] font-black text-emerald-800/20 uppercase tracking-widest">Active Tier</span>
                                            </div>
                                            <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-900 group-hover:text-white transition-all duration-500">
                                                <ArrowUpRight size={16} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* PAGINATION */}
                    <div className="mt-20 flex flex-col sm:flex-row justify-between items-center gap-8 pt-10 border-t border-emerald-50">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-900 flex items-center justify-center shadow-lg">
                                <Fingerprint className="text-emerald-400" size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">System Archive</p>
                                <p className="text-sm font-bold text-emerald-900 italic font-serif">Total {counts} Entries</p>
                            </div>
                        </div>
                        <div className="bg-[#F9FAF7] p-2 rounded-[2rem] border border-emerald-50 shadow-inner">
                            <Pagination count={counts} currentPage={page} perPage={quantity} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}