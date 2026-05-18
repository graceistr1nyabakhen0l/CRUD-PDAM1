// filter.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function FilterStatus({ currentStatus }: { currentStatus: string }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        const params = new URLSearchParams(searchParams.toString());

        if (val) {
            params.set("status", val);
        } else {
            params.delete("status");
        }
        params.set("page", "1");

        router.push(`/admin/bills?${params.toString()}`);
    };

    return (
        <select
            value={currentStatus}
            onChange={handleChange}
            className="bg-white border-4 border-slate-100 rounded-full px-8 py-2.5 text-xs font-black text-slate-500 uppercase tracking-widest outline-none cursor-pointer hover:border-pink-100 transition-all shadow-sm"
        >
            <option value="">All</option>
            <option value="paid">PAID</option>
            <option value="unpaid">UNPAID</option>
            <option value="pending">PENDING</option>
        </select>
    );
}