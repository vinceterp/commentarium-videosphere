
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const SignIn = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign in logic here
    console.log("Signing in with:", email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-morphism p-8 rounded-lg w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center text-secondary">Sign In</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-200">
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
          <Button type="submit" className="w-full" variant="secondary">
            Continue with Email
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
