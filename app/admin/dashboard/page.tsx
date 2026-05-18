import { Admin } from "@/app/types";
import { getCookies } from "@/lib/server-cookie";
import { User, Phone, AtSign, Heart, Sparkles } from "lucide-react";

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
                <div className="text-center p-8 bg-rose-50 rounded-[2rem] border border-rose-100 animate-bounce-slow">
                    <p className="text-rose-400 font-medium flex items-center gap-2">
                        Oops! Admin data disappeared ✨
                    </p>
                </div>
            </div>
        );
    }

    const initial = adminData.name?.charAt(0).toUpperCase() || "A";

    return (
        <div className="w-full min-h-screen p-8 flex justify-start items-start bg-[#fdfcfd] animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Main Card */}
            <div className="max-w-md w-full bg-white/70 backdrop-blur-md rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white overflow-hidden relative">

                {/* Decorative Elements (Sentuhan 'Lucu') */}
                <div className="absolute top-4 right-6 text-rose-200">
                    <Sparkles size={24} />
                </div>

                {/* Header Profile */}
                <div className="h-40 bg-gradient-to-br from-pink-100 via-violet-100 to-sky-100 flex items-center justify-center relative">
                    {/* Lingkaran di belakang avatar */}
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

                    <div className="relative group">
                        <div className="w-24 h-24 bg-white rounded-[2.5rem] flex items-center justify-center shadow-xl shadow-indigo-100/50 border-[6px] border-white text-transparent bg-clip-text bg-gradient-to-tr from-indigo-400 to-rose-400 text-3xl font-black transform transition-transform group-hover:rotate-12 duration-500">
                            {initial}
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-rose-400 w-6 h-6 rounded-full border-4 border-white flex items-center justify-center">
                            <Heart size={10} className="text-white fill-current" />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="px-10 pb-12 pt-6">
                    <div className="text-center mb-10">
                        <h1 className="text-2xl font-extrabold text-slate-700 tracking-tight">
                            Admin Profile
                        </h1>
                        <div className="flex items-center justify-center gap-1 mt-1">
                            <span className="h-[2px] w-4 bg-rose-200 rounded-full"></span>
                            <p className="text-[13px] text-slate-400 font-medium italic">Sweet Personal Info</p>
                            <span className="h-[2px] w-4 bg-rose-200 rounded-full"></span>
                        </div>
                    </div>

                    <div className="space-y-5">
                        {/* Name Item */}
                        <div className="group flex items-center p-4 bg-white border border-slate-50 rounded-[1.8rem] hover:shadow-md hover:shadow-rose-50 transition-all duration-300">
                            <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform">
                                <User size={20} />
                            </div>
                            <div className="ml-4">
                                <p className="text-[10px] font-bold text-rose-300 uppercase tracking-[0.15em]">Full Name</p>
                                <p className="text-slate-600 font-semibold">{adminData.name}</p>
                            </div>
                        </div>

                        {/* Username Item */}
                        <div className="group flex items-center p-4 bg-white border border-slate-50 rounded-[1.8rem] hover:shadow-md hover:shadow-indigo-50 transition-all duration-300">
                            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                                <AtSign size={20} />
                            </div>
                            <div className="ml-4">
                                <p className="text-[10px] font-bold text-indigo-300 uppercase tracking-[0.15em]">Username</p>
                                <p className="text-slate-600 font-semibold italic">@{adminData.user.username}</p>
                            </div>
                        </div>

                        {/* Phone Item */}
                        <div className="group flex items-center p-4 bg-white border border-slate-50 rounded-[1.8rem] hover:shadow-md hover:shadow-sky-50 transition-all duration-300">
                            <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
                                <Phone size={20} />
                            </div>
                            <div className="ml-4">
                                <p className="text-[10px] font-bold text-sky-300 uppercase tracking-[0.15em]">Phone Number</p>
                                <p className="text-slate-600 font-semibold">{adminData.phone}</p>
                            </div>
                        </div>
                    </div>

                    {/* Footer Button */}
                    <button className="w-full mt-10 py-4 bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-[2rem] font-bold text-sm tracking-widest hover:shadow-2xl hover:shadow-slate-200 transition-all active:scale-95 flex items-center justify-center gap-2 overflow-hidden relative group">
                        <span className="relative z-10">EDIT PROFILE</span>
                        <Sparkles size={16} className="relative z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-rose-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </button>
                </div>
            </div>
        </div>
    );
}