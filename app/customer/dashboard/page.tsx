import React from "react";
import { customer } from "@/app/types"; // Pastikan tipe Customer sudah ada di file types kamu
import { getCookies } from "@/lib/server-cookie";

type ResultData = {
    success: boolean,
    message: string,
    data: customer, // Diubah dari Admin ke Customer
};

// Function untuk mendapatkan data profile Customer
async function getCustomerProfile(): Promise<customer | null> {
    try {
        const token = await getCookies("accessToken");
        const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/customers/me`; // Endpoint biasanya berubah jadi /customers/me
        console.log("Menghubungi URL:", url); // Tambahkan ini di baris 16
        
        const response = await fetch(url, {
            method: `GET`,
            headers: {
                "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || "",
                "Authorization": `Bearer ${token}`,
            },
            cache: 'no-store'
        });

        const responseData: ResultData = await response.json();

        if (!response.ok) {
            console.log(responseData?.message);
            return null;
        }
        return responseData.data;
    } catch (error) {
        console.error("Connection Error:", error);
        return null;
    }
}

export default async function CustomerProfilePage() {
    const customerData = await getCustomerProfile();

    if (!customerData) {
        return (
            <div className="w-full p-5 text-red-500 font-semibold">
                Sorry, customer data does not exist.
            </div>
        );
    }

    return (
        <div className="w-full p-5">
            <div className="w-full p-5 bg-emerald-50 rounded shadow-sm border border-emerald-100">
                <h1 className="font-bold text-emerald-600 text-xl mb-4">Customer Profile</h1>
                <table className="w-full text-left">
                    <tbody>
                        <tr>
                            <td className="p-2 font-medium w-32">Name</td>
                            <td className="p-2">: {customerData.name}</td>
                        </tr>
                        <tr>
                            <td className="p-2 font-medium">Username</td>
                            {/* Menangani nested object user jika ada */}
                            <td className="p-2">: {customerData.user?.username || "-"}</td>
                        </tr>
                        <tr>
                            <td className="p-2 font-medium">Phone</td>
                            <td className="p-2">: {customerData.phone}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}