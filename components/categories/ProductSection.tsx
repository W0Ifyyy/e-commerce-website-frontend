import { ProductPaginationProps } from "@/utils/interfaces";
import { ProductPagination } from "./ProductPagination";
import { CartProvider } from "@/utils/CartContext";

export default function ProductsSection({ products }: ProductPaginationProps) {
  return (
    <section className="py-10">
      <h2 className="text-3xl font-bold text-center mb-6">Products</h2>
      <CartProvider>
        <ProductPagination products={products} />
      </CartProvider>
    </section>
  );
}
