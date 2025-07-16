import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-200 p-4 w-full shadow flex flex-col sm:flex-row justify-center gap-5 sm:gap-20 items-center text-sm sm:text-base">
      <p className="m-0 text-gray-500">© W0Ifyy 2025</p>
      <div className="flex space-x-4">
        <a href="/privacy-policy" className="text-gray-500 hover:underline">
          Privacy Policy
        </a>
        <a href="/terms-of-service" className="text-gray-500 hover:underline">
          Terms of Service
        </a>
        <a href="/contact-us" className="text-gray-500 hover:underline">
          Contact Us
        </a>
      </div>
    </footer>
  );
}
