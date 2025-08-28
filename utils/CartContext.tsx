"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

// Use the same interface as cartUtils
export interface CartItem {
  id: number;
  count: number;
}

// Product interface for price calculations
export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
}

// Updated context type to match cartUtils interface
interface CartContextType {
  cart: CartItem[];
  loading: boolean;
  getCart: () => CartItem[];
  addToCart: (productId: number, count?: number) => void;
  removeFromCart: (productId: number) => void;
  updateCartItem: (productId: number, count: number) => void;
  clearCart: () => void;
  // New additions
  totalItems: number;
  calculateTotalPrice: (products: Product[]) => number;
  formatPrice: (price: number) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Cookie name constant
const CART_COOKIE_NAME = "cart_data";

// Cookie options
const COOKIE_OPTIONS = {
  expires: 7, // 7 days
  path: "/",
  sameSite: "strict" as const,
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Get cart items - matches cartUtils.getCart()
  const getCart = (): CartItem[] => {
    return cart;
  };

  // Update cart from cookies
  const updateCartFromCookies = () => {
    try {
      const cookieCart = Cookies.get(CART_COOKIE_NAME);
      setCart(cookieCart ? JSON.parse(cookieCart) : []);
    } catch (error) {
      console.error("Error parsing cart data:", error);
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to save cart to cookies
  const saveCart = (cartItems: CartItem[]) => {
    Cookies.set(CART_COOKIE_NAME, JSON.stringify(cartItems), COOKIE_OPTIONS);
    setCart(cartItems);

    // Dispatch event for any components listening for cart updates
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("cartUpdated"));
    }
  };

  // Add item to cart - matches cartUtils.addToCart()
  const addToCart = (productId: number, count: number = 1) => {
    const updatedCart = [...cart];
    const existingItem = updatedCart.find((item) => item.id === productId);

    if (existingItem) {
      existingItem.count += count;
    } else {
      updatedCart.push({ id: productId, count });
    }

    saveCart(updatedCart);
  };

  // Remove item from cart - matches cartUtils.removeFromCart()
  const removeFromCart = (productId: number) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    saveCart(updatedCart);
  };

  // Update item count - matches cartUtils.updateCartItem()
  const updateCartItem = (productId: number, count: number) => {
    if (count <= 0) {
      removeFromCart(productId);
      return;
    }

    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, count } : item
    );
    saveCart(updatedCart);
  };

  // Clear cart - matches cartUtils.clearCart()
  const clearCart = () => {
    Cookies.remove(CART_COOKIE_NAME, { path: "/" });
    setCart([]);

    // Dispatch event for any components listening for cart updates
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("cartUpdated"));
    }
  };

  // NEW: Calculate total items in cart
  const totalItems = cart.reduce((sum, item) => sum + item.count, 0);

  // NEW: Calculate total price based on products data
  const calculateTotalPrice = (products: Product[]): number => {
    return cart.reduce((total, cartItem) => {
      const product = products.find((p) => p.id === cartItem.id);
      if (product) {
        return total + product.price * cartItem.count;
      }
      return total;
    }, 0);
  };

  // NEW: Format price consistently
  const formatPrice = (price: number): string => {
    return `$${price.toFixed(2)}`;
  };

  // Initialize cart from cookies on component mount
  useEffect(() => {
    updateCartFromCookies();

    // Listen for cart updates from other components
    const handleCartUpdated = () => {
      updateCartFromCookies();
    };

    if (typeof window !== "undefined") {
      window.addEventListener("cartUpdated", handleCartUpdated);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("cartUpdated", handleCartUpdated);
      }
    };
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        getCart,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart,
        // New additions
        totalItems,
        calculateTotalPrice,
        formatPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

// For direct usage without hooks (compatible with cartUtils)
export const getCart = (): CartItem[] => {
  if (typeof window === "undefined") return [];

  try {
    const cookieCart = Cookies.get(CART_COOKIE_NAME);
    return cookieCart ? JSON.parse(cookieCart) : [];
  } catch (error) {
    console.error("Error parsing cart cookie:", error);
    return [];
  }
};

export const addToCart = (productId: number, count: number = 1) => {
  const cart = getCart();
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.count += count;
  } else {
    cart.push({ id: productId, count });
  }

  Cookies.set(CART_COOKIE_NAME, JSON.stringify(cart), COOKIE_OPTIONS);

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("cartUpdated"));
  }
};

export const removeFromCart = (productId: number) => {
  const cart = getCart().filter((item) => item.id !== productId);

  Cookies.set(CART_COOKIE_NAME, JSON.stringify(cart), COOKIE_OPTIONS);

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("cartUpdated"));
  }
};

export const updateCartItem = (productId: number, count: number) => {
  if (count <= 0) {
    removeFromCart(productId);
    return;
  }

  const cart = getCart();
  const item = cart.find((item) => item.id === productId);

  if (item) {
    item.count = count;
    Cookies.set(CART_COOKIE_NAME, JSON.stringify(cart), COOKIE_OPTIONS);

    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("cartUpdated"));
    }
  }
};

export const clearCart = () => {
  Cookies.remove(CART_COOKIE_NAME, { path: "/" });

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("cartUpdated"));
  }
};

export const getTotalItems = (): number => {
  return getCart().reduce((sum, item) => sum + item.count, 0);
};

export const calculateTotalPrice = (products: Product[]): number => {
  const cart = getCart();
  return cart.reduce((total, cartItem) => {
    const product = products.find((p) => p.id === cartItem.id);
    if (product) {
      return total + product.price * cartItem.count;
    }
    return total;
  }, 0);
};

export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};
