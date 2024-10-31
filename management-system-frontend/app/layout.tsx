import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CSAPP Management System",
  description: "A CSAPP lab management system for NJUPT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        <div className="w-screen h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
