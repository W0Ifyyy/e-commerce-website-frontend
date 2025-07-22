"use client";
import { useCart } from "@/utils/CartContext";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLoggedState } from "@/utils/LoggedStateContext";

export default function Navbar() {
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
        <NavLinks />
      </nav>
      <div className="md:hidden w-full bg-neutral-50 shadow shadow-white py-3">
        <SearchBar />
      </div>
    </>
  );
}

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?name=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="w-full flex justify-center items-center">
      <input
        type="text"
        className="flex-grow border border-gray-200 py-2 px-4 md:rounded-l-lg h-10"
        placeholder="Search for products"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <button
        className="bg-orange-300 text-white py-2 px-4 sm:rounded-r-lg h-10 hover:bg-orange-400 hover:cursor-pointer transition-colors"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}
export function NavLinks() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, username, logout } = useLoggedState();
  const { cart } = useCart();
  const router = useRouter();

  return (
    <ul className="flex gap-8 items-center">
      <li>
        <Link href="/cart" className="hover:cursor-pointer flex items-center">
          <button className="hover:cursor-pointer py-1 px-1 transition-colors border border-transparent">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 hover:text-orange-400 transition-colors"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </button>
          <span className="hidden sm:block">{cart.length}</span>
        </Link>
      </li>

      {!isLoggedIn ? (
        <>
          <li>
            <Link href={"/sign-in"} className="hover:cursor-pointer">
              <button className="border rounded border-orange-200 text-gray-700 hover:bg-gray-100 hover:cursor-pointer px-2 py-1 sm:px-4 transition-colors">
                Sign-in
              </button>
            </Link>
          </li>
          <li>
            <Link href={"/sign-up"} className="hover:cursor-pointer">
              <button className="border rounded border-orange-200 text-gray-700 hover:bg-gray-100 hover:cursor-pointer px-2 py-1 sm:px-4 transition-colors">
                Sign-up
              </button>
            </Link>
          </li>
        </>
      ) : (
        <li className="relative">
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="w-8 h-8 rounded-full bg-black cursor-pointer"
          ></div>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
              <Link
                href="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Profile - {username}
              </Link>
              <Link
                href="/settings"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Settings
              </Link>
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  logout();
                  router.push("/");
                }}
              >
                Logout
              </button>
            </div>
          )}
        </li>
      )}
    </ul>
  );
}
