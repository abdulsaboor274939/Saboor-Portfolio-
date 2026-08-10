import React from 'react';
import { Briefcase, Calendar, MapPin, ChevronRight } from 'lucide-react';
import { PortfolioData } from '../types';

interface ExperienceSectionProps {
  portfolio: PortfolioData;
  isDarkMode?: boolean;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ portfolio }) => {
  return (
    <section id="experience" className="py-20 md:py-28 relative overflow-hidden bg-[#080808] text-white transition-colors border-b border-neutral-900">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6 border-b border-neutral-900 pb-6">
          <div>
            <h2 className="font-bebas text-4xl sm:text-6xl tracking-wide uppercase text-white leading-none">
              EXPERIENCE & LEADERSHIP
            </h2>
          </div>

          <p className="text-neutral-400 text-xs sm:text-sm max-w-md font-sans-main leading-relaxed">
            Commercial track record directing video campaigns, software projects, marketing growth, and university incubators.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Work Experience Timeline Column */}
          <div className="lg:col-span-12">
            <div className="relative pl-6 sm:pl-8 border-l-2 border-neutral-900 space-y-10">
              {portfolio.experiences.map((exp) => (
                <div key={exp.id} className="relative group">
                  
                  {/* Timeline Dot */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-red-600 border-4 border-[#080808] shadow-lg shadow-red-600/50 group-hover:scale-125 transition-transform" />

                  <div className="p-6 sm:p-8 rounded-2xl bg-[#0c0c0d] border border-neutral-900 group-hover:border-red-600/50 transition-all card-3d shine-overlay shadow-xl">
                    
                    {/* Role & Company Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-4 border-b border-neutral-900">
                      <div>
                        <h3 className="font-bebas text-2xl sm:text-3xl font-bold text-white uppercase tracking-wide group-hover:text-red-500 transition-colors">
                          {exp.role}
                        </h3>
                        <div className="text-xs font-bebas tracking-wider text-red-500 flex items-center gap-2 mt-0.5">
                          <span>{exp.company}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300">
                            {exp.type}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:items-end font-bebas text-xs tracking-wider text-neutral-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-red-500" />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bullet Achievements */}
                    <ul className="space-y-2 mb-4">
                      {exp.description.map((bullet, i) => (
                        <li key={i} className="text-xs sm:text-sm leading-relaxed flex items-start gap-2 text-neutral-300 font-sans-main">
                          <ChevronRight className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-neutral-900">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="font-bebas text-xs tracking-wider px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-neutral-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

