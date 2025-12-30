import { PaginationMeta, ProductPaginationProps } from "@/utils/interfaces";
import { ProductPagination } from "./ProductPagination";

// Products section: shows a paginated product list wrapped with cart context
export default function ProductsSection({
  products,
  showTitle = true,
  title = "Products",
  paginationMeta,
  paginationBasePath,
  paginationQuery,
}: ProductPaginationProps & {
  showTitle?: boolean;
  title?: string;
  paginationMeta?: PaginationMeta;
  paginationBasePath?: string;
  paginationQuery?: Record<string, string | number | undefined>;
}) {
  return (
    <section className="py-10">
      {showTitle ? (
        <h2 className="text-3xl font-bold text-center mb-6 text-slate-900">
          {title}
        </h2>
      ) : null}
      {/* client-side pagination + cards */}
      <ProductPagination
        products={products}
        meta={paginationMeta}
        basePath={paginationBasePath}
        query={paginationQuery}
      />
    </section>
  );
}
