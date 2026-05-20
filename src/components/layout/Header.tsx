import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  User,
  Sun,
  Moon,
  LogOut,
  Settings,
} from "lucide-react";
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

  // Prevent background scrolling when mobile menu drawer is deployed
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const isTransparent = isHomePage && !isScrolled;

  const headerStyles = isTransparent
    ? "bg-transparent py-5 lg:py-6"
    : "bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md shadow-xs py-3 lg:py-4 border-b border-neutral-200/50 dark:border-neutral-800/50";

  const linkBase =
    "text-sm font-medium transition-all duration-300 relative py-2";

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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerStyles}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo Section */}
        <Link
          to="/"
          className="flex items-center group transition-transform hover:scale-[1.02] active:scale-98 z-50"
        >
          <Logo color={isTransparent ? "white" : "primary"} />
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          {["Home", "About", "Sermons", "Events", "Giving", "Contact"].map(
            (item) => (
              <NavLink
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                {item}
              </NavLink>
            ),
          )}
        </nav>

        {/* Desktop Action Area */}
        <div className="flex items-center space-x-2 sm:space-x-3 z-50">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme Mode"
            className={`p-2.5 rounded-xl transition-all duration-300 cursor-pointer active:scale-95 ${
              isTransparent
                ? "bg-white/10 text-white hover:bg-white/20"
                : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400"
            }`}
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Desktop Auth Portal Panel */}
          <div className="hidden lg:flex items-center space-x-3 border-l border-neutral-200/50 dark:border-neutral-700/50 ml-2 pl-5">
            {currentUser ? (
              <div className="relative group">
                <button
                  className={`flex items-center gap-2 py-1.5 px-3 rounded-lg transition-colors cursor-pointer ${
                    isTransparent
                      ? "text-white hover:bg-white/10"
                      : "text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white text-xs font-bold ring-2 ring-primary-500/20 shrink-0">
                    {currentUser.displayName?.charAt(0) || <User size={14} />}
                  </div>
                  <span className="text-sm font-semibold max-w-[120px] truncate">
                    {currentUser.displayName}
                  </span>
                  <ChevronDown
                    size={14}
                    className="opacity-50 group-hover:rotate-180 transition-transform duration-300"
                  />
                </button>

                {/* Account Settings Dropdown Card */}
                <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/60 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    <Settings size={16} className="opacity-70" /> Account Settings
                  </Link>
                  <hr className="my-1 border-neutral-100 dark:border-neutral-800" />
                  <button
                    onClick={signOut}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors cursor-pointer text-left"
                  >
                    <LogOut size={16} className="opacity-70" /> Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className={`text-sm font-medium px-3.5 py-2 rounded-lg transition-colors ${
                    isTransparent
                      ? "text-white hover:bg-white/10"
                      : "text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20"
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`text-sm font-bold px-4 py-2 rounded-lg shadow-sm transition-all hover:scale-[1.03] active:scale-97 ${
                    isTransparent
                      ? "bg-white text-neutral-900 hover:bg-neutral-50"
                      : "bg-primary-600 text-white hover:bg-primary-700"
                  }`}
                >
                  Join Us
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Open/Close Trigger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className={`lg:hidden p-2 rounded-xl transition-colors cursor-pointer ${
              isTransparent
                ? "text-white hover:bg-white/10"
                : "text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
            }`}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Full Screen Responsive Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 top-0 pt-20 h-screen w-full bg-white dark:bg-neutral-900 z-40 lg:hidden overflow-y-auto transition-all duration-500 ease-in-out ${
          isMenuOpen
            ? "translate-x-0 opacity-100 shadow-xl"
            : "translate-x-full opacity-0"
        }`}
      >
        <nav className="max-w-md mx-auto px-6 py-8 flex flex-col h-full justify-between pb-24">
          {/* Main Route Map List */}
          <div className="flex flex-col space-y-1">
            <p className="text-[11px] font-bold tracking-wider text-neutral-400 dark:text-neutral-500 uppercase px-3 mb-2">
              Navigation Menu
            </p>
            {["Home", "About", "Sermons", "Events", "Giving", "Contact"].map(
              (item) => (
                <NavLink
                  key={item}
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-lg font-bold px-4 py-3.5 rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400"
                        : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800/40"
                    }`
                  }
                >
                  {item}
                </NavLink>
              ),
            )}
          </div>

          {/* Mobile Action/Auth Portal Area */}
          <div className="border-t border-neutral-200 dark:border-neutral-800 pt-6 mt-8">
            {!currentUser ? (
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full py-3.5 text-center text-sm font-semibold text-neutral-700 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800 rounded-xl hover:opacity-90 transition-opacity"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full py-3.5 text-center text-sm font-bold bg-primary-600 text-white rounded-xl hover:bg-primary-700 shadow-xs transition-colors"
                >
                  Join Us
                </Link>
              </div>
            ) : (
              <div className="flex flex-col space-y-3">
                {/* Mobile Active User Details Bar */}
                <div className="flex items-center gap-3 px-3 py-2 bg-neutral-50 dark:bg-neutral-800/40 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold">
                    {currentUser.displayName?.charAt(0) || <User size={16} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-neutral-800 dark:text-neutral-100 truncate">
                      {currentUser.displayName}
                    </p>
                    <p className="text-xs text-neutral-400 truncate">
                      Active Account
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center gap-2 py-3 text-xs font-semibold text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 rounded-xl transition-colors"
                  >
                    <Settings size={14} /> Profile
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 py-3 text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 rounded-xl transition-colors cursor-pointer"
                  >
                    <LogOut size={14} /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;