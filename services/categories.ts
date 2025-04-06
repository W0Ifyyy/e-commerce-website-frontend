import api from "@/lib/axios";

export const getCategory = async (categoryId: number) =>
  await api.get(`http://localhost:5000/category/details/${categoryId}`);

export const getCategories = async () =>
  await api.get("http://localhost:5000/category");
