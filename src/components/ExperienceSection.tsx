import React from 'react';
import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle2, ChevronRight } from 'lucide-react';
import { PortfolioData } from '../types';

interface ExperienceSectionProps {
  portfolio: PortfolioData;
  isDarkMode: boolean;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ portfolio, isDarkMode }) => {
  return (
    <section id="experience" className={`py-16 md:py-24 relative overflow-hidden transition-colors ${
      isDarkMode ? 'bg-[#080d1a] text-slate-100' : 'bg-[#0d172a] text-slate-100'
    }`}>
      {/* Background Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-3 bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 shadow-md">
            <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
            <span>Career Path & Background</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4 text-white">
            Work Experience & <span className="text-cyan-shine text-glow-cyan">Education</span>
          </h2>

          <p className="text-sm sm:text-base max-w-2xl text-slate-300">
            A timeline of key software engineering roles, team contributions, and academic background.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Work Experience Timeline Column */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-500/30 shadow-md">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-black text-white">
                Professional Experience
              </h3>
            </div>

            <div className="relative pl-6 sm:pl-8 border-l-2 border-cyan-500/30 space-y-10">
              {portfolio.experiences.map((exp) => (
                <div key={exp.id} className="relative group">
                  
                  {/* Timeline Dot */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-cyan-400 border-4 border-slate-950 shadow-[0_0_10px_rgba(6,182,212,0.8)] group-hover:scale-125 transition-transform" />

                  <div className="p-6 rounded-2xl card-3d-glass border-cyan-500/25 group-hover:border-cyan-400/50 transition-all">
                    
                    {/* Role & Company Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div>
                        <h4 className="text-lg font-black text-white">
                          {exp.role}
                        </h4>
                        <div className="text-sm font-semibold text-cyan-400 flex items-center gap-2 mt-0.5">
                          <span>{exp.company}</span>
                          <span className="text-xs px-2 py-0.5 rounded-md bg-cyan-950 border border-cyan-500/30 text-cyan-200">
                            {exp.type}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:items-end text-xs font-medium text-slate-300">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 opacity-60" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bullet Achievements */}
                    <ul className="space-y-2 mb-4">
                      {exp.description.map((bullet, i) => (
                        <li key={i} className="text-xs sm:text-sm leading-relaxed flex items-start gap-2 text-slate-300">
                          <ChevronRight className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-cyan-500/20">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-950 text-cyan-200 border border-cyan-500/20"
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

          {/* Education & Certifications Column */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 rounded-xl bg-indigo-950 text-indigo-400 border border-indigo-500/30 shadow-md">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-black text-white">
                Education & Degree
              </h3>
            </div>

            <div className="space-y-6">
              {portfolio.education.map((edu) => (
                <div
                  key={edu.id}
                  className="p-6 rounded-2xl card-3d-glass border-indigo-500/25 transition-all"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="text-base font-bold text-white">
                      {edu.degree}
                    </h4>
                    <span className="text-xs font-semibold px-2 py-1 rounded-md bg-indigo-950 text-indigo-300 border border-indigo-500/30 shrink-0">
                      {edu.period}
                    </span>
                  </div>

                  <div className="text-xs font-semibold text-cyan-400 mb-2">
                    {edu.institution}
                  </div>

                  {edu.grade && (
                    <div className="text-xs font-medium mb-2 text-slate-300">
                      Academic Performance: <span className="text-emerald-400 font-bold">{edu.grade}</span>
                    </div>
                  )}

                  {edu.details && (
                    <p className="text-xs leading-relaxed text-slate-300">
                      {edu.details}
                    </p>
                  )}
                </div>
              ))}

              {/* Quick Commitment Card */}
              <div className="p-6 rounded-2xl card-3d-glass border-emerald-500/30 bg-gradient-to-br from-emerald-950/50 via-slate-900 to-slate-950 text-white">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Continuous Learning</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Regularly completing specialized certifications in LLM Prompt Engineering, Full-Stack System Design, and Cloud Architecture.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
