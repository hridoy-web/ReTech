"use client";

import Link from "next/link";

import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiTwitter, FiArrowUp } from "react-icons/fi";
import Logo from "../ui/logo";

export default function Footer() {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-50 border-t border-slate-100 font-sans mt-auto">
      {/* Main Footer Content */}
      <div className="w-11/12 mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          
          {/* Column 1: Brand & About */}
          <div className="space-y-5 md:col-span-1">
            <Logo />
            <p className="text-sm text-slate-500 leading-relaxed">
              ReTech is Bangladesh premier marketplace for buying and selling verified pre-owned tech gadgets. Upgrade your setup sustainably.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-4 pt-2">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-brand-primary hover:border-brand-primary transition-all duration-200"
              >
                <FiGithub className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-brand-primary hover:border-brand-primary transition-all duration-200"
              >
                <FiLinkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-brand-primary hover:border-brand-primary transition-all duration-200"
              >
                <FiTwitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold tracking-wider text-slate-900 uppercase">Quick Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-slate-500 hover:text-brand-primary transition-colors font-medium">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/explore" className="text-slate-500 hover:text-brand-primary transition-colors font-medium">
                  Explore Tech
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-500 hover:text-brand-primary transition-colors font-medium">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-500 hover:text-brand-primary transition-colors font-medium">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Support */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold tracking-wider text-slate-900 uppercase">Legal & Help</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/privacy" className="text-slate-500 hover:text-brand-primary transition-colors font-medium">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-500 hover:text-brand-primary transition-colors font-medium">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-slate-500 hover:text-brand-primary transition-colors font-medium">
                  Help & Support
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-slate-500 hover:text-brand-primary transition-colors font-medium">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Information */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold tracking-wider text-slate-900 uppercase">Contact Us</h4>
            <ul className="space-y-3.5 text-sm text-slate-500">
              <li className="flex items-start space-x-3">
                <FiMapPin className="w-5 h-5 text-brand-primary flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">Chittagong, Bangladesh</span>
              </li>
              <li className="flex items-center space-x-3">
                <FiMail className="w-5 h-5 text-brand-primary flex-shrink-0" />
                <a href="mailto:support@retech.com" className="hover:text-brand-primary transition-colors">
                  support@retech.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <FiPhone className="w-5 h-5 text-brand-primary flex-shrink-0" />
                <a href="tel:+8801700000000" className="hover:text-brand-primary transition-colors">
                  +880 1700 000 000
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar & Copyright */}
      <div className="border-t border-slate-200/60 bg-white py-6">
        <div className="w-11/12 mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400 font-medium text-center md:text-left">
            &copy; {currentYear} ReTech. All rights reserved. Developed By Hridoy Chowdhury.
          </p>
          
          {/* Scroll to Top Button */}
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-1.5 px-4 py-2 text-xs font-bold text-slate-600 bg-slate-50 hover:bg-brand-primary hover:text-white  border border-slate-200 hover:border-brand-primary transition-all duration-350 cursor-pointer shadow-lg group"
          >
            <span>Back to top</span>
            <FiArrowUp className="w-3.5 h-3.5 transform group-hover:-translate-y-0.5 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </footer>
  );
}