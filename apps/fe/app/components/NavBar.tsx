import React, { useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Showcase', href: '#showcase' },
  { label: 'Pricing', href: '#pricing' },
];

const NavBar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true); // default to dark

  // For demo: dark mode just toggles a class on body
  React.useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0a1624] border-b border-blue-900 shadow-sm transition-all">
      <div className="container-custom flex items-center justify-between py-4">
        {/* Logo */}
        <div className="flex items-center">
          <span className="inline-block w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg mr-2"></span>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text font-sans">SketchCollab</span>
        </div>
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map(link => (
            <a key={link.label} href={link.href} className="text-blue-100 hover:text-blue-400 font-medium transition-colors">
              {link.label}
            </a>
          ))}
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={() => setDarkMode(dm => !dm)}
            className="p-2 rounded-full hover:bg-blue-900 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <FaSun className="h-5 w-5 text-blue-300" /> : <FaMoon className="h-5 w-5 text-blue-300" />}
          </button>
          <a href="/signup" className="text-blue-100 hover:text-blue-400 font-medium transition-colors">Sign in</a>
          <a href="/signup" className="btn-primary">Get Started</a>
        </div>
        {/* Mobile Nav Button */}
        <div className="md:hidden flex items-center space-x-2">
          <button
            onClick={() => setDarkMode(dm => !dm)}
            className="p-2 rounded-full hover:bg-blue-900 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <FaSun className="h-5 w-5 text-blue-300" /> : <FaMoon className="h-5 w-5 text-blue-300" />}
          </button>
          <button
            onClick={() => setMenuOpen(m => !m)}
            className="p-2 rounded-lg hover:bg-blue-900 transition-colors"
            aria-label="Toggle menu"
          >
            <span className="text-2xl text-blue-100">{menuOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#101c2c] shadow-lg rounded-b-lg animate-slideUp px-4 py-6 space-y-4 border-t border-blue-900">
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="block py-2 text-blue-100 hover:text-blue-400 font-medium"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="border-t border-blue-900 pt-4 mt-4 flex flex-col space-y-3">
            <a href="#" className="py-2 text-blue-100 hover:text-blue-400 font-medium" onClick={() => setMenuOpen(false)}>
              Sign in
            </a>
            <a href="#" className="btn-primary" onClick={() => setMenuOpen(false)}>
              Get Started
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;