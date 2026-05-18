"use client";

import { useState } from "react";
import { storeCookie } from "@/lib/client-cookies"
import { LockKeyhole, User, Sparkles, Heart } from "lucide-react"; 

export default function SignInPage() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    async function handleSignIn(e: React.FormEvent) {
        e.preventDefault();
        try {
            const request = JSON.stringify({ username, password });
            const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth`;
            
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "app-key": `${process.env.NEXT_PUBLIC_APP_KEY}`,
                },
                body: request,
            });

            if (!response.ok) {
                alert("Oops! Login failed ✨");
                return;
            }

            const responseData = await response.json();
            storeCookie("accessToken", responseData.token, 1);
            storeCookie('role', responseData.role, 1);

            if (responseData.role == "ADMIN") {
                window.location.href = "/admin/dashboard";
            } else if (responseData.role == "CUSTOMER") {
                window.location.href = "/customer/dashboard";
            }
        } catch (error) {
            console.error("Error during sign in:", error);
        }
    }

    return (
        // Background: Soft Rose Quartz Gradient
        <div className="w-full h-dvh bg-[#FFF5F7] flex items-center justify-center relative overflow-hidden font-sans">
            {/* Ornamen Bulatan Lucu & Elegan */}
            <div className="absolute top-[-5%] left-[-5%] w-72 h-72 bg-rose-200/40 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-5%] w-80 h-80 bg-amber-100/50 rounded-full blur-3xl"></div>
            
            {/* Main Card */}
            <div className="bg-white/80 backdrop-blur-md p-10 w-full max-w-md rounded-[2.5rem] shadow-[0_20px_60px_rgba(255,182,193,0.2)] border-4 border-white z-10 mx-4 relative">
                
                {/* Floating Icon Decor */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                    <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-amber-200 rounded-3xl flex items-center justify-center shadow-lg transform rotate-12 group hover:rotate-0 transition-transform duration-500">
                        <Heart className="text-white fill-white/20" size={28} />
                    </div>
                </div>

                <div className="text-center mt-6 mb-8">
                    <h1 className="text-3xl font-black text-rose-500 tracking-tight">
                        Hello <span className="text-amber-500 italic">Sweetie!</span>
                    </h1>
                    <div className="flex items-center justify-center gap-2 mt-2">
                        <span className="h-1 w-4 bg-rose-200 rounded-full"></span>
                        <p className="text-rose-300 text-[10px] font-bold uppercase tracking-[0.2em]">
                            Manage your bills with love
                        </p>
                        <span className="h-1 w-4 bg-rose-200 rounded-full"></span>
                    </div>
                </div>

                <form onSubmit={handleSignIn} className="space-y-4">
                    {/* Username */}
                    <div>
                        <label className="text-[11px] font-bold text-rose-400 uppercase tracking-widest ml-4 mb-2 block">
                            Username
                        </label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-300" size={18} />
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Who are you? ✨"
                                className="w-full pl-12 pr-6 py-4 bg-rose-50/50 border-2 border-transparent text-slate-700 text-sm rounded-[1.5rem] focus:bg-white focus:border-rose-200 focus:ring-4 focus:ring-rose-100 transition-all outline-none placeholder:text-rose-200"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-[11px] font-bold text-rose-400 uppercase tracking-widest ml-4 mb-2 block">
                            Password
                        </label>
                        <div className="relative">
                            <LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-300" size={18} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Your secret key..."
                                className="w-full pl-12 pr-6 py-4 bg-rose-50/50 border-2 border-transparent text-slate-700 text-sm rounded-[1.5rem] focus:bg-white focus:border-rose-200 focus:ring-4 focus:ring-rose-100 transition-all outline-none placeholder:text-rose-200"
                            />
                        </div>
                    </div>

                    {/* Button: Elegant Rose Gold */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-rose-400 to-rose-300 text-white py-4 mt-6 font-black text-sm rounded-[1.5rem] hover:shadow-[0_10px_25px_rgba(251,113,133,0.4)] hover:-translate-y-0.5 transition-all active:scale-[0.95] flex items-center justify-center gap-2"
                    >
                        Sign In Now <Sparkles size={16} />
                    </button>
                </form>

                <div className="mt-8 text-center flex flex-col items-center gap-1">
                    <div className="h-[2px] w-10 bg-rose-100 rounded-full"></div>
                    <p className="text-[9px] text-rose-200 uppercase tracking-[0.3em] font-bold">
                        Billing App ✨ Est. 2024
                    </p>
                </div>
            </div>
        </div>
    );
}