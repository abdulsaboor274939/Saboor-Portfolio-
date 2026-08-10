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
    try {
      const saved = localStorage.getItem('abdulsaboor_portfolio_data_v6');
      if (saved) {
        const parsed: PortfolioData = JSON.parse(saved);
        // Repair any broken, missing, or truncated video mediaUrls in parsed state
        if (parsed.edits && Array.isArray(parsed.edits)) {
          parsed.edits = parsed.edits.map((item, idx) => {
            const defaultItem = defaultPortfolioData.edits.find(d => d.id === item.id) || defaultPortfolioData.edits[idx] || defaultPortfolioData.edits[0];
            const url = item.mediaUrl || '';
            const isVideo = item.type === 'video' || item.type === 'reel' || item.type === 'motion';

            if (isVideo && (!url || url.endsWith('...') || url.includes('dQw4w9WgXcQ') || (url.startsWith('data:') && url.length < 500))) {
              return {
                ...item,
                mediaUrl: defaultItem?.mediaUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
              };
            }
            return item;
          });
        }
        return parsed;
      }
    } catch (err) {
      console.warn('Failed to parse saved portfolio data or access localStorage:', err);
    }
    return defaultPortfolioData;
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const savedMode = localStorage.getItem('abdulsaboor_portfolio_theme');
      if (savedMode !== null) {
        return savedMode === 'dark';
      }
    } catch (err) {
      console.warn('LocalStorage error reading theme:', err);
    }
    return true; // Default to dark mode
  });

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Sync dark class on root document
  useEffect(() => {
    try {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('abdulsaboor_portfolio_theme', isDarkMode ? 'dark' : 'light');
    } catch (err) {
      console.warn('LocalStorage error writing theme:', err);
    }
  }, [isDarkMode]);

  const handleSavePortfolio = (newData: PortfolioData) => {
    setPortfolio(newData);
    try {
      localStorage.setItem('abdulsaboor_portfolio_data_v6', JSON.stringify(newData));
    } catch (err) {
      console.warn('LocalStorage storage limit reached. Keeping full data in app state.', err);
      try {
        // Fallback: store lightweight text data to localStorage so text edits persist
        const sanitizedEdits = newData.edits?.map(item => ({
          ...item,
          // Keep YouTube / HTTP links or short URLs; omit giant base64 data URLs if quota exceeded
          mediaUrl: (item.mediaUrl && item.mediaUrl.length > 200000) ? undefined : item.mediaUrl,
          thumbnailUrl: (item.thumbnailUrl && item.thumbnailUrl.length > 200000) ? undefined : item.thumbnailUrl
        }));
        const lightweightData = { ...newData, edits: sanitizedEdits };
        localStorage.setItem('abdulsaboor_portfolio_data_v6', JSON.stringify(lightweightData));
      } catch (innerErr) {
        console.warn('Could not save fallback data to localStorage:', innerErr);
      }
    }
  };

  const handleResetPortfolio = () => {
    if (confirm('Are you sure you want to reset all portfolio data back to defaults?')) {
      setPortfolio(defaultPortfolioData);
      try {
        localStorage.removeItem('abdulsaboor_portfolio_data_v6');
      } catch (err) {
        console.warn('Error removing item from localStorage:', err);
      }
    }
  };

  return (
    <div className="min-h-screen font-sans-main antialiased bg-[#080808] text-white selection:bg-red-600/30 selection:text-red-300">
      
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

      {/* Floating 3D WhatsApp Quick Contact Button */}
      <a
        href="https://wa.me/923329742260?text=Hi%20Abdul%20Saboor%2C%20I%20saw%20your%203D%20portfolio%20and%20want%20to%20discuss%20a%20project!"
        target="_blank"
        rel="noopener noreferrer"
        id="floating-whatsapp-btn"
        className="fixed bottom-6 right-6 z-50 group flex items-center gap-3 px-4 py-3 rounded-full bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white font-bebas text-sm tracking-widest shadow-[0_10px_30px_rgba(220,38,38,0.5)] border border-red-400/50 hover:scale-105 active:scale-95 transition-all duration-300 shine-overlay"
        title="Direct WhatsApp Chat with Abdul Saboor"
      >
        <span className="w-3 h-3 rounded-full bg-green-400 animate-ping" />
        <span className="hidden sm:inline">CHAT ON WHATSAPP</span>
        <span className="px-2 py-0.5 rounded-full bg-black/40 text-white text-xs border border-white/20">03329742260</span>
      </a>

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
