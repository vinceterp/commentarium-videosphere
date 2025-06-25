import { Button } from "@/components/ui/button";
import { Sun, User } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-morphism">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold">
            Commentarium
          </Link>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-secondary">
              <Sun className="h-5 w-5" />
            </Button>
            <Link to="/signin">
              <Button variant="secondary" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
