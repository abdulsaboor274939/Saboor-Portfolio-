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
            {portfolio.socials.github && (
              <a
                href={portfolio.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border border-cyan-500/20 bg-slate-900 text-slate-300 hover:text-cyan-300 hover:border-cyan-400 transition-all"
              >
                <Github className="w-4 h-4" />
              </a>
            )}

            {portfolio.socials.linkedin && (
              <a
                href={portfolio.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border border-cyan-500/20 bg-slate-900 text-slate-300 hover:text-cyan-300 hover:border-cyan-400 transition-all"
              >
                <Linkedin className="w-4 h-4" />
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
