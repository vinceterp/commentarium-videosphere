import { Button } from "@/components/ui/button";
import { useUser } from "@/stores/users";
import { Sun, User, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "./ui/avatar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useLogout } from "@/hooks/use-logout";

type ListItem = {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode | null;
  disabled?: boolean;
};

const Navbar = () => {
  const { user, isAuthenticated } = useUser();
  const { handleLogout } = useLogout();
  const location = useLocation();
  const navigate = useNavigate();

  const hideSignIn =
    location.pathname === "/signin" ||
    location.pathname === "/signup" ||
    location.pathname === "/verify-email";

  // Extensible menu items
  const menuItems: ListItem[] = [
    {
      label: "Profile (coming soon)",
      disabled: true,
      onClick: () => {
        // Navigate to profile page
        navigate(`/profile`);
      },
    },
    {
      label: "Activity (coming soon)",
      disabled: true,
      onClick: () => {
        // Navigate to settings page
        navigate(`/activity`);
      },
    },
    {
      icon: <LogOut className="h-4 w-4" />,
      label: "Logout",
      onClick: () => handleLogout(false),
    },
    // Add more items here as needed
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 glass-morphism shadow-lg"
      style={{ borderWidth: 0 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-row items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold flex items-center">
            <p>Commentarium</p>
            <img src={"/logo.svg"} alt="Logo" className="h-6 w-6 ml-2" />
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
                <p className="text-right">{`Welcome, ${user?.firstName || user?.email}`}</p>
                <Popover>
                  <PopoverTrigger asChild>
                    <Avatar className="h-8 w-8 cursor-pointer">
                      <AvatarImage
                        src={user?.avatarUrl || "/default-avatar.png"}
                      />
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent className="glass-morphism w-48 p-2 border-0 shadow-lg m-2">
                    <div className="flex flex-col gap-2">
                      {menuItems.map((item, idx) => (
                        <Button
                          key={item.label}
                          variant="secondary"
                          className="justify-start w-full bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                          onClick={item.onClick}
                          disabled={item.disabled}
                        >
                          {item.icon && (
                            <span className="mr-2">{item.icon}</span>
                          )}
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
