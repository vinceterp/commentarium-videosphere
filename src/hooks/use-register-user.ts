import { useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";
import { useToast } from "./use-toast";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/stores/users";

export interface User {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export function useRegisterUserMutation() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useUser();
  return useMutation({
    mutationKey: ["registerUser"],
    mutationFn: async (user: User) => {
      const { data } = await api.post("/auth/register", user); // Change endpoint as needed

      toast({
        variant: "default",
        title: "Registration Successful",
        description: "Please verify your email address to continue.",
      });

      const { token, refreshToken, ...userData } = data; // Destructure to get user data without tokens

      setUser(userData); // Set user data in store
      // localStorage.setItem("access-token", token); // Store access token
      // localStorage.setItem("refresh-token", refreshToken); // Store refresh token

      // setIsAuthenticated(true); // Set authentication state

      navigate("/verify-email"); // Redirect to home page after successful registration
      return data;
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description:
          error.response.data.message ||
          "An error occurred during registration.",
      });
    },
  });
}
