import { ProductPaginationProps } from "@/utils/interfaces";
import { ProductPagination } from "./ProductPagination";
import { CartProvider } from "@/utils/CartContext";

// Products section: shows a paginated product list wrapped with cart context
export default function ProductsSection({ products }: ProductPaginationProps) {
  return (
    <section className="py-10">
      <h2 className="text-3xl font-bold text-center mb-6">Products</h2>
      <CartProvider>
        {/* client-side pagination + cards */}
        <ProductPagination products={products} />
      </CartProvider>
    </section>
  );
}
