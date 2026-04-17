import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  User, Mail, Lock, ShieldCheck, Loader2, 
  Eye, EyeOff, Check, X 
} from 'lucide-react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'MEMBER',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPendingApproval, setIsPendingApproval] = useState(false);
  
  const { signUp } = useAuth();
  const navigate = useNavigate();

  // Password Validation Logic
  const passwordRequirements = useMemo(() => [
    { label: 'At least 8 characters', test: (pwd) => pwd.length >= 8 },
    { label: 'Contains a number or symbol', test: (pwd) => /[0-9!@#$%^&*]/.test(pwd) },
    { label: 'Lowercase & Uppercase letters', test: (pwd) => /[a-z]/.test(pwd) && /[A-Z]/.test(pwd) },
  ], []);

  const strengthScore = passwordRequirements.filter(req => req.test(formData.password)).length;
  const isPasswordStrong = strengthScore === passwordRequirements.length;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!isPasswordStrong) {
      setError('Please meet all password security requirements.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const apiPayload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: formData.role
      };

      await signUp(apiPayload);
      
      if (formData.role === 'LEADER') {
        setIsPendingApproval(true);
      } else {
        navigate('/login', { state: { message: 'Account created! Please sign in.' } });
      }
    } catch (err) {
      setError(err.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle = "w-full pl-11 pr-12 py-3 rounded-xl border border-theme-border bg-theme-base text-theme-text focus:ring-2 focus:ring-primary-500/20 focus:border-primary-600 outline-none transition-all duration-200 dark:border-neutral-700 dark:bg-neutral-800";
  const labelStyle = "block mb-2 text-sm font-semibold text-theme-text opacity-80";

  if (isPendingApproval) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-theme-bg px-6">
        <div className="max-w-md w-full bg-theme-surface p-8 rounded-3xl shadow-xl border border-theme-border text-center">
          <div className="w-20 h-20 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck size={40} />
          </div>
          <h2 className="text-2xl font-bold text-theme-text mb-4">Request Sent!</h2>
          <p className="text-theme-muted mb-8">
            As a Leader, your account requires administrative approval. You will receive an email once the admin has verified your credentials.
          </p>
          <Link to="/login" className="block w-full py-3 bg-primary-600 text-white rounded-xl font-bold">
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-theme-bg transition-colors duration-300 px-6">
      <div className="max-w-md mx-auto">
        <div className="bg-theme-surface rounded-3xl shadow-soft-lg border border-theme-border p-8 md:p-10">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-theme-text tracking-tight mb-2">Join GAC Church</h1>
            <p className="text-theme-muted">Create your account to get started</p>
          </div>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium border border-red-100 dark:border-red-800">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className={labelStyle}>First Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-muted" size={18} />
                  <input type="text" id="firstName" value={formData.firstName} onChange={handleChange} className={inputStyle} placeholder="John" required />
                </div>
              </div>
              <div>
                <label htmlFor="lastName" className={labelStyle}>Last Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-muted" size={18} />
                  <input type="text" id="lastName" value={formData.lastName} onChange={handleChange} className={inputStyle} placeholder="Doe" required />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="email" className={labelStyle}>Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-muted" size={18} />
                <input type="email" id="email" value={formData.email} onChange={handleChange} className={inputStyle} placeholder="example@church.com" required />
              </div>
            </div>

            <div>
              <label htmlFor="role" className={labelStyle}>Registering As</label>
              <div className="relative">
                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-muted" size={18} />
                <select id="role" value={formData.role} onChange={handleChange} className={`${inputStyle} appearance-none`}>
                  <option value="MEMBER">Church Member</option>
                  <option value="LEADER">Church Leader (Requires Approval)</option>
                </select>
              </div>
            </div>
            
            {/* Password Field */}
            <div>
              <label htmlFor="password" className={labelStyle}>Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-muted" size={18} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  id="password" 
                  value={formData.password} 
                  onChange={handleChange} 
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

              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-3 space-y-2">
                  <div className="flex gap-1 h-1">
                    {[1, 2, 3].map((step) => (
                      <div 
                        key={step} 
                        className={`h-full flex-1 rounded-full transition-colors duration-500 ${
                          strengthScore >= step 
                            ? (strengthScore === 3 ? 'bg-green-500' : 'bg-yellow-500') 
                            : 'bg-neutral-200 dark:bg-neutral-700'
                        }`}
                      />
                    ))}
                  </div>
                  <ul className="text-xs space-y-1">
                    {passwordRequirements.map((req, i) => {
                      const met = req.test(formData.password);
                      return (
                        <li key={i} className={`flex items-center gap-1.5 ${met ? 'text-green-600' : 'text-theme-muted'}`}>
                          {met ? <Check size={12} /> : <X size={12} />}
                          {req.label}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
            
            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className={labelStyle}>Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-muted" size={18} />
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  id="confirmPassword" 
                  value={formData.confirmPassword} 
                  onChange={handleChange} 
                  className={inputStyle} 
                  placeholder="••••••••" 
                  required 
                />
                <button 
                  type="button" 
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-theme-muted hover:text-primary-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full bg-primary-600 hover:bg-primary-700 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:grayscale flex items-center justify-center gap-2"
              disabled={isLoading || !isPasswordStrong}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>
          
          <div className="mt-8 text-center border-t border-theme-border pt-6">
            <p className="text-theme-muted">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-600 hover:text-primary-700 font-bold">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;