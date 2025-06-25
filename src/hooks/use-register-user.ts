import { useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";
import { useToast } from "./use-toast";

export interface User {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export function useRegisterUserMutation() {
  const { toast } = useToast();
  return useMutation({
    mutationKey: ["registerUser"],
    mutationFn: async (user: User) => {
      const { data } = await api.post("/auth/register", user); // Change endpoint as needed
      localStorage.setItem("token", data.token); // Store token in localStorage
      localStorage.setItem("refreshToken", data.refreshToken); // Store refresh token
      api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`; // Set token

      if (data.message && data.token === null) {
        toast({
          variant: "destructive",
          title: "User Registration Failed",
          description: data.message,
        });
      }

      return data;
    },
  });
}
