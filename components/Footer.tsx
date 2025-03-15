import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-200 p-4 fixed bottom-0 w-full shadow flex justify-center gap-20 items-center">
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
