"use client";

import axios from "@/lib/axios";
import Link from "next/link";
import { useState } from "react";

export default function PersonalPageSection({
  userInfo,
}: {
  userInfo: {
    name: string;
    email: string;
    phone: string;
    id: number;
    accessToken: string;
  };
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [originalData, setOriginalData] = useState(userInfo);
  const [formData, setFormData] = useState({ ...originalData });

  /* - Throws error 400 axios instance - TODO FIX
  const updateDatabase = async (data: {
    name: string;
    email: string;
    phone: string;
  }) => {
    
    try {
      const res = await axios.put(
        `http://localhost:5000/user/${userInfo.id}`,
        data,
        {
          headers: {
            Cookie: `access_token=${userInfo.accessToken}; HttpOnly=true; SameSite=Lax; Path=/; Secure=true`,
          },
        }
      );
      if (res.status === 200) {
        setSuccessMessage("Changes saved successfully!");
      }
    } catch (error) {
      console.error("Error saving changes:", error);
      setErrorMessage("Failed to save changes.");
    }
  };
  */

  const validateForm = () => {
    if (!formData.name.trim()) {
      setErrorMessage("Name cannot be empty");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage("Please enter a valid email address");
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

    setOriginalData({ ...formData });
    setIsEditing(false);
    //updateDatabase(formData);
    setSuccessMessage("Personal information updated successfully!");

    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleCancel = () => {
    setFormData({ ...originalData });
    setIsEditing(false);
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
              onClick={() => setIsEditing(true)}
              className="text-orange-500 text-sm font-medium"
            >
              EDIT
            </button>
          )}
        </div>

        {/* Form fields remain unchanged */}
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
