import React from 'react';
import { ArrowUp, Github, Linkedin, Twitter, Mail, Code } from 'lucide-react';
import { PortfolioData } from '../types';

interface FooterProps {
  portfolio: PortfolioData;
  isDarkMode: boolean;
}

export const Footer: React.FC<FooterProps> = ({ portfolio, isDarkMode }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-cyan-500/20 bg-[#080d1a] text-slate-300 py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left info */}
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-500/30">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-white">
                {portfolio.name}
              </div>
              <div className="text-xs text-cyan-400 font-bold">
                {portfolio.title}
              </div>
            </div>
          </div>

          {/* Copyright notice */}
          <div className="text-xs text-center text-slate-400">
            © {new Date().getFullYear()} {portfolio.name}. Built with React, TypeScript & Tailwind CSS.
          </div>

          {/* Socials & Top Button */}
          <div className="flex items-center gap-3">
            {portfolio.socials.tiktok && (
              <a
                href={portfolio.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                title="TikTok Profile (@malik_abdulsaboor)"
                className="p-2 rounded-lg border border-pink-500/30 bg-slate-900 text-pink-400 hover:text-white hover:border-pink-400 transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68 6.34 6.34 0 0 0 9.35 22a6.34 6.34 0 0 0 6.33-6.32V9.05a8.16 8.16 0 0 0 4.91 1.63V7.2a4.86 4.86 0 0 1-1-.51z"/>
                </svg>
              </a>
            )}

            {portfolio.socials.snapchat && (
              <a
                href={portfolio.socials.snapchat}
                target="_blank"
                rel="noopener noreferrer"
                title="Snapchat Profile (saboor.01)"
                className="p-2 rounded-lg border border-yellow-500/30 bg-slate-900 text-yellow-400 hover:text-white hover:border-yellow-400 transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.001 2c-3.834 0-6.19 2.812-6.19 5.894 0 1.294.462 2.766 1.134 3.655.151.2.185.385.084.588-.168.337-.89 1.713-1.077 2.05-.084.152-.034.337.118.422.336.185 1.446.404 2.085.118.252-.118.454-.084.622.101.908.992 2.068 1.48 3.224 1.48 1.156 0 2.316-.488 3.224-1.48.168-.185.37-.219.622-.101.639.286 1.749.067 2.085-.118.152-.085.202-.27.118-.422-.187-.337-.909-1.713-1.077-2.05-.101-.203-.067-.388.084-.588.672-.889 1.134-2.361 1.134-3.655 0-3.082-2.356-5.894-6.19-5.894z"/>
                </svg>
              </a>
            )}

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl border border-cyan-500/30 bg-slate-900 text-cyan-400 hover:border-cyan-400 transition-all btn-3d-cyan"
              title="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
};
