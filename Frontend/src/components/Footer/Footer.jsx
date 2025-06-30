import React from "react";
import {
  FaInstagram,
  FaXTwitter,
  FaFacebookF,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-black text-white px-6 py-10 mt-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-10">
        {/* Left: Logo */}
        <div className=" flex-shrink-0">
          <h1 className="text-white font-bold text-2xl mb-2">Musync</h1>

          <p className="text-sm text-[#8f8f8f]">Feel the kink with Musync</p>
        </div>

        {/* Center: Links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-sm">
          <div>
            <h4 className="font-medium md:font-semibold text-xs md:text-sm text-gray-400 uppercase mb-2">Company</h4>
            <ul className="space-y-4 font-small text-xs md:text-sm">
              <li>About</li>
              <li>Jobs</li>
              <li>For the Record</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium md:font-semibold text-xs md:text-sm text-gray-400 uppercase mb-2">Communities</h4>
            <ul className="space-y-4 font-small text-xs md:text-sm">
              <li>For Artists</li>
              <li>Developers</li>
              <li>Advertising</li>
              <li>Investors</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium md:font-semibold text-xs md:text-sm text-gray-400 uppercase mb-2">Useful Links</h4>
            <ul className="space-y-4 font-small text-xs md:text-sm">
              <li>Support</li>
              <li>Web Player</li>
              <li>Free Mobile App</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium md:font-semibold text-xs md:text-sm text-gray-400 uppercase mb-2">Plans</h4>
            <ul className="space-y-4 font-small text-xs md:text-sm">
              <li>Premium Individual</li>
              <li>Premium Family</li>
              <li>Premium Student</li>
              <li>Musync Free</li>
            </ul>
          </div>
        </div>

        {/* Right: Social Icons */}
        <div className="flex items-start gap-4">
          {[FaInstagram, FaXTwitter, FaFacebookF].map((Icon, idx) => (
            <div key={idx} className="bg-[#1a1a1a] p-3 rounded-full cursor-pointer hover:bg-white hover:text-black transition">
              <Icon size={18} />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom: Legal */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-xs text-gray-400 flex flex-col md:flex-row justify-between gap-2 items-center">
        <div className="flex gap-4 flex-wrap justify-center">
          <span>Legal</span>
          <span>Privacy Center</span>
          <span>Cookies</span>
          <span>About Ads</span>
          <span>Accessibility</span>
        </div>
        <p>🌐 India (English) © 2025 Musync</p>
      </div>
    </footer>
  );
};

export default Footer;
