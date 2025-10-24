"use client";

import api from "@/lib/axios";
import { CartProvider, useCart } from "@/utils/CartContext";
import { IProduct } from "@/utils/interfaces";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

/**
 * Top-level wrapper for the cart page.
 * - Provides CartContext to all children
 * - Accepts auth/user info from parent route
 */
export default function CartPageContentMain({
  isAuthenticated = false,
  userId = null,
}: {
  isAuthenticated: boolean;
  userId?: string | null;
}) {
  return (
    <CartProvider>
      {/* Page content is separated so the provider remains tiny */}
      <CartPageContent isAuthenticated={isAuthenticated} userId={userId} />
    </CartProvider>
  );
}

/**
 * Simple loading state shown while products are fetched.
 */
const CartLoading = () => (
  <div className="w-full text-center py-12">
    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
    <p className="mt-2 text-gray-600">Loading your cart...</p>
  </div>
);

/**
 * Empty cart UX with a CTA back to product listing.
 */
const EmptyCart = () => (
  <div className="w-full max-w-lg text-center py-12 bg-white rounded-md shadow-sm">
    <div className="flex justify-center mb-4">
      <svg className="w-20 h-20 text-gray-300" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
    <h2 className="text-xl font-bold mb-2">Your cart is empty</h2>
    <p className="text-sm text-gray-600 mb-6">
      Discover our amazing products and add something special to your cart!
    </p>
    <Link href="/products">
      <button className="px-6 py-2 border border-orange-500 text-orange-500 rounded hover:bg-orange-50 transition-colors flex items-center mx-auto">
        Explore Products
      </button>
    </Link>
  </div>
);

/**
 * Single cart item row.
 * Props:
 * - product: product data for display
 * - quantity: current quantity in cart
 * - onUpdate: handler to change quantity
 * - onRemove: handler to remove the item
 */
