import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white border-t border-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Main footer content */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-8">
          {/* About Last.fm */}
          <div>
            <h3 className="font-semibold text-sm mb-3">About Last.fm</h3>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">About us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Jobs</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-sm mb-3">Company</h3>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Terms of Use</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Legal Policies</a></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold text-sm mb-3">Community</h3>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Guidelines</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Help</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
            </ul>
          </div>

          {/* Goodies */}
          <div>
            <h3 className="font-semibold text-sm mb-3">Goodies</h3>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Download Scrobbler</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Developer API</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Free Music Downloads</a></li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="font-semibold text-sm mb-3">Follow Us</h3>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-white transition-colors">YouTube</a></li>
            </ul>
          </div>

          {/* Mobile Apps */}
          <div>
            <h3 className="font-semibold text-sm mb-3">Mobile Apps</h3>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">iOS App</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Android App</a></li>
            </ul>
          </div>
        </div>

        {/* Language selector and copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-4 border-t border-gray-800">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <span className="text-xs text-gray-400">English:</span>
            <div className="flex flex-wrap gap-2 text-xs text-gray-400">
              <a href="#" className="hover:text-white">Deutsch</a>
              <a href="#" className="hover:text-white">Español</a>
              <a href="#" className="hover:text-white">Français</a>
              <a href="#" className="hover:text-white">Italiano</a>
              <a href="#" className="hover:text-white">Polski</a>
              <a href="#" className="hover:text-white">Português</a>
              <a href="#" className="hover:text-white">Русский</a>
              <a href="#" className="hover:text-white">Svenska</a>
              <a href="#" className="hover:text-white">Türkçe</a>
              <a href="#" className="hover:text-white">日本語</a>
              <a href="#" className="hover:text-white">中文</a>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-xs text-gray-400">
              Audioscrobbler
            </span>
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
              <span className="text-black font-bold text-xs">CBS</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;