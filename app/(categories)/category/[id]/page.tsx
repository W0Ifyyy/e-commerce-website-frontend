import ProductsSection from "@/components/categories/ProductSection";
import api from "@/lib/axios";

// Category page: fetch category by id and render its products
export default async function CategoryProducts({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // route param

  let categoryData = null;

  try {
    const response = await api.get(`/category/${id}`); // fetch category + products
    categoryData = response.data;
  } catch (error) {
    console.error("Error fetching category data:", error); // log server-side
  }

  // empty/error state
  if (!categoryData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-2xl font-bold mb-4">Category not found</h1>
        <p>Unable to load category information. Please try again later.</p>
      </div>
    );
  }

  // render category title and product grid
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">{categoryData.name}</h1>
      <ProductsSection products={categoryData.products} />
    </div>
  );
}