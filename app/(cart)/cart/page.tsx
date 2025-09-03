import CartPageContentMain from "@/components/cart/CartPageContentMain";
import axios from "axios";
import { cookies } from "next/headers";

export default async function CartPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token");

  let userId = null;
  let isLoggedIn = false;
  if (accessToken) {
    try {
      const res = await axios.get("http://localhost:5000/auth/profile", {
        headers: {
          Cookie: `access_token=${accessToken.value}; HttpOnly=true; SameSite=Lax; Path=/; Secure=true`,
        },
      });
      if (res.status === 200) {
        userId = res.data.userId;
        isLoggedIn = true;
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  }
  return <CartPageContentMain isAuthenticated={isLoggedIn} userId={userId} />;
}
