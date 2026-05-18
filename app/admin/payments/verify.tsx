"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";

// Pastikan props sesuai dengan apa yang dikirim dari page.tsx
export default function VerifyPayment({ paymentId, token }: { paymentId: number; token: string }) {
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);

    const handleVerify = async () => {
        // 1. Pesan konfirmasi yang jelas
        if (!confirm("Verify this payment? This will update the Bill status to PAID.")) return;
        
        setIsPending(true);
        try {
            // 2. PERBAIKAN: Gunakan paymentId dari props, bukan data.id
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/payments/${paymentId}/verify`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || "",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (res.ok) {
                alert("Payment Verified Successfully!");
                // 3. Me-refresh data di halaman Payments & Bills secara otomatis
                router.refresh(); 
            } else {
                const errorData = await res.json();
                alert(`Error: ${errorData.message || "Verification failed."}`);
            }
        } catch (e) {
            alert("Connection error. Please check your internet or API server.");
        } finally {
            setIsPending(false);
        }
    };

    return (
        <button
            onClick={handleVerify}
            disabled={isPending}
            className="bg-[#22C55E] hover:bg-[#16A34A] text-white rounded-xl font-black px-10 py-2.5 transition-all shadow-lg shadow-green-100 active:scale-95 disabled:opacity-50"
        >
            {isPending ? (
                <div className="flex items-center gap-2">
                    <span className="size-4 border-2 border-white/30 border-t-white animate-spin rounded-full"></span>
                    Verifying...
                </div>
            ) : "Verify"}
        </button>
    );
}