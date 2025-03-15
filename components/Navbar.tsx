import React from "react";

export default function Navbar() {
  return (
    <nav className="w-full shadow py-4 px-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold roboto-mono-300 text-orange-500">
        Buyzaar
      </h1>
      <SearchBar />
      <NavLinks />
    </nav>
  );
}

export function SearchBar() {
  return (
    <div className="w-full flex justify-center items-center max-w-5xl mx-auto">
      <input
        type="text"
        className="flex-grow border border-gray-200 py-2 px-4 rounded-l-lg h-10"
        placeholder="Search for products"
      />
      <button className="bg-orange-300 text-white py-2 px-4 rounded-r-lg h-10 hover:bg-orange-400 hover:cursor-pointer transition-colors">
        Search
      </button>
    </div>
  );
}
export function NavLinks() {
  return (
    <ul className="flex gap-8">
      <li>
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
      </li>
      <li>
        <button className="border rounded border-orange-200 text-gray-700 hover:bg-gray-100 hover:cursor-pointer py-1 px-4 transition-colors">
          Sign-in
        </button>
      </li>
      <li>
        <button className="border rounded border-orange-200 text-gray-700 hover:bg-gray-100 hover:cursor-pointer py-1 px-4 transition-colors">
          Sign-up
        </button>
      </li>
    </ul>
  );
}
