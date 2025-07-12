import { Button } from "@/components/ui/button";
import { useUser } from "@/stores/users";
import { Sun, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Avatar, AvatarImage } from "./ui/avatar";

const Navbar = () => {
  const { user, isAuthenticated } = useUser();
  const location = useLocation();
  const hideSignIn =
    location.pathname === "/signin" || location.pathname === "/signup";
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 glass-morphism shadow-lg"
      style={{ borderWidth: "0px" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold">
            Commentarium
          </Link>

          <div className="flex items-center gap-4">
            {/* <Button variant="ghost" size="icon" className="text-secondary">
              <Sun className="h-5 w-5" />
            </Button> */}
            {!isAuthenticated && !hideSignIn ? (
              <Link to="/signin">
                <Button variant="secondary" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Sign In
                </Button>
              </Link>
            ) : isAuthenticated ? (
              <>
                <p>{`Welcome, ${user?.firstName || user?.email}`}</p>
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=`}
                  />
                </Avatar>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
