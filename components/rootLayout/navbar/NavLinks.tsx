"use client";

import { useCart } from "@/utils/CartContext";
import api from "@/lib/axios";
import Link from "next/link";
import React from "react";

export function NavLinks({
  isLoggedIn,
  username,
}: {
  isLoggedIn: boolean;
  username: string | null;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { cart } = useCart();

  // logout then hard refresh to clear client state
  const handleLogout = async () => {
    try {
      await api.post(
        "/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      window.location.reload();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <ul className="flex gap-8 items-center">
      {/* cart link with icon and item count */}
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
          {/* sign-in / sign-up when logged out */}
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
        // avatar button toggles dropdown with actions
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
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-gray-200 hover:cursor-pointer"
                onClick={() => handleLogout()}
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
