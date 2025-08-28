import axios from "axios";
import { cookies } from "next/headers";

export default async function getUser() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token");

  if (!accessToken) {
    return { username: null, isLoggedIn: false };
  }

  try {
    const res = await axios.get("http://localhost:5000/auth/profile", {
      headers: {
        Cookie: `access_token=${accessToken.value}; HttpOnly=true; SameSite=Lax; Path=/; Secure=true`,
      },
    });

    if (res.status === 200) {
      return {
        username: res.data.username,
        isLoggedIn: true,
        userId: res.data.userId,
      };
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
  }

  return { username: null, isLoggedIn: false, userId: null };
}

export async function getUserData(id: string, accessToken: string) {
  try {
    const res = await axios.get(`http://localhost:5000/user/${id}`, {
      headers: {
        Cookie: `access_token=${accessToken}; HttpOnly=true; SameSite=Lax; Path=/; Secure=true`,
      },
    });
    if (res.status === 200) {
      return res.data;
    }
    return null;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}
