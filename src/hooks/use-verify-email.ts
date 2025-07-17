import { useMutation } from "@tanstack/react-query";
import api, { CustomAxiosError } from "@/lib/axios";
import { useToast } from "./use-toast";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/stores/users";

export function useVerifyEmailMutation() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useUser();

  return useMutation({
    mutationKey: ["verifyEmail"],
    mutationFn: async (verificationCode: string) => {
      if (!user?.email) {
        throw new Error("User email not found");
      }
      const { data } = await api.patch("/auth/verify-email", {
        email: user.email,
        verificationCode,
      });

      toast({
        variant: "default",
        title: "Email Verified",
        description: "Your email has been successfully verified.",
      });

      navigate("/signin"); // Redirect to home page after successful verification
      return data;
    },
    onError: (error: CustomAxiosError) => {
      toast({
        variant: "destructive",
        title: "Verification Failed",
        description:
          error.response?.data?.message ||
          "An error occurred during email verification.",
      });
    },
  });
}
