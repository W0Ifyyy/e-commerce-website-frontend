import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-200 p-4 w-full shadow flex flex-col sm:flex-row justify-center gap-5 sm:gap-20 items-center text-sm sm:text-base">
      <p className="m-0 text-gray-500">© W0Ifyy 2025</p>
      <p className="m-0 text-gray-400 text-xs">
        Icons by{" "}
        <a
          href="https://www.flaticon.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gray-600"
        >
          Flaticon
        </a>
      </p>
    </footer>
  );
}
