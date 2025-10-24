import OrdersSection from "@/components/profilePage/OrdersSection";
import getUser, { getUserData } from "@/lib/api/user";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function OrdersPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token");

  const user = await getUser();

  // not logged in → redirect to login page
  if (user.username === null || user.isLoggedIn === false || !accessToken)
    redirect("/sign-in");

  // fetch full user data (includes orders)
  const userData = await getUserData(user.userId, accessToken.value);

  return (
    <div className="flex flex-col max-w-4xl mx-auto w-full px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">Order History</h2>

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

      {userData.orders && userData.orders.length > 0 ? (
        <OrdersSection orders={userData.orders} />
      ) : (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200 shadow-sm my-8">
          <p className="text-gray-600">
            Your order history is empty. Start shopping to see your purchases
            here.
          </p>
          <Link
            href="/"
            className="mt-4 inline-block text-orange-600 hover:orange-blue-800 font-medium"
          >
            Browse products
          </Link>
        </div>
      )}
    </div>
  );
}
