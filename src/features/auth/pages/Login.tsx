// src/features/auth/pages/Login.tsx

import { useState } from 'react';
import { EyeIcon, EyeSlashIcon, GlobeAltIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

export default function Login() {
  const [email, setEmail] = useState('ppc@papilonng.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [language, setLanguage] = useState('en');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    setTimeout(() => {
      console.log('Login attempt:', { email, password });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full bg-[#F8F9FC] flex items-center justify-center overflow-hidden">
      {/* Main Container */}
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-16">
          
          {/* ===== LEFT SIDE - ILLUSTRATION ===== */}
          <div className="hidden md:flex md:w-1/2 flex-col items-center justify-center">
            <div className="max-w-[480px] w-full">
              {/* Illustration SVG - STRATIFY style */}
              <svg viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                {/* Factory/Industry Illustration */}
                <rect x="50" y="150" width="400" height="200" rx="8" fill="#E8EDF5" />
                <rect x="70" y="180" width="80" height="170" rx="4" fill="#D5DEE8" />
                <rect x="170" y="200" width="80" height="150" rx="4" fill="#D5DEE8" />
                <rect x="270" y="170" width="80" height="180" rx="4" fill="#D5DEE8" />
                <rect x="370" y="190" width="60" height="160" rx="4" fill="#D5DEE8" />
                
                {/* Windows */}
                <rect x="80" y="200" width="40" height="30" rx="2" fill="#B0C4DE" />
                <rect x="180" y="220" width="40" height="30" rx="2" fill="#B0C4DE" />
                <rect x="280" y="190" width="40" height="30" rx="2" fill="#B0C4DE" />
                <rect x="380" y="210" width="30" height="25" rx="2" fill="#B0C4DE" />
                
                {/* Smoke/Steam */}
                <circle cx="100" cy="120" r="30" fill="#E0E7EF" opacity="0.6" />
                <circle cx="130" cy="90" r="25" fill="#E0E7EF" opacity="0.4" />
                <circle cx="155" cy="65" r="20" fill="#E0E7EF" opacity="0.2" />
                
                <circle cx="300" cy="110" r="35" fill="#E0E7EF" opacity="0.5" />
                <circle cx="335" cy="80" r="28" fill="#E0E7EF" opacity="0.3" />
                <circle cx="360" cy="55" r="20" fill="#E0E7EF" opacity="0.15" />
                
                {/* Ground */}
                <rect x="0" y="340" width="500" height="60" fill="#E0E7EF" rx="4" />
                <rect x="20" y="350" width="460" height="4" rx="2" fill="#C5D0DC" />
                
                {/* People working - minimal icons */}
                <circle cx="200" cy="310" r="12" fill="#B0C4DE" />
                <rect x="195" y="320" width="10" height="20" rx="3" fill="#B0C4DE" />
                
                <circle cx="350" cy="315" r="10" fill="#B0C4DE" />
                <rect x="346" y="323" width="8" height="16" rx="3" fill="#B0C4DE" />
                
                {/* Text */}
                <text x="250" y="395" textAnchor="middle" fontFamily="system-ui" fontSize="16" fill="#94A3B8" letterSpacing="4">
                  STRATIFY
                </text>
              </svg>
              
              <p className="text-center text-[#94A3B8] text-sm mt-4 font-light tracking-wide">
                Manufacturing Intelligence Platform
              </p>
            </div>
          </div>

          {/* ===== RIGHT SIDE - LOGIN FORM ===== */}
          <div className="w-full md:w-1/2 max-w-[440px]">
            {/* Centered Stellantis Logo */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-[#1A1A2E] flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="text-[#1A1A2E] text-lg font-semibold tracking-wider">STELLANTIS</span>
              </div>
              <span className="text-[#94A3B8] text-xs tracking-[0.2em] font-light">STRATIFY</span>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Heading */}
              <div className="text-center">
                <h1 className="text-[26px] font-bold text-[#1A1A2E]">Welcome back</h1>
                <p className="text-[#94A3B8] text-sm mt-1">Sign in to your account to continue</p>
              </div>

              {/* Email Field - Underline style */}
              <div>
                <label className="block text-[#6B7280] text-[11px] font-medium mb-1 uppercase tracking-wider">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-0 py-2 bg-transparent border-b border-[#E5E7EB] text-[#1A1A2E] text-[14px] placeholder-[#B0B8C4] focus:outline-none focus:border-[#1A1A2E] transition-colors duration-200"
                  required
                />
              </div>

              {/* Password Field - Underline style */}
              <div>
                <label className="block text-[#6B7280] text-[11px] font-medium mb-1 uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-0 py-2 bg-transparent border-b border-[#E5E7EB] text-[#1A1A2E] text-[14px] placeholder-[#B0B8C4] focus:outline-none focus:border-[#1A1A2E] transition-colors duration-200 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-[#B0B8C4] hover:text-[#6B7280] transition-colors"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-600 text-sm text-center">{error}</p>
                </div>
              )}

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-[#1A1A2E] hover:bg-[#2A2A3E] text-white font-medium rounded-[6px] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-[14px]"
              >
                {isLoading ? (
                  <>
                    <ArrowPathIcon className="w-4 h-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#E5E7EB]"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-[#F8F9FC] text-[#B0B8C4] text-[11px] uppercase tracking-wider">Or</span>
                </div>
              </div>

              {/* OTP Link - Text style, not button */}
              <button
                type="button"
                className="w-full text-center text-[#1A1A2E] text-[14px] font-medium hover:text-[#4A4A5E] transition-colors py-2"
              >
                Sign in with OTP
              </button>

              {/* Language Selector - Bottom left of form */}
              <div className="pt-4">
                <div className="flex items-center justify-center gap-2">
                  <GlobeAltIcon className="w-4 h-4 text-[#B0B8C4]" />
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="text-[#6B7280] text-[12px] bg-transparent border-none focus:outline-none cursor-pointer hover:text-[#1A1A2E] transition-colors"
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                    <option value="it">Italiano</option>
                    <option value="pt">Português</option>
                  </select>
                </div>
              </div>
            </form>

            {/* Footer */}
            <p className="text-center text-[#B0B8C4] text-[10px] mt-6">
              © {new Date().getFullYear()} Stellantis. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}