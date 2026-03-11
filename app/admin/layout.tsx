"use client"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/admin-template/app-sidebar";

export default function RootAdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full bg-slate-50/50 text-slate-900">
                {/* Navbar samping yang tadi hilang */}
                <AppSidebar />

                <main className="flex-1 overflow-y-auto">
                    {/* Header untuk tombol sidebar */}
                    <header className="flex h-16 items-center px-6">
                        <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-100">
                            <SidebarTrigger />
                        </div>
                    </header>

                    {/* Tempat munculnya isi Dashboard, Services, atau Admin Data */}
                    <div className="p-4 md:p-8">
                        <div className="max-w-7xl mx-auto">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
}