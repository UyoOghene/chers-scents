import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiHeart, FiInstagram, FiFacebook, FiTwitter } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-chers-pink relative mt-24">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-chers-gold/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand Column - Larger */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block mb-6">
              <img 
                src="/images/logonew.png" 
                alt="Chers-Scents" 
                className="h-16 md:h-20 w-auto brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-white/80 text-sm leading-relaxed mb-6 max-w-sm">
              Luxury fragrances crafted with passion and precision. Each bottle tells a unique story of elegance and sophistication.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {[
                { icon: FiInstagram, label: 'Instagram' },
                { icon: FiFacebook, label: 'Facebook' },
                { icon: FiTwitter, label: 'Twitter' },
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white/80 hover:bg-white hover:text-chers-pink transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <social.icon className="text-lg group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-serif text-xl text-white mb-6 relative inline-block">
              Explore
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-chers-gold/50"></span>
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Our Story', path: '/story' },
                { name: 'Blog', path: '/blog' },
                { name: 'Careers', path: '/careers' },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-white/70 hover:text-white transition-colors duration-300 text-sm flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-chers-gold group-hover:mr-2 transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="lg:col-span-2">
            <h4 className="font-serif text-xl text-white mb-6 relative inline-block">
              Support
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-chers-gold/50"></span>
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'Contact Us', path: '/contact' },
                { name: 'FAQ', path: '/faq' },
                { name: 'Shipping', path: '/shipping' },
                { name: 'Returns', path: '/returns' },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-white/70 hover:text-white transition-colors duration-300 text-sm flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-chers-gold group-hover:mr-2 transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="lg:col-span-4">
            {/* Contact Info */}
            <div className="mb-8">
              <h4 className="font-serif text-xl text-white mb-6 relative inline-block">
                Get in Touch
                <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-chers-gold/50"></span>
              </h4>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3 text-white/80 hover:text-white transition-colors group">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-chers-gold/20 transition-colors">
                    <FiPhone className="text-sm" />
                  </div>
                  <span className="text-sm">+33 1 23 45 67 89</span>
                </li>
                <li className="flex items-center space-x-3 text-white/80 hover:text-white transition-colors group">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-chers-gold/20 transition-colors">
                    <FiMail className="text-sm" />
                  </div>
                  <span className="text-sm">hello@chers-scents.com</span>
                </li>
                <li className="flex items-center space-x-3 text-white/80 hover:text-white transition-colors group">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-chers-gold/20 transition-colors">
                    <FiMapPin className="text-sm" />
                  </div>
                  <span className="text-sm">45 Rue de la Paix, Paris 75002</span>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-serif text-lg text-white mb-3">Join the Club</h4>
              <p className="text-white/60 text-xs mb-4">Subscribe for exclusive offers and new arrivals</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:border-chers-gold text-white placeholder-white/40 text-sm backdrop-blur-sm"
                  />
                </div>
                <button className="bg-chers-gold text-chers-charcoal px-6 py-3 rounded-md hover:bg-white hover:text-chers-pink transition-all duration-300 font-medium text-sm whitespace-nowrap flex items-center justify-center space-x-2 group">
                  <span>Subscribe</span>
                  <FiHeart className="group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/60 text-xs">
              &copy; {new Date().getFullYear()} Chers-Scents. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-white/60 hover:text-white text-xs transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/5 to-transparent pointer-events-none"></div>
    </footer>
  );
};

export default Footer;