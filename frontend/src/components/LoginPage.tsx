import React, { useState } from 'react';
import { useAuth } from '.././context/authContext';
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';

export const LoginPage: React.FC = () => {
  const { setUser } = useAuth();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      setLoading(true);
      const result = await login({email, password})
      setUser(result?.data);
      setEmail("");
      setPassword("");
      navigate("/home")
    } catch (err) {
      console.log(err?.response?.data?.message)
      setError(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-page text-body transition-colors duration-300 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background ambient glow effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Header Branding */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center relative z-10">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl glass-panel text-primary mb-4 shadow-lg shadow-primary/10">
          <span className="w-3 h-3 rounded-full bg-primary animate-pulse"></span>
        </div>
        <h2 className="text-3xl font-bold text-title tracking-tight">
          Welcome Back
        </h2>
        <p className="mt-2 text-sm text-muted">
          Sign in to access your dashboard and manage job listings.
        </p>
      </div>

      {/* Form Container */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="glass-panel py-8 px-4 sm:rounded-2xl sm:px-10 shadow-2xl">
          
          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
              <label 
                htmlFor="email" 
                className="block text-xs font-semibold text-title uppercase tracking-wider mb-1.5"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="appearance-none block w-full px-4 py-3 bg-inputBg border border-inputBorder rounded-xl text-title placeholder-placeholder focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
              />
            </div>

            {/* Password Field */}
            <div>
              <label 
                htmlFor="password" 
                className="block text-xs font-semibold text-title uppercase tracking-wider mb-1.5"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="appearance-none block w-full px-4 py-3 bg-inputBg border border-inputBorder rounded-xl text-title placeholder-placeholder focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
              />
            </div>


            <div className="flex items-center justify-between text-sm pt-1">
              <div>
                <a href="#forgot" className="font-medium text-secondary hover:text-primary transition-colors text-sm">
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg shadow-primary/20 text-sm font-semibold text-zinc-950 bg-primary hover:bg-primaryHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all disabled:opacity-50 cursor-pointer"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </div>
          </form>

          {/* Footer Link */}
          <div className="mt-6 text-center border-t border-cardBorder pt-6">
            <p className="text-sm text-muted">
              Don't have an account?{' '}
              <a href="#signup" className="font-medium text-secondary hover:text-primary transition-colors">
                Sign up
              </a>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;