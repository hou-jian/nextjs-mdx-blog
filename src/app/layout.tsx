import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hou Jian",
  description: `HouJian's Web技术分享博客. 所用技术：Next.js(React) TailWindCSS MDX Shiki Sandpack use-sound`,
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
