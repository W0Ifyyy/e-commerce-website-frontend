'use client';

import axios from "@/lib/apiClientBrowser";
import { useState, type FormEvent } from "react";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    setEmailSent(false);
    setLoading(true);

    try {
      await axios.post("/user/resetPassword/request", { email: email.trim()});
      setEmailSent(true);
    } catch (error) {
      console.error("Error sending reset link:", error);
      setErrorMsg("Could not send reset link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] bg-gray-50 px-4 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
      >
        <h1 className="text-center text-2xl font-bold text-gray-900">Forgot Password</h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter your email and we’ll send you a reset link.
        </p>

        <div className="mt-6">
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-800">
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full rounded-lg bg-orange-400 px-4 py-2 font-semibold text-white shadow-sm hover:bg-orange-500 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-orange-200"
          >
            {loading ? "Sending..." : "Send"}
          </button>

          {emailSent && (
            <p className="mt-4 text-center text-sm text-green-600">
              A reset link has been sent to your email.
            </p>
          )}

          {errorMsg && (
            <p className="mt-4 text-center text-sm text-red-600">
              {errorMsg}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}