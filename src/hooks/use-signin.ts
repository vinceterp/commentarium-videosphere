import api from "@/lib/axios";
import { useUser } from "@/stores/users";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useToast } from "./use-toast";

export interface LogInInput {
  email: string;
  password: string;
}

export function useSignIn() {
  const { toast } = useToast();
  const { setUser, setIsAuthenticated } = useUser();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["signIn"],
    mutationFn: async ({ email, password }: LogInInput) => {
      const { data: user } = await api.post("/auth/authenticate", {
        email,
        password,
      });
      const canGoBack = window.history.length > 2;

      const { token, refreshToken, ...userData } = user;

      localStorage.setItem("access-token", token);
      localStorage.setItem("refresh-token", refreshToken);

      // Set user and authentication state
      setUser(userData);
      setIsAuthenticated(true);

      if (canGoBack) {
        window.history.back(); // Go back to the previous page if possible
      } else {
        navigate("/"); // Otherwise, navigate to the home page
      }

      return user;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      if (error?.response?.data?.message === "Email not verified") {
        toast({
          variant: "destructive",
          title: "Email Not Verified",
          description: "Please verify your email address before logging in.",
        });
        navigate("/verify-email"); // Redirect to email verification page
      } else {
        toast({
          variant: "destructive",
          title: "Log in Failed",
          description:
            error?.response?.data?.message || "An error occurred during login.",
        });
      }
    },
    retry: false, // Disable automatic retries
  });
}
