import React, { useState } from 'react';
import { 
  Cpu, 
  Code2, 
  Sparkles, 
  Database, 
  Layout, 
  Server, 
  Terminal, 
  CheckCircle, 
  Wrench,
  Zap
} from 'lucide-react';
import { PortfolioData } from '../types';

interface SkillsSectionProps {
  portfolio: PortfolioData;
  isDarkMode: boolean;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ portfolio, isDarkMode }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return Code2;
      case 'Sparkles':
        return Sparkles;
      case 'Database':
        return Database;
      case 'Layout':
        return Layout;
      default:
        return Zap;
    }
  };

  return (
    <section id="skills" className={`py-16 md:py-24 relative overflow-hidden transition-colors ${
      isDarkMode ? 'bg-[#0b1329] text-slate-100' : 'bg-[#080d1a] text-slate-100'
    }`}>
      {/* Atmosphere Glows */}
      <div className="absolute top-1/2 left-10 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-3 bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 shadow-md">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>Core Competencies & Stack</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4 text-white">
            Technical Skills & <span className="text-cyan-shine text-glow-cyan">Services</span>
          </h2>

          <p className="text-sm sm:text-base max-w-2xl text-slate-300">
            A breakdown of technologies, frameworks, and specialized services I bring to engineering projects.
          </p>
        </div>

        {/* Skill Category Selector & Progress Bars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          
          {/* Category Tabs Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <h3 className="text-xs font-bold uppercase tracking-wider mb-1 px-1 text-cyan-400">
              Skill Domains
            </h3>

            {portfolio.skillCategories.map((cat, idx) => (
              <button
                key={cat.name}
                onClick={() => setActiveTab(idx)}
                className={`flex items-center justify-between p-4 rounded-2xl text-left transition-all ${
                  activeTab === idx
                    ? 'btn-3d-cyan'
                    : 'bg-slate-900/80 text-slate-300 border border-cyan-500/20 hover:bg-slate-800'
                }`}
              >
                <div>
                  <div className="font-bold text-sm sm:text-base">{cat.name}</div>
                  <div className={`text-xs mt-0.5 ${
                    activeTab === idx ? 'text-cyan-100' : 'text-slate-400'
                  }`}>
                    {cat.skills.length} Key Technologies
                  </div>
                </div>

                <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                  activeTab === idx
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-800 text-cyan-400'
                }`}>
                  0{idx + 1}
                </div>
              </button>
            ))}

            {/* Quick Tech Tag Cloud */}
            <div className="mt-4 p-5 rounded-2xl border border-cyan-500/20 bg-slate-900/70 backdrop-blur-md">
              <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5" />
                <span>Daily Developer Stack</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['React 19', 'TypeScript', 'Node.js', 'Express', 'Python', 'Gemini API', 'Tailwind', 'PostgreSQL', 'Docker', 'Git', 'Vite', 'Rest API'].map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-cyan-500/25 bg-slate-950 text-cyan-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Active Skill Category Progress Meters */}
          <div className="lg:col-span-8">
            <div className="p-6 sm:p-8 rounded-3xl card-3d-glass border-cyan-500/30">
              
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-cyan-500/20">
                <div>
                  <h3 className="text-xl font-black text-white">
                    {portfolio.skillCategories[activeTab]?.name}
                  </h3>
                  <p className="text-xs mt-1 text-slate-300">
                    Proficiency breakdown and functional execution experience.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {portfolio.skillCategories[activeTab]?.skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="font-bold text-slate-100">
                        {skill.name}
                      </span>
                      <span className="font-mono font-bold text-cyan-400">
                        {skill.level}%
                      </span>
                    </div>

                    {/* Progress Track */}
                    <div className="w-full h-3 rounded-full overflow-hidden bg-slate-950 border border-cyan-500/20 p-0.5">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-400 rounded-full transition-all duration-700 ease-out shadow-[0_0_12px_rgba(6,182,212,0.6)]"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>

                    {skill.description && (
                      <p className="text-xs leading-normal text-slate-300">
                        {skill.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>

        {/* Services / What I Do Grid */}
        <div className="mt-12">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-black text-white">
              Specialized Engineering Services
            </h3>
            <p className="text-xs sm:text-sm mt-1 text-slate-300">
              How I can contribute to your team, product development, or startup.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolio.services.map((service, idx) => {
              const ServiceIcon = getServiceIcon(service.icon);
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl card-3d-glass border-cyan-500/25 hover:border-cyan-400/60 transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 bg-cyan-950/80 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.25)]">
                    <ServiceIcon className="w-6 h-6" />
                  </div>

                  <h4 className="text-base font-bold mb-2 text-white">
                    {service.title}
                  </h4>

                  <p className="text-xs leading-relaxed text-slate-300">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
