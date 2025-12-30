import ProductsSection from "@/components/categories/ProductSection";
import { getProductsPaginated } from "@/services/products";

function parsePositiveInt(value: unknown, fallback: number) {
  const n = typeof value === "string" ? parseInt(value, 10) : NaN;
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

export default async function ListedProductsPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string; limit?: string }>;
}) {
  const resolved = searchParams ? await searchParams : undefined;
  const page = parsePositiveInt(resolved?.page, 1);
  const limit = parsePositiveInt(resolved?.limit, 10);

  const { data } = await getProductsPaginated(page, limit);

  return (
    <div className="min-h-[90vh] bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <ProductsSection
          products={data.items}
          paginationMeta={data.meta}
          paginationBasePath="/products"
        />
      </div>
    </div>
  );
}
