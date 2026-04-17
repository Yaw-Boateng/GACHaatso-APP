import { useState } from "react";
import {
  DollarSign,
  Repeat,
  Heart,
  TrendingUp,
  Calendar,
  Gift,
  Lock,
} from "lucide-react";
import { usePaystackPayment } from "react-paystack";

// Replace with your actual public key
const PAYSTACK_PUBLIC_KEY = 'pk_test_ff520cd308000321d87b59787847d62b836f2872';

const givingOptions = [
  {
    id: "tithe",
    title: "Tithe",
    description: "Regular giving of 10% of your income.",
    icon: <DollarSign size={20} className="text-primary-600" />,
  },
  {
    id: "missions",
    title: "Missions",
    description: "Support local and global outreach.",
    icon: <Heart size={20} className="text-primary-600" />,
  },
  {
    id: "building",
    title: "Building Fund",
    description: "Facility maintenance and expansion.",
    icon: <TrendingUp size={20} className="text-primary-600" />,
  },
  {
    id: "seeds",
    title: "Special Seed",
    description: "Occasional free-will offerings.",
    icon: <Gift size={20} className="text-primary-600" />,
  },
];

const GivingPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedOption, setSelectedOption] = useState("tithe");
  const [reference, setReference] = useState("");

  const currency = 'GHS';

  const paystackConfig = {
    reference: reference || new Date().getTime().toString(),
    email: email,
    amount: Number(amount) * 100, // Convert to pesewas
    publicKey: PAYSTACK_PUBLIC_KEY,
    currency: currency,
    metadata: {
      custom_fields: [
        { display_name: "Donor Name", variable_name: "donor_name", value: name },
        { display_name: "Giving Type", variable_name: "giving_type", value: selectedOption }
      ]
    }
  };

  const initializePayment = usePaystackPayment(paystackConfig);

  const onSuccess = (transaction) => {
    alert(`Thank you ${name}! Your gift of ${currency} ${amount} was successful.`);
    setName('');
    setEmail('');
    setAmount('');
    setSelectedOption('tithe');
  };

  const onClose = () => {
    alert("Transaction was not completed.");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !amount || !name) {
      alert('Please fill in all required fields.');
      return;
    }
    const newReference = new Date().getTime().toString();
    setReference(newReference);
    initializePayment(onSuccess, onClose);
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-[#0a0f1a] transition-colors duration-300 pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary-700 dark:bg-primary-900 text-white transition-colors">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-neutral-300 hover:text-white">Generous Giving</h1>
            <p className="text-lg text-white/80">Support our mission to impact lives through your faithful giving.</p>
          </div>
        </div>
      </section>

      {/* Form Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid lg:grid-cols-5 gap-12 items-start">
            
            {/* Context Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-serif font-bold mb-4 text-primary-800 dark:text-primary-400">Secure Giving</h2>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Your donation is securely processed via Paystack. We do not store your card details.
                </p>
              </div>
              <div className="p-6 bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-neutral-100 dark:border-neutral-800">
                <blockquote className="text-neutral-700 dark:text-neutral-300 italic mb-2">
                  "For God loves a cheerful giver."
                </blockquote>
                <cite className="text-sm text-neutral-500">— 2 Corinthians 9:7</cite>
              </div>
            </div>

            {/* Giving Form */}
            <div className="lg:col-span-3">
              <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl shadow-xl border border-neutral-100 dark:border-neutral-800">
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Name Input */}
                  <div>
                    <label className="block mb-2 font-medium text-neutral-700 dark:text-neutral-300">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-lg border dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-primary-500 outline-none transition"
                      required
                    />
                  </div>

                  {/* Email Input - Necessary for Paystack */}
                  <div>
                    <label className="block mb-2 font-medium text-neutral-700 dark:text-neutral-300">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-lg border dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-primary-500 outline-none transition"
                      required
                    />
                  </div>

                  {/* Amount Input */}
                  <div>
                    <label className="block mb-2 font-medium text-neutral-700 dark:text-neutral-300">Giving Amount ({currency})</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 font-bold">₵</span>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full pl-10 pr-4 py-3 rounded-lg border dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-primary-500 outline-none transition"
                        required
                      />
                    </div>
                  </div>

                  {/* Type of Giving (Grid Options) */}
                  <div>
                    <label className="block mb-3 font-medium text-neutral-700 dark:text-neutral-300">Type of Giving</label>
                    <div className="grid grid-cols-2 gap-3">
                      {givingOptions.map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => setSelectedOption(option.id)}
                          className={`flex flex-col items-center p-3 rounded-xl border text-center transition-all ${
                            selectedOption === option.id
                              ? "border-primary-600 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 ring-2 ring-primary-600"
                              : "border-neutral-200 dark:border-neutral-700 hover:border-primary-300 text-neutral-600 dark:text-neutral-400"
                          }`}
                        >
                          <span className="mb-1">{option.icon}</span>
                          <span className="text-sm font-semibold">{option.title}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={!email || !amount || !name}
                    className="w-full py-4 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 dark:disabled:bg-neutral-800 text-white font-bold rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Lock size={18} />
                    Proceed to Pay {amount ? `${currency} ${amount}` : ""}
                  </button>

                  <p className="text-center text-xs text-neutral-500 dark:text-neutral-600">
                    Secure 256-bit encrypted payment via Paystack
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GivingPage;