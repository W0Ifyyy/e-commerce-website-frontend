"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductsSection from "@/components/categories/ProductSection";
import type { IProduct, PaginatedResponse, PaginationMeta } from "@/utils/interfaces";
import Link from "next/link";
import { getApiBaseUrl } from "@/lib/apiBaseUrl";

function parsePositiveInt(value: string | null, fallback: number) {
  if (!value) return fallback;
  const n = parseInt(value, 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

function isPaginationMeta(value: unknown): value is PaginationMeta {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;

  return (
    typeof v.page === "number" &&
    typeof v.limit === "number" &&
    typeof v.totalItems === "number" &&
    typeof v.totalPages === "number" &&
    typeof v.hasNextPage === "boolean" &&
    typeof v.hasPrevPage === "boolean"
  );
}

function isPaginatedResponse<T>(value: unknown): value is PaginatedResponse<T> {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return Array.isArray(v.items) && isPaginationMeta(v.meta);
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [productData, setProductData] = useState<IProduct[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const baseUrl =
    getApiBaseUrl();

  useEffect(() => {
    setSearchTerm(searchParams.get("name") || "");
  }, [searchParams]);

  useEffect(() => {
    async function fetchData() {
      const term = searchTerm.trim();
      if (!term) {
        setProductData([]);
        setMeta(undefined);
        return;
      }

      const page = parsePositiveInt(searchParams.get("page"), 1);
      const limit = parsePositiveInt(searchParams.get("limit"), 10);

      setIsLoading(true);
      try {
        const res = await fetch(
          `${baseUrl}/products/search?name=${encodeURIComponent(
            term
          )}&page=${page}&limit=${limit}`
        );
        const data = await res.json();

        if (isPaginatedResponse<IProduct>(data)) {
          setProductData(Array.isArray(data.items) ? data.items : []);
          setMeta(data.meta);
        } else {
          // Backward compatible: API may return an array when pagination isn't used
          setProductData(Array.isArray(data) ? data : []);
          setMeta(undefined);
        }
      } catch {
        setProductData([]);
        setMeta(undefined);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [searchTerm, baseUrl, searchParams]);

  const term = searchTerm.trim();

  return (
    <div className="min-h-[80vh] bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-px hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              <span aria-hidden className="text-lg leading-none">
                ←
              </span>
              <span>Products</span>
            </Link>

            <div>
              <h1 className="text-xl font-semibold text-slate-900 sm:text-2xl">
                Search results
              </h1>
              <p className="mt-1 text-sm text-slate-600">
                {term ? (
                  <>
                    For{" "}
                    <span className="font-semibold text-slate-900">“{term}”</span>
                    {isLoading
                      ? " · Searching…"
                      : ` · ${productData.length} result(s)`}
                  </>
                ) : (
                  "Type something to search"
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
            Searching…
          </div>
        ) : !term ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
            Enter a search term to see results.
          </div>
        ) : productData.length > 0 ? (
          <ProductsSection
            products={productData}
            showTitle={false}
            paginationMeta={meta}
            paginationBasePath="/search"
            paginationQuery={{ name: term }}
          />
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
            No results found.
          </div>
        )}
      </div>
    </div>
  );
}
