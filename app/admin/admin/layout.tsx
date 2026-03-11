// app/admin/admin/layout.tsx
export default function LayoutAdminData({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-slate-50/50">
            {children}
        </div>
    );
}