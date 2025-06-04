import { ICategory } from "@/utils/interfaces";
import { getCategories } from "@/services/categories";
import Image from "next/image";
import Link from "next/link";

export default async function CategoriesSection() {
  const response = await getCategories();
  const categoriesData = response.data;
  if (!categoriesData || categoriesData.length === 0) {
    return <div>No categories available</div>;
  }
  return (
    <section className="py-15 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-6">Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {categoriesData.map((category: ICategory) => (
          <Link
            key={category.id}
            className="bg-white shadow rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:shadow-lg transition-shadow duration-300"
            href={`/category/${category.id}`}
          >
            {category.imageUrl ? (
              <Image
                src={category.imageUrl}
                alt={category.name}
                width={80}
                height={80}
                className="w-20 h-20 object-cover rounded-full mb-4"
              />
            ) : (
              <div className="w-20 h-20 bg-gray-300 rounded-full mb-4 flex items-center justify-center">
                <span className="text-xl font-bold text-gray-700">
                  {category.name[0]}
                </span>
              </div>
            )}
            <h3 className="text-xl font-semibold">{category.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
