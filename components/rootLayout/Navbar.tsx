import Link from "next/link";
import React from "react";
import { SearchBar } from "./navbar/Searchbar";
import { NavLinks } from "./navbar/NavLinks";
import { CartProvider } from "@/utils/CartContext";

export default function Navbar({
  isLoggedIn = false,
  username,
}: {
  isLoggedIn: boolean;
  username: string;
}) {
  return (
    <>
      <nav className="w-full shadow py-4 px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-bold roboto-mono-300 text-orange-500">
            Buyzaar
          </h1>
        </Link>
        <div className="hidden md:block">
          <SearchBar />
        </div>
        <CartProvider>
          <NavLinks isLoggedIn={isLoggedIn} username={username} />
        </CartProvider>
      </nav>
      <div className="md:hidden w-full bg-neutral-50 shadow shadow-white py-3">
        <SearchBar />
      </div>
    </>
  );
}
