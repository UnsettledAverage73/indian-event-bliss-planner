
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-wedding-softgray to-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="font-playfair text-2xl font-bold bg-gradient-to-r from-wedding-pink to-wedding-gold bg-clip-text text-transparent mb-4">
              EventBliss
            </h3>
            <p className="text-gray-600 mb-4">
              Making your special moments magical with perfect planning and execution.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-wedding-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-wedding-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-wedding-gold transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-wedding-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/event-type" className="text-gray-600 hover:text-wedding-gold transition-colors">
                  Plan Event
                </Link>
              </li>
              <li>
                <Link to="/vendor-listing" className="text-gray-600 hover:text-wedding-gold transition-colors">
                  Vendors
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-wedding-gold transition-colors">
                  About Us``
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="text-gray-600">
                A09, SV Hostel, SSGMCE, Shegaon
              </li>
              <li className="text-gray-600">
                ssgm_308217@ssgmce.ac.in
              </li>
              <li className="text-gray-600">
                +91 9637843011
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-4">Subscribe to Newsletter</h4>
            <p className="text-gray-600 mb-4">
              Get updates on new vendors and exclusive offers.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-l-md w-full border focus:outline-none focus:ring-1 focus:ring-wedding-gold"
              />
              <button
                type="submit"
                className="bg-wedding-gold text-white px-4 py-2 rounded-r-md hover:opacity-90 transition-all"
              >
                <Mail size={20} />
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-500">
          <p>© {new Date().getFullYear()} EventBliss. All rights reserved.</p>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-500">
          <p>Developed by <a href="https://github.com/atharvapatil1210" target="_blank" className="text-wedding-gold hover:text-wedding-gold-dark transition-colors">Atharva❤️</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
