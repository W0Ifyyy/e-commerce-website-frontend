import SettingsSection from "@/components/settingsComponents/SettingsSection";
import getUser, { getUserData } from "@/lib/api/user";
import { displaySinceInfo } from "@/utils/displaySinceInfo";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token");
  const user = await getUser();
  if (user.username === null || user.isLoggedIn === false || !accessToken)
    redirect("/sign-in");
  const userData = await getUserData(user.userId, accessToken.value);
  const userSince = new Date(userData.createdAt);
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

      <SettingsSection />
    </main>
  );
}
