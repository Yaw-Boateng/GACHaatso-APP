import React, { useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  BookOpen,
  Users,
  ClipboardCheck,
  BarChart3,
  Wallet,
  MessageSquare,
  Settings,
  LogOut,
  Sparkles,
  Sun,
  Moon,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

interface SidebarProps {
  role: "ADMIN" | "LEADER" | "MEMBER" | string;
}

interface NavItem {
  label: string;
  path: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
  roles: string[];
}

const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const { signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems: NavItem[] = [
    {
      label: "Overview",
      path: "/dashboard",
      icon: LayoutDashboard,
      roles: ["ADMIN", "LEADER", "MEMBER"],
    },
    {
      label: "My Events",
      path: "/dashboard/events",
      icon: Calendar,
      roles: ["MEMBER"],
    },
    {
      label: "Resources",
      path: "/dashboard/resources",
      icon: BookOpen,
      roles: ["MEMBER"],
    },
    {
      label: "My Group",
      path: "/dashboard/group",
      icon: Users,
      roles: ["LEADER"],
    },
    {
      label: "Attendance",
      path: "/dashboard/attendance",
      icon: ClipboardCheck,
      roles: ["LEADER"],
    },
    {
      label: "Church Stats",
      path: "/dashboard/stats",
      icon: BarChart3,
      roles: ["ADMIN"],
    },
    {
      label: "Leaders",
      path: "/dashboard/leaders",
      icon: Wallet,
      roles: ["ADMIN"],
    },
    {
      label: "Members",
      path: "/dashboard/members",
      icon: Users,
      roles: ["ADMIN"],
    },
    {
      label: "Messages",
      path: "/dashboard/messages",
      icon: MessageSquare,
      roles: ["ADMIN"],
    },
    {
      label: "Events",
      path: "/dashboard/eventsdb",
      icon: Sparkles,
      roles: ["ADMIN"],
    },
    {
      label: "Settings",
      path: "/dashboard/settings",
      icon: Settings,
      roles: ["ADMIN", "LEADER", "MEMBER"],
    },
  ];

  const filteredItems = navItems.filter((item) =>
    item.roles.includes(role.toUpperCase()),
  );

  // Modern Minimalistic Styling Classes
  const activeLink =
    "flex items-center gap-3 px-4 py-2.5 rounded-lg bg-primary-600 text-white hover:text-[#edf3fc] dark:bg-white dark:text-neutral-900 shadow-sm transition-all duration-200 font-medium text-sm ";
  const normalLink =
    "flex items-center gap-3 px-4 py-2.5 rounded-lg text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900/60 hover:text-neutral-900 dark:hover:text-neutral-100 transition-all duration-150 text-sm";

  const NavigationLinks = () => (
    <div className="space-y-1">
      {filteredItems.map((item) => {
        const Icon = item.icon;
        // Strict matching for home overview path to prevent nested overlap highlight
        const isCurrentActive =
          item.path === "/dashboard"
            ? location.pathname === "/dashboard"
            : location.pathname.startsWith(item.path);

        return (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setIsMobileOpen(false)}
            className={isCurrentActive ? activeLink : normalLink}
          >
            <Icon
              size={18}
              className={
                isCurrentActive
                  ? "opacity-100"
                  : "opacity-70 group-hover:opacity-100"
              }
            />
            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </div>
  );

  return (
    <>
      {/* 1. MOBILE RESPONSIVE TOP NAV BAR */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 border-b border-neutral-200/60 dark:border-neutral-800/60 bg-white/80 dark:bg-[#090a0f]/80 backdrop-blur-md z-50 flex items-center justify-between px-4 transition-colors">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-primary-600 dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-neutral-900 font-bold text-base">
            G
          </div>
          <span className="text-base font-bold tracking-tight text-primary-600 dark:text-neutral-100">
            GAC Haatso
          </span>
        </Link>

        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 text-primary-600 dark:text-neutral-400 transition-colors"
          aria-label="Toggle navigation menu"
        >
          {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* 2. MOBILE DRAWER OVERLAY */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 top-16 bg-neutral-950/20 dark:bg-black/40 backdrop-blur-xs z-40 transition-fade"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* 3. MOBILE MENU SLIDEOUT DRAWER */}
      <div
        className={`lg:hidden fixed top-16 bottom-0 left-0 w-72 bg-white dark:bg-[#0d0e16] border-r border-neutral-200/60 dark:border-neutral-800/60 z-40 p-4 transform transition-transform duration-300 ease-in-out flex flex-col justify-between overflow-y-auto ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-4">
          <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 opacity-60">
            Main Menu
          </p>
          <NavigationLinks />
        </div>

        <div className="pt-4 border-t border-neutral-200/60 dark:border-neutral-800/60 space-y-1">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900/50 hover:text-neutral-900 dark:hover:text-neutral-100 text-sm font-medium transition-all duration-200 ease-out active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-200 dark:focus-visible:outline-neutral-800 cursor-pointer group select-none"
          >
            {theme === "dark" ? (
              <>
                <Sun
                  size={18}
                  className="text-amber-500 transition-transform duration-300 group-hover:rotate-45"
                />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <Moon
                  size={18}
                  className="text-indigo-500 transition-transform duration-300 group-hover:-rotate-12"
                />
                <span>Dark Mode</span>
              </>
            )}
          </button>
          <button
            onClick={() => {
              setIsMobileOpen(false);
              signOut ? signOut() : console.log("Out");
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 text-sm font-medium"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* 4. PERMANENT DESKTOP SIDEBAR PANEL */}
      <aside className="w-64 hidden lg:flex flex-col h-screen sticky top-0 border-r border-neutral-200/60 dark:border-neutral-800/60 bg-white dark:bg-[#0d0e16] transition-colors duration-300 shrink-0">
        <Link to="/" className="p-6 block group">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-neutral-900 dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-neutral-900 shadow-xs transition-transform duration-200 group-hover:scale-102">
              <span className="font-bold text-lg tracking-tighter">G</span>
            </div>
            <span className="text-base font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              GAC Church
            </span>
          </div>
        </Link>

        <nav className="flex-1 px-3 space-y-4 overflow-y-auto no-scrollbar">
          <div>
            <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-2 opacity-60">
              Main Menu
            </p>
            <NavigationLinks />
          </div>
        </nav>

        <div className="p-3 border-t border-neutral-200/60 dark:border-neutral-800/60 space-y-0.5">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900/60 text-sm font-medium transition-all cursor-pointer"
          >
            {theme === "dark" ? (
              <>
                <Sun size={18} className="text-amber-500" />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <Moon
                  size={18}
                  className="text-neutral-600 dark:text-neutral-400"
                />
                <span>Dark Mode</span>
              </>
            )}
          </button>

          <button
            onClick={() => (signOut ? signOut() : console.log("Out"))}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-neutral-400 dark:text-neutral-500 hover:bg-red-50 dark:hover:bg-red-950/10 hover:text-red-500 dark:hover:text-red-400 text-sm font-medium transition-all cursor-pointer"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
