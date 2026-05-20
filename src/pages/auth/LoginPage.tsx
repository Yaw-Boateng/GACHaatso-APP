import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Mail, Lock, Loader2, LogIn, Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { signIn } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // The signIn function handles role-based redirection logic
      await signIn(email, password);
    } catch (err) {
      setError(err.message || "Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle =
    "w-full pl-11 pr-12 py-3 rounded-xl border border-theme-border bg-theme-base text-theme-text focus:ring-2 focus:ring-primary-500/20 focus:border-primary-600 outline-none transition-all duration-200 dark:border-neutral-700 dark:bg-neutral-800";
  const labelStyle =
    "block mb-2 text-sm font-semibold text-theme-text opacity-80";

  return (
    <div className="min-h-screen pt-24 pb-12 bg-theme-bg transition-colors duration-300 px-6 flex items-center justify-center">
      <div className="max-w-md w-full">
        <div className="bg-theme-surface rounded-3xl shadow-soft-lg border border-theme-border p-8 md:p-10">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-primary-600/10 text-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <LogIn size={32} />
            </div>
            <h1 className="text-3xl font-bold text-theme-text tracking-tight mb-2">
              Welcome Back
            </h1>
            <p className="text-theme-muted">
              Sign in to your account to continue
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium border border-red-100 dark:border-red-800">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className={labelStyle}>
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-muted"
                  size={18}
                />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputStyle}
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-theme-text opacity-80"
                >
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary-600 hover:underline font-medium"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-muted"
                  size={18}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputStyle}
                  placeholder="••••••••"
                  required
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

            {/* Remember Me Toggle */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 text-primary-600 rounded border-theme-border bg-theme-base focus:ring-primary-500"
              />
              <label
                htmlFor="remember"
                className="text-sm text-theme-muted cursor-pointer select-none"
              >
                Remember me for 30 days
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-primary-600 hover:bg-primary-700 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-8 text-center border-t border-theme-border pt-6">
            <p className="text-theme-muted">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-primary-600 hover:text-primary-700 font-bold"
              >
                Register Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
