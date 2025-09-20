import OrderSection from "@/components/profilePage/OrdersSection";
import getUser, { getUserData } from "@/lib/api/user";
import { displaySinceInfo } from "@/utils/displaySinceInfo";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token");
  const user = await getUser();
  if (user.username === null || user.isLoggedIn === false || !accessToken)
    redirect("/sign-in");
  const userData = await getUserData(user.userId, accessToken.value);
  const userSince = new Date(userData.createdAt);
  console.log(userData.orders[1].items);
  return (
    <main className="grid grid-cols-2 gap-5 bg-gray-100 min-h-[80vh] max-w-[80vw] p-4 mx-auto">
      {/* First row - two columns */}
      <div className="col-span-2 md:col-span-1 flex flex-col items-center justify-center bg-gray-50 p-6 md:p-10 rounded h-full text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 md:mb-4">
          Welcome {user?.username}!
        </h1>
        <p className="text-lg">This is your profile page.</p>
      </div>
      <div className="col-span-2 md:col-span-1 flex flex-col items-center justify-center bg-gray-50 p-6 md:p-10 rounded h-full text-center">
        <p className="text-lg">
          You're with us for: {displaySinceInfo(userSince)}
        </p>
      </div>
      {/* Second row - single column */}
      <div className="col-span-2 bg-gray-50 p-6 md:p-10 rounded">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold mb-6">Your orders</h2>

          {userData.orders && userData.orders.length > 0 ? (
            <OrderSection orders={userData.orders} />
          ) : (
            <div className="text-center py-10 bg-white rounded-lg border border-gray-200">
              <p className="text-gray-500">You have no orders yet.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
