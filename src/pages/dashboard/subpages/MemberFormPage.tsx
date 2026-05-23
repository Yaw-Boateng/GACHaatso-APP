import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Save, 
  Loader2, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Briefcase, 
  Calendar, 
  Heart,
  Upload,
  X,
  AlertCircle
} from 'lucide-react';
import api from '../../../api/api';

interface MemberFormData {
  firstName: string;
  lastName: string;
  gender: string;
  phoneNumber: string;
  email: string;
  occupation: string;
  dateOfBirth: string;
  maritalStatus: string;
  residenceAddress: string;
  emergencyNumber: string;
  imageUrl: string; // Keeps track of existing remote image path
}

const initialFormState: MemberFormData = {
  firstName: '',
  lastName: '',
  gender: 'MALE',
  phoneNumber: '',
  email: '',
  occupation: '',
  dateOfBirth: '',
  maritalStatus: 'SINGLE',
  residenceAddress: '',
  emergencyNumber: '',
  imageUrl: ''
};

const MemberFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isEditMode = !!id;

  // State Management Matrix
  const [formData, setFormData] = useState<MemberFormData>(initialFormState);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 1. Initial hydration loop for editing pipeline
  useEffect(() => {
    if (!isEditMode) {
      setFormData(initialFormState);
      setImageFile(null);
      setImagePreview(null);
      return;
    }
    
    const loadExistingRecordData = async () => {
      setFetching(true);
      setError(null);
      try {
        const response = await api.get(`/members/${id}`);
        if (response.data?.success && response.data?.data) {
          const record = response.data.data;
          
          setFormData({
            firstName: record.firstName || '',
            lastName: record.lastName || '',
            gender: record.gender || 'MALE',
            phoneNumber: record.phoneNumber || '',
            email: record.email || '',
            occupation: record.occupation || '',
            dateOfBirth: record.dateOfBirth ? record.dateOfBirth.split('T')[0] : '',
            maritalStatus: record.maritalStatus || 'SINGLE',
            residenceAddress: record.residenceAddress || '',
            emergencyNumber: record.emergencyNumber || '',
            imageUrl: record.imageUrl || ''
          });

          // Set initial image preview path to the existing remote file address if present
          if (record.imageUrl) {
            setImagePreview(record.imageUrl);
          }
        } else {
          throw new Error(response.data?.message || "Failed to parse system record payload structure.");
        }
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || "Failed hydrating form model parameters.");
      } finally {
        setFetching(false);
      }
    };

    loadExistingRecordData();
  }, [id, isEditMode]);

  // Clean up object URLs to prevent memory leaks when previewing changes multiple times
  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // Handle image file selection interceptor
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Optional: add client-side check for image type/size validation here
    setImageFile(file);
    
    // Revoke past local blob if one existed before generating a fresh swap preview
    if (imagePreview && imagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview);
    }

    // Generate immediate browser viewport rendering string link node
    const localPreviewUrl = URL.createObjectURL(file);
    setImagePreview(localPreviewUrl);
  };

  // Remove current staged file wrapper and fallback to remote path pointer asset rule
  const handleRemoveImage = () => {
    setImageFile(null);
    if (imagePreview && imagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview);
    }
    // Revert straight back to database saved state reference node fallback link
    setImagePreview(formData.imageUrl || null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Handle generic text/select input element sync updates
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 2. Adaptive Submit Interceptor Pipeline Execution
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Build standard multi-part payload structure to allow seamless binary data stream routing
    const payload = new FormData();
    
    // Append all raw text matrix properties
    Object.entries(formData).forEach(([key, value]) => {
      payload.append(key, value);
    });

    // If a fresh image asset binary block has been declared, attach it to stream allocation keys
    if (imageFile) {
      payload.append('image', imageFile); 
    }
    
    try {
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      };

      if (isEditMode) {
        const response = await api.patch(`/members/update-member/${id}`, payload, config);
        if (!response.data?.success) throw new Error(response.data?.message || "Mutation rejected by remote node.");
      } else {
        const response = await api.post('/members/add-member', payload, config);
        if (!response.data?.success) throw new Error(response.data?.message || "Creation rejected by remote node.");
      }
      
      navigate('/dashboard/members');
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Pipeline execution failure during storage write.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-3 bg-theme-surface border border-theme-border rounded-2xl max-w-3xl mx-auto">
        <Loader2 className="h-6 w-6 text-neutral-400 animate-spin" />
        <p className="text-[11px] text-theme-muted tracking-wide">Retrieving system index records schema node...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 px-1 animate-in fade-in duration-300">
      
      {/* Return Nav Anchor Navigation Matrix Element */}
      <div className="flex items-center justify-between">
        <Link 
          to="/dashboard/members" 
          className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-theme-muted hover:text-theme-text transition-colors group"
        >
          <ArrowLeft size={13} className="transform group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Registry</span>
        </Link>
      </div>

      {/* Structural Header block */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-theme-text font-serif">
          {isEditMode ? 'Modify Registry Data Entity' : 'Register New Member Node'}
        </h2>
        <p className="text-xs text-theme-muted mt-0.5">
          {isEditMode ? 'Apply localized delta patch adjustments to member data parameters safely.' : 'Provision a completely unique tracking entry node inside database schema arrays.'}
        </p>
      </div>

      {/* Primary Context Error Messaging */}
      {error && (
        <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl flex items-start gap-3">
          <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
          <div>
            <h5 className="text-xs font-bold text-red-500">Form Pipeline Exception Interrupted</h5>
            <p className="text-[11px] text-theme-muted mt-0.5">{error}</p>
          </div>
        </div>
      )}

      {/* Main Form container */}
      <form onSubmit={handleSubmit} className="bg-theme-surface border border-theme-border rounded-2xl shadow-xs overflow-hidden">
        <div className="p-6 space-y-6">
          
          {/* Dedicated Profile Avatar Media Intercept Stream block section */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold tracking-wider text-theme-muted uppercase border-b border-theme-border/60 pb-1">Profile Photo Element</h3>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 p-4 bg-theme-base/5 border border-theme-border/40 rounded-xl">
              <div className="relative h-20 w-20 rounded-xl border border-theme-border bg-theme-base/10 overflow-hidden flex items-center justify-center shrink-0 group">
                {imagePreview ? (
                  <>
                    <img 
                      src={imagePreview} 
                      alt="Avatar preview reference node" 
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        // Fallback UI block in case target endpoint reference breaks down
                        (e.target as HTMLImageElement).src = '';
                        setImagePreview(null);
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-1 right-1 bg-neutral-900/80 hover:bg-neutral-950 p-1 rounded-md text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      title="Clear selection state"
                    >
                      <X size={10} />
                    </button>
                  </>
                ) : (
                  <User className="h-8 w-8 text-theme-muted" />
                )}
              </div>

              <div className="space-y-1.5 flex-1 w-full">
                <label className="block text-[11px] font-bold text-theme-text">Upload Display Identity Avatar</label>
                <p className="text-[10px] text-theme-muted max-w-md leading-relaxed">
                  {imageFile 
                    ? `Staged modification element payload detected: "${imageFile.name}" Ready for write sequence.`
                    : isEditMode && formData.imageUrl 
                      ? 'Displaying active remote reference image. Dropping a fresh alternative will update preview metrics parameters.'
                      : 'Provide an image file binary target. Supports JPEG, PNG formats up to 5MB.'}
                </p>
                
                <div className="pt-1 flex gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-theme-surface text-theme-text border border-theme-border hover:bg-theme-base/5 transition-all cursor-pointer shadow-xs"
                  >
                    <Upload size={12} />
                    <span>{imagePreview ? 'Change Selection' : 'Choose Binary File'}</span>
                  </button>
                  
                  <input
                    type="file"
                    ref={fileInputRef}
                    id="imageUpload"
                    name="imageUpload"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section A: Primary Identity Core Profile Credentials */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold tracking-wider text-theme-muted uppercase border-b border-theme-border/60 pb-1">01. Identity Parameters</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-theme-text" htmlFor="firstName">First Given Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-theme-muted" size={13} />
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="e.g. John"
                    className="w-full text-xs pl-9 pr-4 py-2.5 bg-theme-base/10 border border-theme-border rounded-xl focus:border-neutral-400 dark:focus:border-neutral-600 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-theme-text" htmlFor="lastName">Surname Family Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-theme-muted" size={13} />
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="e.g. Doe"
                    className="w-full text-xs pl-9 pr-4 py-2.5 bg-theme-base/10 border border-theme-border rounded-xl focus:border-neutral-400 dark:focus:border-neutral-600 outline-none transition-all"
                  />
                </div>
              </div>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-theme-text" htmlFor="gender">Biographical Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full text-xs px-3.5 py-2.5 bg-theme-base/10 border border-theme-border rounded-xl focus:border-neutral-400 dark:focus:border-neutral-600 outline-none transition-all"
                >
                  <option value="MALE">MALE</option>
                  <option value="FEMALE">FEMALE</option>
                  <option value="OTHER">OTHER</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-theme-text" htmlFor="dateOfBirth">Date of Birth Metric</label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-theme-muted" size={13} />
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    required
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full text-xs pl-9 pr-4 py-2.5 bg-theme-base/10 border border-theme-border rounded-xl focus:border-neutral-400 dark:focus:border-neutral-600 outline-none transition-all"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Section B: Physical & Communication Interface Channels Routing */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold tracking-wider text-theme-muted uppercase border-b border-theme-border/60 pb-1">02. Communication & Logistics Context</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-theme-text" htmlFor="phoneNumber">Primary Telephone Line</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-theme-muted" size={13} />
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    required
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="e.g. +1 (555) 000-0000"
                    className="w-full text-xs pl-9 pr-4 py-2.5 bg-theme-base/10 border border-theme-border rounded-xl focus:border-neutral-400 dark:focus:border-neutral-600 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-theme-text" htmlFor="email">Digital Routing Mailbox</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-theme-muted" size={13} />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="example@domain.com"
                    className="w-full text-xs pl-9 pr-4 py-2.5 bg-theme-base/10 border border-theme-border rounded-xl focus:border-neutral-400 dark:focus:border-neutral-600 outline-none transition-all"
                  />
                </div>
              </div>

            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-theme-text" htmlFor="residenceAddress">Physical Residential Logistics Complex Address</label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-3 text-theme-muted" size={13} />
                <textarea
                  id="residenceAddress"
                  name="residenceAddress"
                  required
                  rows={2}
                  value={formData.residenceAddress}
                  onChange={handleInputChange}
                  placeholder="Street lines, Suite block processing identifiers, Zip code maps..."
                  className="w-full text-xs pl-9 pr-4 py-2 bg-theme-base/10 border border-theme-border rounded-xl focus:border-neutral-400 dark:focus:border-neutral-600 outline-none transition-all resize-none"
                />
              </div>
            </div>
          </div>

          {/* Section C: Institutional Meta & Auxiliary Structural logs */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold tracking-wider text-theme-muted uppercase border-b border-theme-border/60 pb-1">03. Demographics & Security Meta</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-theme-text" htmlFor="occupation">Professional System Sector Occupation</label>
                <div className="relative">
                  <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 text-theme-muted" size={13} />
                  <input
                    type="text"
                    id="occupation"
                    name="occupation"
                    required
                    value={formData.occupation}
                    onChange={handleInputChange}
                    placeholder="e.g. Systems Engineer Node"
                    className="w-full text-xs pl-9 pr-4 py-2.5 bg-theme-base/10 border border-theme-border rounded-xl focus:border-neutral-400 dark:focus:border-neutral-600 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-theme-text" htmlFor="maritalStatus">Marital Alliance Registry Status</label>
                <div className="relative">
                  <Heart className="absolute left-3.5 top-1/2 -translate-y-1/2 text-theme-muted" size={13} />
                  <select
                    id="maritalStatus"
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleInputChange}
                    className="w-full text-xs pl-9 pr-4 py-2.5 bg-theme-base/10 border border-theme-border rounded-xl focus:border-neutral-400 dark:focus:border-neutral-600 outline-none transition-all appearance-none"
                  >
                    <option value="SINGLE">SINGLE</option>
                    <option value="MARRIED">MARRIED</option>
                    <option value="DIVORCED">DIVORCED</option>
                    <option value="WIDOWED">WIDOWED</option>
                  </select>
                </div>
              </div>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-theme-text" htmlFor="emergencyNumber">Contingency Backup Hotline (Emergency)</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-theme-muted" size={13} />
                  <input
                    type="tel"
                    id="emergencyNumber"
                    name="emergencyNumber"
                    required
                    value={formData.emergencyNumber}
                    onChange={handleInputChange}
                    placeholder="e.g. +1 (555) 911-0000"
                    className="w-full text-xs pl-9 pr-4 py-2.5 bg-theme-base/10 border border-theme-border rounded-xl focus:border-neutral-400 dark:focus:border-neutral-600 outline-none transition-all"
                  />
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Global Structural Execution Bottom Utility Footer Tray Bar */}
        <div className="px-6 py-4 bg-theme-base/10 border-t border-theme-border flex items-center justify-end gap-3">
          <Link
            to="/dashboard/members"
            className="px-4 py-2 rounded-xl text-xs font-semibold text-theme-muted hover:text-theme-text border border-theme-border bg-theme-surface transition-all cursor-pointer"
          >
            Abort Transaction Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-500 text-white px-4 py-2 rounded-xl text-xs font-semibold items-center justify-center gap-2 transition-all shadow-md shadow-primary-600/10 active:scale-98 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 size={13} className="animate-spin" />
                <span>Processing Stream Commit...</span>
              </>
            ) : (
              <>
                <Save size={13} />
                <span>{isEditMode ? 'Commit Metadata Delta Updates' : 'Persist Unique Entry Profile'}</span>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
};

export default MemberFormPage;