import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Lock, Loader2, ShieldCheck, Eye, EyeOff, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token'); // Automatically extracts ?token=XYZ from the URL
  
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validation
    if (newPassword !== confirmPassword) {
      return setError("Passwords do not match");
    }
    if (!token) {
      return setError("Invalid or expired reset link. Please request a new one.");
    }

    setError('');
    setIsLoading(true);

    try {
      await resetPassword(token, newPassword);
      setIsSuccess(true);
      
      // Auto-redirect to login after 3 seconds, or user can click the button
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err: any) {
      setError(err.message || "An error occurred while resetting your password.");
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle = "w-full pl-11 pr-12 py-3 rounded-xl border border-theme-border bg-theme-base text-theme-text focus:ring-2 focus:ring-primary-500/20 focus:border-primary-600 outline-none transition-all duration-200 dark:border-neutral-700 dark:bg-neutral-800";

  return (
    <div className="min-h-screen pt-24 pb-12 bg-theme-bg px-6 flex items-center justify-center transition-colors duration-300">
      <div className="max-w-md w-full">
        <div className="bg-theme-surface rounded-3xl shadow-soft-lg border border-theme-border p-8 md:p-10">
          
          {!isSuccess ? (
            <>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary-600/10 text-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck size={32} />
                </div>
                <h1 className="text-3xl font-bold text-theme-text tracking-tight mb-2">New Password</h1>
                <p className="text-theme-muted">
                  Please enter a strong new password to secure your account.
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium border border-red-100 dark:border-red-800 animate-in fade-in zoom-in duration-200">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* New Password Field */}
                <div>
                  <label className="block mb-2 text-sm font-semibold text-theme-text opacity-80">
                    New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-muted" size={18} />
                    <input 
                      type={showPassword ? "text" : "password"} 
                      value={newPassword} 
                      onChange={(e) => setNewPassword(e.target.value)} 
                      className={inputStyle} 
                      placeholder="••••••••"
                      required 
                      minLength={8}
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-theme-muted hover:text-primary-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label className="block mb-2 text-sm font-semibold text-theme-text opacity-80">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-muted" size={18} />
                    <input 
                      type="password" 
                      value={confirmPassword} 
                      onChange={(e) => setConfirmPassword(e.target.value)} 
                      className={inputStyle} 
                      placeholder="••••••••"
                      required 
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Updating...
                    </>
                  ) : (
                    'Update Password'
                  )}
                </button>
              </form>
            </>
          ) : (
            /* Success State View */
            <div className="text-center py-4 animate-in fade-in zoom-in duration-300">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={48} />
              </div>
              <h2 className="text-2xl font-bold text-theme-text mb-2">Password Updated!</h2>
              <p className="text-theme-muted mb-8">
                Your password has been reset successfully. Redirecting you to login...
              </p>
              <Link 
                to="/login" 
                className="block w-full py-4 bg-primary-600 text-white rounded-xl font-bold transition-all hover:bg-primary-700 shadow-md"
              >
                Go to Login Now
              </Link>
            </div>
          )}

          <div className="mt-8 text-center border-t border-theme-border pt-6">
            <Link to="/login" className="text-theme-muted hover:text-primary-600 text-sm font-medium inline-flex items-center gap-2 transition-colors">
              <ArrowLeft size={16} />
              Back to Sign In
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;