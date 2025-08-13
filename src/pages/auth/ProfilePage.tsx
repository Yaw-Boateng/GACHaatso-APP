import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { User, Calendar, FileText, Heart, Settings } from 'lucide-react';

const ProfilePage = () => {
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('personal');
  
  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !currentUser) {
      navigate('/login');
    }
  }, [currentUser, loading, navigate]);
  
  if (loading || !currentUser) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-primary-600 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-neutral-50">
      <div className="container mx-auto px-4 py-16">
        <div className="bg-white rounded-xl shadow-soft overflow-hidden">
          {/* Profile Header */}
          <div className="bg-primary-700 text-white p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-24 h-24 bg-primary-200 rounded-full flex items-center justify-center text-primary-700 text-3xl font-bold">
                {currentUser.displayName ? currentUser.displayName.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-serif font-bold text-white">
                  {currentUser.displayName || 'Church Member'}
                </h1>
                <p className="text-white/80">
                  {currentUser.email}
                </p>
                <p className="bg-primary-600 inline-block px-3 py-1 rounded-full text-sm mt-2">
                  {currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}
                </p>
              </div>
            </div>
          </div>
          
          {/* Profile Navigation */}
          <div className="border-b border-neutral-200">
            <div className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab('personal')}
                className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'personal'
                    ? 'border-b-2 border-primary-600 text-primary-600'
                    : 'text-neutral-600 hover:text-primary-600'
                }`}
              >
                <User size={16} className="inline mr-2" />
                Personal Information
              </button>
              
              <button
                onClick={() => setActiveTab('events')}
                className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'events'
                    ? 'border-b-2 border-primary-600 text-primary-600'
                    : 'text-neutral-600 hover:text-primary-600'
                }`}
              >
                <Calendar size={16} className="inline mr-2" />
                My Events
              </button>
              
              <button
                onClick={() => setActiveTab('giving')}
                className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'giving'
                    ? 'border-b-2 border-primary-600 text-primary-600'
                    : 'text-neutral-600 hover:text-primary-600'
                }`}
              >
                <FileText size={16} className="inline mr-2" />
                Giving History
              </button>
              
              <button
                onClick={() => setActiveTab('prayer')}
                className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'prayer'
                    ? 'border-b-2 border-primary-600 text-primary-600'
                    : 'text-neutral-600 hover:text-primary-600'
                }`}
              >
                <Heart size={16} className="inline mr-2" />
                Prayer Requests
              </button>
              
              <button
                onClick={() => setActiveTab('settings')}
                className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'settings'
                    ? 'border-b-2 border-primary-600 text-primary-600'
                    : 'text-neutral-600 hover:text-primary-600'
                }`}
              >
                <Settings size={16} className="inline mr-2" />
                Account Settings
              </button>
            </div>
          </div>
          
          {/* Content Area */}
          <div className="p-8">
            {activeTab === 'personal' && (
              <div>
                <h2 className="text-2xl font-serif font-bold mb-6 text-primary-800">
                  Personal Information
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-neutral-700 mb-4">Profile Details</h3>
                    <div className="bg-neutral-50 p-6 rounded-xl">
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-neutral-500">Full Name</p>
                          <p className="font-medium">{currentUser.displayName || 'Not provided'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-neutral-500">Email</p>
                          <p className="font-medium">{currentUser.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-neutral-500">Member Status</p>
                          <p className="font-medium">Active Member</p>
                        </div>
                        <div>
                          <p className="text-sm text-neutral-500">Member Since</p>
                          <p className="font-medium">
                            {currentUser.createdAt
                              ? new Date(currentUser.createdAt).toLocaleDateString()
                              : 'Recently joined'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-neutral-700 mb-4">Additional Information</h3>
                    <div className="bg-neutral-50 p-6 rounded-xl">
                      <p className="text-neutral-600 mb-4">
                        Your profile is not yet complete. Please consider adding the following information:
                      </p>
                      <ul className="list-disc list-inside text-neutral-600 space-y-2">
                        <li>Phone number</li>
                        <li>Address</li>
                        <li>Family members</li>
                        <li>Spiritual gifts and interests</li>
                      </ul>
                      <button className="mt-6 btn btn-primary">
                        Complete Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'events' && (
              <div>
                <h2 className="text-2xl font-serif font-bold mb-6 text-primary-800">
                  My Events
                </h2>
                
                <div className="bg-neutral-50 p-6 rounded-xl text-center py-12">
                  <div className="w-20 h-20 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar size={32} className="text-neutral-500" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">No Events Yet</h3>
                  <p className="text-neutral-600 mb-6">
                    You haven't registered for any upcoming events.
                  </p>
                  <a href="/events" className="btn btn-primary">
                    Browse Events
                  </a>
                </div>
              </div>
            )}
            
            {activeTab === 'giving' && (
              <div>
                <h2 className="text-2xl font-serif font-bold mb-6 text-primary-800">
                  Giving History
                </h2>
                
                <div className="bg-neutral-50 p-6 rounded-xl text-center py-12">
                  <div className="w-20 h-20 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText size={32} className="text-neutral-500" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">No Giving History</h3>
                  <p className="text-neutral-600 mb-6">
                    Your giving history will appear here once you've made contributions.
                  </p>
                  <a href="/giving" className="btn btn-primary">
                    Give Now
                  </a>
                </div>
              </div>
            )}
            
            {activeTab === 'prayer' && (
              <div>
                <h2 className="text-2xl font-serif font-bold mb-6 text-primary-800">
                  Prayer Requests
                </h2>
                
                <div className="bg-neutral-50 p-6 rounded-xl text-center py-12">
                  <div className="w-20 h-20 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart size={32} className="text-neutral-500" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">No Prayer Requests</h3>
                  <p className="text-neutral-600 mb-6">
                    You haven't submitted any prayer requests yet.
                  </p>
                  <a href="/contact" className="btn btn-primary">
                    Submit Prayer Request
                  </a>
                </div>
              </div>
            )}
            
            {activeTab === 'settings' && (
              <div>
                <h2 className="text-2xl font-serif font-bold mb-6 text-primary-800">
                  Account Settings
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-neutral-700 mb-4">Change Password</h3>
                    <div className="bg-neutral-50 p-6 rounded-xl">
                      <form className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-1">
                            Current Password
                          </label>
                          <input
                            type="password"
                            className="w-full px-4 py-2 rounded-md border border-neutral-300 focus:ring-2 focus:ring-primary-200 focus:border-primary-600 transition"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-1">
                            New Password
                          </label>
                          <input
                            type="password"
                            className="w-full px-4 py-2 rounded-md border border-neutral-300 focus:ring-2 focus:ring-primary-200 focus:border-primary-600 transition"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-1">
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            className="w-full px-4 py-2 rounded-md border border-neutral-300 focus:ring-2 focus:ring-primary-200 focus:border-primary-600 transition"
                          />
                        </div>
                        <button type="submit" className="btn btn-primary w-full">
                          Update Password
                        </button>
                      </form>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-neutral-700 mb-4">Notification Preferences</h3>
                    <div className="bg-neutral-50 p-6 rounded-xl">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Email Notifications</p>
                            <p className="text-sm text-neutral-500">Receive church updates via email</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-neutral-300 peer-focus:ring-2 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Event Reminders</p>
                            <p className="text-sm text-neutral-500">Receive reminders for events you're registered for</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-neutral-300 peer-focus:ring-2 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Prayer Request Updates</p>
                            <p className="text-sm text-neutral-500">Receive updates on your prayer requests</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-neutral-300 peer-focus:ring-2 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Weekly Newsletter</p>
                            <p className="text-sm text-neutral-500">Receive our weekly church newsletter</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-neutral-300 peer-focus:ring-2 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                          </label>
                        </div>
                        
                        <button className="btn btn-primary w-full mt-4">
                          Save Preferences
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;