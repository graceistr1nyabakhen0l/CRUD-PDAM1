"use client"
import { Admin } from "@/app/types";
import { useRouter } from "next/navigation";
import { getCookie } from "@/lib/client-cookies";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2, AlertCircle, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function DeleteAdmin({ selectedData }: { selectedData: Admin }) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async (e: React.MouseEvent) => {
        try {
            e.preventDefault();
            setIsLoading(true);

            const token = await getCookie("accessToken");
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/admins/${selectedData.id}`, {
                method: "DELETE",
                headers: {
                    "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || "",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (res.ok) {
                toast.success("Akses admin telah dicabut ✨");
                setOpen(false);
                router.refresh();
            } else {
                toast.error("Gagal menghapus admin");
            }
        } catch (error) {
            toast.error("Terjadi kesalahan koneksi");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-2xl hover:bg-slate-50 group transition-all duration-300">
                    <Trash2 className="w-5 h-5 text-slate-300 group-hover:text-slate-600 transition-colors" />
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent className="rounded-[3rem] border-none p-0 overflow-hidden bg-white max-w-[420px] shadow-2xl">

                {/* Header dengan Gradasi Lembut sesuai referensi Profile/New Admin */}
                <div className="bg-gradient-to-br from-[#F1F8FF] via-[#F6F3FF] to-white pt-12 pb-8 flex flex-col items-center relative">
                    <Sparkles className="absolute top-8 right-10 text-indigo-300 opacity-50" size={20} />

                    <div className="w-20 h-20 bg-white/80 backdrop-blur-sm rounded-[2.2rem] shadow-sm flex items-center justify-center mb-5 border border-white">
                        <div className="w-14 h-14 bg-slate-50 rounded-[1.5rem] flex items-center justify-center">
                            <AlertCircle className="text-slate-400 w-8 h-8" />
                        </div>
                    </div>

                    <AlertDialogHeader className="px-10 text-center">
                        <AlertDialogTitle className="text-2xl font-black text-[#2D3748] tracking-tight">
                            Hapus Admin?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-slate-400 font-medium leading-relaxed mt-2 text-[15px]">
                            Akses untuk <span className="text-indigo-500 font-bold bg-indigo-50/50 px-2 py-0.5 rounded-lg">"{selectedData.name}"</span> akan dihapus permanen dari sistem.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                </div>

                {/* Footer Action dengan Tombol Dark Navy Premium */}
                <AlertDialogFooter className="p-10 pt-2 gap-3 sm:justify-center flex-row">
                    <AlertDialogCancel
                        disabled={isLoading}
                        className="flex-1 rounded-full border-none bg-[#F8FAFC] text-slate-400 font-bold h-14 hover:bg-slate-100 transition-all m-0"
                    >
                        Batal
                    </AlertDialogCancel>

                    <AlertDialogAction
                        onClick={handleDelete}
                        disabled={isLoading}
                        className="flex-1 rounded-full bg-[#1A1F2C] hover:bg-indigo-950 h-14 font-black text-white shadow-xl shadow-indigo-100 transition-all active:scale-95 border-none m-0"
                    >
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            "Ya, Hapus"
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}