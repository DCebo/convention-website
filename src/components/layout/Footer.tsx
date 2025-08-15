import Link from 'next/link';
import { getSocialLinks } from '@/config/socialLinks';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white relative overflow-hidden">


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand and Description */}
          <div className="col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              </div>
              <h3 className="text-2xl font-bold text-white">
                Collect-It-Con
              </h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your ultimate destination for TCG and sports card conventions! 
              Join our community for epic tournaments, rare card trading, and unforgettable gaming experiences.
            </p>
            <div className="mt-4 flex space-x-2">
              <span className="bg-primary/20 text-primary px-2 py-1 rounded-full text-xs font-medium">TCG</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-300 hover:text-purple-400 text-sm transition-all duration-200 hover:translate-x-1">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-purple-400 text-sm transition-all duration-200 hover:translate-x-1">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-300 hover:text-purple-400 text-sm transition-all duration-200 hover:translate-x-1">
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-purple-400 text-sm transition-all duration-200 hover:translate-x-1">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info and Social Links */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold text-white mb-4">
              Connect With Us
            </h4>
            <div className="space-y-4">
              <div className="text-gray-300 text-sm">
                <p>info@collect-it-con.com</p>
              </div>
              
              {/* Social Media Links with gaming theme */}
              <div className="flex space-x-3">
                {getSocialLinks().map((social, index) => {
                  // Define colors for each platform
                  const colors = [
                    'bg-blue-600 hover:bg-blue-700',     // Facebook
                    'bg-sky-500 hover:bg-sky-600',       // Twitter
                    'bg-purple-600 hover:bg-purple-700', // Instagram
                    'bg-red-600 hover:bg-red-700'        // Discord
                  ];
                  
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      className={`${colors[index] || 'bg-gray-600 hover:bg-gray-700'} p-3 rounded-lg transition-all duration-200 hover:scale-110 hover:rotate-3`}
                      aria-label={social.ariaLabel}
                      target={social.url !== '#' ? '_blank' : undefined}
                      rel={social.url !== '#' ? 'noopener noreferrer' : undefined}
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox={social.viewBox || '0 0 24 24'}>
                        <path d={social.icon} />
                      </svg>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with gaming elements */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Collect-It-Con. All rights reserved. Made with ❤️ for gamers.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-gray-400 hover:text-purple-400 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-purple-400 text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-gray-400 hover:text-purple-400 text-sm transition-colors">
                Code of Conduct
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;