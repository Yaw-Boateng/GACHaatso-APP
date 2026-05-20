import { useState } from "react";
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Check, 
  Send, 
  Lock, 
  Eye 
} from "lucide-react";
import { useSendMessage } from "../hooks/useMessages.js";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    messageType: "GENERAL_ENQUIRY",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Initialize the custom React Query hook
  const { mutate, isPending, error } = useSendMessage();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Trigger mutation to backend
    mutate(formData, {
      onSuccess: () => {
        setIsSubmitted(true);
        // Reset form to initial state
        setFormData({
          name: "", 
          email: "", 
          phone: "", 
          messageType: "GENERAL_ENQUIRY", 
          message: "",
        });
      },
    });
  };

  const formInputClass = "w-full px-4 py-3 rounded-xl border border-theme-border bg-theme-base text-theme-text focus:ring-2 focus:ring-primary-500/20 focus:border-primary-600 outline-none transition-all duration-200";
  const formLabelClass = "block mb-2 text-sm font-semibold text-theme-text";

  return (
    <div className="min-h-screen pt-16 bg-theme-bg transition-colors duration-300">
      
      {/* Hero Section */}
      <section className="relative py-24 bg-primary-700 overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight">Get In Touch</h1>
            <p className="text-xl text-primary-50 max-w-2xl leading-relaxed">
              Whether you have a question or a prayer request, our team is here to listen and support you.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 md:py-24 -mt-10 relative z-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Sidebar: Contact Information */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-8 text-theme-text">Church Information</h2>
                <div className="space-y-6">
                  {[
                    { icon: MapPin, title: "Address", content: "123 Church Street, City, NY 10001" },
                    { icon: Phone, title: "Phone", content: "(234) 567-8900" },
                    { icon: Mail, title: "Email", content: "info@graceharbor.church" },
                  ].map((item, index) => (
                    <div key={index} className="flex gap-4 group">
                      <div className="flex-shrink-0 w-12 h-12 rounded-2xl border border-theme-border flex items-center justify-center bg-primary-600 text-white shadow-lg transition-transform group-hover:scale-105">
                        <item.icon size={22} />
                      </div>
                      <div>
                        <h3 className="font-bold text-theme-text">{item.title}</h3>
                        <p className="text-theme-muted">{item.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-primary-50 dark:bg-primary-900/10 p-8 rounded-3xl border border-primary-100 dark:border-primary-800/50">
                <div className="flex items-center gap-3 mb-4 text-primary-700 dark:text-primary-400">
                  <MessageSquare size={24} />
                  <h3 className="text-xl font-bold text-theme-text">Need Prayer?</h3>
                </div>
                <p className="text-theme-muted leading-relaxed">
                  Every request is handled with the utmost care and confidentiality by our pastoral team.
                </p>
              </div>
            </div>

            {/* Form Card */}
            <div className="lg:col-span-7 bg-theme-surface p-8 md:p-12 rounded-3xl shadow-soft-lg border border-theme-border">
              {!isSubmitted ? (
                <>
                  <h2 className="text-3xl font-bold mb-8 text-theme-text flex items-center gap-3">
                    Send a Message <Send size={24} className="text-primary-600" />
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className={formLabelClass}>Full Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" className={formInputClass} required />
                      </div>
                      <div>
                        <label className={formLabelClass}>Phone Number</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter your phone number" className={formInputClass} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className={formLabelClass}>Email Address</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="email@example.com" className={formInputClass}  />
                      </div>
                      <div>
                        <label className={formLabelClass}>Inquiry Type</label>
                        <select name="messageType" value={formData.messageType} onChange={handleChange} className={formInputClass}>
                          <option value="GENERAL_ENQUIRY">General Enquiry</option>
                          <option value="PRAYER_REQUEST">Prayer Request</option>
                          <option value="MINISTRY_INFO">Ministry Information</option>
                          <option value="FEEDBACK">Feedback</option>
                        </select>
                      </div>
                    </div>

                    {/* Conditional Toggle for Prayer Requests */}
                  

                    <div>
                      <label className={formLabelClass}>Your Message</label>
                      <textarea name="message" value={formData.message} onChange={handleChange} rows={5} placeholder="Write your message here..." className={formInputClass} required></textarea>
                    </div>

                    {/* Error Feedback */}
                    {error && (
                      <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-xl">
                        <p className="text-red-600 dark:text-red-400 text-sm font-medium">
                          {error.response?.data?.message || "There was an error sending your message. Please try again."}
                        </p>
                      </div>
                    )}

                    <button 
                      type="submit" 
                      disabled={isPending} 
                      className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isPending ? (
                        <>
                          <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                          Sending...
                        </>
                      ) : (
                        "Submit Inquiry"
                      )}
                    </button>
                  </form>
                </>
              ) : (
                /* Success State */
                <div className="text-center py-12 animate-in zoom-in duration-300">
                  <div className="bg-green-100 dark:bg-green-900/30 text-green-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                    <Check size={48} strokeWidth={3} />
                  </div>
                  <h2 className="text-4xl font-bold mb-4 text-theme-text">Message Sent!</h2>
                  <p className="text-theme-muted mb-8 text-lg">Thank you for reaching out. We will get back to you soon.</p>
                  <button onClick={() => setIsSubmitted(false)} className="px-8 py-3 bg-theme-base border border-theme-border text-theme-text rounded-xl font-semibold hover:bg-theme-border transition-colors">
                    Send Another Message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;