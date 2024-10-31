export default function SideBar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <aside
      className="w-48 h-screen p-4 border-r
                  flex flex-col gap-4
                  bg-gray-3 border-gray-5
                  dark:bg-bluedark-2 dark:border-bluedark-3"
    >
      {children}
    </aside>
  );
}

