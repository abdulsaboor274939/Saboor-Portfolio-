import React, { useState, useEffect } from 'react';
import { 
  Code, 
  UserCheck, 
  FolderGit2, 
  Cpu, 
  Briefcase, 
  Mail, 
  Edit, 
  FileText, 
  Sun, 
  Moon, 
  Menu, 
  X,
  Sparkles
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
  isDarkMode,
  setIsDarkMode
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['about', 'brands', 'projects', 'skills', 'experience', 'services', 'contact'];
      const scrollPosition = window.scrollY + 100;

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
    { name: 'About', href: '#about', id: 'about', icon: UserCheck },
    { name: 'Brands', href: '#brands', id: 'brands', icon: Sparkles },
    { name: 'Projects', href: '#projects', id: 'projects', icon: FolderGit2 },
    { name: 'Skills', href: '#skills', id: 'skills', icon: Cpu },
    { name: 'Experience', href: '#experience', id: 'experience', icon: Briefcase },
    { name: 'Contact', href: '#contact', id: 'contact', icon: Mail },
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
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#080d1a]/90 backdrop-blur-xl border-b border-cyan-500/20 shadow-xl shadow-black/40'
          : 'bg-transparent py-2'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo / Name */}
          <a
            href="#about"
            onClick={(e) => scrollToSection(e, '#about')}
            className="flex items-center gap-2.5 group focus:outline-none"
            id="nav-logo-link"
          >
            <div className="p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.3)] transition-transform duration-300 group-hover:scale-105">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <span className="font-black text-base sm:text-lg tracking-tight block text-white">
                {portfolio.name}
              </span>
              <span className="text-[11px] text-cyan-400 font-bold tracking-wide flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse inline-block"></span>
                {portfolio.title.split('&')[0] || 'Engineer'}
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" id="desktop-nav">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  id={`nav-link-${link.id}`}
                  className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'btn-3d-cyan text-slate-950'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Actions & Tools */}
          <div className="flex items-center gap-2 sm:gap-3" id="nav-actions">
            
            {/* Theme Toggle */}
            <button
              onClick={() => setIsDarkMode((prev) => !prev)}
              id="theme-toggle-btn"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-2.5 rounded-xl border border-cyan-500/30 bg-slate-900 text-cyan-300 hover:border-cyan-400 transition-all"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Resume Button */}
            <button
              onClick={onOpenResume}
              id="view-resume-btn"
              className="hidden sm:flex items-center gap-1.5 text-xs font-bold px-3.5 py-2.5 rounded-xl border border-cyan-500/30 bg-slate-900 text-slate-200 hover:border-cyan-400 transition-all"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Resume</span>
            </button>

            {/* Edit Portfolio Button */}
            <button
              onClick={onOpenEdit}
              id="edit-portfolio-nav-btn"
              className="btn-3d-cyan flex items-center gap-1.5 text-xs font-bold px-3.5 py-2.5 rounded-xl"
            >
              <Edit className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Edit Portfolio</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle-btn"
              className="md:hidden p-2.5 rounded-xl border border-cyan-500/30 bg-slate-900 text-cyan-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Menu Dropdown */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav-menu"
            className="md:hidden mt-2 p-4 rounded-2xl border border-cyan-500/30 bg-slate-950/95 backdrop-blur-2xl text-slate-100 shadow-2xl"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-sm transition-colors ${
                      activeSection === link.id
                        ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/30'
                        : 'text-slate-300 hover:bg-slate-900'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-cyan-400" />
                    {link.name}
                  </a>
                );
              })}

              <div className="pt-2 mt-2 border-t border-cyan-500/20 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenResume();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-bold border border-cyan-500/30 text-cyan-300 bg-slate-900"
                >
                  <FileText className="w-4 h-4 text-cyan-400" />
                  View & Print Resume
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
