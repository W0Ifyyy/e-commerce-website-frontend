import getUser, { getUserData } from "@/lib/api/user";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import PreferencesPageSection from "@/components/settingsComponents/PreferencesPageSection";

export default async function PreferencesPage() {
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
    <PreferencesPageSection
      userPreferences={{
        currency: userData.preferredCurrency,
        country: userData.country,
        emailNotifications: userData.emailNotifications,
        id: userData.id,
        accessToken: accessToken.value,
      }}
    />
  );
}
