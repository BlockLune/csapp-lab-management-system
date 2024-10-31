import SideBar from "@/components/side-bar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-screen h-screen flex">
        <SideBar>
            SideBar
        </SideBar>
        <main className="flex-1 p-4 bg-[#f8f9fe] dark:bg-[#151725]">
            {children}
        </main>
    </div>
  );
}