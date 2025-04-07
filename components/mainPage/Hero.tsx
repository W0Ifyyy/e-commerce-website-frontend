"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const scrollToNextSection = () => {
    const nextSection = document.getElementById(
      "bestsellers"
    ) as HTMLElement | null;
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="h-[50vh] flex flex-col justify-center items-center text-center bg-gray-100">
      <h1 className="text-5xl font-extrabold text-gray-800">
        Elevate Your Shopping Experience
      </h1>
      <p className="text-lg text-gray-600 mt-4">
        Discover unbeatable deals on the best products!
      </p>

      <button
        onClick={scrollToNextSection}
        className="mt-10 text-gray-600 hover:text-gray-900 transition"
      >
        <svg
          className="w-12 h-12 animate-bounce"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
    </section>
  );
}
