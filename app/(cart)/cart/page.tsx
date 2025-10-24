import CartPageContentMain from "@/components/cart/CartPageContentMain";
import getUser from "@/lib/api/user";

export default async function CartPage() {
  const { isLoggedIn, userId } = await getUser();

  return <CartPageContentMain isAuthenticated={isLoggedIn} userId={userId} />;
}
