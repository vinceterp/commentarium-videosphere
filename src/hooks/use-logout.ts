import api from "@/lib/axios";
import { useUser } from "@/stores/users";

export function useLogout() {
  const { logout } = useUser();

  const handleLogout = async (navigateToLogin = true) => {
    try {
      await api.post("/auth/logout");
      logout(navigateToLogin);
    } catch (error) {
      console.error("Logout failed:", error);
      logout(navigateToLogin); // Fallback to local logout if API fails
    }
  };

  return { handleLogout };
}
