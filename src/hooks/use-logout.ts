import api from "@/lib/axios";
import { useUser } from "@/stores/users";

export function useLogout() {
  const { logout } = useUser();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      logout();
    } catch (error) {
      console.error("Logout failed:", error);
      logout(); // Fallback to local logout if API fails
    }
  };

  return { handleLogout };
}
