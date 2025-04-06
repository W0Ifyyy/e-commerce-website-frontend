import api from "@/lib/axios";

export const getBestSellers = async () =>
  await api.get("http://localhost:5000/products");
