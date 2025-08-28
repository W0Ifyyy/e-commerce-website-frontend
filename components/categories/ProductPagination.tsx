"use client";

import { useState } from "react";
import { useCart } from "@/utils/CartContext";
import { ProductPaginationProps } from "@/utils/interfaces";
import Link from "next/link";

export function ProductPagination({ products }: ProductPaginationProps) {
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
    <div className="flex flex-col w-full">
      <div className="flex flex-col gap-4">
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
      {totalPages > 1 && (
        <div className="flex justify-center space-x-4 mt-8">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 bg-orange-500 text-white rounded disabled:opacity-50"
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
            className="px-4 py-2 bg-orange-500 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

// For backward compatibility (if imported as default)
export default ProductPagination;

function CategoryProductCard({
  id,
  name,
  price,
  imageUrl,
}: {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}) {
  const { addToCart } = useCart();

  function handleAddToCart() {
    addToCart(id);
  }

  return (
    <div className="flex bg-white shadow-lg rounded-lg py-4 px-8">
      {/* Left: Product Image */}
      <Link href={`/products/${id}`}>
        <div className="w-1/3 relative">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-auto max-h-40 object-cover rounded-lg"
          />
        </div>
      </Link>
      {/* Right: Details */}
      <div className="w-2/3 flex flex-col justify-between pl-4">
        <Link href={`/products/${id}`}>
          <div>
            <h3 className="text-xl font-semibold">{name}</h3>
            <p className="text-lg">${price.toFixed(2)}</p>
          </div>
        </Link>
        <hr className="text-gray-300" />
        <div className="flex justify-end">
          <button
            className="mt-2 border border-orange-400 text-black py-2 px-4 rounded hover:bg-orange-500 hover:text-white transition-colors"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
