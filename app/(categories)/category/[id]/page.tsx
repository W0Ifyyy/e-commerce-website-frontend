"use client";

import ProductsSection from "@/components/categories/ProductSection";
import { getCategory } from "@/services/categories";
import { ICategoryDetails } from "@/utils/interfaces";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CategoryProducts() {
  const [categoryData, setCategoryData] = useState<ICategoryDetails | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const params = useParams();
  const parsedId = parseInt(params.id as string, 10);
  if (isNaN(parsedId)) {
    throw new Error("Invalid category ID");
  }
  const categoryId = parsedId;
  useEffect(() => {
    async function fetchCategoryData() {
      try {
        let response = await getCategory(categoryId);
        setCategoryData(response.data);
        console.log(response.data);
      } catch (error) {
        setError(true);
        console.error("Error fetching category data:", error);
      }
    }
    fetchCategoryData();
    setLoading(false);
  }, [categoryId]);
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error loading category data.</div>
      ) : (
        categoryData && (
          <>
            <h1 className="text-2xl font-bold mb-4">{categoryData.name}</h1>
            <ProductsSection products={categoryData.products} />
          </>
        )
      )}
    </div>
  );
}
