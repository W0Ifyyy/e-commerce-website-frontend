"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/apiClientBrowser";
import Link from "next/link";
export default function LogInForm() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setErrorMessage(null);
    setIsSubmitting(true);
    try {
      await api.post("/auth/login", user, {
        withCredentials: true,
      });

      router.push("/");
      router.refresh();
    } catch (error: unknown) {
      console.error("Login failed:", error instanceof Error ? error.message : "Unknown error");
      setErrorMessage("Login failed. Please check your credentials and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Username
        </label>
        <input
          value={user.username}
          type="text"
          id="username"
          name="username"
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
          name="password"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Enter your password"
          required
          onChange={(e) =>
            setUser((prevUser) => ({ ...prevUser, password: e.target.value }))
          }
        />
      </div>

      {errorMessage ? (
        <p className="mb-4 text-sm text-red-600" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 hover:cursor-pointer transition-colors disabled:opacity-60"
      >
        {isSubmitting ? "Signing in…" : "Sign In"}
      </button>
      <p className="mt-4 text-center text-gray-600">Forgot your password? Click <Link href="/forgotPassword" className="text-orange-500 hover:underline">here</Link></p>
      <p className="mt-4 text-center text-gray-600">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="text-orange-500 hover:underline">
          Sign Up
        </Link>
      </p>
    </form>
  );
}
