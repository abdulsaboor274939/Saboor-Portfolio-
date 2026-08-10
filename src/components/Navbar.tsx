import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X,
  FileText,
  Edit,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { PortfolioData } from '../types';

interface NavbarProps {
  portfolio: PortfolioData;
  onOpenEdit: () => void;
  onOpenResume: () => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  portfolio,
  onOpenEdit,
  onOpenResume,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['about', 'brands', 'projects', 'services', 'skills', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '#about', id: 'about' },
    { name: 'PROJECTS', href: '#projects', id: 'projects' },
    { name: 'SHOWCASE', href: '#services', id: 'services' },
    { name: 'SKILLS & PROCESS', href: '#skills', id: 'skills' },
    { name: 'EXPERIENCE', href: '#experience', id: 'experience' },
    { name: 'CONTACT', href: '#contact', id: 'contact' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      id="main-nav-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#080808]/90 backdrop-blur-xl border-b border-neutral-900 py-3 shadow-2xl'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Bar matching Reference */}
        <div className="flex items-center justify-between pb-2 border-b border-neutral-900/80">
          <div className="flex items-center gap-2">
            <span className="font-bebas text-sm sm:text-base tracking-widest text-neutral-400">
              VIDEO EDITOR & DIGITAL MEDIA CREATOR
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-bold tracking-wider text-red-500 uppercase">
            <Sparkles className="w-3.5 h-3.5 fill-red-500 text-red-500" />
            <span>AVAILABLE FOR FREELANCE & CONTRACTS</span>
          </div>
        </div>

        {/* Main Navbar Links */}
        <div className="flex items-center justify-between pt-3">
          
          {/* Logo Name - Adjusted for mobile view to prevent duplication with Hero headline */}
          <a
            href="#about"
            onClick={(e) => scrollToSection(e, '#about')}
            className="group focus:outline-none flex items-center gap-2.5"
            id="nav-logo-link"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-600 to-red-800 text-white font-bebas font-black text-xl flex items-center justify-center shadow-lg shadow-red-600/30 border border-red-500/50 group-hover:scale-105 transition-transform">
              AS
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-bebas font-black text-2xl sm:text-3xl tracking-wide text-white group-hover:text-red-500 transition-colors leading-none text-3d-white">
                ABDUL SABOOR
              </span>
              <span className="text-[9px] font-bebas tracking-widest text-neutral-400 -mt-1">
                CREATIVE DIRECTOR
              </span>
            </div>
            {/* Mobile-only subtle label */}
            <span className="sm:hidden font-bebas font-bold text-lg text-neutral-200 tracking-wider">
              PORTFOLIO
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8" id="desktop-nav">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  id={`nav-link-${link.id}`}
                  className={`font-bebas text-sm tracking-widest transition-all duration-200 ${
                    isActive
                      ? 'text-red-500 font-bold border-b-2 border-red-500 pb-0.5'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Actions & Buttons */}
          <div className="flex items-center gap-2 sm:gap-3" id="nav-actions">
            
            {/* Resume Button */}
            <button
              onClick={onOpenResume}
              id="view-resume-btn"
              className="hidden lg:flex items-center gap-1.5 font-bebas text-xs tracking-wider px-4 py-2 rounded-lg border border-neutral-800 bg-neutral-900/80 text-neutral-200 hover:border-red-600 hover:text-white transition-all"
            >
              <FileText className="w-3.5 h-3.5 text-red-500" />
              <span>RESUME</span>
            </button>

            {/* Edit Portfolio Button */}
            <button
              onClick={onOpenEdit}
              id="edit-portfolio-nav-btn"
              className="hidden sm:flex items-center gap-1.5 font-bebas text-xs tracking-wider px-4 py-2 rounded-lg border border-neutral-800 bg-neutral-900/80 text-neutral-300 hover:bg-neutral-800 transition-all"
            >
              <Edit className="w-3.5 h-3.5 text-red-500" />
              <span>EDIT</span>
            </button>

            {/* Red Action Button */}
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              id="nav-contact-btn"
              className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bebas text-sm tracking-wider transition-all shadow-lg shadow-red-600/20 flex items-center gap-1.5"
            >
              <span>LET'S TALK</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle-btn"
              className="md:hidden p-2 rounded-lg border border-neutral-800 bg-neutral-900 text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav-menu"
            className="md:hidden mt-3 p-5 rounded-2xl border border-neutral-800 bg-[#0c0c0d] text-white shadow-2xl"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl font-bebas tracking-wider text-base transition-colors ${
                      activeSection === link.id
                        ? 'bg-red-950/60 text-red-400 font-bold border border-red-800/50'
                        : 'text-neutral-300 hover:bg-neutral-900'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-4 h-4 text-red-500" />
                  </a>
                );
              })}

              <div className="pt-3 mt-2 border-t border-neutral-800 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenResume();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bebas text-sm border border-neutral-800 text-neutral-200 bg-neutral-900"
                >
                  <FileText className="w-4 h-4 text-red-500" />
                  VIEW RESUME
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenEdit();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bebas text-sm bg-red-600 text-white"
                >
                  <Edit className="w-4 h-4" />
                  EDIT PORTFOLIO
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

