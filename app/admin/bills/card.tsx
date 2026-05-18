"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PaymentProofPreview } from "@/app/customer/bills/proof"
import { Bill, customer } from "@/app/types"
import EditBill from "./edit"
import DeleteBill from "./delete"
import VerifyBill from "./verify"
import { useRouter } from "next/navigation"

export function BillCard({ bill, customer: customer }: { bill: Bill, customer: customer[] }) {
  const router = useRouter()

  const getStatus = () => {
    if (bill.payments == null) return "unpaid"
    if (!bill.payments?.verified) return "pending"
    return "paid"
  }

  const hasPayment = bill.payments != null
  const status = getStatus()

  const statusConfig = {
    unpaid: { label: "Belum Bayar", variant: "destructive" },
    pending: { label: "Menunggu Verifikasi", variant: "secondary" },
    paid: { label: "Lunas", variant: "default" },
  }

  const monthName = new Date(bill.year, bill.month - 1).toLocaleString("id-ID", {
    month: "long",
  })

  return (
    <Card className="rounded-2xl shadow-sm mb-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
          <h5 className="text-lg font-semibold">{bill.customer.name}</h5>
          <p className="text-sm text-slate-500">{bill.service.name}</p>
          <p className="text-xs text-slate-400 mt-1">Bill ID: #{bill.id}</p>
        </CardTitle>
        <Badge variant={statusConfig[status].variant as any}>
          {statusConfig[status].label}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Total Tagihan</p>
          <p className="text-3xl font-bold">
            Rp {bill.amount.toLocaleString("id-ID")}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Periode</p>
            <p className="font-medium">{monthName} {bill.year}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Pemakaian</p>
            <p className="font-medium">{bill.usage_value} m³</p>
          </div>
          <div>
            <p className="text-muted-foreground">No Meter</p>
            <p className="font-medium">{bill.measurement_number}</p>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4 flex-wrap gap-2">
          {/* TOMBOL NAVIGASI KE DETAIL */}
          <div className="flex gap-2">
            <button 
              className="text-sm px-4 py-1.5 rounded-md bg-slate-900 text-white hover:bg-slate-800 transition-colors"
              onClick={() => router.push(`/admin/bills/${bill.id}`)}
            >
              DETAIL
            </button>

            {hasPayment && bill.payments?.payment_proof && (
              <PaymentProofPreview filename={bill.payments.payment_proof} />
            )}
          </div>

          {/* ADMIN ACTIONS - SESUAI PROPS MASING-MASING */}
          <div className="flex gap-2 items-center">
            {status === "pending" && (
              <VerifyBill selectedData={bill} />
            )}

            {status !== "paid" && (
              <>
                <EditBill bill={bill} token="" />
                <DeleteBill billId={bill.id} token="" />
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}