'use client';

import SideBar from "@/components/side-bar";
import { Heading, Button } from "@radix-ui/themes";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuth } from "@/scripts/auth";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  useEffect(() => {
    const auth = getAuth();
    if (!auth || !auth.roles.includes("ROLE_STUDENT")) {
      router.push("/")
    }
  }, []);

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
