import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRegisterUserMutation } from "@/hooks/use-register-user";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");

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

  return (
    <div className="h-[calc(100vh-128px)] flex items-center justify-center p-4">
      <div className="glass-morphism p-8 rounded-lg w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
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
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-200"
            >
              Password
            </label>
            <div className="flex items-center relative">
              <Input
                id="password"
                type={"password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full"
              />
              {/* {!showPassword ? (
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
              )} */}
            </div>
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
              {/* {!showPassword ? (
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
              )} */}
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
