"use client"


import { Bill } from "@/app/types"
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts"


export function BillChart({ data }: { data: Bill[] }) {
    // transform data
    const chartData = data.map((bill) => ({
        month: new Date(bill.year, bill.month - 1).toLocaleString("id-ID", {
            month: "short",
        }),
        amount: bill.amount,
        usage: bill.usage_value,
    }))


    // insight sederhana
    const last = chartData[0]?.amount || 0
    const prev = chartData[1]?.amount || 0


    const trend =
        last > prev
            ? "Tagihan meningkat dari bulan sebelumnya"
            : last < prev
                ? "Tagihan menurun dari bulan sebelumnya"
                : "Tagihan stabil"


    const getStatus = (bill: any) => {
        if (bill.payments == null) return "unpaid"
        if (!bill.payments?.verified) return "pending"
        return "paid"
    }


    const total = data
        .filter((b) => getStatus(b) === "unpaid")
        .reduce((a, b) => a + b.amount, 0)


    const unpaid = data.filter((b) => getStatus(b) === "unpaid").length
    const pending = data.filter((b) => getStatus(b) === "pending").length
    const paid = data.filter((b) => getStatus(b) === "paid").length


    return (
        <div className="space-y-6">


            {/* Insight */}
            <div className="rounded-xl border p-4 bg-muted/30">
                <h2 className="font-semibold mb-1">Ringkasan</h2>
                <p className="text-sm text-muted-foreground mb-2">
                    {trend}
                </p>
                <div className="grid grid-cols-4 md:grid-cols-4 gap-4">
                    <div className="border rounded-xl p-4">
                        <p className="text-sm text-muted-foreground">Total Tagihan</p>
                        <p className="text-xl font-bold">
                            Rp {total.toLocaleString("id-ID")}
                        </p>
                    </div>


                    <div className="border rounded-xl p-4">
                        <p className="texxt-sm text-muted-foreground">Belum Bayar</p>
                        <p className="text-xl font-bold text-red-500">{unpaid}</p>
                    </div>


                    <div className="border rounded-xl p-4">
                        <p className="text-sm text-muted-foreground">Menunggu Verifikasi</p>
                        <p className="text-xl font-bold text-yellow-500">{pending}</p>
                    </div>


                    <div className="border rounded-xl p-4">
                        <p className="text-sm text-muted-foreground">Lunas</p>
                        <p className="text-xl font-bold text-green-600">{paid}</p>
                    </div>
                </div>
            </div>


            {/* Charts */}
            <div className="flex flex-col gap-6 lg:flex-row">


                {/* Grafik Tagihan */}
                <div className="w-full lg:w-1/2 rounded-2xl border p-4">
                    <h2 className="mb-4 font-semibold">Grafik Tagihan</h2>


                    <div className="h-75">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis width="auto" />
                                <Tooltip />
                                <Line type="monotone" dataKey="amount" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>


                {/* Grafik Pemakaian */}
                <div className="w-full lg:w-1/2 rounded-2xl border p-4">
                    <h2 className="mb-4 font-semibold">Grafik Pemakaian</h2>


                    <div className="h-75">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis width="auto" />
                                <Tooltip />
                                <Line type="monotone" dataKey="usage" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>


            </div>
        </div>
    )
}
