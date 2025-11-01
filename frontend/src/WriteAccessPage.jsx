// src/pages/WriteAccessPage.jsx
import React, { useState } from 'react';
import { X, Mail, Lock, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// -------------------------------------------------------------------
// Mock auth – replace with real backend later
// -------------------------------------------------------------------
const mockCreateAccount = async (email, password) => {
  // Simulate API delay
  await new Promise(r => setTimeout(r, 800));

  // Fake validation
  if (!email.includes('@')) throw new Error('Invalid email');
  if (password.length < 6) throw new Error('Password too short');

  // Store a tiny token in localStorage (demo only)
  localStorage.setItem('bloom_admin_token', 'demo-token-' + Date.now());
  return { success: true };
};

// -------------------------------------------------------------------
// Page component
// -------------------------------------------------------------------
const WriteAccessPage = () => {
  const navigate = useNavigate();

  // Modal
  const [showSignup, setShowSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const openModal = () => setShowSignup(true);
  const closeModal = () => {
    setShowSignup(false);
    setError('');
    setEmail('');
    setPassword('');
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await mockCreateAccount(email, password);
      // Success → go to admin
      navigate('/admin');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* ---------- Navigation ---------- */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-12">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
                Bloom
              </h1>

              {/* Desktop menu – only "Write" button */}
              <div className="hidden md:flex items-center gap-8">
                <button
                  onClick={openModal}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all font-medium"
                >
                  <Plus size={18} />
                  Write
                </button>
              </div>
            </div>

            {/* Mobile Write button */}
            <button
              onClick={openModal}
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-lg text-sm font-medium"
            >
              <Plus size={16} />
              Write
            </button>
          </div>
        </div>
      </nav>

      {/* ---------- Hero / Info Section ---------- */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
            Share Your Voice on
            <br />
            <span className="bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
              Bloom
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
            Create an account in seconds and start publishing beautiful stories with our admin studio.
          </p>

          <button
            onClick={openModal}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-xl hover:shadow-xl transition-all text-lg font-semibold"
          >
            <Plus size={22} />
            Start Writing Now
          </button>
        </div>
      </section>

      {/* ---------- Features Grid ---------- */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-indigo-100 rounded-2xl flex items-center justify-center">
              <FileText className="text-indigo-600" size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Rich Editor</h3>
            <p className="text-slate-600">Write with markdown, images, and formatting</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-pink-100 rounded-2xl flex items-center justify-center">
              <BookOpen className="text-pink-600" size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Series & Drafts</h3>
            <p className="text-slate-600">Organize posts into series and save drafts</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-emerald-100 rounded-2xl flex items-center justify-center">
              <Eye className="text-emerald-600" size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Analytics</h3>
            <p className="text-slate-600">Track views, engagement, and growth</p>
          </div>
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-sm text-slate-600">
          © 2025 Bloom. A space for thoughtful writing.
        </div>
      </footer>

      {/* ---------- Signup Modal ---------- */}
      {showSignup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative max-w-md w-full bg-white rounded-3xl shadow-2xl p-8">
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <X size={20} className="text-slate-600" />
            </button>

            <h2 className="text-2xl font-bold text-slate-900 mb-2">Create Your Writer Account</h2>
            <p className="text-slate-600 mb-6">Get instant access to the admin studio</p>

            <form onSubmit={handleSignup} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all font-medium disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  'Create Account & Write'
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-xs text-slate-500">
              By signing up, you agree to our{' '}
              <a href="#" className="text-indigo-600 hover:underline">
                Terms
              </a>{' '}
              and{' '}
              <a href="#" className="text-indigo-600 hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WriteAccessPage;