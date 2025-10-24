"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import Link from "next/link";
export default function LogInForm() {
  //TODO: Add error handling
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const router = useRouter();
  const handleSubmit = async () => {
    try {
      await api.post("/auth/login", user, {
        withCredentials: true,
      });

      router.push("/");
      router.refresh();
    } catch (error: any) {
      console.error("Login failed:", error?.response?.data || error.message);
    }
  };
  return (
    <form className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label
          htmlFor="Username"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Username
        </label>
        <input
          value={user.username}
          type="username"
          id="username"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Enter your username"
          required
          onChange={(e) =>
            setUser((prevUser) => ({ ...prevUser, username: e.target.value }))
          }
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Password
        </label>
        <input
          value={user.password}
          type="password"
          id="password"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Enter your password"
          required
          onChange={(e) =>
            setUser((prevUser) => ({ ...prevUser, password: e.target.value }))
          }
        />
      </div>
      <button
        type="button"
        onClick={() => handleSubmit()}
        className="w-full bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 hover:cursor-pointer transition-colors"
      >
        Sign In
      </button>
      <p className="mt-4 text-center text-gray-600">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="text-orange-500 hover:underline">
          Sign Up
        </Link>
      </p>
    </form>
  );
}
