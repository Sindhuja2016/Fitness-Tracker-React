import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/signin");
  };

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-orange-500 text-white font-bold rounded-lg px-3 py-2">
              FC
            </div>
            <span className="font-bold text-xl">
              FitChallenge
            </span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/home" className="hover:text-orange-500">Home</Link>
            <Link to="/browsechallenges" className="hover:text-orange-500">Browse</Link>
            <Link to="/dashboard" className="hover:text-orange-500">Dashboard</Link>
            <Link to="/favourites" className="hover:text-orange-500">Favourites</Link>
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="hover:text-orange-500"
              >
                <User size={22} />
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-52 bg-white border rounded-xl shadow-lg z-50">

                  <button
                    onClick={() => {
                      navigate("/profile");
                      setShowMenu(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50">Profile</button>

                  <button
                    onClick={() => {
                      navigate("/my-challenges");
                      setShowMenu(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50" > My Challenges</button>

                  <button
                    onClick={() => { navigate("/settings"); setShowMenu(false); }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50">Settings
                  </button>
                  <hr />
                  <button
                    onClick={() => {
                      handleLogout();
                      setShowMenu(false);
                    }}
                    className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-50"
                  >
                    Logout
                  </button>

                </div>
              )}
            </div>
          </nav>

          {/* Mobile Button */}
          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <nav className="md:hidden flex flex-col gap-4 py-4 border-t">

            <Link to="/home" onClick={() => setOpen(false)}>
              Home
            </Link>

            <Link to="/browsechallenges" onClick={() => setOpen(false)}>
              Browse Challenges
            </Link>

            <Link to="/profile" onClick={() => setOpen(false)}>
              Profile
            </Link>

            <Link to="/my-challenges" onClick={() => setOpen(false)}>
              My Challenges
            </Link>

            <Link to="/settings" onClick={() => setOpen(false)}>
              Settings
            </Link>

            <button
              onClick={() => {
                handleLogout();
                setOpen(false);
              }}
              className="text-left text-red-500"
            >
              Logout
            </button>

          </nav>
        )}
      </div>
    </header>
  );
}

export default Navbar;