"use client";

import SuccessPageContent from "@/components/successPage/successPageContent";
import { CartProvider } from "@/utils/CartContext";

export default function SuccessPage() {
  return (
    <CartProvider>
      <SuccessPageContent />
    </CartProvider>
  );
}
