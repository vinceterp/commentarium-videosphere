import { Button } from "@/components/ui/button";
import { useUser } from "@/stores/users";
import { Sun, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Avatar, AvatarImage } from "./ui/avatar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useLogout } from "@/hooks/use-logout";

const Navbar = () => {
  const { user, isAuthenticated } = useUser();
  const { handleLogout } = useLogout();
  const location = useLocation();

  const hideSignIn =
    location.pathname === "/signin" || location.pathname === "/signup";

  // Extensible menu items
  const menuItems = [
    {
      label: "Logout",
      onClick: () => handleLogout(false),
    },
    // Add more items here as needed
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-morphism shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold">
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
                <Popover>
                  <PopoverTrigger asChild>
                    <Avatar className="h-8 w-8 cursor-pointer">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username || user?.email || "user"}`}
                      />
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent className="w-48 p-2 border-0 bg-secondary shadow-lg m-2">
                    <div className="flex flex-col gap-2">
                      {menuItems.map((item, idx) => (
                        <Button
                          key={item.label}
                          variant="secondary"
                          className="justify-start w-full bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                          onClick={item.onClick}
                        >
                          {item.label}
                        </Button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
