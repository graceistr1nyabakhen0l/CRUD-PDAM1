"use client";

import { useState } from "react";
import { getCookie } from "@/lib/client-cookies";

export default function PaymentModal({ bill, onClose, onSuccess }: any) {
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleUpload = async () => {
        if (!file) return alert("Upload bukti dulu!");

        const token = getCookie("accessToken");

        try {
            setIsUploading(true);

            const formData = new FormData();
            formData.append("bill_id", String(bill.id));
            formData.append("file", file);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_API_URL}/payments`,
                {
                    method: "POST",
                    headers: {
                        "app-key": process.env.NEXT_PUBLIC_APP_KEY || "",
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                }
            );

            if (!res.ok) {
                alert("Upload gagal");
                return;
            }

            alert("Pembayaran berhasil");

            onSuccess();
            onClose();
        } catch (err) {
            console.error(err);
            alert("Terjadi error");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl w-[400px]">

                <h2 className="text-xl font-bold mb-4">
                    Upload Bukti Pembayaran
                </h2>

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                        setFile(e.target.files?.[0] || null)
                    }
                />

                <div className="flex gap-2 mt-4">

                    <button
                        onClick={onClose}
                        className="w-full bg-gray-300 py-2 rounded"
                        disabled={isUploading}
                    >
                        Batal
                    </button>

                    <button
                        onClick={handleUpload}
                        disabled={isUploading}
                        className="w-full bg-green-500 text-white py-2 rounded"
                    >
                        {isUploading ? "Uploading..." : "Upload"}
                    </button>

                </div>

            </div>
        </div>
    );
}