"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export interface CartItem {
  id: number;
  count: number;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
}

// public API exposed by the context
interface CartContextType {
  cart: CartItem[];
  loading: boolean;
  getCart: () => CartItem[];
  addToCart: (productId: number, count?: number) => void;
  removeFromCart: (productId: number) => void;
  updateCartItem: (productId: number, count: number) => void;
  clearCart: () => void;
  totalItems: number;
  calculateTotalPrice: (products: Product[]) => number;
  formatPrice: (price: number) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// single cookie key for the cart
const CART_COOKIE_NAME = "cart_data";

// cookie config (client cookie)
const COOKIE_OPTIONS = {
  expires: 7,
  path: "/",
  sameSite: "strict" as const,
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const getCart = (): CartItem[] => {
    return cart;
  };

  // read cart from cookie and load into state
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

  // write cart to cookie, update state, and broadcast change
  const saveCart = (cartItems: CartItem[]) => {
    Cookies.set(CART_COOKIE_NAME, JSON.stringify(cartItems), COOKIE_OPTIONS);
    setCart(cartItems);

    // let other tabs/components know cart changed
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("cartUpdated"));
    }
  };

  // add or bump item quantity
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

  // remove item completely
  const removeFromCart = (productId: number) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    saveCart(updatedCart);
  };

  // set exact quantity
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

  // clear all cart data
  const clearCart = () => {
    Cookies.remove(CART_COOKIE_NAME, { path: "/" });
    setCart([]);

    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("cartUpdated"));
    }
  };

  // derived: total items count
  const totalItems = cart.reduce((sum, item) => sum + item.count, 0);

  // derived: sum(price * qty) using given products
  const calculateTotalPrice = (products: Product[]): number => {
    return cart.reduce((total, cartItem) => {
      const product = products.find((p) => p.id === cartItem.id);
      if (product) {
        return total + product.price * cartItem.count;
      }
      return total;
    }, 0);
  };

  // display helper
  const formatPrice = (price: number): string => {
    return `$${price.toFixed(2)}`;
  };

  // load cart from cookie on mount and sync on "cartUpdated"
  useEffect(() => {
    updateCartFromCookies();

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
        totalItems,
        calculateTotalPrice,
        formatPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// hook to access cart (must be inside provider)
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

// read cart directly from cookie
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

// add item without context
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

// remove item without context
export const removeFromCart = (productId: number) => {
  const cart = getCart().filter((item) => item.id !== productId);

  Cookies.set(CART_COOKIE_NAME, JSON.stringify(cart), COOKIE_OPTIONS);

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("cartUpdated"));
  }
};

// set quantity without context
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

// clear cookie without context
export const clearCart = () => {
  Cookies.remove(CART_COOKIE_NAME, { path: "/" });

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("cartUpdated"));
  }
};

// total items using cookie
export const getTotalItems = (): number => {
  return getCart().reduce((sum, item) => sum + item.count, 0);
};

// total price using cookie + products list
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

// price formatting helper
export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};
