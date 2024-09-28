"use client";
import { RecoilRoot } from "recoil";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <RecoilRoot>{children}</RecoilRoot>
      </body>
    </html>
  );
}
