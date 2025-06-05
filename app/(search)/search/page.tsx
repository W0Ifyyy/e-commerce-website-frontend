"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductsSection from "@/components/categories/ProductSection";
import { IProduct, ProductPaginationProps } from "@/utils/interfaces";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("name") || "";

  const [productData, setProductData] = useState<null | IProduct[]>(null);

  async function fetchSearchResults() {
    if (searchTerm) {
      try {
        const response = await fetch(
          `http://localhost:5000/products/search?name=${searchTerm}`
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
  }, [searchTerm]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Search Results</h1>
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
        {searchTerm ? (
          <div>
            <p className="text-gray-700 mb-4">Results for: {searchTerm}</p>
            {productData ? (
              <ProductsSection products={productData} />
            ) : (
              <p>Loading results...</p>
            )}
          </div>
        ) : (
          <p className="text-gray-700">No search term provided.</p>
        )}
      </div>
    </div>
  );
}
