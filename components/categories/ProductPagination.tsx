"use client";

import { useState } from "react";
import { useCart } from "@/utils/CartContext";
import { ProductPaginationProps } from "@/utils/interfaces";
import Link from "next/link";
import Image from "next/image";

// Simple client-side pagination for category products
export function ProductPagination({ products }: ProductPaginationProps) {
  const itemsPerPage = 10; // show 10 items per page
  const [currentPage, setCurrentPage] = useState<number>(1);

  // how many pages we need
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // slice the list for the current page
  const currentProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col w-full">
      {/* product list for current page */}
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

      {/* pager controls */}
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

export default ProductPagination;

// Presentational card; uses CartContext to add item
function CategoryProductCard({
  id,
  name,
  price,
  imageUrl,
}: {
  id: number;
  name: string;
  description: string; // available but not displayed here
  price: number;
  imageUrl: string;
}) {
  const { addToCart } = useCart();

  // add current product to cart
  function handleAddToCart() {
    addToCart(id);
  }

  return (
    <div className="flex bg-white shadow-lg rounded-lg overflow-hidden h-32">
      {/* image links to product details */}
      <Link href={`/products/${id}`} className="w-1/3 h-full flex-shrink-0">
        <div className="h-full w-full relative">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
      </Link>

      {/* basic info + add-to-cart */}
      <div className="w-2/3 flex flex-col justify-between p-4">
        <Link href={`/products/${id}`} className="flex-grow">
          <div>
            <h3 className="text-xl font-semibold">{name}</h3>
            <p className="text-red-600 font-medium">${price.toFixed(2)}</p>
          </div>
        </Link>
        <div className="flex justify-end">
          <button
            className="border border-orange-400 text-black py-2 px-4 rounded hover:bg-orange-500 hover:text-white transition-colors"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
