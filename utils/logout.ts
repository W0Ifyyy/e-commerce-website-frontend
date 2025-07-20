import axios from "axios";

export async function logout() {
  try {
    await axios.post(
      "http://localhost:5000/auth/logout",
      {},
      { withCredentials: true }
    );
  } catch (error) {
    console.error("Error logging out:", error);
  }
  return { msg: "Logged out successfully", status: 200 };
}
