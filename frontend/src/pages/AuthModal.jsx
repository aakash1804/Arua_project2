import React, { useState } from 'react';
import { X, Lock, Mail, User, ShieldCheck, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';

export const AuthModal = ({ isOpen, onClose }) => {
  const { login, register } = useAuth();
  const { showToast } = useNotification();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      if (isRegister) {
        await register({ fullName, email, password });
        showToast('Account created successfully! Welcome to AURA.');
      } else {
        await login(email, password);
        showToast('Signed in successfully.');
      }
      onClose();
    } catch (err) {
      setErrorMsg(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = async (type) => {
    setLoading(true);
    setErrorMsg('');
    try {
      if (type === 'admin') {
        await login('admin@tableprime.com', 'admin123');
        showToast('Signed in as Executive Administrator.');
      } else {
        await login('customer@tableprime.com', 'password123');
        showToast('Signed in as Verified Guest (Eleanor Vance).');
      }
      onClose();
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-[#181817] rounded-3xl border border-stone-800 shadow-2xl p-6 sm:p-8">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto mb-3">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-white">
            {isRegister ? 'Create Guest Account' : 'Welcome to AURA'}
          </h3>
          <p className="text-xs text-stone-400 mt-1">
            {isRegister ? 'Join our private circle of fine dining connoisseurs' : 'Sign in to access your table reservations and VIP benefits'}
          </p>
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/80 border border-red-800 text-red-200 text-xs">
            {errorMsg}
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {isRegister && (
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-500 absolute left-3.5 top-3" />
                <input 
                  type="text"
                  required
                  placeholder="Eleanor Vance"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-500 absolute left-3.5 top-3" />
              <input 
                type="email"
                required
                placeholder="guest@tableprime.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-500 absolute left-3.5 top-3" />
              <input 
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black font-extrabold uppercase tracking-wider text-xs shadow-lg shadow-amber-600/20 transition-all hover:scale-[1.01] cursor-pointer"
          >
            {loading ? 'Authenticating...' : isRegister ? 'Complete Registration' : 'Sign In to Account'}
          </button>
        </form>

        {/* 1-Click Fast Demos */}
        <div className="mt-6 pt-5 border-t border-stone-800">
          <p className="text-[10px] font-bold uppercase tracking-widest text-stone-500 text-center mb-3">
            Quick 1-Click Demo Accounts
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('customer')}
              className="py-2 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-amber-400" />
              <span>Customer Demo</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('admin')}
              className="py-2 px-3 rounded-xl bg-amber-950/50 hover:bg-amber-900/50 border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>

        {/* Switch mode */}
        <div className="mt-5 text-center text-xs text-stone-400">
          {isRegister ? (
            <p>
              Already have an account?{' '}
              <button 
                onClick={() => setIsRegister(false)} 
                className="text-amber-400 hover:underline font-semibold"
              >
                Sign In
              </button>
            </p>
          ) : (
            <p>
              New to AURA?{' '}
              <button 
                onClick={() => setIsRegister(true)} 
                className="text-amber-400 hover:underline font-semibold"
              >
                Register Account
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

