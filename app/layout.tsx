import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/rootLayout/Navbar";
import Footer from "@/components/rootLayout/Footer";
import { CartProvider } from "@/utils/CartContext";

export const metadata: Metadata = {
  title: "Buyzaar",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
