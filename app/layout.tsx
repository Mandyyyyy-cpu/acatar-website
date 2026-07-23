import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "专属数字藏品",
  description: "查看并保存你的专属图片",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
