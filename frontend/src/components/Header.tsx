import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';

interface HeaderProps {
  onLoginClick?: () => void;
  onGetStartedClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLoginClick, onGetStartedClick }) => {
  const { user } = useAuth();

  return (
    <header className="w-full border-b border-cardBorder backdrop-blur-md sticky top-0 z-50 bg-page/80">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-primary animate-pulse"></span>
          <span className="font-bold text-lg text-title tracking-tight">
            Campus<span className="text-secondary">Gig</span>
          </span>
        </div>
        
        {/* Embedded Navigation Links */}
        {/* <Navbar /> */}

        <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-sm font-medium text-title hover:text-primary transition-colors">Landing</Link>

              <Link to="/home" className="text-sm font-medium text-title hover:text-primary transition-colors">Home</Link>

              <Link to="/login" className="text-sm font-medium text-title hover:text-primary transition-colors">Login</Link>

              <Link to="/signup" className="text-sm font-medium text-title hover:text-primary transition-colors">Sign Up</Link>
            </nav>

        {/* Action Buttons */}
          <p>{user?.username || "Guest"}</p>
          <button 
            onClick={onGetStartedClick}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-primary hover:bg-primaryHover text-zinc-950 font-semibold transition-all shadow-lg shadow-primary/25"
          >
            Get Started
          </button>

      </div>
    </header>
  );
};

export default Header;