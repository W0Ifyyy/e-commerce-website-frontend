"use client";

import api from "@/lib/apiClientBrowser";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpForm() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const router = useRouter();

  function getUsernameError(name: string) {
    if (!name.trim() || name.trim().length < 5) {
      return "Username must be at least 5 characters";
    }
    return "";
  }

  function getEmailError(email: string) {
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      return "Please enter a valid email address";
    }
    return "";
  }

  function getPasswordError(password: string) {
    if (
      !password ||
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/\d/.test(password) ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(password)
    ) {
      return "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character";
    }
    return "";
  }

  function validateAll(nextUser: typeof user) {
    const nextErrors = {
      username: getUsernameError(nextUser.name),
      email: getEmailError(nextUser.email),
      password: getPasswordError(nextUser.password),
    };
    setError(nextErrors);
    return !(nextErrors.username || nextErrors.email || nextErrors.password);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setSubmitError(null);
    const ok = validateAll(user);
    if (!ok) return;

    setIsSubmitting(true);
    try {
      const results = await api.post("/auth/register", user);
      if (results.status === 201) {
        router.push("/sign-in");
        router.refresh();
        return;
      }
      setSubmitError("Sign up failed. Please try again.");
    } catch (err) {
      console.error("Sign up failed:", err);
      setSubmitError("Sign up failed. Please try again.");
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
          value={user.name}
          type="text"
          id="username"
          name="username"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Username"
          required
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          onBlur={() => {
            setError((prev) => ({ ...prev, username: getUsernameError(user.name) }));
          }}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Email
        </label>
        <input
          value={user.email}
          type="email"
          id="email"
          name="email"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Email"
          required
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          onBlur={() => {
            setError((prev) => ({ ...prev, email: getEmailError(user.email) }));
          }}
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
          placeholder="Password"
          required
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          onBlur={() => {
            setError((prev) => ({ ...prev, password: getPasswordError(user.password) }));
          }}
        />
      </div>

      {submitError ? (
        <p className="mb-4 text-sm text-red-600" role="alert">
          {submitError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 hover:cursor-pointer transition-colors disabled:opacity-60"
      >
        {isSubmitting ? "Signing up..." : "Sign Up"}
      </button>
      <p className="mt-4 text-center text-gray-600">
        Already have an account?{" "}
        <Link href="/sign-in" className="text-orange-500 hover:underline">
          Sign In
        </Link>
      </p>
      {(error.username || error.email || error.password) && (
        <div className="text-red-400 flex flex-col mt-4 gap-3">
          {error.username && (
            <div>
              <p>{error.username}</p>
            </div>
          )}
          {error.email && (
            <div>
              <p>{error.email}</p>
            </div>
          )}
          {error.password && (
            <div>
              <p>{error.password}</p>
            </div>
          )}
        </div>
      )}
    </form>
  );
}

//TODO: Add a success message after successful registration, and redirect to the login page.
