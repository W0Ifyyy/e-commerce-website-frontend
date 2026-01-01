"use client";
import api from "@/lib/apiClientBrowser";
import { selectCsrfToken } from "@/store/csrfSelector";
import { useAppSelector } from "@/store/hooks";
import Link from "next/link";
import { useState } from "react";

export default function SecurityPageSection({
  userInfo,
}: {
  userInfo: {
    id: number;
  };
}) {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const csrfToken = useAppSelector(selectCsrfToken);
  const csrfHeaders = csrfToken ? { "X-CSRF-Token": csrfToken }: {};

  // call backend to update password
  const updatePassword = async (data: {
    oldPassword: string;
    newPassword: string;
  }): Promise<boolean> => {
    try {
      const res = await api.put(
        `/user/changePassword/${userInfo.id}`,
        {
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
        },
        {
          headers: csrfHeaders
        }
      );

      if (res.status === 200) {
        setSuccessMessage("Password changed successfully!");
        // reset form after successful change
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error changing password:", error);
      setErrorMessage(
        "Failed to change password. Please verify your current password."
      );
      return false;
    }
  };

  // basic front-end validation before request
  const validateForm = () => {
    const pwd = formData.newPassword;

    if (!formData.currentPassword) {
      setErrorMessage("Current password is required");
      return false;
    }
    if (!pwd) {
      setErrorMessage("New password is required");
      return false;
    }
    if (pwd.length < 8) {
      setErrorMessage("New password must be at least 8 characters long");
      return false;
    }
    if (!/[A-Z]/.test(pwd)) {
      setErrorMessage(
        "New password must contain at least one uppercase letter"
      );
      return false;
    }
    if (!/[a-z]/.test(pwd)) {
      setErrorMessage(
        "New password must contain at least one lowercase letter"
      );
      return false;
    }
    if (!/\d/.test(pwd)) {
      setErrorMessage("New password must contain at least one digit");
      return false;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) {
      setErrorMessage(
        "New password must contain at least one special character"
      );
      return false;
    }
    if (pwd !== formData.confirmPassword) {
      setErrorMessage("New passwords do not match");
      return false;
    }
    return true;
  };

  // keep form state in sync with inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // validate → send request → close editor → show message
  const handleSave = async () => {
    if (isSaving) return;
    setErrorMessage("");
    setSuccessMessage("");

    if (!validateForm()) return;

    setIsSaving(true);
    const ok = await updatePassword({
      oldPassword: formData.currentPassword,
      newPassword: formData.newPassword,
    });

    setIsSaving(false);

    if (!ok) return;

    setIsChangingPassword(false);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleCancel = () => {
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setIsChangingPassword(false);
    setErrorMessage("");
  };

  return (
    <div className="flex flex-col items-center w-full py-8 min-h-[80vh]">
      {/* back to settings */}
      <div className="w-full max-w-md mb-4 px-1 mt-10">
        <Link
          href="/settings"
          className="flex items-center text-gray-600 hover:text-orange-500 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm font-medium">Back to Settings</span>
        </Link>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-sm flex flex-col max-w-md w-full">
        {/* status banners */}
        {successMessage && (
          <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-sm">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
            {errorMessage}
          </div>
        )}

        {/* header + actions */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-semibold">Security Settings</h2>
            <p className="text-xs text-gray-500">
              Change password and manage account security
            </p>
          </div>
          {isChangingPassword ? (
            <div className="space-x-2">
              <button
                onClick={handleCancel}
                className="text-gray-500 text-sm font-medium"
                disabled={isSaving}
              >
                CANCEL
              </button>
              <button
                onClick={handleSave}
                className="text-orange-500 text-sm font-medium disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={isSaving}
              >
                {isSaving ? "SAVING..." : "SAVE"}
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsChangingPassword(true)}
              className="text-orange-500 text-sm font-medium"
            >
              CHANGE PASSWORD
            </button>
          )}
        </div>

        {/* toggle between summary and password form */}
        {isChangingPassword ? (
          <div className="space-y-4">
            {/* current password */}
            <div className="flex flex-col">
              <label className="text-xs font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                className="border rounded p-2 w-full focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>

            {/* new password */}
            <div className="flex flex-col">
              <label className="text-xs font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="border rounded p-2 w-full focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Password must be at least 8 characters long
              </p>
            </div>

            {/* confirm password */}
            <div className="flex flex-col">
              <label className="text-xs font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="border rounded p-2 w-full focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>
          </div>
        ) : (
          // simple summary when not editing
          <div className="py-2">
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="text-sm font-medium">Password</p>
              </div>
              <p className="text-xs text-gray-600">••••••••</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
