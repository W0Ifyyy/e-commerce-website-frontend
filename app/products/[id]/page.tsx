import ProductsInfo from "@/components/profilePage/ProductsInfo";
import { CartProvider } from "@/utils/CartContext";
import Link from "next/link";

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
  // Await params before accessing its properties
  const { id } = await params;

  let product: Product | null = null;
  let error: string | null = null;

  try {
    const response = await fetch(`http://localhost:5000/products/${id}`, {
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
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <Link
          href="/products"
          className="text-orange-300 hover:text-orange-700 flex items-center gap-2 transition-colors"
        >
          <span>← Back to all products</span>
        </Link>
      </div>
      <CartProvider>
        <ProductsInfo
          imageUrl={product.imageUrl}
          name={product.name}
          description={product.description}
          price={product.price}
          id={Number(product.id)}
        />
      </CartProvider>
    </div>
  );
}
