import { getCookies } from "@/lib/server-cookie";
import VerifyPayment from "./verify";
import PaymentDetails from "./details";
import Search from "@/components/search";
import Pagination from "@/components/pagination";

async function getPayments(page: number, quantity: number, search: string) {
    const token = await getCookies("accessToken");
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/payments?page=${page}&quantity=${quantity}&search=${search}`,
        {
            headers: {
                "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || "",
                "Authorization": `Bearer ${token}`
            },
            cache: 'no-store'
        }
    );

    if (!res.ok) return { data: [], count: 0 };
    return res.json();
}

export default async function PaymentsPage({ searchParams }: any) {
    const params = await searchParams;
    const page = Number(params?.page) || 1;
    const search = params?.search || "";

    const { count, data: apiPayments } = await getPayments(page, 10, search);
    const token = await getCookies("accessToken");

    // ==========================================
    // 💡 MOCK DATA UNTUK TESTING UI
    // ==========================================
    const mockPayments = [
        {
            id: 101,
            customer_id: "CUST-001",
            customer: { name: "Budi Santoso", service_type: "Rumah Tangga Mewah" },
            bill: { month: "Maret", year: 2026, usage_value: 45 },
            status_verify: "Pending",
            status_paid: "Paid",
            payment_method: "Transfer BCA",
            total_amount: 450000,
            created_at: "2026-04-05T10:30:00Z"
        },
        {
            id: 102,
            customer_id: "CUST-089",
            customer: { name: "PT. Maju Mundur", service_type: "Niaga Menengah" },
            bill: { month: "Maret", year: 2026, usage_value: 120 },
            status_verify: "Verified",
            status_paid: "Paid",
            payment_method: "Virtual Account Mandiri",
            total_amount: 1200000,
            created_at: "2026-04-04T14:15:00Z"
        },
        {
            id: 103,
            customer_id: "CUST-045",
            customer: { name: "Siti Aminah", service_type: "Rumah Tangga Standar" },
            bill: { month: "Februari", year: 2026, usage_value: 20 },
            status_verify: "Pending",
            status_paid: "Paid",
            payment_method: "Qris",
            total_amount: 150000,
            created_at: "2026-04-06T09:00:00Z"
        }
    ];

    // Jika data API kosong, gunakan Mock Data agar UI tidak kopong.
    // Nanti jika backend sudah ada isinya, hapus saja `|| mockPayments`
    const payments = apiPayments?.length > 0 ? apiPayments : mockPayments;

    // Logic Stats
    const totalPayments = payments?.length || 0;
    const pendingVerify = payments?.filter((p: any) => p.status_verify !== 'Verified').length || 0;
    const totalAmount = payments?.reduce((acc: number, curr: any) => acc + (curr.total_amount || 0), 0) || 0;

    return (
        <div className="space-y-8 pb-20 p-6 bg-[#FBFAFF] min-h-screen">

            {/* Header Section */}
            <div className="flex justify-between items-end px-4">
                <div>
                    <h1 className="text-3xl font-black text-[#5B21B6] tracking-tighter uppercase">Payment Verification</h1>
                    <p className="text-[#A78BFA] text-[12px] font-bold mt-1">Validate transaction proofs and sync with customer bills.</p>
                </div>
            </div>

            {/* Dashboard Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-[2rem] border-4 border-[#F5F3FF] shadow-sm flex items-center gap-5">
                    <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-xl">💳</div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Entries</p>
                        <p className="text-2xl font-black text-slate-800">{totalPayments}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-[2rem] border-4 border-[#F5F3FF] shadow-sm flex items-center gap-5">
                    <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-xl">⏳</div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pending Verify</p>
                        <p className="text-2xl font-black text-orange-600">{pendingVerify}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-[2rem] border-4 border-[#F5F3FF] shadow-sm flex items-center gap-5">
                    <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-xl">💰</div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Money In Process</p>
                        <p className="text-xl font-black text-emerald-600">Rp {totalAmount.toLocaleString('id-ID')}</p>
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div className="w-full">
                <div className="bg-white p-2 rounded-[1.5rem] shadow-[0_15px_40px_rgba(167,139,250,0.1)] border-4 border-[#F5F3FF] px-6 flex items-center gap-4 focus-within:border-[#A78BFA] transition-all">
                    <span className="text-lg">🔍</span>
                    <div className="flex-1">
                        <Search url="/admin/payments" search={search} />
                    </div>
                </div>
            </div>

            {/* List Data */}
            <div className="flex flex-col gap-6">
                {payments?.length > 0 ? (
                    payments.map((item: any) => (
                        <div key={item.id} className="group relative bg-white rounded-[2.5rem] p-8 pl-14 border-2 border-white shadow-[0_15px_45px_rgba(167,139,250,0.08)] hover:shadow-[0_25px_60px_rgba(167,139,250,0.15)] transition-all duration-500 overflow-hidden">

                            {/* Dekorasi Samping */}
                            <div className={`absolute left-0 top-0 h-full w-3 transition-all ${item.status_verify === 'Verified' ? 'bg-emerald-500' : 'bg-[#7C3AED]'
                                }`} />

                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-xl font-black text-slate-800 tracking-tight">{item.customer?.name}</h3>
                                        <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500 font-bold">ID: {item.customer_id}</span>
                                    </div>
                                    <p className="text-[10px] font-black text-[#A78BFA] uppercase tracking-[0.2em] mt-1">
                                        Bill Period: {item.bill?.month}/{item.bill?.year} — Usage: {item.bill?.usage_value} m³
                                    </p>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase border ${item.status_verify === 'Verified' ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-orange-50 border-orange-200 text-orange-600'
                                        }`}>
                                        {item.status_verify}
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
                                <div className="bg-[#F8F9FD] p-4 rounded-2xl border-2 border-[#F5F3FF]">
                                    <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Payment Method</p>
                                    <p className="text-sm font-bold text-slate-700 leading-none">{item.payment_method || 'Transfer Bank'}</p>
                                </div>

                                <div className="bg-[#F8F9FD] p-4 rounded-2xl border-2 border-[#F5F3FF]">
                                    <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Time Submitted</p>
                                    <p className="text-sm font-bold text-slate-700 leading-none">{new Date(item.created_at).toLocaleDateString('id-ID')}</p>
                                </div>

                                <div className="md:col-span-1">
                                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Amount Paid</p>
                                    <p className="text-2xl font-black text-[#5B21B6] tracking-tighter">
                                        Rp {item.total_amount?.toLocaleString('id-ID')}
                                    </p>
                                </div>

                                <div className="flex justify-end gap-3 transition-all">
                                    <button className="h-12 px-6 rounded-2xl border-2 border-slate-100 text-slate-500 font-bold text-xs hover:bg-slate-50 active:scale-95 transition-all">
                                        View Proof
                                    </button>
                                    <PaymentDetails data={item} />
                                    {item.status_verify !== 'Verified' && (
                                        <VerifyPayment paymentId={item.id} token={token || ""} />
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-32 bg-white rounded-[3rem] border-4 border-dashed border-[#F5F3FF]">
                        <div className="text-6xl mb-4 opacity-20">📥</div>
                        <p className="text-slate-400 font-black uppercase tracking-widest text-sm">Belum ada data pembayaran masuk</p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            <div className="flex justify-center pt-10">
                <div className="bg-white p-2 rounded-full shadow-xl border-2 border-[#F5F3FF]">
                    <Pagination count={count || 3} currentPage={page} perPage={10} />
                </div>
            </div>
        </div>
    );
}  