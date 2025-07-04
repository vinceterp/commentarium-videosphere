import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignIn } from "@/hooks/use-signin";
import { useUser } from "@/stores/users";
import { Eye, EyeClosed } from "lucide-react";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();

  const { mutate: signIn, isPending } = useSignIn();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign in logic here
    if (!email || !password) {
      window.alert("Please fill in all fields");
      return;
    }
    signIn({ email, password });
  };

  React.useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  return (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center p-4">
      <div className="glass-morphism p-8 rounded-lg w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center">Sign In</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-200"
            >
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
            <div className="flex items-center relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full"
              />
              {!showPassword ? (
                <EyeClosed
                  size={16}
                  className="absolute right-3 cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <Eye
                  size={16}
                  className="absolute right-3 cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>
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
          Don't have an account?{" "}
          <Link to="/signup" className="text-secondary hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
