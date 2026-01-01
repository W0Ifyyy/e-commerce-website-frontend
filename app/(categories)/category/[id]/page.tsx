import ProductsSection from "@/components/categories/ProductSection";
import api from "@/lib/apiClientBrowser";
import type { ICategoryDetails } from "@/utils/interfaces";
import Link from "next/link";

// Category page: fetch category by id and render its products
export default async function CategoryProducts({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let categoryData: ICategoryDetails | null = null;

  try {
    const response = await api.get(`/category/${id}`);
    categoryData = response.data;
  } catch (error) {
    console.error("Error fetching category data:", error);
  }

  if (!categoryData) {
    return (
      <div className="min-h-[90vh] bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h1 className="text-xl font-semibold text-slate-900">
              Category not found
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Unable to load category information. Please try again later.
            </p>
            <div className="mt-6">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-px hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                <span aria-hidden className="text-lg leading-none">
                  ←
                </span>

                <span>Products</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const count = Array.isArray(categoryData.products)
    ? categoryData.products.length
    : 0;

  return (
    <div className="min-h-[90vh] bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header: breadcrumb + category name */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-px hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              <span aria-hidden className="text-lg leading-none">
                ←
              </span>
              <span>Products</span>
            </Link>

            <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-slate-500">
              Category
            </p>
            <h1 className="mt-1 text-2xl font-semibold text-slate-900 sm:text-3xl">
              {categoryData.name}
            </h1>
          </div>

          <p className="text-sm text-slate-600">
            {count} product{count === 1 ? "" : "s"}
          </p>
        </div>

        {/* Products list (hide inner "Products" title to avoid duplication) */}
        <ProductsSection products={categoryData.products} showTitle={false} />
      </div>
    </div>
  );
}