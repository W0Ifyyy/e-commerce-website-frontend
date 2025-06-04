export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: number;
}

export interface ICategoryDetails {
  id: number;
  name: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  products: IProduct[];
}

export interface ICategory {
  id: number;
  name: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface BestsellerCarouselProps {
  products: IProduct[];
}

export interface ICartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

// Make sure to update your CartContextType in interfaces.ts
export interface CartContextType {
  cart: ICartItem[];
  updateCart: () => void;
  addToCart: (item: ICartItem) => void;
  removeFromCart: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
}

export interface ProductPaginationProps {
  products: IProduct[];
}
