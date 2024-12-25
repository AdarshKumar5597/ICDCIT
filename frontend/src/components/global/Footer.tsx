import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-12">
            <div className="col-span-2 md:col-span-3 lg:col-span-1 space-y-6">
              <div className="text-2xl font-bold">HealthCare</div>
              <p className="text-blue-200 text-sm">
                Revolutionizing healthcare access through technology.
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="text-blue-200 hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-blue-200 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-blue-200 hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-blue-200 hover:text-white transition-colors">
                  <Youtube className="w-5 h-5" />
                </Link>
              </div>
            </div>

            <div className="hidden md:block">
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li><Link href="#" className="text-blue-200 hover:text-white transition-colors">Find a Doctor</Link></li>
                <li><Link href="#" className="text-blue-200 hover:text-white transition-colors">Book Appointment</Link></li>
                <li><Link href="#" className="text-blue-200 hover:text-white transition-colors">Health Feed</Link></li>
              </ul>
            </div>

            <div className="hidden md:block">
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-3">
                <li><Link href="#" className="text-blue-200 hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="#" className="text-blue-200 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="text-blue-200 hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1">
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-blue-200">
                  <Mail className="w-5 h-5" />
                  <span>support@healthcare.com</span>
                </li>
                <li className="flex items-center gap-3 text-blue-200">
                  <Phone className="w-5 h-5" />
                  <span>1-800-HEALTH</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="hidden md:block border-t border-blue-900 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h4 className="text-lg font-semibold">Subscribe to our newsletter</h4>
            </div>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-l-lg bg-blue-900 text-white placeholder-blue-300 border-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
              <button className="px-6 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-900 py-6">
          <div className="text-center md:text-left text-blue-200 text-sm">
            © {currentYear} HealthCare. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;