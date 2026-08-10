import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import UserMenu from './UserMenu';
import { User } from 'lucide-react';
import { logout } from '../services/authService';

export const Header: React.FC = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <header className="w-full border-b border-cardBorder backdrop-blur-md sticky top-0 z-50 bg-page/80">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between relative">

        {/* Brand Logo */}
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-primary animate-pulse"></span>
          <span className="font-bold text-lg text-title tracking-tight">
            Campus<span className="text-secondary">Gig</span>
          </span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-title hover:text-primary transition-colors">Landing</Link>

          {user && <Link to="/home" className="text-sm font-medium text-title hover:text-primary transition-colors">Home</Link>}

          {!user && (
            <>
              <Link to="/login" className="text-sm font-medium text-title hover:text-primary transition-colors">Login</Link>
              <Link to="/signup" className="text-sm font-medium text-title hover:text-primary transition-colors">Sign Up</Link>
            </>
          )}
        </nav>


        <div className='flex items-center gap-3'>
           {user ? (
             <div className="flex items-center gap-2">
               {/* Original User Menu Trigger Icon */}
               <button
                 onClick={() => setIsMenuOpen(!isMenuOpen)}
                 className="flex items-center p-1 text-primary hover:opacity-80 transition-opacity"
                 aria-label="User menu"
               >
                 <User className='w-6 h-6 rounded-full bg-primary/20 p-0.5 text-primary' />
               </button>
             </div>
           ) : (
             <p className='text-primary'>Guest</p>
           )}

           {user ? (
             <button 
               onClick={handleLogout}
               className="px-4 py-2 text-sm font-medium rounded-lg bg-primary hover:bg-primaryHover text-zinc-950 font-semibold transition-all shadow-lg shadow-primary/25"
             >
               Logout
             </button>
           ) : (
             <button 
               onClick={() => navigate("/login")}
               className="px-4 py-2 text-sm font-medium rounded-lg bg-primary hover:bg-primaryHover text-zinc-950 font-semibold transition-all shadow-lg shadow-primary/25"
             >
               Get Started
             </button>
           )}
         </div>

         {/* Dropdown Menu Positioned relative to Header */}
         {isMenuOpen && user && (
           <div className="absolute right-6 top-16 z-50">
             <UserMenu user={user} onClose={() => setIsMenuOpen(false)} />
           </div>
         )}

      </div>
    </header>
  );
};

export default Header;