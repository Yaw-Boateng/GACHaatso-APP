import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Loader2, KeyRound, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const { forgotPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await forgotPassword(email);
      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle = "w-full pl-11 pr-4 py-3 rounded-xl border border-theme-border bg-theme-base text-theme-text focus:ring-2 focus:ring-primary-500/20 focus:border-primary-600 outline-none transition-all duration-200 dark:border-neutral-700 dark:bg-neutral-800";

  return (
    <div className="min-h-screen pt-24 pb-12 bg-theme-bg px-6 flex items-center justify-center transition-colors duration-300">
      <div className="max-w-md w-full">
        <div className="bg-theme-surface rounded-3xl shadow-soft-lg border border-theme-border p-8 md:p-10">
          {!isSubmitted ? (
            <>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary-600/10 text-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <KeyRound size={32} />
                </div>
                <h1 className="text-3xl font-bold text-theme-text tracking-tight mb-2">Forgot Password?</h1>
                <p className="text-theme-muted">No worries! Enter your email and we'll send you a reset link.</p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm border border-red-100">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block mb-2 text-sm font-semibold text-theme-text opacity-80">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-muted" size={18} />
                    <input 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      className={inputStyle} 
                      placeholder="name@example.com"
                      required 
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  {isLoading ? <Loader2 className="animate-spin" /> : 'Send Reset Link'}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <CheckCircle2 size={48} className="text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-theme-text mb-2">Check your email</h2>
              <p className="text-theme-muted mb-8">We've sent reset instructions to <span className="font-semibold">{email}</span>.</p>
              <Link to="/login" className="block w-full py-4 bg-primary-600 text-white rounded-xl font-bold">Back to Login</Link>
            </div>
          )}
          <div className="mt-8 text-center border-t border-theme-border pt-6">
            <Link to="/login" className="text-theme-muted hover:text-primary-600 text-sm font-medium inline-flex items-center gap-2">
              <ArrowLeft size={16} /> Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;