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

export interface ProductPaginationProps {
  products: IProduct[];
}

export type PaginationMeta = {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type PaginatedResponse<T> = {
  items: T[];
  meta: PaginationMeta;
};

export interface IisLoggedIn {
  isLoggedIn: boolean;
}
