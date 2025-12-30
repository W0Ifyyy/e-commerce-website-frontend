"use client";

import { useAppDispatch } from "@/store/hooks";
import { cartActions } from "@/store/cartSlice";
import Image from "next/image";

interface IProductInfo {
  imageUrl: string;
  name: string;
  description: string;
  price: number;
  id: number;
}

export default function ProductsInfo({
  imageUrl,
  name,
  description,
  price,
  id,
}: IProductInfo) {
  const dispatch = useAppDispatch();

  function handleAddToCart() {
    dispatch(cartActions.addToCart({ productId: id }));
  }

  const formattedPrice =
    typeof price === "number" && Number.isFinite(price)
      ? price.toFixed(2)
      : "0.00";

  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Image */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="p-4 sm:p-6">
              <div className="relative aspect-square w-full overflow-hidden rounded-xl">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain p-4 transition-transform duration-300 hover:scale-[1.03]"
                    priority
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-slate-500">
                    No image available
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex h-full flex-col p-5 sm:p-7">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                  Product
                </p>

                <h1 className="mt-2 text-2xl font-semibold leading-tight text-slate-900 sm:text-3xl">
                  {name}
                </h1>

                <div className="mt-4 flex items-baseline gap-3">
                  <p className="text-3xl font-bold text-slate-900">
                    ${formattedPrice}
                  </p>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                    Ready to ship
                  </span>
                </div>

                <div className="my-6 h-px w-full bg-slate-200" />

                <h2 className="text-sm font-semibold text-slate-900">
                  Description
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {description?.trim() ? description : "No description provided."}
                </p>
              </div>

              {/* CTA */}
              <div className="mt-8">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="inline-flex w-full items-center justify-center rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 sm:w-auto"
                >
                  Add to cart
                </button>

                <p className="mt-3 text-xs text-slate-500">
                  Secure checkout • Fast delivery options
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
