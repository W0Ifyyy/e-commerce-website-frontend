import Link from "next/link";

export default function SettingsSection() {
  return (
    <div className="col-span-2 flex flex-col bg-gray-50 p-10 rounded">
      <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border border-gray-200 rounded hover:bg-gray-200">
          <div className="flex flex-col mb-2 md:mb-0">
            <h3 className="font-bold text-lg">Your Information</h3>
            <p className="text-gray-600 text-sm">
              Information about you and your account
            </p>
          </div>
          <Link
            href="/"
            className="text-orange-400 hover:text-orange-500 active:text-orange-600 hover:underline transition-colors"
          >
            EDIT
          </Link>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border border-gray-200 rounded hover:bg-gray-200">
          <div className="flex flex-col mb-2 md:mb-0">
            <h3 className="font-bold text-lg">Shipping Addresses</h3>
            <p className="text-gray-600 text-sm">Manage your addresses</p>
          </div>
          <Link
            href="/"
            className="text-orange-400 hover:text-orange-500 active:text-orange-600 hover:underline transition-colors"
          >
            EDIT
          </Link>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border border-gray-200 rounded hover:bg-gray-200">
          <div className="flex flex-col mb-2 md:mb-0">
            <h3 className="font-bold text-lg">Payment Cards</h3>
            <p className="text-gray-600 text-sm">Enable quick checkout</p>
          </div>
          <Link
            href="/"
            className="text-orange-400 hover:text-orange-500 active:text-orange-600 hover:underline transition-colors"
          >
            VIEW
          </Link>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border border-gray-200 rounded hover:bg-gray-200">
          <div className="flex flex-col mb-2 md:mb-0">
            <h3 className="font-bold text-lg">Notification Preferences</h3>
            <p className="text-gray-600 text-sm">Stay up to date</p>
          </div>
          <Link
            href="/"
            className="text-orange-400 hover:text-orange-500 active:text-orange-600 hover:underline transition-colors"
          >
            EDIT
          </Link>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border border-gray-200 rounded hover:bg-gray-200">
          <div className="flex flex-col mb-2 md:mb-0">
            <h3 className="font-bold text-lg">Location Settings</h3>
            <p className="text-gray-600 text-sm">
              Set delivery country, language, and currency
            </p>
          </div>
          <Link
            href="/"
            className="text-orange-400 hover:text-orange-500 active:text-orange-600 hover:underline transition-colors"
          >
            EDIT
          </Link>
        </div>
      </div>
    </div>
  );
}
