"use client";

import api from "@/lib/axios";
import Link from "next/link";
import { useState } from "react";

// Personal info editor: inline edit + basic validation + save/cancel
export default function PersonalPageSection({
  userInfo,
}: {
  userInfo: {
    name: string;
    email: string;
    phone: string;
    id: number;
  };
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // last saved data (to allow cancel)
  const [originalData, setOriginalData] = useState({
    name: userInfo.name,
    email: userInfo.email,
    phone: userInfo.phone,
  });

  const [formData, setFormData] = useState({ ...originalData });

  // send update to backend; returns true on success
  async function updateDatabase(data: {
    name: string;
    email: string;
    phone: string;
  }): Promise<boolean> {
    try {
      const res = await api.put(
        `/user/${userInfo.id}`,
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
        },
        undefined
      );

      return res.status === 200;
    } catch (error) {
      console.error("Error saving changes:", error);
      setErrorMessage("Failed to save changes.");
      return false;
    }
  }

  // minimal validation for name + email
  function validateForm() {
    if (!formData.name.trim() || formData.name.trim().length < 5) {
      setErrorMessage(
        "Name cannot be empty and must be at least 5 characters long!"
      );
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage("Please enter a valid email address");
      return false;
    }
    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (phoneDigits.length !== 9) {
      setErrorMessage("Phone number must contain exactly 9 digits.");
      return false;
    }
    return true;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSave() {
    setErrorMessage("");
    setSuccessMessage("");

    if (!validateForm()) return;

    setIsSaving(true);
    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
    };

    const ok = await updateDatabase(payload);
    setIsSaving(false);

    if (!ok) return;

    setOriginalData({ ...payload });
    setIsEditing(false);
    setSuccessMessage("Personal information updated successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
  }

  function handleCancel() {
    setFormData({ ...originalData });
    setIsEditing(false);
    setErrorMessage("");
  }

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
        {/* success/error messages */}
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

        {/* header + edit actions */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-semibold">Personal Information</h2>
            <p className="text-xs text-gray-500">
              Update your name, email, and phone number
            </p>
          </div>
          {isEditing ? (
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
              onClick={() => setIsEditing(true)}
              className="text-orange-500 text-sm font-medium"
            >
              EDIT
            </button>
          )}
        </div>

        {/* form fields */}
        <div className="space-y-4">
          <div className="flex flex-col">
            <label className="text-xs font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing}
              className={`border rounded p-2 w-full ${
                !isEditing ? "bg-gray-50" : ""
              } focus:outline-none focus:ring-1 focus:ring-orange-500`}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
              className={`border rounded p-2 w-full ${
                !isEditing ? "bg-gray-50" : ""
              } focus:outline-none focus:ring-1 focus:ring-orange-500`}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditing}
              className={`border rounded p-2 w-full ${
                !isEditing ? "bg-gray-50" : ""
              } focus:outline-none focus:ring-1 focus:ring-orange-500`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
