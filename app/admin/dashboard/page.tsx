import { Admin } from "@/app/types";
import { getCookies } from "@/lib/server-cookie";
import { User, Phone, AtSign } from "lucide-react"; // Opsional: Tambahkan icon jika ada

type ResultData = {
    success: boolean,
    message: string,
    data: Admin,
};

async function getAdminProfile(): Promise<Admin | null> {
    try {
        const token = await getCookies("accessToken");
        const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/admins/me`;
        const response = await fetch(url, {
            method: `GET`,
            headers: {
                "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || "",
                "Authorization": `Bearer ${token}`,
            },
        });
        const responseData: ResultData = await response.json();

        if (!response.ok) {
            console.log(responseData?.message);
            return null;
        }
        return responseData.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export default async function AdminProfilePage() {
    const adminData = await getAdminProfile();

    if (adminData == null) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center p-8 bg-red-50 rounded-2xl border border-red-100">
                    <p className="text-red-500 font-medium">Sorry, admin data does not exist ✨</p>
                </div>
            </div>
        );
    }

    // Ambil inisial untuk avatar
    const initial = adminData.name?.charAt(0).toUpperCase() || "A";

    return (
        <div className="w-full p-8 flex justify-start items-start animate-in fade-in duration-700">
            {/* Main Card */}
            <div className="max-w-md w-full bg-white rounded-[2rem] shadow-xl shadow-sky-100/50 border border-sky-50 overflow-hidden">

                {/* Header Profile dengan Background Lucu */}
                <div className="h-24 bg-gradient-to-r from-sky-400 to-indigo-400 flex items-end justify-center">
                    <div className="w-20 h-20 bg-white rounded-full mb-[-40px] flex items-center justify-center shadow-lg border-4 border-white text-sky-500 text-2xl font-bold">
                        {initial}
                    </div>
                </div>

                {/* Content */}
                <div className="pt-12 p-8 pb-10">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                            Admin Profile
                        </h1>
                        <p className="text-sm text-slate-400">Manage your personal information</p>
                    </div>

                    <div className="space-y-4">
                        {/* Name Item */}
                        <div className="flex items-center p-4 bg-sky-50/50 rounded-2xl hover:bg-sky-50 transition-colors">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-sky-500 mr-4">
                                👤
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-sky-400 uppercase tracking-wider">Full Name</p>
                                <p className="text-slate-700 font-medium">{adminData.name}</p>
                            </div>
                        </div>

                        {/* Username Item */}
                        <div className="flex items-center p-4 bg-purple-50/50 rounded-2xl hover:bg-purple-50 transition-colors">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-purple-500 mr-4">
                                @
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Username</p>
                                <p className="text-slate-700 font-medium">{adminData.user.username}</p>
                            </div>
                        </div>

                        {/* Phone Item */}
                        <div className="flex items-center p-4 bg-emerald-50/50 rounded-2xl hover:bg-emerald-50 transition-colors">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-emerald-500 mr-4">
                                📞
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Phone Number</p>
                                <p className="text-slate-700 font-medium">{adminData.phone}</p>
                            </div>
                        </div>
                    </div>

                    {/* Footer Button (Opsional) */}
                    <button className="w-full mt-8 py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-all hover:shadow-lg active:scale-[0.98]">
                        Edit Profile
                    </button>
                </div>
            </div>
        </div>
    );
}