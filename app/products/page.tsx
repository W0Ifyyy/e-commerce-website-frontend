import ProductsSection from "@/components/categories/ProductSection";
import { getProducts } from "@/services/products";

export default async function ListedProductsPage() {
  const { data } = await getProducts();

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
      <ProductsSection products={data} />
    </div>
  );
}
