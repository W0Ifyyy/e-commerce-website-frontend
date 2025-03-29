"use client";

import { useState } from "react";
import { IProduct } from "@/utils/interfaces";

interface ProductsSectionProps {
  products: IProduct[];
}

export default function ProductsSection({ products }: ProductsSectionProps) {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Calculate total pages based on the length of products array
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Determine the products to display for the current page
  const currentProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section className="py-10">
      <h2 className="text-3xl font-bold text-center mb-6">Products</h2>
      <div className="flex flex-col gap-4 ">
        {currentProducts.map((product) => (
          <CategoryProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            imageUrl={product.imageUrl}
          />
        ))}
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center space-x-4 mt-8">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="self-center">
          {currentPage} / {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </section>
  );
}

export function CategoryProductCard({
  id,
  name,
  description,
  price,
  imageUrl,
}: {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}) {
  return (
    <div key={id} className="flex bg-white shadow-lg rounded-lg p-4">
      {/* Left: Product Image */}
      <div className="w-1/3 relative">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-auto max-h-40 object-cover rounded-lg"
        />
      </div>
      {/* Right: Details */}
      <div className="w-2/3 flex flex-col justify-between pl-4">
        <div>
          <h3 className="text-xl font-semibold">{name}</h3>
        </div>
        <div>
          <p className="text-lg font-bold">${price.toFixed(2)}</p>
          <button className="mt-2 bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
