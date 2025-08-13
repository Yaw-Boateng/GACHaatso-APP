import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Logo from '../ui/Logo';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { currentUser, signOut } = useAuth();
  const location = useLocation();
  
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Determine header background class based on page and scroll state
  const headerBgClass = isHomePage 
    ? isScrolled 
      ? 'bg-white shadow-soft' 
      : 'bg-transparent'
    : 'bg-white shadow-soft';

  // Determine text color class based on page and scroll state
  const textColorClass = isHomePage && !isScrolled
    ? 'text-white'
    : 'text-primary-900';

  const activeNavLinkClass = isHomePage && !isScrolled
    ? 'border-white font-semibold'
    : 'border-primary-600 font-semibold';

  const navLinkClass = isHomePage && !isScrolled
    ? 'border-transparent hover:border-white/60 hover:text-white'
    : 'border-transparent hover:border-primary-600/60 hover:text-primary-600';

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBgClass}`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <Logo color={isHomePage && !isScrolled ? 'white' : 'primary'} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `${textColorClass} border-b-2 pb-1 transition-colors ${isActive ? activeNavLinkClass : navLinkClass}`
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/about" 
            className={({ isActive }) => 
              `${textColorClass} border-b-2 pb-1 transition-colors ${isActive ? activeNavLinkClass : navLinkClass}`
            }
          >
            About
          </NavLink>
          <NavLink 
            to="/sermons" 
            className={({ isActive }) => 
              `${textColorClass} border-b-2 pb-1 transition-colors ${isActive ? activeNavLinkClass : navLinkClass}`
            }
          >
            Sermons
          </NavLink>
          <NavLink 
            to="/events" 
            className={({ isActive }) => 
              `${textColorClass} border-b-2 pb-1 transition-colors ${isActive ? activeNavLinkClass : navLinkClass}`
            }
          >
            Events
          </NavLink>
          <NavLink 
            to="/giving" 
            className={({ isActive }) => 
              `${textColorClass} border-b-2 pb-1 transition-colors ${isActive ? activeNavLinkClass : navLinkClass}`
            }
          >
            Giving
          </NavLink>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => 
              `${textColorClass} border-b-2 pb-1 transition-colors ${isActive ? activeNavLinkClass : navLinkClass}`
            }
          >
            Contact
          </NavLink>
        </nav>

        {/* Auth Buttons / User Menu */}
        <div className="hidden lg:flex items-center space-x-4">
          {currentUser ? (
            <div className="relative group">
              <button className={`flex items-center space-x-2 ${textColorClass}`}>
                <span>{currentUser.displayName}</span>
                <ChevronDown size={16} />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-soft-lg overflow-hidden scale-95 opacity-0 invisible group-hover:scale-100 group-hover:opacity-100 group-hover:visible transition-all origin-top-right">
                <Link to="/profile" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50">
                  Profile
                </Link>
                <button 
                  onClick={signOut}
                  className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link 
                to="/login" 
                className={`${isHomePage && !isScrolled ? 'text-white hover:text-white/80' : 'text-primary-600 hover:text-primary-700'}`}
              >
                Sign In
              </Link>
              <Link 
  to="/register" 
  className={`px-4 py-2 rounded-md font-medium transition-all duration-300 ease-in-out ${
    isHomePage && !isScrolled 
      ? 'bg-white text-primary-600 hover:bg-white/90 hover:text-primary-700' 
      : 'bg-primary-600 text-white hover:bg-primary-700 hover:text-white/90'
  }`}
>
  Register
</Link>

            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu}
          className={`lg:hidden ${textColorClass}`}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-neutral-100 animate-slide-down">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `text-primary-900 py-2 ${isActive ? 'font-semibold text-primary-600' : ''}`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                `text-primary-900 py-2 ${isActive ? 'font-semibold text-primary-600' : ''}`
              }
            >
              About
            </NavLink>
            <NavLink 
              to="/sermons" 
              className={({ isActive }) => 
                `text-primary-900 py-2 ${isActive ? 'font-semibold text-primary-600' : ''}`
              }
            >
              Sermons
            </NavLink>
            <NavLink 
              to="/events" 
              className={({ isActive }) => 
                `text-primary-900 py-2 ${isActive ? 'font-semibold text-primary-600' : ''}`
              }
            >
              Events
            </NavLink>
            <NavLink 
              to="/giving" 
              className={({ isActive }) => 
                `text-primary-900 py-2 ${isActive ? 'font-semibold text-primary-600' : ''}`
              }
            >
              Giving
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                `text-primary-900 py-2 ${isActive ? 'font-semibold text-primary-600' : ''}`
              }
            >
              Contact
            </NavLink>

            <div className="pt-4 border-t border-neutral-100">
              {currentUser ? (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-primary-900">
                    <User size={18} />
                    <span>{currentUser.displayName}</span>
                  </div>
                  <Link to="/profile" className="block py-2 text-primary-900">
                    Profile
                  </Link>
                  <button 
                    onClick={signOut}
                    className="w-full text-left py-2 text-primary-900"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-3">
                  <Link 
                    to="/login" 
                    className="w-full py-2 text-center text-primary-600 border border-primary-600 rounded-md"
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/register" 
                    className="w-full py-2 text-center bg-primary-600 text-white rounded-md"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;