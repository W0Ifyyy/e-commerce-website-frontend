"use client";

import BestsellerSection from "@/components/BestSellerSection";
import CategoriesSection from "@/components/CategoriesSection";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <BestsellerSection />
        <CategoriesSection />
      </main>
      <Footer />
    </div>
  );
}
