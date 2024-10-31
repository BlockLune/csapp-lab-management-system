export default function SideBar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <aside className="w-48 h-screen p-4 bg-[#f8f9fe] dark:bg-[#151725]
        border-r border-[#e0e1e6] dark:border-[#2f3135]
        ">
            {children}
        </aside>
    );
}