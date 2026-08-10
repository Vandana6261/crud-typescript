import React, { useEffect } from 'react';
import { me } from '../services/authService';
import { useAuth } from '../context/authContext';

export const LandingPage: React.FC = () => {
  const { setUser } = useAuth();
  useEffect(() => {
    async function fetchUser() {
      const result = await me();
      setUser(result?.data);
    }

    fetchUser();
  }, [])
  return (
    <div className="flex-1 flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-6 py-20 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-xs font-medium text-secondary mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
            Verified Internships & Entry-Level Roles for Students
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-title tracking-tight mb-6 leading-tight">
            Launch Your Career <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-400 to-secondary">
              Before Graduation.
            </span>
          </h1>
          
          <p className="text-lg text-muted max-w-2xl mx-auto mb-10">
            Skip the endless scroll. Connect directly with verified tech companies, startups, and enterprises looking for student talent.
          </p>

          <div className="flex items-center justify-center gap-4">
            <button className="px-6 py-3 rounded-xl bg-primary text-zinc-950 font-semibold hover:bg-primaryHover transition-all shadow-xl shadow-primary/20">
              Find Jobs Now
            </button>
            <button className="px-6 py-3 rounded-xl glass-panel text-title font-medium hover:border-primary/40 transition-all">
              Post a Gig
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 border-t border-cardBorder text-center text-xs text-muted mt-auto">
        <p>© 2026 CampusGig. Built specifically for student growth.</p>
      </footer>
    </div>
  );
};