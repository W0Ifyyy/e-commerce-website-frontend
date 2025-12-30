"use client";

import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { cartActions } from "@/store/cartSlice";
import type { PaginationMeta, ProductPaginationProps } from "@/utils/interfaces";
import Link from "next/link";
import Image from "next/image";

function buildHref(
  basePath: string,
  page: number,
  limit: number,
  query?: Record<string, string | number | undefined>
) {
  const params = new URLSearchParams();

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value === undefined || value === null) continue;
      const str = String(value).trim();
      if (!str) continue;
      params.set(key, str);
    }
  }

  params.set("page", String(page));
  params.set("limit", String(limit));

  return `${basePath}?${params.toString()}`;
}

// Simple client-side pagination for category products
export function ProductPagination({
  products,
  meta,
  basePath = "/products",
  query,
}: ProductPaginationProps & {
  meta?: PaginationMeta;
  basePath?: string;
  query?: Record<string, string | number | undefined>;
}) {
  // Fallback: client-side pagination when meta isn't provided (e.g. category pages)
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const isServerPaginated = Boolean(meta);

  const totalPages = isServerPaginated
    ? meta!.totalPages
    : Math.ceil(products.length / itemsPerPage);

  const page = isServerPaginated ? meta!.page : currentPage;
  const limit = isServerPaginated ? meta!.limit : itemsPerPage;

  const currentProducts = isServerPaginated
    ? products
    : products.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="mx-auto w-full max-w-xl sm:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
      <div className="flex flex-col gap-4 lg:gap-5">
        {currentProducts.map((product) => (
          <CategoryProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            imageUrl={product.imageUrl}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-3">
          {isServerPaginated ? (
            meta!.hasPrevPage ? (
              <Link
                href={buildHref(basePath, page - 1, limit, query)}
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-px hover:bg-slate-50 hover:text-slate-900"
              >
                Previous
              </Link>
            ) : (
              <span className="inline-flex cursor-not-allowed items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-400 opacity-60">
                Previous
              </span>
            )
          ) : (
            <button
              disabled={page === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-px hover:bg-slate-50 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>
          )}

          <span className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600">
            {page} / {totalPages}
          </span>

          {isServerPaginated ? (
            meta!.hasNextPage ? (
              <Link
                href={buildHref(basePath, page + 1, limit, query)}
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-px hover:bg-slate-50 hover:text-slate-900"
              >
                Next
              </Link>
            ) : (
              <span className="inline-flex cursor-not-allowed items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-400 opacity-60">
                Next
              </span>
            )
          ) : (
            <button
              disabled={page === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-px hover:bg-slate-50 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default ProductPagination;

function CategoryProductCard({
  id,
  name,
  description,
  price,
  imageUrl,
}: {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}) {
  const dispatch = useAppDispatch();

  function handleAddToCart() {
    dispatch(cartActions.addToCart({ productId: id }));
  }

  const safeDescription = description?.trim() || "No description provided.";

  return (
    <div
      className="
        group grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm
        transition hover:-translate-y-[1px] hover:shadow-md
        grid-cols-[96px_minmax(0,1fr)]
        sm:grid-cols-[140px_minmax(0,1fr)]
        lg:grid-cols-[168px_minmax(0,1fr)]
        xl:grid-cols-[184px_minmax(0,1fr)]
      "
    >
      <Link
        href={`/products/${id}`}
        className="relative h-full w-full bg-slate-100"
        aria-label={`View details for ${name}`}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes="(max-width: 640px) 96px, (max-width: 1024px) 140px, (max-width: 1280px) 168px, 184px"
            className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-slate-500">
            No image
          </div>
        )}
      </Link>

      <div className="flex min-w-0 flex-1 flex-col justify-between p-4 sm:p-5 lg:p-6">
        <div className="min-w-0">
          <Link href={`/products/${id}`} className="block">
            <h3 className="truncate text-base font-semibold text-slate-900 sm:text-lg lg:text-xl">
              {name}
            </h3>
            <p className="mt-1 line-clamp-2 text-sm leading-5 text-slate-600 lg:text-[15px] lg:leading-6">
              {safeDescription}
            </p>
          </Link>
        </div>

        {/* ✅ mobile: stack; sm+: row */}
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <p className="text-lg font-bold text-slate-900 lg:text-xl">
            ${Number.isFinite(price) ? price.toFixed(2) : "0.00"}
          </p>

          <button
            type="button"
            onClick={handleAddToCart}
            className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 sm:w-auto lg:px-5 lg:py-2.5"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
