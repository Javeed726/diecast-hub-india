import React from "react";
import {
  FaExternalLinkAlt,
  FaGithub,
  FaHeart,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { SiBuymeacoffee } from "react-icons/si";

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-surface-800 bg-surface-950/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Brand/Credits */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-gradient mb-2 underline decoration-brand-500/30">
              Diecast Hub India
            </h3>
            <p className="text-gray-400 text-sm">
              The ultimate directory for diecast collectors in India.
            </p>
          </div>

          {/* Core Message */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <p className="text-gray-300 flex items-center gap-2 text-sm">
              Built with{" "}
              <FaHeart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for
              the community
            </p>
            <div className="flex items-center gap-4">
              {/* Replace with your GitHub URL */}
              <a
                href="https://github.com/Javeed726"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
              >
                <FaGithub className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <span className="text-gray-400">|</span>
              {/* Replace with your BuyMeACoffee URL */}
              <a
                href="https://buymeacoffee.com/javeedfort"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-brand-400 hover:text-brand-300 transition-colors text-sm"
              >
                <SiBuymeacoffee className="w-4 h-4" />
                <span>Buy me a coffee</span>
              </a>
            </div>
          </div>

          {/* Socials/Links */}
          <div className="flex flex-col items-center md:items-end space-y-4">
            <div className="text-center md:text-right">
              <span className="text-[10px] font-black text-brand-500 uppercase tracking-[0.3em]">
                Let's Connect
              </span>
            </div>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/in/javeed-hussain-n-a85b2324b"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-surface-900 border border-white/5 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all group"
                title="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5 text-gray-400 group-hover:text-blue-400" />
              </a>
              <a
                href="https://www.instagram.com/__.javeedfort.__"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-surface-900 border border-white/5 hover:border-pink-500/50 hover:bg-pink-500/10 transition-all group"
                title="Instagram"
              >
                <FaInstagram className="w-5 h-5 text-gray-400 group-hover:text-pink-500" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-surface-900 text-center">
          <p className="text-gray-400 text-[10px] uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} · Created by Javeed Hussain
          </p>
        </div>
      </div>
    </footer>
  );
};
