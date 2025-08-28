"use client";

import { useCart } from "@/utils/CartContext";

interface IProductInfo {
  imageUrl: string;
  name: string;
  description: string;
  price: number;
  id: number;
}

export default function ProductsInfo({
  imageUrl,
  name,
  description,
  price,
  id,
}: IProductInfo) {
  const { addToCart } = useCart();
  function handleAddToCart() {
    addToCart(id);
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Product Image Column */}
      <div className="rounded-lg overflow-hidden bg-white  shadow flex items-center justify-center p-6">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="object-contain max-h-[400px] w-auto transition-transform hover:scale-105"
          />
        ) : (
          <div className="p-8 text-gray-400">No image available</div>
        )}
      </div>

      {/* Product Details Column */}
      <div className="flex flex-col justify-between bg-white p-6 rounded-lg">
        <div>
          <h1 className="text-3xl font-bold mb-2">{name}</h1>
          <p className="text-2xl font-semibold text-gray-700 mb-4">
            ${price?.toFixed(2) || "0.00"}
          </p>
          <div className="mb-6">
            <h2 className="font-bold mb-2 text-gray-800">Description</h2>
            <p className="text-gray-700 leading-relaxed">{description}</p>
          </div>
        </div>

        {/* Client component for interactive elements */}
        <button
          className="bg-orange-400 hover:bg-orange-500 text-white py-2 px-6 rounded-lg font-medium transition-colors mt-4 w-fit"
          onClick={handleAddToCart}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
