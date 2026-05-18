"use client";

import { useEffect, useState } from "react";
import { getCookie } from "@/lib/client-cookies";
import PaymentModal from "./paymentModal";
import { PaymentProofPreview } from "./proof";
import { Receipt, Droplets, CreditCard, Clock, CheckCircle2, AlertCircle } from "lucide-react";

type Bill = {
    id: number;
    month: number;
    year: number;
    usage_value: number;
    amount: number;
    paid: boolean;
    payments?: {
        payment_proof: string;
        verified: boolean;
    } | null;
};

export default function CustomerBillPage() {
    const [bills, setBills] = useState<Bill[]>([]);
    const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchBills = async () => {
        setLoading(true);
        try {
            const token = getCookie("accessToken");

            if (!token) {
                console.error("TOKEN TIDAK ADA");
                setBills([]);
                return;
            }

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_API_URL}/bills/me`,
                {
                    method: "GET",
                    headers: {
                        "app-key": process.env.NEXT_PUBLIC_APP_KEY || "",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!res.ok) {
                console.error("FETCH ERROR:", res.status);
                setBills([]);
                return;
            }

            const responseData = await res.json();
            console.log("FULL RESPONSE:", responseData);

            // fleksibel handle struktur API
            const data = responseData.data || responseData.bills || [];

            setBills(data);
        } catch (error) {
            console.error("DEBUG FETCH ERROR:", error);
            setBills([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log("USE EFFECT JALAN");
        fetchBills();
    }, []);

    return (
        <div className="p-8 bg-[#fdfcfd] min-h-screen font-sans">
            <div className="max-w-4xl mx-auto">

                {/* HEADER */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-500 shadow-sm">
                        <Receipt size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-700 tracking-tight">
                            Tagihan Saya
                        </h1>
                        <p className="text-xs text-slate-400 font-medium italic">
                            Riwayat pemakaian air kamu ✨
                        </p>
                    </div>
                </div>

                {/* LOADING */}
                {loading ? (
                    <div className="flex justify-center p-20">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
                    </div>
                ) : bills.length === 0 ? (
                    <div className="bg-white rounded-[2.5rem] p-16 text-center border border-slate-50 shadow-sm">
                        <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                            <Droplets size={40} />
                        </div>
                        <p className="text-slate-400 font-bold italic">
                            Yeay! Tidak ada tagihan tertunggak.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {bills.map((bill) => {
                            const status =
                                !bill.payments
                                    ? "unpaid"
                                    : !bill.payments.verified
                                        ? "pending"
                                        : "paid";

                            return (
                                <div
                                    key={bill.id}
                                    className="bg-white rounded-[2rem] p-6 flex flex-col md:flex-row md:items-center justify-between border shadow-sm"
                                >
                                    <div className="flex items-center gap-4 mb-4 md:mb-0">
                                        <Droplets />

                                        <div>
                                            <p className="text-xs text-slate-400">Periode</p>
                                            <p className="font-bold">
                                                {bill.month}/{bill.year}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col md:items-end gap-2">
                                        <p className="font-bold text-indigo-600">
                                            Rp {bill.amount.toLocaleString("id-ID")}
                                        </p>

                                        <div className="flex gap-2 items-center">

                                            {/* STATUS */}
                                            <div className="text-xs font-bold">
                                                {status}
                                            </div>

                                            {/* ACTION */}
                                            {status === "unpaid" && (
                                                <button
                                                    onClick={() => {
                                                        setSelectedBill(bill);
                                                        setShowModal(true);
                                                    }}
                                                    className="bg-black text-white px-4 py-1 rounded"
                                                >
                                                    Bayar
                                                </button>
                                            )}

                                            {status === "pending" &&
                                                bill.payments?.payment_proof && (
                                                    <PaymentProofPreview
                                                        filename={bill.payments.payment_proof}
                                                    />
                                                )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* MODAL */}
                {showModal && selectedBill && (
                    <PaymentModal
                        bill={selectedBill}
                        onClose={() => setShowModal(false)}
                        onSuccess={fetchBills}
                    />
                )}
            </div>
        </div>
    );
}