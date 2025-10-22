"use client";
import axios from "@/lib/axios";
import Link from "next/link";
import { useState } from "react";

//todo, adjust the backend to the frontend way of changing password (current password verification)
export default function SecurityPageSection({
  userInfo,
}: {
  userInfo: {
    id: number;
    accessToken: string;
  };
}) {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const updatePassword = async (data: {
    currentPassword: string;
    newPassword: string;
  }) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/user/${userInfo.id}`,
        {
          password: data.newPassword,
        },
        {
          headers: {
            Cookie: `access_token=${userInfo.accessToken}; HttpOnly=true; SameSite=Lax; Path=/; Secure=true`,
          },
        }
      );
      if (res.status === 200) {
        setSuccessMessage("Password changed successfully!");
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      console.error("Error changing password:", error);
      setErrorMessage(
        "Failed to change password. Please verify your current password."
      );
    }
  };

  const validateForm = () => {
    if (!formData.currentPassword) {
      setErrorMessage("Current password is required");
      return false;
    }

    if (!formData.newPassword) {
      setErrorMessage("New password is required");
      return false;
    }

    if (formData.newPassword.length < 8) {
      setErrorMessage("New password must be at least 8 characters long");
      return false;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setErrorMessage("New passwords do not match");
      return false;
    }

    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setErrorMessage("");
    setSuccessMessage("");

    if (!validateForm()) {
      return;
    }

    updatePassword({
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
    });
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
      {/* Back arrow navigation */}
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
              >
                CANCEL
              </button>
              <button
                onClick={handleSave}
                className="text-orange-500 text-sm font-medium"
              >
                SAVE
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

        {/* Password fields */}
        {isChangingPassword ? (
          <div className="space-y-4">
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