const CartItem = ({ product, quantity, onUpdate, onRemove }) => {
  // Calculate item total on render for display only
  const itemTotal = product.price * quantity;

  return (
    <div
      key={product.id}
      className="bg-white shadow-md rounded-lg p-4 flex flex-col sm:flex-row items-center"
    >
      {/* Product thumbnail */}
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-32 h-32 object-cover mr-4"
      />

      {/* Content block: name, price, description, actions */}
      <div className="flex flex-col flex-1">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <h2 className="text-xl font-semibold mb-2 text-center sm:text-left">
            {product.name}
          </h2>
          <span className="font-medium">${product.price?.toFixed(2)}</span>
        </div>

        <p className="text-gray-600 mb-4 text-center sm:text-left line-clamp-2">
          {product.description}
        </p>

        {/* Quantity controls + item total + remove */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-auto">
          {/* Quantity selector */}
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Quantity:</span>
            <div className="flex items-center border rounded">
              <button
                onClick={() => onUpdate(product.id, quantity - 1)}
                className="px-3 py-1 text-orange-500 hover:bg-gray-100"
                disabled={quantity <= 1}
              >
                −
              </button>
              <span className="px-3 py-1 font-medium border-l border-r">
                {quantity}
              </span>
              <button
                onClick={() => onUpdate(product.id, quantity + 1)}
                className="px-3 py-1 text-orange-500 hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Item total + remove action */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <span className="font-medium">Total: ${itemTotal.toFixed(2)}</span>
            <div className="flex gap-2">
              <button
                className="px-4 py-2 border border-orange-500 text-orange-500 rounded hover:bg-orange-100"
                onClick={() => onRemove(product.id)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Right column summary with totals and checkout CTA.
 * Props:
 * - totalItems: number of items in cart
 * - totalPrice: subtotal calculated from items
 * - onCheckout: triggers checkout flow
 */
const OrderSummary = ({ totalItems, totalPrice, onCheckout }) => (
  <div className="bg-white shadow-md rounded-lg p-6 sticky top-4">
    <h2 className="text-xl font-bold mb-4">Order Summary</h2>

    {/* Subtotal and shipping (static free) */}
    <div className="space-y-2 mb-4">
      <div className="flex justify-between">
        <span>Subtotal ({totalItems} items)</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span>Shipping</span>
        <span>Free</span>
      </div>
    </div>

    {/* Final total */}
    <div className="border-t my-4 pt-4">
      <div className="flex justify-between font-bold text-lg">
        <span>Total</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>
    </div>

    {/* Actions: proceed to payment or continue shopping */}
    <div className="mt-6 space-y-3">
      <button
        onClick={onCheckout}
        className="w-full px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
      >
        Proceed to Payment
      </button>

      <Link href="/products" className="block">
        <button className="w-full px-4 py-2 border border-gray-400 text-gray-600 rounded hover:bg-gray-200">
          Continue Shopping
        </button>
      </Link>
    </div>
  </div>
);

/**
 * Main cart content:
 * - pulls cart state from context
 * - fetches product details for items in cart
 * - renders list + summary or empty/loading/error states
 */
export function CartPageContent({
  isAuthenticated,
  userId = null,
}: {
  isAuthenticated: boolean;
  userId?: string | null;
}) {
  // Cart state and helpers from context
  const {
    cart,
    removeFromCart,
    updateCartItem,
    totalItems,
    calculateTotalPrice,
  } = useCart();

  // Local UI state for fetched products and network status
  const [products, setProducts] = useState<IProduct[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  /**
   * Fetch products for IDs currently in the cart.
   * Early-return when cart is empty to avoid a request.
   */
  useEffect(() => {
    async function fetchProducts() {
      const cartIds = cart.map((item) => item.id);

      // Nothing in cart → mark as loaded with empty list
      if (cartIds.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }

      try {
        // Request product details for the given IDs
        const response = await api.post("/products/all", {
          ids: cartIds,
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setError("Failed to fetch products");
      }
      setLoading(false);
    }

    fetchProducts();
  }, [cart]);

  /**
   * Helper to read quantity for a given product from the cart.
   */
  const getItemQuantity = (productId: number) => {
    const item = cart.find((item) => item.id === productId);
    return item ? item.count : 0;
  };

  /**
   * Subtotal across the fetched products.
   * (calculateTotalPrice comes from CartContext)
   */
  const totalPrice = products ? calculateTotalPrice(products) : 0;

  /**
   * Checkout flow:
   * - guard by auth
   * - create order (server)
   * - create checkout session and redirect to provider
   */
  async function handleCheckout() {
    if (!isAuthenticated) {
      router.push("/sign-in");
      return;
    }

    try {
      // Prepare order payload from cart items
      const orderData = {
        name: `Order ${new Date().toLocaleDateString()}`,
        userId: userId,
        items: products?.map((product) => ({
          productId: product.id,
          quantity: getItemQuantity(product.id), // Include quantity for each product
        })),
        totalAmount: totalPrice,
        status: "PENDING",
      };

      // Create order
      const orderResponse = await api.post("/orders", orderData);
      const orderId = orderResponse.data.order.id;

      // Prepare items for checkout provider
      const cartItems = products?.map((product) => ({
        name: product.name,
        price: product.price,
        quantity: getItemQuantity(product.id),
      }));

      // Create checkout session and redirect user
      const checkoutResponse = await api.post("/checkout/finalize", {
        orderId,
        userId,
        products: cartItems,
      });

      if (checkoutResponse.data.url) {
        window.location.href = checkoutResponse.data.url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  }

  return (
    <main className="bg-gray-50">
      <div className="container mx-auto flex flex-col items-center justify-center p-4">
        {/* Header with live item count */}
        <h1 className="text-4xl font-bold mb-4">
          Your Cart {totalItems > 0 && `(${totalItems} items)`}
        </h1>

        {/* Choose which UI to show based on data state */}
        {loading ? (
          <CartLoading />
        ) : error ? (
          <p className="text-lg text-red-500">{error}</p>
        ) : products && products.length > 0 ? (
          // Cart with items: grid with list + summary
          <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: list of cart items */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {products.map((product) => (
                <CartItem
                  key={product.id}
                  product={product}
                  quantity={getItemQuantity(product.id)}
                  onUpdate={updateCartItem}
                  onRemove={removeFromCart}
                />
              ))}
            </div>

            {/* Right: order summary and CTAs */}
            <div className="lg:col-span-1">
              <OrderSummary
                totalItems={totalItems}
                totalPrice={totalPrice}
                onCheckout={handleCheckout}
              />
            </div>
          </div>
        ) : (
          // No items → empty state
          <EmptyCart />
        )}
      </div>
    </main>
  );
}
