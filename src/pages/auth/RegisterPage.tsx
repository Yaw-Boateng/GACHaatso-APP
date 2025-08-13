import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { signUp } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await signUp(email, password, name);
      navigate('/profile');
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-neutral-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-soft p-8">
          <h1 className="text-3xl font-serif font-bold mb-6 text-primary-800 text-center">
            Create an Account
          </h1>
          
          {error && (
            <div className="mb-6 p-4 bg-error-50 text-error-700 rounded-md">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block mb-2 font-medium text-neutral-700">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-md border border-neutral-300 focus:ring-2 focus:ring-primary-200 focus:border-primary-600 transition"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block mb-2 font-medium text-neutral-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-md border border-neutral-300 focus:ring-2 focus:ring-primary-200 focus:border-primary-600 transition"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block mb-2 font-medium text-neutral-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-md border border-neutral-300 focus:ring-2 focus:ring-primary-200 focus:border-primary-600 transition"
                required
              />
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block mb-2 font-medium text-neutral-700">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-md border border-neutral-300 focus:ring-2 focus:ring-primary-200 focus:border-primary-600 transition"
                required
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4 text-primary-600 rounded"
                required
              />
              <label htmlFor="terms" className="ml-2 text-neutral-700">
                I agree to the{' '}
                <a href="#" className="text-primary-600 hover:text-primary-700">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-primary-600 hover:text-primary-700">
                  Privacy Policy
                </a>
              </label>
            </div>
            
            <button
              type="submit"
              className="w-full btn btn-primary py-3"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                'Register'
              )}
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-neutral-600">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
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