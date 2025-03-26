"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "@/components/ProductCard";

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
        const response = await axios.get("http://localhost:5000/products");
        setBestsellers(response.data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchBestsellers();
  }, []);

  if (loading) return <div>Loading bestsellers...</div>;
  if (error) return <div>Error loading bestsellers.</div>;

  return (
    <section className="p-15 bg-gray-50" id="bestsellers">
      <h2 className="text-3xl font-bold text-center mb-6">
        Our bestsellers 🔥
      </h2>
      <div className="flex gap-20 items-center justify-center">
        {bestsellers.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
}
