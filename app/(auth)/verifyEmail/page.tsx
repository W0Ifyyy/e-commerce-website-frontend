"use client";

import api from "@/lib/apiClientBrowser";
import { selectCsrfToken } from "@/store/csrfSelector";
import { useAppSelector } from "@/store/hooks";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const sp = useSearchParams();
  const token = sp.get("token");
  const [verified, setVerified] = useState(false);

  const csrfToken = useAppSelector(selectCsrfToken);
  const csrfHeaders = csrfToken ? { "X-CSRF-Token": csrfToken }: {};

  useEffect(() => {
    if (!token) {
      setVerified(false);
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        await api.post("/user/verifyEmail/confirm", { token }, {headers: csrfHeaders});
        if (!cancelled) setVerified(true);
      } catch {
        if (!cancelled) setVerified(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [token]);

  return (
    <div className="min-h-[90vh] bg-gray-50 px-4 flex items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-center text-2xl font-bold text-gray-900">Verify Email</h1>

        {!token ? (
          <>
            <p className="mt-2 text-center text-sm text-gray-600">
              This verification link is missing a token.
            </p>

            <p className="mt-6 text-center text-sm text-red-600">Invalid or missing token.</p>

            <div className="mt-6 flex justify-center">
              <Link
                href="/settings"
                className="rounded-lg bg-orange-400 px-4 py-2 font-semibold text-white shadow-sm hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
              >
                Back to settings
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="mt-6 flex flex-col gap-3">

               {verified ? 
            <>
                <p className="mt-2 text-center text-sm text-green-600">
                Your email has been successfully verified.
                </p>
              <Link
                href="/settings"
                className="w-full rounded-lg bg-orange-400 px-4 py-2 text-center font-semibold text-white shadow-sm hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
              >
                Continue
              </Link>
            </>
              :
              <>
              <p className="mt-2 text-center text-sm text-red-600">
                Verification failed. The link may be invalid or expired.
              </p>
              <Link
                href="/settings"
                className="w-full rounded-lg bg-orange-400 px-4 py-2 text-center font-semibold text-white shadow-sm hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
              >
                Continue
              </Link>
            </>
              }
            </div>
          </>
        )}
      </div>
    </div>
  );
}