import SecurityPageSection from "@/components/settingsComponents/SecurityPageSection";
import getUser from "@/lib/api/user";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function SecuritySettingsPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token");
  const user = await getUser();

  if (user.username === null || user.isLoggedIn === false || !accessToken) {
    redirect("/sign-in");
  }

  return (
    <SecurityPageSection
      userInfo={{ id: user.userId, accessToken: accessToken.value }}
    />
  );
}
