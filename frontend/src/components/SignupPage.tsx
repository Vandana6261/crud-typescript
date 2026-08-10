import React, { useState } from 'react';
import { register, sendOtp, verifyOtp } from '../services/authService';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

type SignupStep = 'EMAIL_INPUT' | 'OTP_INPUT' | 'DETAILS_INPUT';
type RoleType = 'recruiter' | 'candidate';

type FormData = {
  email: string;
  otp: string;
  username: string;
  password: string;
  role: RoleType;
};


const SignupPage: React.FC<SignupPageProps> = () => {
  // Form States
  const { setUser, user } = useAuth();
  const navigate = useNavigate();
  if(user) navigate("/home")

  const [email, setEmail] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<RoleType>('student');

  const [step, setStep] = useState<SignupStep>('EMAIL_INPUT');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  // 1. Handle Send Verification Code
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      setLoading(true);
      const result = await sendOtp({email})
      setSuccessMessage('Verification code sent to your email.');
      setStep('OTP_INPUT');
    } catch (err: any) {
      setError(err.message || 'Failed to send verification code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // 2. Handle Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!otp || otp.length < 4) {
      setError('Please enter a valid OTP code.');
      return;
    }

    try {
      setLoading(true);
      const result = await verifyOtp({otp});
      setSuccessMessage('Email verified successfully! Please complete your profile.');
      setStep('DETAILS_INPUT');
    } catch (err: any) {
      setError(err.message || 'Invalid OTP. Please check and try again.');
    } finally {
      setLoading(false);
    }
  };

  // 3. Handle Complete Signup
  const handleCompleteSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      setLoading(true);
      const result = await register({username, password, role})
      setUser(result?.data);
      setError('');
      navigate("/home");
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-page)] flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-300">
      {/* Header Branding */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="text-3xl font-extrabold text-[var(--color-title)] tracking-tight">
          Create an Account
        </h2>
        <p className="mt-2 text-sm text-[var(--color-body)]">
          Join our platform to find jobs or hire top tech talent.
        </p>
      </div>

      {/* Form Container */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="glass-panel py-8 px-4 shadow-2xl sm:rounded-2xl sm:px-10">
          
          {/* Error Alert */}
          {error && (
            <div className="mb-4 bg-[var(--color-alert)]/10 border border-[var(--color-alert)] text-[var(--color-alert)] px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Success Alert */}
          {successMessage && !error && (
            <div className="mb-4 bg-[var(--color-primary)]/10 border border-[var(--color-primary)] text-[var(--color-primary)] px-4 py-3 rounded-lg text-sm">
              {successMessage}
            </div>
          )}

          {/* STEP 1: Email Input */}
          {step === 'EMAIL_INPUT' && (
            <form className="space-y-6" onSubmit={handleSendOtp}>
              {/* email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[var(--color-body)]">
                  Email Address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="appearance-none block w-full px-3 py-2 bg-[var(--color-inputBg)] border border-[var(--color-inputBorder)] rounded-lg shadow-sm text-[var(--color-title)] placeholder-[var(--color-placeholder)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] sm:text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[var(--color-primary)] hover:bg-[var(--color-primaryHover)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)] transition-colors disabled:opacity-50"
              >
                {loading ? 'Sending Code...' : 'Send Verification Code'}
              </button>
            </form>
          )}

          {/* STEP 2: OTP Input */}
          {step === 'OTP_INPUT' && (
            <form className="space-y-6" onSubmit={handleVerifyOtp}>
              {/* email */}
              <div>
                <label htmlFor="email-disabled" className="block text-sm font-medium text-[var(--color-body)]">
                  Email Address (Verified/Locked)
                </label>
                <div className="mt-1">
                  <input
                    id="email-disabled"
                    type="email"
                    disabled
                    value={email}
                    className="appearance-none block w-full px-3 py-2 bg-[var(--color-inputBg)] opacity-60 border border-[var(--color-inputBorder)] rounded-lg shadow-sm text-[var(--color-muted)] sm:text-sm cursor-not-allowed"
                  />
                </div>
              </div>

              {/* otp */}
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-[var(--color-body)]">
                  Enter Verification Code (OTP)
                </label>
                <div className="mt-1">
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="123456"
                    className="appearance-none block w-full px-3 py-2 bg-[var(--color-inputBg)] border border-[var(--color-inputBorder)] rounded-lg shadow-sm text-[var(--color-title)] placeholder-[var(--color-placeholder)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] sm:text-sm tracking-widest text-center font-bold text-lg"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[var(--color-primary)] hover:bg-[var(--color-primaryHover)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)] transition-colors disabled:opacity-50"
              >
                {loading ? 'Verifying OTP...' : 'Verify OTP'}
              </button>
            </form>
          )}

          {/* STEP 3: Username, Password, Role Settings */}
          {step === 'DETAILS_INPUT' && (
            <form className="space-y-6" onSubmit={handleCompleteSignup}>
              <div>
                <label className="block text-sm font-medium text-[var(--color-body)]">
                  Email Address
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    disabled
                    value={email}
                    className="appearance-none block w-full px-3 py-2 bg-[var(--color-inputBg)] opacity-60 border border-[var(--color-inputBorder)] rounded-lg shadow-sm text-[var(--color-muted)] sm:text-sm cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="username" className="block text-sm font-medium text-[var(--color-body)]">
                  Username
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="johndoe"
                    className="appearance-none block w-full px-3 py-2 bg-[var(--color-inputBg)] border border-[var(--color-inputBorder)] rounded-lg shadow-sm text-[var(--color-title)] placeholder-[var(--color-placeholder)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-[var(--color-body)]">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="appearance-none block w-full px-3 py-2 bg-[var(--color-inputBg)] border border-[var(--color-inputBorder)] rounded-lg shadow-sm text-[var(--color-title)] placeholder-[var(--color-placeholder)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] sm:text-sm"
                  />
                </div>
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-[var(--color-body)] mb-2">
                  Select Your Role
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setRole('candidate')}
                    className={`py-2.5 px-4 border rounded-lg text-sm font-medium transition-all ${
                      role === 'candidate'
                        ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)] ring-2 ring-[var(--color-primary)]'
                        : 'border-[var(--color-inputBorder)] bg-[var(--color-inputBg)] text-[var(--color-body)] hover:bg-[var(--color-inputBorder)]/30'
                    }`}
                  >
                    Student / Job Seeker
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('recruiter')}
                    className={`py-2.5 px-4 border rounded-lg text-sm font-medium transition-all ${
                      role === 'recruiter'
                        ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)] ring-2 ring-[var(--color-primary)]'
                        : 'border-[var(--color-inputBorder)] bg-[var(--color-inputBg)] text-[var(--color-body)] hover:bg-[var(--color-inputBorder)]/30'
                    }`}
                  >
                    Recruiter
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[var(--color-primary)] hover:bg-[var(--color-primaryHover)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)] transition-colors disabled:opacity-50"
              >
                {loading ? 'Creating Account...' : 'Complete Sign Up'}
              </button>
            </form>
          )}

          {/* Footer Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-[var(--color-body)]">
              Already have an account?{' '}
              <a href="#login" className="font-medium text-[var(--color-primary)] hover:underline">
                Sign in
              </a>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SignupPage;