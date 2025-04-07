"use client";

import { ICategory } from "@/utils/interfaces";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getCategories } from "@/services/categories";
import Image from "next/image";

export default function CategoriesSection() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [categoriesData, setCategoriesData] = useState<ICategory[]>([]);
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await getCategories();
        setCategoriesData(response.data);
      } catch (error) {
        setError(true);
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
        setIsMounted(true);
      }
    }
    fetchCategories();
  }, []);
  if (!isMounted) return null;
  if (loading) return <div>Loading categories...</div>;
  if (error) return <div>Error loading categories.</div>;

  return (
    <section className="py-15 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-6">Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {categoriesData.map((category) => (
          <div
            key={category.id}
            className="bg-white shadow rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:shadow-lg transition-shadow duration-300"
            onClick={() => router.push(`/category/${category.id}`)}
          >
            {category.imageUrl ? (
              <Image
                src={`${category.imageUrl}`}
                alt={category.name}
                width={80}
                height={80}
                className="w-20 h-20 object-cover rounded-full mb-4"
              />
            ) : (
              <div className="w-20 h-20 bg-gray-300 rounded-full mb-4 flex items-center justify-center">
                <span className="text-xl font-bold text-gray-700">
                  {category.name[0]}
                </span>
              </div>
            )}
            <h3 className="text-xl font-semibold">{category.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
