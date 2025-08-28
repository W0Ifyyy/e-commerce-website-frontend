import api from "@/lib/axios";

export const getBestSellers = async () =>
  await api.get("http://localhost:5000/products");

export const getProducts = async () =>
  await api.get("http://localhost:5000/products");
