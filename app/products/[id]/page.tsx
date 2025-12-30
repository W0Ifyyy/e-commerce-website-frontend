import ProductsInfo from "@/components/profilePage/ProductsInfo";
import Link from "next/link";
import { getApiBaseUrl } from "@/lib/apiBaseUrl";

// Product type definition
interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let product: Product | null = null;
  let error: string | null = null;

  try {
    const response = await fetch(`${getApiBaseUrl()}/products/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}`);
    }

    product = await response.json();
  } catch (err) {
    error = "Failed to fetch product data";
    console.error(err);
  }

  if (error)
    return <div className="container p-4 text-red-500">Error: {error}</div>;
  if (!product) return <div className="container p-4">Product not found</div>;

  return (
    <div className="bg-slate-50 min-h-[90vh]">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-px hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              <span aria-hidden className="text-lg leading-none">
                ←
              </span>
              <span>Products</span>
            </Link>
        </div>

        <ProductsInfo
          imageUrl={product.imageUrl}
          name={product.name}
          description={product.description}
          price={product.price}
          id={Number(product.id)}
        />
      </div>
    </div>
  );
}
