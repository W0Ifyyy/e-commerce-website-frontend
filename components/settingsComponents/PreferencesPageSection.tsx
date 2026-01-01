"use client";

import api from "@/lib/apiClientBrowser";
import { selectCsrfToken } from "@/store/csrfSelector";
import { useAppSelector } from "@/store/hooks";
import Link from "next/link";
import { useState } from "react";

export default function PreferencesPageSection({
  userPreferences,
}: {
  userPreferences: {
    currency: string;
    country: string;
    emailNotifications: boolean;
    id: number;
  };
}) {
  // edit mode toggle
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  // transient UI messages
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // last saved snapshot (used for cancel)
  const [originalData, setOriginalData] = useState(userPreferences);
  // live form values
  const [formData, setFormData] = useState({ ...originalData });

  const csrfToken = useAppSelector(selectCsrfToken);
  const csrfHeaders = csrfToken ? { "X-CSRF-Token": csrfToken}: {}

  // save preferences to API
  const updateDatabase = async (data: {
    currency: string;
    country: string;
    emailNotifications: boolean;
  }): Promise<boolean> => {
    try {
      const res = await api.put(
        `/user/${userPreferences.id}`,
        {
          preferredCurrency: data.currency,
          country: data.country,
          emailNotifications: data.emailNotifications,
        },
        {
          headers: csrfHeaders
        }
      );
      return res.status === 200;
    } catch (error) {
      console.error("Error saving preferences:", error);
      return false;
    }
  };

  // minimal validation
  const validateForm = () => {
    if (!formData.country) {
      setErrorMessage("Country cannot be empty");
      return false;
    }
    if (!formData.currency) {
      setErrorMessage("Currency cannot be empty");
      return false;
    }

    return true;
  };

  // handle text/select/checkbox changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // validate → store → update state → notify
  const handleSave = async () => {
    if (isSaving) return;

    setErrorMessage("");
    setSuccessMessage("");

    if (!validateForm()) return;

    setIsSaving(true);
    const ok = await updateDatabase(formData);
    setIsSaving(false);

    if (!ok) {
      setErrorMessage("Failed to save preferences.");
      return;
    }

    setOriginalData({ ...formData });
    setIsEditing(false);
    setSuccessMessage("Preferences updated successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleCancel = () => {
    setFormData({ ...originalData });
    setIsEditing(false);
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
        {/* status messages */}
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
            <h2 className="text-lg font-semibold">Preferences</h2>
            <p className="text-xs text-gray-500">
              Manage your currency, country, and notification settings
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
          {/* country select */}
          <div className="flex flex-col">
            <label className="text-xs font-medium text-gray-700 mb-1">
              Country
            </label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              disabled={!isEditing}
              className={`border rounded p-2 w-full ${
                !isEditing ? "bg-gray-50" : ""
              } focus:outline-none focus:ring-1 focus:ring-orange-500`}
            >
              <option value="">Select Country</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="UK">United Kingdom</option>
              <option value="AU">Australia</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
            </select>
          </div>

          {/* currency select */}
          <div className="flex flex-col">
            <label className="text-xs font-medium text-gray-700 mb-1">
              Currency
            </label>
            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              disabled={!isEditing}
              className={`border rounded p-2 w-full ${
                !isEditing ? "bg-gray-50" : ""
              } focus:outline-none focus:ring-1 focus:ring-orange-500`}
            >
              <option value="">Select Currency</option>
              <option value="USD">US Dollar (USD)</option>
              <option value="EUR">Euro (EUR)</option>
              <option value="GBP">British Pound (GBP)</option>
              <option value="CAD">Canadian Dollar (CAD)</option>
              <option value="AUD">Australian Dollar (AUD)</option>
            </select>
          </div>

          {/* notifications toggle */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Notification Preferences
            </h3>

            <div className="flex items-center justify-between mb-3">
              <label className="text-xs text-gray-600">
                Receive email notifications
              </label>

              {/* custom switch */}
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  name="emailNotifications"
                  id="emailNotifications"
                  checked={formData.emailNotifications}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`${
                    !isEditing ? "opacity-50" : ""
                  } absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer ${
                    formData.emailNotifications
                      ? "right-0 border-orange-500"
                      : "left-0 border-gray-300"
                  }`}
                />
                <label
                  htmlFor="emailNotifications"
                  className={`block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer ${
                    formData.emailNotifications ? "bg-orange-300" : ""
                  }`}
                ></label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
