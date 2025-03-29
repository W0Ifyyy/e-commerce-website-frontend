import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/rootLayout/Navbar";
import Footer from "@/components/rootLayout/Footer";

export const metadata: Metadata = {
  title: "Buyzaar",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
