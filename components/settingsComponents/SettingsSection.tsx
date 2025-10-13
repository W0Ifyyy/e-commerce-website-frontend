import Link from "next/link";

export default function SettingsSection() {
  return (
    <div className="bg-white p-6 rounded-md shadow-sm">
      <h2 className="text-xl font-bold mb-5">Account Settings</h2>

      <div className="space-y-5">
        {/* Personal Information */}
        <div className="border-b border-gray-100 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-lg">Personal Information</h3>
              <p className="text-gray-500 text-sm mt-1">
                Update your name, email, and phone number
              </p>
            </div>
            <Link
              href="/settings/personal"
              className="text-orange-500 font-medium hover:text-orange-600"
            >
              EDIT
            </Link>
          </div>
        </div>

        {/* Preferences */}
        <div className="border-b border-gray-100 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-lg">Preferences</h3>
              <p className="text-gray-500 text-sm mt-1">
                Set your currency, country, and notification preferences
              </p>
            </div>
            <Link
              href="/settings/preferences"
              className="text-orange-500 font-medium hover:text-orange-600"
            >
              EDIT
            </Link>
          </div>
        </div>

        {/* Order History */}
        <div className="border-b border-gray-100 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-lg">Order History</h3>
              <p className="text-gray-500 text-sm mt-1">
                View your past orders and their status
              </p>
            </div>
            <Link
              href="/orders"
              className="text-orange-500 font-medium hover:text-orange-600"
            >
              VIEW
            </Link>
          </div>
        </div>

        {/* Security */}
        <div className="pb-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-lg">Security</h3>
              <p className="text-gray-500 text-sm mt-1">
                Change password and manage account security
              </p>
            </div>
            <Link
              href="/settings/security"
              className="text-orange-500 font-medium hover:text-orange-600"
            >
              MANAGE
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
