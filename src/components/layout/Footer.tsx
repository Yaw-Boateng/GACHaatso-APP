import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import Logo from '../ui/Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8">
          {/* Church Info */}
          <div>
            <div className="mb-4">
              <Logo color="white" />
            </div>
            <p className="text-neutral-300 mb-6">
              A place of worship, community, and spiritual growth where all are welcome.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-white hover:text-secondary-500 transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" className="text-white hover:text-secondary-500 transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://youtube.com" className="text-white hover:text-secondary-500 transition-colors" aria-label="Youtube">
                <Youtube size={20} />
              </a>
              <a href="https://twitter.com" className="text-white hover:text-secondary-500 transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-neutral-300 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/sermons" className="text-neutral-300 hover:text-white transition-colors">Sermons</Link>
              </li>
              <li>
                <Link to="/events" className="text-neutral-300 hover:text-white transition-colors">Events</Link>
              </li>
              <li>
                <Link to="/giving" className="text-neutral-300 hover:text-white transition-colors">Give</Link>
              </li>
              <li>
                <Link to="/contact" className="text-neutral-300 hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Service Times */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Service Times</h4>
            <ul className="space-y-3">
              <li className="text-neutral-300">
                <span className="block font-medium text-white">Sunday Service</span>
                9:00 AM & 11:00 AM
              </li>
              <li className="text-neutral-300">
                <span className="block font-medium text-white">Wednesday Bible Study</span>
                7:00 PM
              </li>
              <li className="text-neutral-300">
                <span className="block font-medium text-white">Youth Service</span>
                Friday 6:00 PM
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-secondary-500 mt-1 flex-shrink-0" />
                <span className="text-neutral-300">123 Church Street<br />Harbor City, NY 10001</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-secondary-500 flex-shrink-0" />
                <a href="tel:+12345678900" className="text-neutral-300 hover:text-white transition-colors">
                  (234) 567-8900
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-secondary-500 flex-shrink-0" />
                <a href="mailto:info@graceharbor.church" className="text-neutral-300 hover:text-white transition-colors">
                  info@graceharbor.church
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section / Copyright */}
        <div className="pt-8 border-t border-primary-800 text-center text-neutral-400 text-sm">
          <p>&copy; {currentYear} Grace Harbor Church. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-4">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;