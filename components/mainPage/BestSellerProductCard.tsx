"use client";
import { useCart } from "@/utils/CartContext";
import Link from "next/link";

interface BestSellerProductCardProps {
  id: string | number;
  name: string;
  desc: string;
  price: number;
  imageUrl: string;
}

export default function BestSellerProductCard({
  id,
  name,
  desc,
  price,
  imageUrl,
}: BestSellerProductCardProps) {
  const { addToCart } = useCart();

  function handleAddToCart() {
    addToCart(Number(id));
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col justify-center md:block">
      <Link href={`/products/${id}`}>
        <div>
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-48 object-cover rounded-lg"
          />
          <h3 className="text-lg font-semibold mt-2">{name}</h3>
          <p className="text-gray-500">{desc}</p>
          <p className="text-lg font-semibold mt-2">${price}</p>
        </div>
      </Link>
      <button
        className="bg-orange-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-orange-600 transition-colors"
        onClick={handleAddToCart}
      >
        Add to cart
      </button>
    </div>
  );
}
