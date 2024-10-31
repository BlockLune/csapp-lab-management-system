import type { Metadata } from "next";
import { Theme } from "@radix-ui/themes";

import "./globals.css";
import "@radix-ui/themes/styles.css";

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
        <Theme accentColor="jade" grayColor="sage">
          {children}
        </Theme>
      </body>
    </html>
  );
}
