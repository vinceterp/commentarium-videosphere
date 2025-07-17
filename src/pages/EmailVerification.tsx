import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useVerifyEmailMutation } from "@/hooks/use-verify-email";
import { useUser } from "@/stores/users";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const TIMER_KEY = "emailVerificationTimerExpiresAt";

const EmailVerification = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [timerExpired, setTimerExpired] = useState(false);
  const [timer, setTimer] = useState(() => {
    const expiresAt = localStorage.getItem(TIMER_KEY);
    if (expiresAt) {
      const diff = Math.floor((Number(expiresAt) - Date.now()) / 1000);
      return diff > 0 ? diff : 0;
    }
    // Set new timer
    const newExpiresAt = Date.now() + 15 * 60 * 1000;
    localStorage.setItem(TIMER_KEY, String(newExpiresAt));
    return 15 * 60;
  });

  const { isAuthenticated } = useUser();

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign in logic here
    if (!verificationCode.trim()) {
      window.alert("Please enter the verification code");
      return;
    }
    verifyEmail(verificationCode);
    setVerificationCode("");
  };

  const { mutate: verifyEmail, isPending } = useVerifyEmailMutation();

  React.useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  React.useEffect(() => {
    if (timer <= 0) {
      setTimerExpired(true);
      localStorage.removeItem(TIMER_KEY);
      return;
    }
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div className="h-[calc(100vh-256px)] flex items-center justify-center p-4">
      <div className="glass-morphism p-8 rounded-lg w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center">Email Verification</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="verification-code"
              className="text-sm font-medium text-gray-200"
            >
              Verification Code
            </label>
            <Input
              id="verification-code"
              type="number"
              value={verificationCode}
              onChange={(e) => {
                // Only allow up to 6 digits
                const val = e.target.value.replace(/[^0-9]/g, "").slice(0, 6);
                setVerificationCode(val);
              }}
              required
              className="w-full [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none appearance-none"
            />
          </div>
          <Button
            loading={isPending}
            type="submit"
            className="w-full"
            variant="secondary"
          >
            Continue
          </Button>
        </form>
        <p className="text-sm text-center text-gray-400">
          {timerExpired ? (
            <Link
              to={null}
              onClick={() => window.alert("resending")}
              className="text-secondary hover:underline"
            >
              Resend verification code
            </Link>
          ) : (
            <span>
              {`${String(Math.floor(timer / 60)).padStart(2, "0")}:${String(
                timer % 60,
              ).padStart(2, "0")}`}{" "}
              until you can resend
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default EmailVerification;
