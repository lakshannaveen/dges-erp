import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2, Lock, User } from 'lucide-react';
import { loginAction } from '../store/actions/authActions';
import { clearError } from '../store/slices/authSlice';
import { DGES_LOGO } from '../utils/logoData';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(s => s.auth);
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPw, setShowPw] = useState(false);

  useEffect(() => { if (isAuthenticated) navigate('/dashboard'); }, [isAuthenticated, navigate]);
  useEffect(() => { return () => dispatch(clearError()); }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) return;
    try { await dispatch(loginAction(form)); } catch {}
  };

  return (
    <div className="min-h-screen flex bg-dark-900 relative overflow-hidden">
      {/* Left panel — branding */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-dark-900 border-r border-dark-700 p-12 relative overflow-hidden">
        {/* Background hexagon pattern */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute border-2 border-gold-400 rounded-sm"
              style={{
                width: `${60 + (i % 5) * 20}px`,
                height: `${60 + (i % 5) * 20}px`,
                top: `${(i * 13) % 100}%`,
                left: `${(i * 17) % 100}%`,
                transform: `rotate(${i * 30}deg)`,
                opacity: 0.4 + (i % 3) * 0.2,
              }}
            />
          ))}
        </div>
        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gold-500/8 rounded-full blur-3xl" />

        {/* Top: Logo */}
        <div className="relative z-10">
          <img src={DGES_LOGO} alt="DGES Logo" className="h-16 w-auto object-contain" />
        </div>

        {/* Middle: Hero text */}
        <div className="relative z-10">
          <h2 className="text-4xl font-black text-white leading-tight mb-4">
            Enterprise<br />
            <span className="text-gold-400">Resource</span><br />
            Planning
          </h2>
          <p className="text-dark-300 text-base leading-relaxed max-w-xs">
            Unified management for assets, finance, HR, production, procurement and more — all in one platform.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4">
            {[
              { label: 'Modules', value: '8' },
              { label: 'Sub-modules', value: '50+' },
              { label: 'Departments', value: 'All' },
              { label: 'Real-time', value: '✓' },
            ].map(s => (
              <div key={s.label} className="bg-dark-800 rounded-xl p-4 border border-dark-600">
                <p className="text-gold-400 text-xl font-bold">{s.value}</p>
                <p className="text-dark-400 text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10">
          <p className="text-dark-500 text-xs">© 2024 Colombo Dockyard Engineering &amp;— Dockyard_Software</p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="lg:hidden mb-8 text-center">
            <img src={DGES_LOGO} alt="DGES" className="h-12 w-auto object-contain mx-auto mb-3" />
          </div>

          <div className="bg-dark-800 rounded-2xl border border-dark-600 p-8 shadow-2xl">
            <h2 className="text-white font-bold text-xl mb-1">Sign In</h2>
            <p className="text-dark-400 text-sm mb-6">Enter your credentials to access DGE-ERP</p>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 mb-4">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-dark-300 mb-1.5 uppercase tracking-wide">Username</label>
                <div className="relative">
                  <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400" />
                  <input
                    type="text"
                    value={form.username}
                    onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                    placeholder="Enter username"
                    className="w-full bg-dark-700 border border-dark-500 rounded-lg pl-9 pr-4 py-2.5 text-white text-sm placeholder-dark-500 focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all"
                    autoComplete="username"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-dark-300 mb-1.5 uppercase tracking-wide">Password</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400" />
                  <input
                    type={showPw ? 'text' : 'password'}
                    value={form.password}
                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                    placeholder="Enter password"
                    className="w-full bg-dark-700 border border-dark-500 rounded-lg pl-9 pr-10 py-2.5 text-white text-sm placeholder-dark-500 focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 hover:text-dark-200 transition-colors"
                  >
                    {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full gold-gradient text-dark-900 font-bold py-2.5 rounded-lg transition-all duration-200 hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2 mt-2 text-sm"
              >
                {loading
                  ? <><Loader2 size={16} className="animate-spin" /> Signing in...</>
                  : 'Sign In to DGE-ERP'
                }
              </button>
            </form>

            {/* <div className="mt-6 pt-4 border-t border-dark-600">
              <p className="text-dark-500 text-xs text-center mb-2">Demo credentials</p>
              <div className="space-y-1.5">
                {[
                  { u: 'admin', p: 'admin123', role: 'System Admin' },
                  { u: 'finance', p: 'finance123', role: 'Finance Manager' },
                  { u: 'hr', p: 'hr123', role: 'HR Manager' },
                ].map(c => (
                  <button
                    key={c.u}
                    onClick={() => setForm({ username: c.u, password: c.p })}
                    className="w-full text-left px-3 py-2 rounded-lg bg-dark-700 hover:bg-dark-600 transition-colors border border-dark-600 hover:border-gold-600"
                  >
                    <span className="text-gold-400 text-xs font-mono font-semibold">{c.u}</span>
                    <span className="text-dark-400 text-xs"> / {c.p}</span>
                    <span className="text-dark-500 text-xs ml-2">— {c.role}</span>
                  </button>
                ))}
              </div>
            </div> */}
          </div>

          <p className="text-center text-dark-600 text-xs mt-5">
            © 2024 DGES — Dockyard_Software. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
