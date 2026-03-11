// app/admin/admin/delete.tsx
"use client"
import { Admin } from "@/app/types";
import { useRouter } from "next/navigation";
import { getCookie } from "@/lib/client-cookies";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function DeleteAdmin({ selectedData }: { selectedData: Admin }) {
    const router = useRouter();

    const handleDelete = async () => {
        try {
            const token = getCookie("accessToken");
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/admins/${selectedData.id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                router.refresh();
                alert("Admin dihapus!");
            }
        } catch (error) {
            alert("Gagal menghapus.");
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-xl hover:bg-red-50 hover:text-red-500">
                    <Trash2 className="w-4 h-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-[2rem] p-8">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl font-bold">Hapus Admin ini?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Admin <b className="text-red-500">{selectedData.name}</b> akan dihapus permanen dari sistem.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="mt-4">
                    <AlertDialogCancel className="rounded-xl">Batal</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} className="rounded-xl bg-red-500 hover:bg-red-600">Ya, Hapus</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}