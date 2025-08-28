import ProductsSection from "@/components/categories/ProductSection";
import axios from "axios";

export default async function CategoryProducts({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  let categoryData = null;

  try {
    const response = await axios.get(`http://localhost:5000/category/${id}`);
    categoryData = response.data;
  } catch (error) {
    console.error("Error fetching category data:", error);
  }

  if (!categoryData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-2xl font-bold mb-4">Category not found</h1>
        <p>Unable to load category information. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">{categoryData.name}</h1>
      <ProductsSection products={categoryData.products} />
    </div>
  );
}
