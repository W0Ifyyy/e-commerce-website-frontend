"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductsSection from "@/components/categories/ProductSection";
import { IProduct } from "@/utils/interfaces";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [productData, setProductData] = useState<null | IProduct[]>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setSearchTerm(searchParams.get("name") || "");
  }, [searchParams]);

  useEffect(() => {
    if (searchTerm) {
      fetchSearchResults();
    } else {
      setIsLoading(false);
    }
  }, [searchTerm]);

  async function fetchSearchResults() {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/products/search?name=${encodeURIComponent(
          searchTerm
        )}`
      );
      const data = await response.json();
      setProductData(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Search Results</h1>
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
        {!isLoading && searchTerm ? (
          <div>
            <p className="text-gray-700 mb-4">Results for: {searchTerm}</p>
            {productData ? (
              <ProductsSection products={productData} />
            ) : (
              <p>No results found</p>
            )}
          </div>
        ) : !isLoading && !searchTerm ? (
          <p className="text-gray-700">No search term provided.</p>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
