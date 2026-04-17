import React from 'react';
import { NavLink, Link } from 'react-router-dom';
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
  Bell,
  Sun,
  Moon
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

interface SidebarProps {
  role: 'ADMIN' | 'LEADER' | 'MEMBER' | string;
}

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  roles: string[];
}

const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const { signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const navItems: NavItem[] = [
    { label: 'Overview', path: '/dashboard', icon: <LayoutDashboard size={20} />, roles: ['ADMIN', 'LEADER', 'MEMBER'] },
    { label: 'My Events', path: '/dashboard/events', icon: <Calendar size={20} />, roles: ['MEMBER'] },
    { label: 'Resources', path: '/dashboard/resources', icon: <BookOpen size={20} />, roles: ['MEMBER'] },
    { label: 'My Group', path: '/dashboard/group', icon: <Users size={20} />, roles: ['LEADER'] },
    { label: 'Attendance', path: '/dashboard/attendance', icon: <ClipboardCheck size={20} />, roles: ['LEADER'] },
    { label: 'Church Stats', path: '/dashboard/stats', icon: <BarChart3 size={20} />, roles: ['ADMIN'] },
    { label: 'Finances', path: '/dashboard/finances', icon: <Wallet size={20} />, roles: ['ADMIN'] },
    { label: 'Members', path: '/dashboard/members', icon: <Users size={20} />, roles: ['ADMIN'] },
    { label: 'Messages', path: '/dashboard/messages', icon: <MessageSquare size={20} />, roles: ['ADMIN'] },
    { label: 'Notifications', path: '/dashboard/notifications', icon: <Bell size={20} />, roles: ['ADMIN', 'LEADER', 'MEMBER'] },
    { label: 'Settings', path: '/dashboard/settings', icon: <Settings size={20} />, roles: ['ADMIN', 'LEADER', 'MEMBER'] },
  ];

  const filteredItems = navItems.filter(item => item.roles.includes(role.toUpperCase()));

  const activeLink = "flex items-center gap-3 px-4 py-3 rounded-xl bg-primary-600 text-white shadow-lg shadow-primary-600/20 transition-all duration-300";
  const normalLink = "flex items-center gap-3 px-4 py-3 rounded-xl text-theme-muted hover:bg-theme-base hover:text-primary-600 transition-all duration-200";

  return (
    <aside className="w-72 hidden lg:flex flex-col h-screen sticky top-0 border-r border-theme-border bg-theme-surface transition-colors duration-300">
      
      <Link to="/" className="p-8 block transition-transform duration-200 active:scale-95 group">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary-600/30 group-hover:bg-primary-700 transition-colors">
            <span className="font-black text-xl">G</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-theme-text">GAC Church</span>
        </div>
      </Link>

      <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar">
        <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-theme-muted mb-4 opacity-50">Main Menu</p>
        {filteredItems.map((item) => (
          <NavLink key={item.path} to={item.path} end={item.path === '/dashboard'} className={({ isActive }) => (isActive ? activeLink : normalLink)}>
            {item.icon}
            <span className="font-semibold">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-theme-border space-y-2">
        <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-theme-muted mb-2 opacity-50">System</p>
        <button onClick={toggleTheme} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-theme-muted hover:bg-theme-base hover:text-primary-600 transition-all duration-200 font-semibold">
          {theme === 'dark' ? <><Sun size={20} className="text-amber-500" /><span>Light Mode</span></> : <><Moon size={20} className="text-indigo-600" /><span>Dark Mode</span></>}
        </button>
        <button onClick={() => signOut ? signOut() : console.log("Out")} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all duration-200 font-semibold">
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;