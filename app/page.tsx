"use client";

import BestsellerSection from "@/components/mainPage/BestSellerSection";
import CategoriesSection from "@/components/mainPage/CategoriesSection";
import Footer from "@/components/rootLayout/Footer";
import Hero from "@/components/mainPage/Hero";
import Navbar from "@/components/rootLayout/Navbar";
import ProductCard from "@/components/mainPage/ProductCard";

export default function Home() {
  return (
    <main>
      <Hero />
      <BestsellerSection />
      <CategoriesSection />
    </main>
  );
}
