"use client";

import api from "@/lib/apiClientBrowser";
import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function SendVerifyEmailButton({email}: {email: string}) {
  const [status, setStatus] = useState<Status>("idle");

  const handleSend = async () => {
    if (status === "sending" || status === "sent") return;

    setStatus("sending");
    try {
      await api.post("/user/verifyEmail", { email, emailType: "VERIFY"});
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={handleSend}
        disabled={status === "sending" || status === "sent"}
        className="inline-flex items-center justify-center rounded-md border border-orange-500 bg-white px-4 py-2 text-sm font-semibold text-orange-600 hover:bg-orange-100 active:bg-orange-200 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
      >
        {status === "sending" ? "Sending..." : status === "sent" ? "Sent" : "Verify email"}
      </button>

      {status === "sent" && <span className="text-sm text-green-600">Email has been sent.</span>}
      {status === "error" && (
        <span className="text-sm text-red-600">Couldn’t send email. Try again.</span>
      )}
    </div>
  );
}