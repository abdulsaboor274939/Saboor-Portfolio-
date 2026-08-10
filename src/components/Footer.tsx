import React from 'react';
import { ArrowUp, Sparkles } from 'lucide-react';
import { PortfolioData } from '../types';

interface FooterProps {
  portfolio: PortfolioData;
  isDarkMode: boolean;
}

export const Footer: React.FC<FooterProps> = ({ portfolio }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-stone-200 dark:border-stone-800 bg-[#f8f7f4] dark:bg-stone-950 text-stone-700 dark:text-stone-300 py-12 relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left info */}
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-9 h-9 rounded-full bg-stone-950 dark:bg-white text-white dark:text-stone-950 flex items-center justify-center font-serif-italic font-bold text-sm">
              M
            </div>
            <div>
              <div className="font-syne font-bold text-sm text-stone-950 dark:text-white uppercase tracking-wider">
                {portfolio.name}
              </div>
              <div className="text-xs text-amber-600 dark:text-amber-400 font-semibold">
                {portfolio.title}
              </div>
            </div>
          </div>

          {/* Copyright notice */}
          <div className="text-xs text-center text-stone-500 dark:text-stone-400 font-normal">
            © {new Date().getFullYear()} {portfolio.name}. Built with React, TypeScript & Madison Editorial Design.
          </div>

          {/* Socials & Top Button */}
          <div className="flex items-center gap-3">
            {portfolio.socials.tiktok && (
              <a
                href={portfolio.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                title="TikTok Profile (@malik_abdulsaboor)"
                className="px-3 py-1.5 rounded-full border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs font-bold hover:bg-stone-100 transition-all"
              >
                TikTok
              </a>
            )}

            {portfolio.socials.snapchat && (
              <a
                href={portfolio.socials.snapchat}
                target="_blank"
                rel="noopener noreferrer"
                title="Snapchat Profile (saboor.01)"
                className="px-3 py-1.5 rounded-full border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs font-bold hover:bg-stone-100 transition-all"
              >
                Snapchat
              </a>
            )}

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-full bg-stone-950 dark:bg-white text-white dark:text-stone-950 hover:bg-amber-600 dark:hover:bg-amber-400 transition-all shadow-xs"
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
