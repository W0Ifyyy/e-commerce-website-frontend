"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
