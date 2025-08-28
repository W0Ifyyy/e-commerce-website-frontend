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
  params: { id: string };
}) {
  // Await params before accessing its properties
  const { id } = await params;

  let product: Product | null = null;
  let error: string | null = null;

  try {
    // Replace axios with native fetch
    const response = await fetch(`http://localhost:5000/products/${id}`, {
      // This ensures fresh data
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
          <span>←</span> <span>Back to all products</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image Column */}
        <div className="rounded-lg overflow-hidden bg-white  shadow flex items-center justify-center p-6">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="object-contain max-h-[400px] w-auto transition-transform hover:scale-105"
            />
          ) : (
            <div className="p-8 text-gray-400">No image available</div>
          )}
        </div>

        {/* Product Details Column */}
        <div className="flex flex-col justify-between bg-white p-6 rounded-lg">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-2xl font-semibold text-gray-700 mb-4">
              ${product.price?.toFixed(2) || "0.00"}
            </p>
            <div className="mb-6">
              <h2 className="font-bold mb-2 text-gray-800">Description</h2>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>

          {/* Client component for interactive elements */}
          <button className="bg-orange-400 hover:bg-orange-500 text-white py-2 px-6 rounded-lg font-medium transition-colors mt-4 w-fit">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
