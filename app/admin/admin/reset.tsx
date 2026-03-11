"use client"
import { useState } from "react"
import { getCookie } from "@/lib/client-cookies"
import { Button } from "@/components/ui/button"
import { RotateCcw, Loader2 } from "lucide-react"

export default function ResetPassword({ id, name }: { id: number, name: string }) {
    const [loading, setLoading] = useState(false)

    const handleReset = async () => {
        if (!confirm(`Reset password untuk ${name} ke "123456"?`)) return

        // PERBAIKAN: Harus true supaya loading muncul
        setLoading(true)
        try {
            const token = getCookie("accessToken")

            // PERBAIKAN: Coba ganti PUT menjadi PATCH karena error "Cannot PUT"
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/admins/${id}`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || "",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ password: "123456" })
            })

            if (res.ok) {
                alert("Password berhasil direset!")
            } else {
                // Jika PATCH gagal, coba POST (beberapa backend menggunakan POST untuk reset)
                const errData = await res.json()
                alert(`Gagal: ${errData.message || "Endpoint tidak ditemukan"}`)
            }
        } catch (error) {
            alert("Terjadi kesalahan jaringan.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            disabled={loading}
            className="text-orange-600 border-orange-200 hover:bg-orange-50"
        >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RotateCcw className="w-4 h-4 mr-1" />}
            Reset
        </Button>
    )
}