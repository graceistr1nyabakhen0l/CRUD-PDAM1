import { getCookies } from "@/lib/server-cookie";
import { customer, Services } from "@/app/types";
import AddCustomer from "./add";
import EditCustomer from "./edit";
import DeleteCustomer from "./delete";
import Search from "@/components/search";
import Pagination from "@/components/pagination";
import ResetPassword from "./reset";
import { count } from "console";

type ResultData = {
    success: boolean
    message: string
    data: customer[]
    count: number
}

type ServiceData = {
    success: boolean
    message: string
    data: Services[]
    count: number
}

async function getCustomers(
    page: number,
    quantity: number,
    search: string
): Promise<ResultData> {

    try {

        const token = await getCookies("accessToken")

        const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/customers?page=${page}&quantity=${quantity}&search=${search}`

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
            message: "Failed to fetch customers",
            data: [],
            count: 0
        }

    }

}

async function getServices(): Promise<Services[]> {

    try {

        const token = await getCookies("accessToken")

        const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/services?quantity=1000`

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || "",
                Authorization: `Bearer ${token}`
            },
            cache: "no-store",
        })

        const responseData: ServiceData = await response.json()

        if (!response.ok) return []

        return responseData.data

    } catch (error) {

        console.error(error)
        return []

    }

}

type Props = {
    searchParams: Promise<{
        page?: number
        quantity?: number
        search?: string
    }>
}

export default async function CustomersPage(props: Props) {

    const page = (await props.searchParams)?.page || 1
    const quantity = (await props.searchParams)?.quantity || 5
    const search = (await props.searchParams)?.search || ""

    const { count: counts, data: customers } =
        await getCustomers(page, quantity, search)

    const services = await getServices()
return (
        <div className="w-full space-y-6">
            {/* Header Bersih - Tanpa Ikon Double */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Customer Management</h1>
                    <p className="text-sm text-slate-400 font-medium">Total {counts} customers found</p>
                </div>
                <AddCustomer serviceData={services} />
            </div>

            <div className="max-w-md">
                <Search url="/admin/customer" search={search} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {customers.map((item: customer) => (
                    <div key={item.id} className="group relative p-6 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className="h-12 w-12 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
                                {item.name.substring(0, 1).toUpperCase()}
                            </div>
                            {/* Tombol Aksi */}
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                                <ResetPassword selectedData={item} />
                                <EditCustomer selectedData={item} />
                                <DeleteCustomer selectedData={item} />
                            </div>
                        </div>

                        <div className="mb-4">
                            {/* Hanya menampilkan item.name agar tidak muncul teks "Customer" ganda */}
                            <h2 className="font-bold text-slate-800">{item.name}</h2>
                            <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-tighter">Active Member</p>
                        </div>

                        <div className="space-y-2">
                            <div className="text-sm text-slate-600 bg-slate-50 p-3 rounded-xl flex items-center gap-2">
                                <span>📞</span> {item.phone}
                            </div>
                            <div className="text-sm text-slate-500 bg-slate-50 p-3 rounded-xl flex items-center gap-2">
                                <span>🏠</span> <span className="line-clamp-1">{item.address}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


            {/* PAGINATION */}
            <div className="my-6 flex justify-center">

                <Pagination
                    count={counts}
                    currentPage={page}
                    perPage={quantity}
                />

            </div>

        </div>

    )

}