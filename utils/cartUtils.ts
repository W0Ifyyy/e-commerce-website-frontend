export interface CartItem {
  id: number;
  count: number;
}

export const getCart = (): CartItem[] => {
  if (typeof window !== "undefined") {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  }
  return [];
};

const saveCart = (cart: CartItem[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
  }
};

export const addToCart = (productId: number, count: number = 1) => {
  if (typeof window !== "undefined") {
    const cart = getCart();
    const existingItem = cart.find((item) => item.id === productId);
    if (existingItem) {
      existingItem.count += count;
    } else {
      cart.push({ id: productId, count });
    }
    saveCart(cart);
  }
};

export const updateCartItem = (productId: number, count: number) => {
  if (typeof window !== "undefined") {
    const cart = getCart();
    const item = cart.find((item) => item.id === productId);
    if (item) {
      item.count = count;
      if (item.count <= 0) {
        removeFromCart(productId);
        return;
      }
      saveCart(cart);
    }
  }
};
export const removeFromCart = (productId: number) => {
  if (typeof window !== "undefined") {
    const cart = getCart().filter((item) => item.id !== productId);
    saveCart(cart);
  }
};

export const clearCart = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("cartUpdated"));
  }
};
