import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export type CartItem = {
  id: number;
  count: number;
};

type CartState = {
  items: CartItem[];
};

const CART_COOKIE_NAME = "cart_data";

const COOKIE_OPTIONS = {
  expires: 7,
  path: "/",
  sameSite: "strict" as const,
  secure: process.env.NODE_ENV === "production",
};

function readCartFromCookie(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const cookieCart = Cookies.get(CART_COOKIE_NAME);
    const parsed = cookieCart ? (JSON.parse(cookieCart) as unknown) : [];
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter(
        (x): x is CartItem =>
          Boolean(x) &&
          typeof x === "object" &&
          Number.isInteger((x as any).id) &&
          Number.isInteger((x as any).count)
      )
      .map((x) => ({ id: x.id, count: x.count }))
      .filter((x) => x.id > 0 && x.count > 0);
  } catch {
    return [];
  }
}

function writeCartToCookie(items: CartItem[]) {
  if (typeof window === "undefined") return;
  Cookies.set(CART_COOKIE_NAME, JSON.stringify(items), COOKIE_OPTIONS);
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    hydrateFromCookie(state) {
      state.items = readCartFromCookie();
    },
    addToCart(state, action: PayloadAction<{ productId: number; count?: number }>) {
      const { productId, count = 1 } = action.payload;
      if (!Number.isInteger(productId) || productId <= 0) return;
      if (!Number.isInteger(count) || count <= 0) return;

      const existing = state.items.find((i) => i.id === productId);
      if (existing) {
        existing.count += count;
      } else {
        state.items.push({ id: productId, count });
      }

      writeCartToCookie(state.items);
    },
    removeFromCart(state, action: PayloadAction<{ productId: number }>) {
      const { productId } = action.payload;
      state.items = state.items.filter((i) => i.id !== productId);
      writeCartToCookie(state.items);
    },
    updateCartItem(state, action: PayloadAction<{ productId: number; count: number }>) {
      const { productId, count } = action.payload;
      if (!Number.isInteger(productId) || productId <= 0) return;

      if (!Number.isInteger(count) || count <= 0) {
        state.items = state.items.filter((i) => i.id !== productId);
        writeCartToCookie(state.items);
        return;
      }

      const item = state.items.find((i) => i.id === productId);
      if (!item) return;

      item.count = count;
      writeCartToCookie(state.items);
    },
    clearCart(state) {
      state.items = [];
      if (typeof window !== "undefined") {
        Cookies.remove(CART_COOKIE_NAME, { path: "/" });
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
