import { useState } from "react";
import {
  DollarSign,
  Repeat,
  Heart,
  TrendingUp,
  Calendar,
  Gift,
} from "lucide-react";
import { usePaystackPayment } from "react-paystack";

// Replace with your actual public key
const PAYSTACK_PUBLIC_KEY = 'pk_test_ff520cd308000321d87b59787847d62b836f2872'; 

// Mock giving options
const givingOptions = [
  {
    id: "tithe",
    title: "Tithe",
    description:
      "Regular giving of 10% of your income to support the church's ongoing ministries and operations.",
    icon: <DollarSign size={24} className="text-primary-600" />,
  },
  {
    id: "recurring",
    title: "Recurring Giving",
    description:
      "Set up automatic weekly or monthly donations to provide consistent support.",
    icon: <Repeat size={24} className="text-primary-600" />,
  },
  {
    id: "missions",
    title: "Missions & Outreach",
    description:
      "Support our local and global missions initiatives and community outreach programs.",
    icon: <Heart size={24} className="text-primary-600" />,
  },
  {
    id: "building",
    title: "Building Fund",
    description:
      "Contribute to our facility maintenance, improvements, and expansion projects.",
    icon: <TrendingUp size={24} className="text-primary-600" />,
  },
];

const GivingPage = () => {
  // State for form fields
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(""); // Amount in your currency (e.g., Naira)
  const [selectedOption, setSelectedOption] = useState("tithe");
  const [frequency, setFrequency] = useState("one-time");

  // State to store the transaction reference
  const [reference, setReference] = useState("");

  // Determine currency based on your merchant account setup
  // If your Paystack account is Nigerian, use 'NGN'. If it's Ghanaian, use 'GHS'.
  // You can also get this from a .env file or a global config.
// Change this line
const currency = 'GHS'; // Your Paystack account's currency is GHS

  // Paystack payment configuration object
  const paystackConfig = {
    reference: reference, // Use the dynamically set reference
    email: email,
    amount: Number(amount) * 100, // Convert to kobo/pesewas
    publicKey: PAYSTACK_PUBLIC_KEY,
    currency: currency, // Add the currency to the config
  };

  // Initialize the usePaystackPayment hook
  const initializePayment = usePaystackPayment(paystackConfig);

  // Callback function on successful payment
  const onSuccess = (transaction) => {
    // This is where you would typically verify the payment on your backend
    console.log("Payment successful! Transaction reference:", transaction.reference);
    alert(`Payment of ${amount} successful! Thank you for your generous gift to ${selectedOption}.`);
    // Reset form fields after successful payment
    setEmail('');
    setAmount('');
    setSelectedOption('tithe');
    setFrequency('one-time');
  };

  // Callback function if the payment modal is closed
  const onClose = () => {
    console.log("Payment modal closed.");
    alert("Payment was not completed. You can try again.");
  };

  // Handle amount input change
  const handleAmountChange = (e) => {
    const value = e.target.value;
    // Allow only numbers and a single decimal point
    if (value === "" || /^\d*\.?\d{0,2}$/.test(value)) {
      setAmount(value);
    }
  };

  // Handle giving option change
  const handleGivingOptionChange = (id) => {
    setSelectedOption(id);
  };

  // Handle frequency change
  const handleFrequencyChange = (value) => {
    setFrequency(value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure email and amount are provided
    if (!email || !amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid email and amount.');
      return;
    }

    // Generate a unique reference before initiating the payment
    const newReference = new Date().getTime().toString();
    setReference(newReference);

    // This will trigger the Paystack payment modal
    initializePayment(onSuccess, onClose);
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-24 bg-primary-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-white">
              Give to Support Our Mission
            </h1>
            <p className="text-xl mb-0 text-white/90">
              Your generosity enables us to share God's love through ministry,
              outreach, and community service.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left Content */}
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-serif font-bold mb-6 text-primary-800">
                Why We Give
              </h2>
              <p className="text-lg text-neutral-700 mb-6">
                At Grace Harbor Church, we believe that giving is an act of
                worship and an expression of faith. Scripture teaches us that
                everything we have comes from God, and we are called to be good
                stewards of these blessings.
              </p>
              <p className="text-lg text-neutral-700 mb-6">
                Your faithful giving supports:
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="p-2 bg-primary-50 rounded-full mr-4 mt-1">
                    <Calendar size={20} className="text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary-700">
                      Weekly Services & Ministry Programs
                    </h3>
                    <p className="text-neutral-600">
                      From worship services to small groups, youth activities,
                      and more.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-2 bg-primary-50 rounded-full mr-4 mt-1">
                    <Heart size={20} className="text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary-700">
                      Community Outreach
                    </h3>
                    <p className="text-neutral-600">
                      Food drives, resource centers, counseling services, and
                      other programs that serve our local community.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="p-2 bg-primary-50 rounded-full mr-4 mt-1">
                    <Gift size={20} className="text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary-700">
                      Global Missions
                    </h3>
                    <p className="text-neutral-600">
                      Supporting missionaries and projects around the world that
                      share God's love.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-50 p-6 rounded-xl mb-8">
                <h3 className="font-bold text-primary-700 mb-2">
                  Biblical Perspective on Giving
                </h3>
                <p className="text-neutral-600 mb-4">
                  "Each of you should give what you have decided in your heart
                  to give, not reluctantly or under compulsion, for God loves a
                  cheerful giver."
                </p>
                <p className="text-sm text-neutral-500">
                  2 Corinthians 9:7 (NIV)
                </p>
              </div>

              <h3 className="font-bold text-primary-700 mb-2">
                Other Ways to Give
              </h3>
              <p className="text-neutral-600 mb-4">
                In addition to online giving, you can also give through:
              </p>
              <ul className="list-disc list-inside text-neutral-600 space-y-2 mb-6">
                <li>In-person during Sunday services</li>
                <li>
                  Check by mail to: 123 Church Street, Harbor City, NY 10001
                </li>
                <li>Bank transfer (contact our finance office for details)</li>
                <li>Planned giving and estate planning</li>
              </ul>
              <p className="text-neutral-600">
                If you have questions about giving, please contact our finance
                team at finance@graceharbor.church or call (234) 567-8900.
              </p>
            </div>

            {/* Right Content - Giving Form */}
            <div className="lg:w-1/2">
              <div className="bg-white p-8 rounded-xl shadow-soft">
                <h2 className="text-2xl font-serif font-bold mb-6 text-primary-800">
                  Give Online
                </h2>

                <form onSubmit={handleSubmit}>
                  {/* Amount */}
                  <div className="mb-6">
                    <label
                      htmlFor="amount"
                      className="block mb-2 font-medium text-neutral-700"
                    >
                      Amount ({currency})
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-neutral-500">$</span>
                      </div>
                      <input
                        type="text"
                        id="amount"
                        value={amount}
                        onChange={handleAmountChange}
                        placeholder="0.00"
                        className="pl-8 w-full px-4 py-3 rounded-md border border-neutral-300 focus:ring-2 focus:ring-primary-200 focus:border-primary-600 transition"
                        required
                      />
                    </div>
                  </div>

                  {/* Quick Amount Buttons */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {[10, 25, 50, 100, 250, 500].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setAmount(value.toString())}
                        className={`px-4 py-2 rounded-md text-sm transition ${
                          amount === value.toString()
                            ? "bg-primary-600 text-white"
                            : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                        }`}
                      >
                        ${value}
                      </button>
                    ))}
                  </div>

                  {/* Email Input */}
                  <div className="mb-6">
                    <label
                      htmlFor="email"
                      className="block mb-2 font-medium text-neutral-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 rounded-md border border-neutral-300 focus:ring-2 focus:ring-primary-200 focus:border-primary-600 transition"
                      required
                    />
                  </div>

                  {/* Giving Options */}
                  <div className="mb-6">
                    <label className="block mb-2 font-medium text-neutral-700">
                      Select Fund
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {givingOptions.map((option) => (
                        <div
                          key={option.id}
                          onClick={() => handleGivingOptionChange(option.id)}
                          className={`border rounded-lg p-4 cursor-pointer transition ${
                            selectedOption === option.id
                              ? "border-primary-600 bg-primary-50"
                              : "border-neutral-200 hover:border-primary-300"
                          }`}
                        >
                          <div className="flex items-center mb-2">
                            {option.icon}
                            <h4 className="font-medium ml-2">{option.title}</h4>
                          </div>
                          <p className="text-sm text-neutral-600">
                            {option.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Frequency */}
                  <div className="mb-6">
                    <label className="block mb-2 font-medium text-neutral-700">
                      Frequency
                    </label>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => handleFrequencyChange("one-time")}
                        className={`flex-1 px-4 py-2 rounded-md transition ${
                          frequency === "one-time"
                            ? "bg-primary-600 text-white"
                            : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                        }`}
                      >
                        One-time
                      </button>
                      <button
                        type="button"
                        onClick={() => handleFrequencyChange("weekly")}
                        className={`flex-1 px-4 py-2 rounded-md transition ${
                          frequency === "weekly"
                            ? "bg-primary-600 text-white"
                            : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                        }`}
                      >
                        Weekly
                      </button>
                      <button
                        type="button"
                        onClick={() => handleFrequencyChange("monthly")}
                        className={`flex-1 px-4 py-2 rounded-md transition ${
                          frequency === "monthly"
                            ? "bg-primary-600 text-white"
                            : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                        }`}
                      >
                        Monthly
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full btn btn-primary text-lg py-4"
                    disabled={!email || !amount || parseFloat(amount) <= 0}
                    style={{
                      backgroundColor: '#0066f5',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      padding: '12px 24px',
                      fontSize: '18px',
                      opacity: (!email || !amount || parseFloat(amount) <= 0) ? 0.6 : 1,
                    }}
                  >
                    Give {amount && `$${amount}`}
                  </button>

                  {/* Secure Payment Note */}
                  <p className="text-center text-sm text-neutral-500 mt-4 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    Secure payment processed by Paystack
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold mb-12 text-primary-800 text-center">
            Impact Stories
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-xl shadow-soft">
              <div className="mb-4">
                <svg
                  className="text-secondary-500 h-8 w-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-neutral-700 mb-6">
                "Through the church's food pantry, we were able to feed over 200
                families during the holiday season. The generosity of this
                congregation has truly blessed our community."
              </p>
              <div className="flex items-center">
                <div className="font-medium">
                  <p className="text-primary-700">Sarah M.</p>
                  <p className="text-neutral-500 text-sm">
                    Outreach Coordinator
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-xl shadow-soft">
              <div className="mb-4">
                <svg
                  className="text-secondary-500 h-8 w-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-neutral-700 mb-6">
                "The youth mission trip changed my daughter's life. Thanks to
                the church's financial support, she was able to go and
                experience serving others in a profound way."
              </p>
              <div className="flex items-center">
                <div className="font-medium">
                  <p className="text-primary-700">Robert J.</p>
                  <p className="text-neutral-500 text-sm">Church Member</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-8 rounded-xl shadow-soft">
              <div className="mb-4">
                <svg
                  className="text-secondary-500 h-8 w-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-neutral-700 mb-6">
                "The financial counseling ministry helped us get out of debt and
                find financial freedom. We're so thankful for this church's
                commitment to helping people in practical ways."
              </p>
              <div className="flex items-center">
                <div className="font-medium">
                  <p className="text-primary-700">James & Lisa T.</p>
                  <p className="text-neutral-500 text-sm">Church Members</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GivingPage;