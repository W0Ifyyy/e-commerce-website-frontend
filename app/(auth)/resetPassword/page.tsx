"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import api from "@/lib/apiClientBrowser";

export default function ResetPasswordPage() {
  const sp = useSearchParams();
  const token = sp.get("token"); 

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({ password: false, other: false, general: false });
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) {
      setErrors({ password: false, other: true, general: true });
      return;
    }

    if (password !== confirmPassword) {
      setErrors({ password: true, other: false, general: true });
      return;
    }

    setErrors({ password: false, other: false, general: false });

    try {
      await api.post("/user/resetPassword/confirm", {
        token,
        newPassword: password,
      });

      setResetSuccess(true);
      setPassword("");
      setConfirmPassword("");
    } catch {
      setErrors({ password: false, other: true, general: true });
    }
  };

  return (
    <div className="min-h-[80vh] bg-gray-50 px-4 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
      >
        <h1 className="text-center text-2xl font-bold text-gray-900">Reset Password</h1>
        <p className="mt-2 text-center text-sm text-gray-600">Enter your new password below.</p>

        {resetSuccess && (
          <p className="mt-4 text-center text-sm text-green-600">
            Your password has been successfully reset. You can now log in with your new password.
          </p>
        )}

        {token ? (
          <div className="mt-6">
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-800">
              New password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
            />

            <label
              htmlFor="confirmPassword"
              className="mb-2 mt-4 block text-sm font-medium text-gray-800"
            >
              Confirm password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
            />

            <div className={!errors.general ? "text-red-600 mt-2 hidden" : "text-red-600 mt-2"}>
              <p className={!errors.password ? "hidden" : ""}>Passwords do not match.</p>
              <p className={!errors.other ? "hidden" : ""}>An error occurred. Please try again.</p>
            </div>

            <button
              type="submit"
              className="mt-5 w-full rounded-lg bg-orange-400 px-4 py-2 font-semibold text-white shadow-sm hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
            >
              Reset password
            </button>
          </div>
        ) : (
          <p className="mt-6 text-center text-sm text-red-600">Invalid or missing token.</p>
        )}
      </form>
    </div>
  );
}