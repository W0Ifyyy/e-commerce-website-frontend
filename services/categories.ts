import api from "@/lib/apiClientBrowser";

export const getCategory = async (categoryId: number) =>
  await api.get(`/category/details/${categoryId}`);

export const getCategories = async () => await api.get("/category");
