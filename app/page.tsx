"use client";

import BestsellerSection from "@/components/mainPage/BestSellerSection";
import CategoriesSection from "@/components/mainPage/CategoriesSection";
import Hero from "@/components/mainPage/Hero";

export default function Home() {
  return (
    <main>
      <Hero />
      <BestsellerSection />
      <CategoriesSection />
    </main>
  );
}
