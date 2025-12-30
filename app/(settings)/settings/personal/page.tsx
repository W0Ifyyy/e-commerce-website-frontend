import PersonalPageSection from "@/components/settingsComponents/PersonalPageSection";
import getUser, { getUserData } from "@/lib/api/user";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function PersonalSettingsPage() {
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
    <div>
      <PersonalPageSection
        userInfo={{
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          id: user.userId,
        }}
      />
    </div>
  );
}
