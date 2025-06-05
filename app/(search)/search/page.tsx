"use client";
import { get } from "http";
import { useEffect, useState } from "react";

export default function SearchPage({
  searchParams,
}: {
  searchParams: { name?: string };
}) {
  const [getProductData, setProductData] = useState<any>(null);
  console.log(getProductData);
  async function fetchSearchResults() {
    if (searchParams.name) {
      try {
        const response = await fetch(
          `http://localhost:5000/products/search?name=${searchParams.name}`
        );
        const data = await response.json();
        setProductData(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }
  }
  useEffect(() => {
    fetchSearchResults();
  }, [searchParams.name]);
  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Search Results</h1>
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
        {searchParams.name ? (
          <p className="text-gray-700">Results for: {searchParams.name}</p>
        ) : (
          <p className="text-gray-700">No search term provided.</p>
        )}
      </div>
    </div>
  );
}

//TODO: FINISH DISPLAYING THE SEARCH RESULTS, FIX 2 ERRORS THAT ARE POPPING UP
