import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/utils/CartContext";

export default function SuccessPageContent() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
        <div className="w-16 h-16 bg-orange-100 rounded-full mx-auto flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-orange-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-2">Payment Successful</h1>
        <p className="text-gray-600 mb-6">Thank you for your purchase!</p>
        <Link
          href="/"
          className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-md transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
