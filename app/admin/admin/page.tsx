import { getCookies } from "@/lib/server-cookie"
import { Admin } from "@/app/types"
import Search from "@/components/search"
import Pagination from "@/components/pagination"
import EditAdmin from "./edit"
import DeleteAdmin from "./delete"
import AddAdmin from "./add"
import ResetPasswordAdmin from "./reset"
import ResetPassword from "./reset"

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

    const page = (await props.searchParams)?.page || 1
    const quantity = (await props.searchParams)?.quantity || 5
    const search = (await props.searchParams)?.search || ""

    const { count, data: admins } =
        await getAdmins(page, quantity, search)

    return (

        <div className="p-6 max-w-6xl mx-auto">

            {/* TITLE */}
            <h1 className="text-2xl font-bold mb-6">
                Admin
            </h1>

            {/* SEARCH + ADD */}
            <div className="flex justify-between items-center mb-6">

                <div className="w-full max-w-md">
                    <Search url="/admin/admin" search={search} />
                </div>

                <AddAdmin />

            </div>

            {/* TABLE */}
            <div className="overflow-x-auto bg-white rounded-xl shadow">

                <table className="w-full table-fixed text-left">

                    {/* HEADER */}
                    <thead className="bg-slate-100 text-slate-700">
                        <tr>
                            <th className="px-6 py-4 w-16">No</th>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Phone</th>
                            <th className="px-6 py-4 w-40 text-center">Action</th>
                        </tr>
                    </thead>

                    {/* BODY */}
                    <tbody>
                        {admins.map((admin, index) => (
                            <tr
                                key={admin.id}
                                className="border-t hover:bg-slate-50 transition"
                            >

                                <td className="px-6 py-4">
                                    {(page - 1) * quantity + index + 1}
                                </td>

                                <td className="px-6 py-4 font-medium">
                                    {admin.name}
                                </td>

                                <td className="px-6 py-4">
                                    {admin.phone}
                                </td>

                                {/* ACTION */}
                                <td className="px-6 py-4">

                                    <div className="flex gap-2 justify-center">

                                        <EditAdmin selectedData={admin} />
                                        <DeleteAdmin selectedData={admin} />
                                        <ResetPasswordAdmin id={admin.id} name={admin.name} />
                                    </div>

                                </td>

                            </tr>
                        ))}
                    </tbody>

                </table>

            </div>

            {/* PAGINATION */}
            <div className="my-6 flex justify-center">

                <Pagination
                    count={count}
                    currentPage={page}
                    perPage={quantity}
                />

            </div>

        </div>

    )
}