import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { User, Mail, Phone, ShieldCheck, ArrowLeft, Loader2, Save } from 'lucide-react';

const AddMemberPage = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    role: 'MEMBER',
    // Default password for new members added by admin/leader
    password: 'Temporary123!', 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Reusing your signUp logic from AuthContext
      await signUp({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: formData.role
      });
      
      // Navigate back to directory on success
      navigate('/dashboard/members');
    } catch (err) {
      setError(err.message || 'Failed to add member');
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle = "w-full pl-11 pr-4 py-3 rounded-xl border border-theme-border bg-theme-surface text-theme-text focus:ring-2 focus:ring-primary-600 outline-none transition-all duration-200";
  const labelStyle = "block mb-2 text-sm font-semibold text-theme-text opacity-70";

  return (
    <div className="max-w-3xl mx-auto animate-in slide-in-from-bottom-4 duration-500 px-4 md:px-0">
      {/* Header / Back Button */}
      <button 
        onClick={() => navigate('/dashboard/members')}
        className="flex items-center gap-2 text-theme-muted hover:text-primary-600 transition-colors mb-6 group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back to Directory</span>
      </button>

      <div className="bg-theme-surface border border-theme-border rounded-3xl p-6 md:p-10 shadow-sm">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-theme-text">Add New Member</h2>
          <p className="text-theme-muted mt-1">Fill in the details below to create a new church account.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-sm flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1: Names */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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

          {/* Row 2: Email and Phone Number */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="email" className={labelStyle}>Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-muted" size={18} />
                <input type="email" id="email" value={formData.email} onChange={handleChange} className={inputStyle} placeholder="member@example.com" required />
              </div>
            </div>
            <div>
              <label htmlFor="phoneNumber" className={labelStyle}>Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-muted" size={18} />
                <input type="tel" id="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className={inputStyle} placeholder="+233..." />
              </div>
            </div>
          </div>

         

          {/* Form Actions */}
          <div className="pt-4 mt-2 flex flex-col md:flex-row justify-end gap-3">
            <button 
              type="button" 
              onClick={() => navigate('/dashboard/members')}
              className="px-6 py-3 rounded-xl font-bold text-theme-text hover:bg-theme-base transition-colors order-2 md:order-1"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isLoading}
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-70 order-1 md:order-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={20} />
                  Save Member
                </>
              )}
            </button>
          </div>
        </form>
      </div>
      
      <p className="text-center text-xs text-theme-muted mt-6">
        Note: The new member will be able to log in using their email and the temporary password: 
        <span className="font-mono font-bold text-primary-600 ml-1">{formData.password}</span>
      </p>
    </div>
  );
};

export default AddMemberPage;