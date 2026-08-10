import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="hidden md:flex items-center gap-6">
      <Link
        to="/"
        className="text-sm font-medium text-title hover:text-primary transition-colors"
      >
        Landing
      </Link>
      <Link
        to="/home"
        className="text-sm font-medium text-title hover:text-primary transition-colors"
      >
        Home
      </Link>
      <Link
        to="/login"
        className="text-sm font-medium text-title hover:text-primary transition-colors"
      >
        Login
      </Link>
      <Link
        to="/signup"
        className="text-sm font-medium text-title hover:text-primary transition-colors"
      >
        Sign Up
      </Link>
    </nav>
  );
};

export default Navbar;