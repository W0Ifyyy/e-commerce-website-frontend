"use client";

import { useEffect, useState } from "react";
import BestSellerProductCard from "@/components/mainPage/BestSellerProductCard";
import { getBestSellers } from "@/services/products";

interface IProduct {
  id: number;
  name: string;
  desc: string;
  price: number;
  imageUrl: string;
}

export default function BestsellerSection() {
  const [bestsellers, setBestsellers] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchBestsellers() {
      try {
        const response = await getBestSellers();
        setBestsellers(response.data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchBestsellers();
  }, []);

  return (
    <section className="p-15 bg-gray-50" id="bestsellers">
      <h2 className="text-3xl font-bold text-center mb-6">
        Our bestsellers 🔥
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {loading ? (
          <div>Loading bestsellers...</div>
        ) : error ? (
          <div>Error loading bestsellers.</div>
        ) : (
          bestsellers
            .slice(0, 6) // Only for now, todo: add bestsellers to the backend
            .map((product) => (
              <BestSellerProductCard key={product.id} {...product} />
            ))
        )}
      </div>
    </section>
  );
}
