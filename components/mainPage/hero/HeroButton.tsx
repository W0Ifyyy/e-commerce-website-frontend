"use client";

export function HeroButton() {
  const scrollToNextSection = () => {
    const nextSection = document.getElementById(
      "bestsellers"
    ) as HTMLElement | null;
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  return (
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
  );
}
