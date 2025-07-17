import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRegisterUserMutation } from "@/hooks/use-register-user";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/stores/users";
import { CircleCheck, Eye, EyeClosed } from "lucide-react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();

  const isPasswordLengthValid = password.length >= 8;
  const isPasswordContainsNumber = /\d/.test(password);
  const isPasswordContainsSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const passwordValid =
    isPasswordContainsNumber &&
    isPasswordContainsSpecialChar &&
    isPasswordLengthValid;
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const { mutate, isPending } = useRegisterUserMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign up logic here
    if (password !== confirmPassword) {
      window.alert("Passwords do not match");
      return;
    }
    // Call the mutation to register the user
    mutate({ email, password, firstName, lastName, username });
  };

  React.useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  return (
    <div className="h-[calc(100vh )] flex items-center justify-center p-4">
      <div className="glass-morphism p-8 rounded-lg w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="space-y-2 mb-2">
              <label
                htmlFor="first-name"
                className="text-sm font-medium text-gray-200"
              >
                First Name
              </label>
              <Input
                id="first-name"
                type="text"
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <div className="space-y-2 mb-2">
              <label
                htmlFor="last-name"
                className="text-sm font-medium text-gray-200"
              >
                Last Name
              </label>
              <Input
                id="last-name"
                type="text"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <div className="space-y-2 mb-2">
              <label
                htmlFor="username"
                className="text-sm font-medium text-gray-200"
              >
                Username
              </label>
              <Input
                id="username"
                type="text"
                placeholder="johndoe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <div className="space-y-2 mb-2">
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
            </div>
            <div className="space-y-2 mb-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-200"
              >
                Password
              </label>
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
            <div className="flex flex-col gap-2 my-2 text-sm text-gray-400">
              <div className="flex gap-2 items-center">
                <CircleCheck
                  className="h-4 w-4"
                  fillRule="inherit"
                  color={isPasswordLengthValid ? "green" : "grey"}
                />
                <p>Password must be at least 8 characters long.</p>
              </div>
              <div className="flex gap-2 items-center">
                <CircleCheck
                  className="h-4 w-4"
                  fillRule="inherit"
                  color={isPasswordContainsNumber ? "green" : "grey"}
                />
                <p>Password must contain at least 1 number.</p>
              </div>
              <div className="flex gap-2 items-center">
                <CircleCheck
                  className="h-4 w-4"
                  fillRule="inherit"
                  color={isPasswordContainsSpecialChar ? "green" : "grey"}
                />
                <p>Password must contain a special character.</p>
              </div>
            </div>

            <div className="space-y-2 mb-2">
              <label
                htmlFor="confirm-password"
                className="text-sm font-medium text-gray-200"
              >
                Confirm password
              </label>
              <div className="flex items-center relative">
                <Input
                  id="confirm-password"
                  type={"password"}
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
            </div>
          </div>
          <Button
            loading={isPending}
            type="submit"
            className="w-full"
            variant="secondary"
            disabled={!passwordValid}
          >
            Continue
          </Button>
        </form>
        <p className="text-sm text-center text-gray-400">
          Already have an account?{" "}
          <a href="/signin" className="text-secondary hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
