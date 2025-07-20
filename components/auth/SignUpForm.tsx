"use client";

import axios from "axios";
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

  const router = useRouter();

  const validateUsername = () => {
    if (!user.name || user.name.length < 5) {
      setError((prevError) => ({
        ...prevError,
        username: "Username must be at least 5 characters",
      }));
    } else {
      setError((prevError) => ({
        ...prevError,
        username: "",
      }));
    }
  };

  const validateEmail = () => {
    if (!user.email || !/\S+@\S+\.\S+/.test(user.email)) {
      setError((prevError) => ({
        ...prevError,
        email: "Please enter a valid email address",
      }));
    } else {
      setError((prevError) => ({
        ...prevError,
        email: "",
      }));
    }
  };

  const validatePassword = () => {
    if (
      !user.password ||
      user.password.length < 8 ||
      !/[A-Z]/.test(user.password) ||
      !/[a-z]/.test(user.password) ||
      !/\d/.test(user.password) ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(user.password)
    ) {
      setError((prevError) => ({
        ...prevError,
        password:
          "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }));
    } else {
      setError((prevError) => ({
        ...prevError,
        password: "",
      }));
    }
  };
  const validateForm = () => {
    let isError = false;
    validateUsername();
    validateEmail();
    validatePassword();
    if (error.username || error.email || error.password) {
      isError = true;
    }

    return isError;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      return new Error("Form validation failed");
    }
    async function submitForm() {
      const results = await axios.post(
        "http://localhost:5000/auth/register",
        user
      );
      console.log(results);
      if (results.status === 201) router.push("/sign-in");
      return results;
    }
    submitForm();
  };
  return (
    <form className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
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
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Username"
          required
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          onBlur={() => {
            validateUsername();
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
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Email"
          required
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          onBlur={() => {
            validateEmail();
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
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Password"
          required
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          onBlur={() => {
            validatePassword();
          }}
        />
      </div>
      <button
        type="button"
        className="w-full bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 hover:cursor-pointer transition-colors"
        onClick={() => handleSubmit()}
      >
        Sign Up
      </button>
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
