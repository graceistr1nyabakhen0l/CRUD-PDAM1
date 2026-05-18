import { getCookies } from "@/lib/server-cookie"
import { Admin } from "@/app/types"
import Search from "@/components/search"
import Pagination from "@/components/pagination"
import EditAdmin from "./edit"
import DeleteAdmin from "./delete"
import AddAdmin from "./add"
import ResetPasswordAdmin from "./reset"
import { Phone, ShieldCheck, Leaf, Fingerprint, Compass, Info, Zap } from "lucide-react"

type ResultData = {
    success: boolean
    message: string
    data: Admin[]
    count: number
}

async function getAdmins(
    page: number,
    quantity: number,
    search: string
): Promise<ResultData> {

    try {

        const token = await getCookies("accessToken")

        const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/admins?page=${page}&quantity=${quantity}&search=${search}`

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || "",
                Authorization: `Bearer ${token}`
            },
            cache: "no-store"
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
            message: "Failed to fetch admins",
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

export default async function AdminPage(props: Props) {
    const page = (await props.searchParams)?.page || 1;
    const quantity = (await props.searchParams)?.quantity || 5;
    const search = (await props.searchParams)?.search || "";

    const { count, data: admins } = await getAdmins(page, quantity, search);

    return (
        <div className="w-full min-h-screen p-10 flex justify-center items-start bg-[#F4F5F0] animate-in fade-in duration-1000 relative overflow-hidden font-sans">
            
            {/* Dekorasi Siluet Organik */}
            <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-emerald-100/30 rounded-full blur-[150px] -z-10"></div>
            <div className="absolute bottom-[-10%] right-0 w-[500px] h-[500px] bg-slate-200/40 rounded-full blur-[120px] -z-10"></div>

            {/* CONTAINER UTAMA */}
            <div className="relative w-full max-w-7xl rounded-[3rem] overflow-hidden bg-white shadow-[0_40px_100px_rgba(20,40,30,0.08)] border border-emerald-50 z-10">

                {/* HEADER - EMERALD GRADIENT */}
                <div className="h-64 bg-[#062C24] p-16 flex items-center justify-between relative overflow-hidden">
                    {/* Subtle Noise Texture Overlay */}
                    <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
                    
                    <div className="flex items-center gap-10 relative z-10">
                        <div className="w-28 h-28 bg-emerald-900/50 backdrop-blur-xl rounded-[2.5rem] flex items-center justify-center border border-emerald-700/30 shadow-2xl rotate-6 group-hover:rotate-0 transition-all duration-700">
                            <Fingerprint className="text-emerald-400 group-hover:text-emerald-300 transition-colors" size={48} />
                        </div>
                        <div>
                            <div className="flex items-center gap-4">
                                <h1 className="text-5xl font-serif font-medium text-emerald-50 tracking-tight">
                                    Admin <span className="italic font-light opacity-60">Directory</span>
                                </h1>
                            </div>
                            <div className="flex items-center gap-3 mt-3">
                                <Leaf className="text-emerald-500" size={16} />
                                <p className="text-emerald-300/60 text-[11px] font-bold tracking-[0.4em] uppercase">
                                    Organic Intelligence System
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="hidden xl:flex flex-col items-end gap-2 relative z-10">
                        <div className="px-6 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                            <p className="text-emerald-400 text-[10px] font-black tracking-widest uppercase">Encryption Active</p>
                        </div>
                        <p className="text-emerald-700 text-xs italic font-serif opacity-80">"Precision in every detail"</p>
                    </div>
                </div>

                {/* AREA KONTEN UTAMA */}
                <div className="mx-12 -mt-14 mb-14 bg-white rounded-[3rem] p-14 relative z-10 shadow-2xl border border-emerald-50/50">

                    {/* TOP ACTIONS */}
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-10 mb-16">
                        <div className="w-full max-w-xl group">
                            <p className="ml-6 mb-3 text-[10px] font-black text-emerald-800/30 uppercase tracking-[0.3em]">Quick Search</p>
                            <div className="p-1.5 bg-[#F9FAF7] rounded-[2rem] border border-emerald-100/50 focus-within:ring-4 focus-within:ring-emerald-50 transition-all duration-500">
                                <Search url="/admin/admin" search={search} />
                            </div>
                        </div>
                        <div className="shrink-0 flex items-center gap-6">
                            <div className="text-right hidden sm:block">
                                <p className="text-emerald-900 font-bold text-sm">New Entry</p>
                                <p className="text-slate-400 text-[10px] uppercase tracking-widest">Register Personnel</p>
                            </div>
                            <AddAdmin />
                        </div>
                    </div>

                    {/* LIST TABLE */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-emerald-50">
                                    <th className="px-8 py-6 w-24 text-emerald-800/20 text-[11px] font-black tracking-widest uppercase">Ref.</th>
                                    <th className="px-8 py-6 text-emerald-800/40 text-[11px] font-black tracking-widest uppercase">The Administrator</th>
                                    <th className="px-8 py-6 text-emerald-800/40 text-[11px] font-black tracking-widest uppercase">Communication</th>
                                    <th className="px-8 py-6 text-center text-emerald-800/40 text-[11px] font-black tracking-widest uppercase">Action Room</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-emerald-50/30">
                                {admins.map((admin, index) => {
                                    const initial = admin.name?.charAt(0).toUpperCase() || "A";
                                    return (
                                        <tr key={admin.id} className="group hover:bg-[#F9FAF7] transition-all duration-500">
                                            <td className="px-8 py-10">
                                                <span className="text-xs font-serif italic text-emerald-200 group-hover:text-emerald-500 transition-colors">
                                                    00{(page - 1) * quantity + index + 1}
                                                </span>
                                            </td>
                                            <td className="px-8 py-10">
                                                <div className="flex items-center gap-7">
                                                    <div className="w-16 h-16 rounded-[2rem] bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 font-serif italic text-2xl group-hover:bg-emerald-900 group-hover:text-emerald-50 transition-all duration-700 shadow-sm">
                                                        {initial}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-emerald-950 text-xl tracking-tight leading-none group-hover:translate-x-1 transition-transform">
                                                            {admin.name}
                                                        </p>
                                                        <div className="flex items-center gap-2 mt-2 bg-emerald-50/50 w-fit px-2 py-0.5 rounded-full">
                                                            <Zap size={10} className="text-emerald-500" />
                                                            <span className="text-[9px] font-black text-emerald-700/40 uppercase tracking-widest">Access: Level 1</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-10">
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-2 text-slate-500">
                                                        <Phone size={14} className="text-emerald-200" />
                                                        <span className="text-sm font-medium tracking-tight italic">{admin.phone}</span>
                                                    </div>
                                                    <p className="text-[9px] text-slate-300 uppercase tracking-tighter ml-6">Global Contact Number</p>
                                                </div>
                                            </td>
                                            <td className="px-8 py-10">
                                                <div className="flex gap-4 justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                                                    <div className="flex items-center gap-2 p-1.5 bg-white rounded-2xl shadow-lg border border-emerald-50">
                                                        <EditAdmin selectedData={admin} />
                                                        <DeleteAdmin selectedData={admin} />
                                                        <ResetPasswordAdmin id={admin.id} name={admin.name} />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* PAGINATION */}
                    <div className="mt-20 flex flex-col sm:flex-row justify-between items-center gap-8 pt-10 border-t border-emerald-50">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-900 flex items-center justify-center shadow-lg">
                                <Compass className="text-emerald-400 animate-spin-slow" size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Data Navigation</p>
                                <p className="text-sm font-bold text-emerald-900 italic font-serif">Result: {count} Total Entries</p>
                            </div>
                        </div>
                        <div className="bg-[#F9FAF7] p-2 rounded-[2rem] border border-emerald-50 shadow-inner">
                            <Pagination count={count} currentPage={page} perPage={quantity} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}