import { customer } from "@/app/types";
import { getCookies } from "@/lib/server-cookie";
import CustomerProfileForm from "./form";

type ResultData = {
    success: boolean,
    message: string,
    data: customer,
}

async function getCustomerProfile(): Promise<customer | null> {
    try {
        const token = await getCookies("accessToken");
        const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/customer/profile`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || "",
                "Authorization": `Bearer ${token}`,
            },
            cache: "no-store"
        });

        const responseData: ResultData = await response.json();

        if (!response.ok) {
            console.log("Customer API Error:", responseData?.message);
            return null;
        }

        return responseData.data;

    } catch (error) {
        console.log("Fetch Error:", error);
        return null;
    }
}

export default async function CustomerProfilePage() {
    const customerData = await getCustomerProfile();
    console.log("DATA DARI API:", customerData); // Cek ini di terminal VS Code

    if (!customerData) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
                <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white">
                    <p className="text-emerald-700 font-medium">Customer data not found. Please login again.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-emerald-100 via-teal-100 to-cyan-100 p-8">

            <div className="mb-8 max-w-3xl mx-auto">
                <h1 className="text-3xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 text-transparent bg-clip-text">
                    My Profile
                </h1>
                <p className="text-emerald-800/60 text-sm font-medium">Manage your personal information and contact details</p>
            </div>

            <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl shadow-emerald-200/50 border border-white/60 p-8 max-w-3xl mx-auto">

                {/* Avatar Section */}
                <div className="flex items-center gap-6 mb-10 pb-6 border-b border-emerald-100">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-500 flex items-center justify-center text-white text-3xl font-bold shadow-inner">
                        {customerData.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">{customerData.name}</h2>
                        <p className="text-emerald-600 font-semibold text-sm tracking-wide uppercase">Verified Customer</p>
                    </div>
                </div>

                <CustomerProfileForm customer={customerData} />

            </div>
        </div>
    );
}