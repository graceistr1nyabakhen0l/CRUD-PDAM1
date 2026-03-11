//menampilkan data
import { Services } from "@/app/types";
import { getCookies } from "@/lib/server-cookie";
import AddService from "./add";
import DeleteService from "./delete";
import EditService from "./edit";
import Search from "@/components/search";
import Pagination from "@/components/pagination";
import { Package, Tag } from "lucide-react";

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

    const page = (await props.searchParams)?.page || 1
    const quantity = (await props.searchParams)?.quantity || 6
    const search = (await props.searchParams)?.search || ""

    const { count: counts, data: services } =
        await getServices(page, quantity, search)

    return (
        <div className="p-6 lg:p-10 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Section - Floating Style */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 bg-gradient-to-r from-orange-50 to-amber-50 p-8 rounded-[2.5rem] border border-orange-100/50 shadow-sm">
                <div className="space-y-2">
                    <h1 className="text-4xl font-black tracking-tight text-slate-800">
                        Daftar <span className="text-orange-500">Layanan</span>
                    </h1>
                    <p className="text-slate-500 flex items-center gap-2 font-medium">
                        Ditemukan <span className="px-3 py-0.5 bg-orange-500 text-white rounded-full text-xs animate-pulse">{counts}</span> jenis jasa tersedia ✨
                    </p>
                </div>
                <AddService />
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10">
                <div className="w-full max-w-md transform transition-all focus-within:scale-105">
                    <Search url="/admin/services" search={search} />
                </div>
            </div>

            {/* Content Section */}
            {services.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-orange-200">
                    <div className="bg-orange-50 p-6 rounded-full mb-4">
                        <Package className="w-12 h-12 text-orange-300 animate-bounce" />
                    </div>
                    <p className="text-slate-400 font-bold text-lg">Oops! Belum ada layanan di sini.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="group relative bg-white rounded-[2.5rem] border border-slate-100 p-7 shadow-xl shadow-slate-200/40 hover:shadow-orange-200/50 transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                        >
                            {/* Decorative background circle */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-50 rounded-full group-hover:scale-150 transition-transform duration-500 opacity-50" />

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-4 bg-orange-500 rounded-2xl text-white shadow-lg shadow-orange-200 group-hover:rotate-6 transition-transform">
                                        <Tag className="w-6 h-6" />
                                    </div>
                                    <div className="flex gap-2">
                                        <EditService selectedData={service} />
                                        <DeleteService selectedData={service} />
                                    </div>
                                </div>

                                <h3 className="text-xl font-extrabold text-slate-800 mb-2 group-hover:text-orange-600 transition-colors">
                                    {service.name}
                                </h3>

                                <div className="space-y-4">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-sm font-bold text-slate-400">Rp</span>
                                        <span className="text-3xl font-black text-slate-900 leading-none">
                                            {service.price.toLocaleString()}
                                        </span>
                                        <span className="text-xs font-medium text-slate-400">/m³</span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-50">
                                        <div className="bg-slate-50 p-3 rounded-2xl text-center group-hover:bg-orange-50 transition-colors">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Min Usage</p>
                                            <p className="font-bold text-slate-700">{service.min_usage}</p>
                                        </div>
                                        <div className="bg-slate-50 p-3 rounded-2xl text-center group-hover:bg-amber-50 transition-colors">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Max Usage</p>
                                            <p className="font-bold text-slate-700">{service.max_usage}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {/* PAGINATION */}
            <div className="my-6 flex justify-center">

                <Pagination
                    count={counts}
                    currentPage={page}
                    perPage={quantity}
                />

            </div>

        </div>
    );
}