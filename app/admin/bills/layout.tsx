export default function BillsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section className="w-full h-full">
            {children}
        </section>
    )
}