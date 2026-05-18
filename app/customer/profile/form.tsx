"use client";

import { useState } from "react";
import { customer } from "@/app/types";

type Props = {
    customer: customer;
};

export default function CustomerProfileForm({ customer }: Props) {
    const [isEdit, setIsEdit] = useState(false);

    const [profile, setProfile] = useState({
        name: customer?.name || "",
        username: customer?.user?.username || customer?.username || "",
        phone: customer?.phone || "",
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-emerald-800/40 uppercase tracking-widest">Personal Data</h3>

                {!isEdit ? (
                    <button
                        onClick={() => setIsEdit(true)}
                        className="px-6 py-2 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 transition-all active:scale-95 shadow-lg shadow-emerald-200"
                    >
                        Edit Profile
                    </button>
                ) : (
                    <div className="flex gap-2">
                        <button
                            onClick={() => {
                                setProfile({
                                    name: customer.name,
                                    username: customer.user?.username || customer.username || "",
                                    phone: customer.phone,
                                });
                                setIsEdit(false);
                            }}
                            className="px-6 py-2 rounded-xl bg-slate-100 text-slate-600 font-bold text-sm hover:bg-slate-200 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                console.log("Updating customer:", profile);
                                setIsEdit(false);
                            }}
                            className="px-6 py-2 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 transition-all active:scale-95 shadow-lg shadow-emerald-200"
                        >
                            Save
                        </button>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* NAME */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-600 ml-1">Full Name</label>
                    <input
                        type="text"
                        value={profile.name}
                        disabled={!isEdit}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className={`px-4 py-3 rounded-2xl border transition-all duration-300
                            ${isEdit
                                ? "bg-white border-emerald-200 focus:ring-4 focus:ring-emerald-100 outline-none shadow-sm"
                                : "bg-emerald-50/30 border-transparent text-slate-500 cursor-not-allowed"}`}
                    />
                </div>

                {/* USERNAME */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-600 ml-1">Username</label>
                    <input
                        type="text"
                        value={profile.name || ""} // Tambahkan || ""
                        disabled={!isEdit}
                        onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                        className={`px-4 py-3 rounded-2xl border transition-all duration-300
                            ${isEdit
                                ? "bg-white border-emerald-200 focus:ring-4 focus:ring-emerald-100 outline-none shadow-sm"
                                : "bg-emerald-50/30 border-transparent text-slate-500 cursor-not-allowed"}`}
                    />
                </div>

                {/* PHONE */}
                <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-sm font-bold text-slate-600 ml-1">Phone Number</label>
                    <input
                        type="tel"
                        value={profile.phone}
                        disabled={!isEdit}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className={`px-4 py-3 rounded-2xl border transition-all duration-300
                            ${isEdit
                                ? "bg-white border-emerald-200 focus:ring-4 focus:ring-emerald-100 outline-none shadow-sm"
                                : "bg-emerald-50/30 border-transparent text-slate-500 cursor-not-allowed"}`}
                    />
                </div>
            </div>
        </div>
    );
}