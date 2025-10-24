import api from "@/lib/axios";

export const getBestSellers = async () => await api.get("/products");

export const getProducts = async () => await api.get("/products");
