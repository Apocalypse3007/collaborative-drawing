import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import Logo from './logo';

interface NavItem {
  label: string;
  href: string;
}

interface NavbarProps {
  navItems: NavItem[];
  logoText?: string;
  onDarkModeToggle?: () => void;
  isDarkMode?: boolean;
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({
  navItems,
  logoText = 'SketchCollab',
  onDarkModeToggle,
  isDarkMode = false,
  className = ''
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'} ${className}`}>
      <div className="container-custom">
        <div className="flex items-center justify-between">
          <Logo text={logoText} />

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {onDarkModeToggle && (
              <button 
                onClick={onDarkModeToggle}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            )}
            <a href="#" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Sign in
            </a>
            <a href="#" className="btn-primary">Get Started</a>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            {onDarkModeToggle && (
              <button 
                onClick={onDarkModeToggle}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg animate-slideUp">
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="block py-2 text-gray-700 hover:text-primary-600 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="border-t border-gray-200 pt-4 mt-4 flex flex-col space-y-3">
                <a href="#" className="py-2 text-gray-700 hover:text-primary-600 font-medium">
                  Sign in
                </a>
                <a href="#" className="btn-primary">
                  Get Started
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;