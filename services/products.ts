import api from "@/lib/axios";
import type { IProduct, PaginatedResponse } from "@/utils/interfaces";

export const getBestSellers = async () => await api.get("/products");

export const getProducts = async () => await api.get("/products");

export const getProductsPaginated = async (page: number, limit: number) =>
	await api.get<PaginatedResponse<IProduct>>(`/products?page=${page}&limit=${limit}`);
