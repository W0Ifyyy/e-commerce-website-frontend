"use client";

import React from "react";

interface ICategory {
  id: number;
  name: string;
  imageUrl?: string;
}

const categoriesData: ICategory[] = [
  {
    id: 1,
    name: "Electronics",
    imageUrl: "https://img.icons8.com/ios-filled/100/000000/electronics.png",
  },
  {
    id: 2,
    name: "Clothing",
    imageUrl: "https://img.icons8.com/ios-filled/100/000000/t-shirt.png",
  },
  {
    id: 3,
    name: "Home & Garden",
    imageUrl: "https://img.icons8.com/ios-filled/100/000000/garden.png",
  },
  {
    id: 4,
    name: "Beauty & Health",
    imageUrl: "https://img.icons8.com/ios-filled/100/000000/face-powder.png",
  },
  {
    id: 5,
    name: "Sports & Outdoors",
    imageUrl: "https://img.icons8.com/ios-filled/100/000000/running.png",
  },
  {
    id: 6,
    name: "Toys & Games",
    imageUrl: "https://img.icons8.com/ios-filled/100/000000/puzzle.png",
  },
  {
    id: 7,
    name: "Books",
    imageUrl: "https://img.icons8.com/ios-filled/100/000000/book.png",
  },
  {
    id: 8,
    name: "Automotive",
    imageUrl: "https://img.icons8.com/ios-filled/100/000000/car.png",
  },
];

export default function CategoriesSection() {
  return (
    <section className="py-15 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-6">Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {categoriesData.map((category) => (
          <div
            key={category.id}
            className="bg-white shadow rounded-lg p-4 flex flex-col items-center justify-center"
          >
            {category.imageUrl ? (
              <img
                src={category.imageUrl}
                alt={category.name}
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
          </div>
        ))}
      </div>
    </section>
  );
}
