"use client"

import React from "react";

export default function CustomerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="w-full min-h-screen p-4 md:p-8 bg-slate-50/50">
            {/* Kamu bisa menambahkan header khusus di sini jika mau */}
            <div className="max-w-7xl mx-auto space-y-6">
                {children}
            </div>
        </section>
    );
}