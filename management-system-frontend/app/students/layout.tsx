import SideBar from "@/components/side-bar";
import { Heading, Button } from "@radix-ui/themes";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-screen h-screen flex">
      <SideBar>
        <Heading>CSAPP Management System</Heading>
        <Button variant="ghost">Manage Solutions</Button>
      </SideBar>
      <main className="flex-1 p-4 bg-gray-1 dark:bg-bluedark-1">
        {children}
      </main>
    </div>
  );
}
