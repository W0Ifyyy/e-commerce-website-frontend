import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import getUser, { getUserData } from "@/lib/api/user";
import SettingsSection from "@/components/settingsComponents/SettingsSection";

export default async function SettingsPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token");
  const user = await getUser();

  if (user.username === null || user.isLoggedIn === false || !accessToken) {
    redirect("/sign-in");
  }

  const userData = await getUserData(user.userId, accessToken.value);

  if (!userData) {
    redirect("/sign-in");
  }

  return (
    <main className="min-h-[80vh] py-10 px-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center lg:text-left">
        Settings
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Info Summary - Fixed width */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-md shadow-sm h-full">
            <h2 className="text-xl font-bold mb-5">Account Overview</h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-500">Username</p>
                <p>{userData.name}</p>
              </div>
              <div>
                <p className="text-gray-500">Email</p>
                <p>{userData.email}</p>
              </div>
              <div className="pt-4 border-t border-gray-100">
                <p className="text-gray-500">Member since</p>
                <p>{new Date(userData.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Categories - Consistent with left panel */}
        <div className="lg:col-span-2">
          <SettingsSection />
        </div>
      </div>
    </main>
  );
}
