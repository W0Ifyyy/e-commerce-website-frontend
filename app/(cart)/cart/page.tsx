"use client";
import api from "@/lib/axios";
import { useCart } from "@/utils/CartContext";
import { IProduct } from "@/utils/interfaces";
import React, { useEffect, useState } from "react";

export default function CartPage() {
  // Use the cart from context instead of localStorage
  const { cart, removeFromCart } = useCart();

  const [products, setProducts] = useState<IProduct[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      // Get product IDs from the cart context inside useEffect
      const cartIds = cart.map((item) => item.id);

      if (cartIds.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }

      try {
        const response = await api.post("/products/all", cartIds);
        setProducts(response.data);
      } catch (error) {
        setError("Failed to fetch products");
      }
      setLoading(false);
    }

    fetchProducts();
  }, [cart]);

  return (
    <main>
      <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
        <h1 className="text-4xl font-bold mb-4">Your Cart</h1>
        {loading ? (
          <p className="text-lg text-gray-700">Loading...</p>
        ) : error ? (
          <p className="text-lg text-red-500">{error}</p>
        ) : products && products.length > 0 ? (
          <div className="flex flex-col gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white shadow-md rounded-lg p-4 flex items-center"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-32 h-32 object-cover mr-4"
                />
                <div className="flex flex-col flex-1">
                  <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                  <p className="text-gray-600 mb-2">{product.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <p className="text-lg font-bold">${product.price}</p>
                    <div className="flex gap-2">
                      <button
                        className="px-4 py-2 border border-orange-500 text-orange-500 rounded hover:bg-orange-100"
                        onClick={() => removeFromCart(product.id)}
                      >
                        Remove from Cart
                      </button>
                      <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
                        Buy
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-lg text-gray-700">Your cart is currently empty.</p>
        )}
        <button className="mt-4 px-6 py-2 border border-gray-400 text-gray-600 rounded hover:bg-gray-200">
          Continue Shopping
        </button>
      </div>
    </main>
  );
}
