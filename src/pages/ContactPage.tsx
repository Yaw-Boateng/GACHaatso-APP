import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, ArrowRight, Check } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    messageType: 'general',
    message: '',
    isPrayerRequest: false,
    isPrivate: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Simulate form submission
    setTimeout(() => {
      try {
        setIsSubmitted(true);
        setIsSubmitting(false);
      } catch (err) {
        setError('There was an error submitting your form. Please try again.');
        setIsSubmitting(false);
      }
    }, 1500);
  };

  const formInputClass = "w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary-200 focus:border-primary-600 transition-colors duration-200";
  const formLabelClass = "block mb-2 text-sm font-medium text-neutral-700";

  return (
    <div className="pt-20 bg-neutral-50">
      {/* Hero Section */}
      

       <section className="relative py-24 bg-primary-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-white">
               Get In Touch
            </h1>
            <p className="text-xl mb-0 text-white/90">
              We'd love to hear from you. Whether you have a question, a prayer request, or just want to say hello, we're here for you.
            </p>
          </div>
        </div>

        
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16">
            {/* Contact Information */}
            <div className="mb-12 lg:mb-0">
              <h2 className="text-3xl font-bold font-serif mb-8 text-primary-800">
                Church Information
              </h2>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 p-3 bg-primary-100 rounded-full mr-4">
                    <MapPin size={24} className="text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary-800 mb-1">Address</h3>
                    <p className="text-neutral-600">123 Church Street</p>
                    <p className="text-neutral-600">Harbor City, NY 10001</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 p-3 bg-primary-100 rounded-full mr-4">
                    <Phone size={24} className="text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary-800 mb-1">Phone</h3>
                    <p className="text-neutral-600">(234) 567-8900</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 p-3 bg-primary-100 rounded-full mr-4">
                    <Mail size={24} className="text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary-800 mb-1">Email</h3>
                    <p className="text-neutral-600">info@graceharbor.church</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 p-3 bg-primary-100 rounded-full mr-4">
                    <Clock size={24} className="text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary-800 mb-1">Office Hours</h3>
                    <p className="text-neutral-600">Monday - Friday: 9:00 AM - 5:00 PM</p>
                    <p className="text-neutral-600">Saturday: Closed</p>
                    <p className="text-neutral-600">Sunday: 8:00 AM - 1:00 PM</p>
                  </div>
                </div>

                {/* Prayer Request Callout */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200">
                  <div className="flex items-center mb-3">
                    <MessageSquare size={24} className="text-primary-600 mr-2" />
                    <h3 className="text-lg font-bold text-primary-800">Need Prayer?</h3>
                  </div>
                  <p className="text-neutral-600 mb-3">
                    Our team is here to pray for you. Use the form to submit a request, or call our dedicated prayer line.
                  </p>
                  <p className="font-semibold text-neutral-800">Prayer Line: <span className="text-primary-600">(234) 567-8910</span></p>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl">
              {!isSubmitted ? (
                <>
                  <h2 className="text-3xl font-bold font-serif mb-6 text-primary-800">
                    Send Us a Message
                  </h2>
                  
                  {error && (
                    <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg font-medium">
                      {error}
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="name" className={formLabelClass}>Name*</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={formInputClass} required />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className={formLabelClass}>Email*</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={formInputClass} required />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="phone" className={formLabelClass}>Phone</label>
                        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className={formInputClass} />
                      </div>
                      
                      <div>
                        <label htmlFor="messageType" className={formLabelClass}>Message Type*</label>
                        <select id="messageType" name="messageType" value={formData.messageType} onChange={handleChange} className={formInputClass} required>
                          <option value="general">General Inquiry</option>
                          <option value="prayer">Prayer Request</option>
                          <option value="membership">Membership Information</option>
                          <option value="volunteer">Volunteer Opportunities</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="message" className={formLabelClass}>Message*</label>
                      <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={5} className={formInputClass} required></textarea>
                    </div>
                    
                    {formData.messageType === 'prayer' && (
                      <div className="mb-6 space-y-4">
                        <div className="flex items-center">
                          <input type="checkbox" id="isPrayerRequest" name="isPrayerRequest" checked={formData.isPrayerRequest} onChange={handleCheckboxChange} className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500" />
                          <label htmlFor="isPrayerRequest" className="ml-2 text-neutral-700">Add this to the church prayer list</label>
                        </div>
                        
                        {formData.isPrayerRequest && (
                          <div className="flex items-center">
                            <input type="checkbox" id="isPrivate" name="isPrivate" checked={formData.isPrivate} onChange={handleCheckboxChange} className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500" />
                            <label htmlFor="isPrivate" className="ml-2 text-neutral-700">Keep my request private (only shared with the pastoral team)</label>
                          </div>
                        )}
                      </div>
                    )}
                    
                    <button
                      type="submit"
                      className="w-full px-6 py-4 bg-primary-600 text-white rounded-lg font-semibold shadow-md hover:bg-primary-700 transition-colors duration-200 disabled:bg-primary-400 disabled:cursor-not-allowed"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Sending...
                        </div>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="bg-green-100 text-green-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check size={32} />
                  </div>
                  <h2 className="text-3xl font-bold font-serif mb-4 text-primary-800">
                    Message Sent!
                  </h2>
                  <p className="text-neutral-600 mb-6">
                    Thank you for reaching out. We've received your message and will get back to you as soon as possible.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-3 bg-primary-50 text-primary-600 rounded-lg font-medium hover:bg-primary-100 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold font-serif mb-8 text-primary-800 text-center">
            Find Our Location
          </h2>
          
          <div className="rounded-2xl overflow-hidden shadow-xl h-96">
            <div className="w-full h-full bg-neutral-200 flex items-center justify-center">
              <p className="text-neutral-600">
                [Interactive Map Would Be Embedded Here]
              </p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <a 
              href="https://maps.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-lg font-semibold text-primary-600 hover:text-primary-700 transition-colors"
            >
              Get Directions
              <ArrowRight size={20} className="ml-2 transform -rotate-45" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;