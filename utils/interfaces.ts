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
  count: number;
}

export interface CartContextType {
  cart: ICartItem[];
  updateCart: () => void;
}
