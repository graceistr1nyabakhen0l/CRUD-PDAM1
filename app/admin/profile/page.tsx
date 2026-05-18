import { getCookies } from "@/lib/server-cookie";
import AdminProfileForm from "./form"; // Pastikan Anda membuat file form khusus admin
import { User, ShieldCheck, Mail, MapPin } from "lucide-react";

// Definisikan tipe data sesuai dengan struktur data admin Anda
type AdminData = {
    id: number;
    name: string;
    username: string;
    email?: string;
    role: string;
};

type ResultData = {
    success: boolean,
    message: string,
    data: AdminData,
}

async function getAdminProfile(): Promise<AdminData | null> {
    try {
        const token = await getCookies("accessToken");
        // Sesuaikan endpoint API untuk profile admin
        const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/admin/profile`;

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
            console.log("Admin API Error:", responseData?.message);
            return null;
        }

        return responseData.data;

    } catch (error) {
        console.log("Fetch Error:", error);
        return null;
    }
}

export default async function AdminProfilePage() {
    const adminData = await getAdminProfile();

    if (!adminData) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center bg-slate-50">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                    <p className="text-slate-600 font-medium text-center">
                        Admin data not found. <br />
                        <span className="text-sm text-slate-400">Please check your connection or login again.</span>
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-slate-50/50 p-8">
            <div className="max-w-4xl mx-auto">
                
                {/* Header Section */}
                <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                        <User size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                            Administrator Profile
                        </h1>
                        <p className="text-slate-500 text-sm font-medium">Manage your administrative account settings</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    {/* Left Side: Avatar Card */}
                    <div className="md:col-span-1">
                        <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center shadow-sm">
                            <div className="w-24 h-24 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-4 border-2 border-dashed border-slate-200">
                                <span className="text-3xl font-black text-indigo-600">
                                    {adminData.name.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <h2 className="text-lg font-bold text-slate-800">{adminData.name}</h2>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-wider mt-2">
                                <ShieldCheck size={12} />
                                {adminData.role || "SUPER ADMIN"}
                            </div>
                            
                            <div className="mt-8 pt-6 border-t border-slate-100 text-left space-y-4">
                                <div className="flex items-center gap-3 text-slate-500">
                                    <Mail size={16} className="text-slate-400" />
                                    <span className="text-xs font-medium">{adminData.username}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Form Card */}
                    <div className="md:col-span-2">
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50">
                                <h3 className="font-bold text-slate-700">Account Details</h3>
                            </div>
                            <div className="p-8">
                                <AdminProfileForm admin={adminData} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}