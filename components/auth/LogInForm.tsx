"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function LogInForm() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        user,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      if (response.status === 201) router.push("/");
    } catch (error) {
      console.log(error);
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
    </form>
  );
}
