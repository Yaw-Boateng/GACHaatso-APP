import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Loader2, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Briefcase, 
  Calendar, 
  ShieldAlert, 
  UploadCloud,
  X,
  AlertCircle 
} from 'lucide-react';
import api from '../../../api/api';

interface CreateMemberPayload {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  phoneNumber: string;
  email: string;
  maritalStatus: string;
  residenceAddress: string;
  occupation: string;
  emergencyNumber: string;
}

const AddMemberPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // States
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [formData, setFormData] = useState<CreateMemberPayload>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    phoneNumber: '',
    email: '',
    maritalStatus: '',
    residenceAddress: '',
    occupation: '',
    emergencyNumber: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };  

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Basic size validation (5MB validation matching your UI description)
      if (file.size > 5 * 1024 * 1024) {
        setError("File size exceeds the 5MB boundary limit.");
        return;
      }
      
      setSelectedFile(file);
      setError(null);

      // Construct temporary local URL for visual preview context
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setSelectedFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    // 1. Initialize FormData instance
    const submissionPayload = new FormData();

    // 2. Map payload properties matching your Spring Boot parsing structure
    // If your backend uses @RequestPart("member"), bundle the data into a Blob wrapper string:
    const memberDataBlob = new Blob(
      [JSON.stringify(formData)], 
      { type: 'application/json' }
    );
    submissionPayload.append('member', memberDataBlob);

    // If your backend uses simple flat parameter bindings instead, use this alternative loop:
    // Object.entries(formData).forEach(([key, value]) => {
    //   submissionPayload.append(key, value);
    // });

    // 3. Append the raw binary file element if present
    if (selectedFile) {
      submissionPayload.append('file', selectedFile);
    } else {
      // Send an empty blob or completely omit if backend permits nullable images
      submissionPayload.append('file', new Blob(), '');
    }

    try {
      const response = await api.post('/members/create-member', submissionPayload, {
        headers: {
          // Setting Content-Type to undefined forces Axios to discard the global 
          // application/json header, allowing the browser to inject the dynamic boundary identifier.
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if (response.status === 200 || response.status === 201 || response.data?.success) {
        navigate('/dashboard/members');
      } else {
        throw new Error(response.data?.message || 'Server rejected member parameters.');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'An error occurred during record insertion.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto px-1 animate-in fade-in duration-300">
      
      {/* Navigation Header */}
      <div className="flex items-center gap-4">
        <Link 
          to="/dashboard/members" 
          className="p-2 border border-theme-border rounded-xl text-theme-muted hover:text-theme-text bg-theme-surface hover:bg-theme-base/20 transition-all"
        >
          <ArrowLeft size={16} />
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-theme-text font-serif">Add New Member</h2>
          <p className="text-xs text-theme-muted mt-0.5">Register a unique user node inside your database infrastructure.</p>
        </div>
      </div>

      {error && (
        <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-xs">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold block">Operation Faulted</span>
            <span className="text-neutral-500 dark:text-neutral-400 mt-0.5 block">{error}</span>
          </div>
        </div>
      )}

      {/* Main Ingestion Form */}
      <form onSubmit={handleSubmit} className="bg-theme-surface border border-theme-border rounded-2xl p-6 shadow-xs space-y-6">
        
        {/* Profile Avatar Upload Segment */}
        <div>
          <h3 className="text-[10px] font-bold tracking-wider text-theme-muted uppercase mb-4 flex items-center gap-1.5">
            <User size={12} /> Profile Avatar Media
          </h3>
          
          <div className="flex flex-col sm:flex-row items-center gap-5 p-4 bg-theme-base/5 border border-theme-border/60 border-dashed rounded-xl">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              className="hidden" 
            />
            
            {/* Visual Frame: Preview or Empty State Box */}
            <div className="relative w-24 h-24 rounded-xl border border-theme-border bg-theme-surface flex items-center justify-center overflow-hidden shrink-0 group">
              {imagePreview ? (
                <>
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={clearImage}
                    className="absolute top-1 right-1 p-1 bg-black/60 rounded-md text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  >
                    <X size={12} />
                  </button>
                </>
              ) : (
                <UploadCloud size={24} className="text-theme-muted" />
              )}
            </div>

            {/* Upload Logic Text Triggers */}
            <div className="text-center sm:text-left space-y-1">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs px-3 py-1.5 bg-theme-surface border border-theme-border rounded-lg font-medium text-theme-text hover:bg-theme-base/10 transition-all"
              >
                Select Profile Image
              </button>
              <p className="text-[11px] text-theme-muted">Supports JPG, PNG, or WEBP. Max size 5MB.</p>
            </div>
          </div>
        </div>

        <hr className="border-theme-border/60" />

        {/* Row 1: Primary Identity Structural Group */}
        <div>
          <h3 className="text-[10px] font-bold tracking-wider text-theme-muted uppercase mb-4 flex items-center gap-1.5">
            <User size={12} /> Primary Core Identity
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-theme-text">First Name *</label>
              <input 
                type="text" 
                name="firstName" 
                required 
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Jane"
                className="w-full text-xs p-3 bg-theme-base/10 border border-theme-border rounded-xl focus:border-neutral-400 dark:focus:border-neutral-600 outline-none transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-theme-text">Last Name *</label>
              <input 
                type="text" 
                name="lastName" 
                required 
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
                className="w-full text-xs p-3 bg-theme-base/10 border border-theme-border rounded-xl focus:border-neutral-400 dark:focus:border-neutral-600 outline-none transition-all"
              />
            </div>
          </div>
        </div>

        <hr className="border-theme-border/60" />

        {/* Row 2: Demographics & Bio Parameters */}
        <div>
          <h3 className="text-[10px] font-bold tracking-wider text-theme-muted uppercase mb-4 flex items-center gap-1.5">
            <Calendar size={12} /> Demographic Matrix
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-theme-text">Date of Birth *</label>
              <input 
                type="date" 
                name="dateOfBirth" 
                required 
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full text-xs p-3 bg-theme-base/10 border border-theme-border rounded-xl focus:border-neutral-400 dark:focus:border-neutral-600 outline-none transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-theme-text">Gender *</label>
              <select 
                name="gender" 
                required 
                value={formData.gender}
                onChange={handleChange}
                className="w-full text-xs p-3 bg-theme-base/10 border border-theme-border rounded-xl focus:border-neutral-400 dark:focus:border-neutral-600 outline-none transition-all appearance-none"
              >
                <option value="">Select Gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-theme-text">Marital Status *</label>
              <select 
                name="maritalStatus" 
                required 
                value={formData.maritalStatus}
                onChange={handleChange}
                className="w-full text-xs p-3 bg-theme-base/10 border border-theme-border rounded-xl focus:border-neutral-400 dark:focus:border-neutral-600 outline-none transition-all appearance-none"
              >
                <option value="">Select Status</option>
                <option value="SINGLE">Single</option>
                <option value="MARRIED">Married</option>
                <option value="DIVORCED">Divorced</option>
                <option value="WIDOWED">Widowed</option>
              </select>
            </div>
          </div>
        </div>

        <hr className="border-theme-border/60" />

        {/* Row 3: Communication Fields */}
        <div>
          <h3 className="text-[10px] font-bold tracking-wider text-theme-muted uppercase mb-4 flex items-center gap-1.5">
            <Mail size={12} /> Communication & Core Profile Fields
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-theme-text">Phone Number *</label>
              <div className="relative">
                <Phone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-theme-muted" />
                <input 
                  type="tel" 
                  name="phoneNumber" 
                  required 
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full text-xs pl-10 pr-3 py-3 bg-theme-base/10 border border-theme-border rounded-xl focus:border-neutral-400 dark:focus:border-neutral-600 outline-none transition-all"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-theme-text">Email Address *</label>
              <div className="relative">
                <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-theme-muted" />
                <input 
                  type="email" 
                  name="email" 
                  required 
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="jane.doe@example.com"
                  className="w-full text-xs pl-10 pr-3 py-3 bg-theme-base/10 border border-theme-border rounded-xl focus:border-neutral-400 dark:focus:border-neutral-600 outline-none transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        <hr className="border-theme-border/60" />

        {/* Row 4: Logistics Location & Workspace Context */}
        <div>
          <h3 className="text-[10px] font-bold tracking-wider text-theme-muted uppercase mb-4 flex items-center gap-1.5">
            <MapPin size={12} /> Logistics & Professional Node Positioning
          </h3>
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-theme-text">Active Occupation *</label>
              <div className="relative">
                <Briefcase size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-theme-muted" />
                <input 
                  type="text" 
                  name="occupation" 
                  required 
                  value={formData.occupation}
                  onChange={handleChange}
                  placeholder="Software Engineer"
                  className="w-full text-xs pl-10 pr-3 py-3 bg-theme-base/10 border border-theme-border rounded-xl focus:border-neutral-400 dark:focus:border-neutral-600 outline-none transition-all"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-theme-text">Residence Living Address *</label>
              <div className="relative">
                <MapPin size={14} className="absolute left-3.5 top-3 text-theme-muted" />
                <textarea 
                  name="residenceAddress" 
                  required 
                  rows={2}
                  value={formData.residenceAddress}
                  onChange={handleChange}
                  placeholder="123 Financial District Way, New York, NY"
                  className="w-full text-xs pl-10 pr-3 py-3 bg-theme-base/10 border border-theme-border rounded-xl focus:border-neutral-400 dark:focus:border-neutral-600 outline-none transition-all resize-none"
                />
              </div>
            </div>
          </div>
        </div>

        <hr className="border-theme-border/60" />

        {/* Row 5: Emergency Configuration */}
        <div>
          <h3 className="text-[10px] font-bold tracking-wider text-theme-muted uppercase mb-4 flex items-center gap-1.5">
            <ShieldAlert size={12} /> Safety Routing Contingency
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-theme-text">Emergency Contact Number *</label>
              <div className="relative">
                <Phone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-theme-muted" />
                <input 
                  type="tel" 
                  name="emergencyNumber" 
                  required 
                  value={formData.emergencyNumber}
                  onChange={handleChange}
                  placeholder="+1 (555) 911-0000"
                  className="w-full text-xs pl-10 pr-3 py-3 bg-theme-base/10 border border-theme-border rounded-xl focus:border-neutral-400 dark:focus:border-neutral-600 outline-none transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Form Action Buttons */}
        <div className="pt-4 border-t border-theme-border flex items-center justify-end gap-3">
          <Link 
            to="/dashboard/members"
            className="px-5 py-2.5 border border-theme-border rounded-xl text-xs font-semibold text-theme-text hover:bg-theme-base/20 transition-all"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white px-5 py-2.5 rounded-xl text-xs font-semibold items-center justify-center gap-2 transition-all shadow-md shadow-primary-600/10 active:scale-98"
          >
            {submitting ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                <span>Creating Node...</span>
              </>
            ) : (
              <span>Commit Member Registration</span>
            )}
          </button>
        </div>

      </form>
    </div>
  );
};

export default AddMemberPage;