import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, User, Sun, Moon, LogOut, Settings } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import Logo from "../ui/Logo";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { currentUser, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Dynamic Styles based on scroll and page type
  const isTransparent = isHomePage && !isScrolled;

  const headerStyles = isTransparent
    ? "bg-transparent py-6" // Taller, clear header at top
    : "bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md shadow-sm py-4 border-b border-neutral-200/50 dark:border-neutral-800/50";

  const linkBase = "text-sm font-medium transition-all duration-300 relative py-2";
  
  const getNavLinkClass = (isActive) => {
    const activeColor = isTransparent 
      ? "text-white after:scale-x-100" 
      : "text-primary-600 dark:text-primary-400 after:scale-x-100";
    
    const inactiveColor = isTransparent
      ? "text-white/80 hover:text-white"
      : "text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400";

    return `${linkBase} ${isActive ? activeColor : inactiveColor} 
            after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 
            after:bg-current after:transition-transform after:duration-300 
            ${!isActive ? "after:scale-x-0 hover:after:scale-x-50" : ""}`;
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerStyles}`}>
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
        
        {/* Logo Section */}
        <Link to="/" className="flex items-center group transition-transform hover:scale-105 active:scale-95">
          <Logo color={isTransparent ? "white" : "primary"} />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-7">
          {["Home", "About", "Sermons", "Events", "Giving", "Contact"].map((item) => (
            <NavLink 
              key={item} 
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className={({ isActive }) => getNavLinkClass(isActive)}
            >
              {item}
            </NavLink>
          ))}
        </nav>

        {/* Action Area */}
        <div className="flex items-center space-x-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-xl transition-all duration-300 ${
              isTransparent 
                ? "bg-white/10 text-white hover:bg-white/20" 
                : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-primary-600"
            }`}
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Desktop Auth */}
          <div className="hidden lg:flex items-center space-x-3 border-l border-neutral-200/50 dark:border-neutral-700/50 ml-3 pl-6">
            {currentUser ? (
              <div className="relative group">
                <button className={`flex items-center gap-2 py-1.5 px-3 rounded-lg transition-colors ${
                  isTransparent ? "text-white hover:bg-white/10" : "text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                }`}>
                  <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white text-xs font-bold ring-2 ring-primary-500/20">
                    {currentUser.displayName?.charAt(0) || <User size={14}/>}
                  </div>
                  <span className="text-sm font-semibold">{currentUser.displayName}</span>
                  <ChevronDown size={14} className="opacity-50 group-hover:rotate-180 transition-transform" />
                </button>
                
                {/* User Dropdown */}
                <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <Link to="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-600 dark:text-neutral-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 transition-colors">
                    <Settings size={16} /> Account Settings
                  </Link>
                  <button onClick={signOut} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
                  isTransparent ? "text-white hover:bg-white/10" : "text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20"
                }`}>
                  Login
                </Link>
                <Link to="/register" className={`text-sm font-bold px-5 py-2 rounded-lg shadow-lg shadow-primary-600/20 transition-all hover:scale-105 active:scale-95 ${
                  isTransparent ? "bg-white text-primary-900 hover:bg-primary-50" : "bg-primary-600 text-neutral-300 hover:text-white"
                }`}>
                  Join Us
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden p-2 rounded-lg ${
              isTransparent ? "text-white" : "text-neutral-900 dark:text-white"
            }`}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 top-20 bg-white dark:bg-neutral-900 z-40 lg:hidden transition-all duration-500 ease-in-out ${
        isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}>
        <nav className="container mx-auto px-6 py-8 flex flex-col space-y-2">
          {["Home", "About", "Sermons", "Events", "Giving", "Contact"].map((item) => (
            <NavLink 
              key={item} 
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className={({ isActive }) => `text-xl font-bold py-4 border-b border-neutral-100 dark:border-neutral-800 ${
                isActive ? "text-primary-600" : "text-neutral-800 dark:text-neutral-200"
              }`}
            >
              {item}
            </NavLink>
          ))}
          
          <div className="pt-8 flex flex-col gap-4">
            {!currentUser ? (
              <>
                <Link to="/login" className="w-full py-4 text-center font-bold text-primary-600 border-2 border-primary-600 rounded-xl">Login</Link>
                <Link to="/register" className="w-full py-4 text-center font-bold bg-primary-600 text-white rounded-xl">Create Account</Link>
              </>
            ) : (
              <button onClick={signOut} className="w-full py-4 text-center font-bold text-red-500 bg-red-50 dark:bg-red-900/10 rounded-xl">Sign Out</button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;