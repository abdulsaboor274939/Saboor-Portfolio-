import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BrandShowcaseSection } from './components/BrandShowcaseSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';
import { EditPortfolioModal } from './components/EditPortfolioModal';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { Footer } from './components/Footer';
import { defaultPortfolioData } from './data/defaultPortfolio';
import { PortfolioData, Project } from './types';

export default function App() {
  const [portfolio, setPortfolio] = useState<PortfolioData>(() => {
    const saved = localStorage.getItem('abdulsaboor_portfolio_data_v6');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error('Failed to parse saved portfolio data', err);
      }
    }
    return defaultPortfolioData;
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedMode = localStorage.getItem('abdulsaboor_portfolio_theme');
    if (savedMode !== null) {
      return savedMode === 'dark';
    }
    return true; // Default to dark mode
  });

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Sync dark class on root document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('abdulsaboor_portfolio_theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const handleSavePortfolio = (newData: PortfolioData) => {
    setPortfolio(newData);
    localStorage.setItem('abdulsaboor_portfolio_data_v6', JSON.stringify(newData));
  };

  const handleResetPortfolio = () => {
    if (confirm('Are you sure you want to reset all portfolio data back to defaults?')) {
      setPortfolio(defaultPortfolioData);
      localStorage.removeItem('abdulsaboor_portfolio_data_v6');
    }
  };

  return (
    <div className={`min-h-screen font-sans antialiased transition-colors duration-300 ${
      isDarkMode
        ? 'bg-slate-950 text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-300'
        : 'bg-slate-50 text-slate-900 selection:bg-emerald-500/20 selection:text-emerald-800'
    }`}>
      
      {/* Navbar */}
      <Navbar
        portfolio={portfolio}
        onOpenEdit={() => setIsEditOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      {/* Main Content */}
      <main className="relative z-10">
        
        {/* Hero Section */}
        <HeroSection
          portfolio={portfolio}
          isDarkMode={isDarkMode}
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenEdit={() => setIsEditOpen(true)}
          onUpdatePortfolio={handleSavePortfolio}
        />

        {/* Brand Logos Showcase */}
        <BrandShowcaseSection isDarkMode={isDarkMode} />

        {/* Featured Projects */}
        <ProjectsSection
          projects={portfolio.projects}
          isDarkMode={isDarkMode}
          onSelectProject={(proj) => setSelectedProject(proj)}
        />

        {/* Skills & Services */}
        <SkillsSection
          portfolio={portfolio}
          isDarkMode={isDarkMode}
        />

        {/* Work Experience & Education */}
        <ExperienceSection
          portfolio={portfolio}
          isDarkMode={isDarkMode}
        />

        {/* Contact Form */}
        <ContactSection
          portfolio={portfolio}
          isDarkMode={isDarkMode}
        />

      </main>

      {/* Footer */}
      <Footer portfolio={portfolio} isDarkMode={isDarkMode} />

      {/* Modals */}
      <EditPortfolioModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        portfolio={portfolio}
        onSave={handleSavePortfolio}
        onReset={handleResetPortfolio}
        isDarkMode={isDarkMode}
      />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        isDarkMode={isDarkMode}
      />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        portfolio={portfolio}
        isDarkMode={isDarkMode}
      />

    </div>
  );
}
