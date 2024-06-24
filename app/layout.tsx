import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Notekeeper",
  description: "App to maintain notes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link
        rel="icon"
        href="https://note-keeper.s3.eu-north-1.amazonaws.com/note-keeper-icons/fabicon.png"
        sizes="any"
      />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
