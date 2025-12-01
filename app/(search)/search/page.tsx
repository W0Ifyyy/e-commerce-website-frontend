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

  // API base URL (from env) with local fallback
  const baseUrl = process.env.NEST_PUBLIC_API_URL || "http://localhost:5000";

  // keep state in sync with the URL param
  useEffect(() => {
    setSearchTerm(searchParams.get("name") || "");
  }, [searchParams]);

  // fetch when term changes; skip if empty
  useEffect(() => {
    async function fetchData() {
      if (!searchTerm) {
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      try {
        const response = await fetch(
          `${baseUrl}/products/search?name=${encodeURIComponent(searchTerm)}`
        );
        const data = await response.json();
        setProductData(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchData();
  }, [searchTerm, baseUrl]);

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
