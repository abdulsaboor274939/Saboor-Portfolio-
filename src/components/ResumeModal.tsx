import React from 'react';
import { X, Printer, Download, Mail, Github, Linkedin, MapPin, ExternalLink, FileText } from 'lucide-react';
import { PortfolioData } from '../types';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  portfolio: PortfolioData;
  isDarkMode?: boolean;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  portfolio
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[90vh] rounded-2xl border border-neutral-800 bg-[#0c0c0d] text-white shadow-2xl overflow-hidden flex flex-col my-auto glass-3d">
        
        {/* Top Control Bar */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 bg-[#080808] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-950/80 border border-red-800 text-red-500">
              <FileText className="w-5 h-5" />
            </div>
            <span className="font-bebas text-xl sm:text-2xl tracking-wide text-white uppercase">
              CURRICULUM VITAE / RESUME
            </span>
            <span className="text-xs font-bebas tracking-wider text-red-500 px-2.5 py-1 rounded bg-red-950/80 border border-red-900 hidden sm:inline-block">
              PRINTABLE FORMAT
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-lg btn-3d-red text-white font-bebas text-xs tracking-wider flex items-center gap-2 shadow-lg shadow-red-600/30"
            >
              <Printer className="w-4 h-4" />
              <span>PRINT / SAVE PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable CV Paper Body Container */}
        <div className="p-6 sm:p-10 overflow-y-auto flex-1 bg-[#080808] text-neutral-100 space-y-6 printable-resume font-sans-main border-t border-neutral-900">
          
          {/* Header */}
          <div className="border-b-2 border-red-600/80 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div>
              <h1 className="font-bebas text-4xl sm:text-5xl tracking-wide text-white font-black uppercase text-3d-white">
                {portfolio.name}
              </h1>
              <div className="font-bebas text-lg tracking-wider text-red-500 font-bold mt-1">
                {portfolio.title}
              </div>
            </div>

            <div className="text-xs space-y-1.5 text-neutral-300">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span className="font-mono">{portfolio.socials.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span>{portfolio.socials.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Github className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span className="font-mono">{portfolio.socials.github}</span>
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h2 className="font-bebas text-base tracking-widest uppercase text-red-500 border-b border-neutral-800 pb-1 mb-2">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans-main">
              {portfolio.about}
            </p>
          </div>

          {/* Experience */}
          <div>
            <h2 className="font-bebas text-base tracking-widest uppercase text-red-500 border-b border-neutral-800 pb-1 mb-3">
              WORK EXPERIENCE
            </h2>
            <div className="space-y-4">
              {portfolio.experiences.map((exp) => (
                <div key={exp.id} className="p-4 rounded-xl bg-[#0c0c0d] border border-neutral-800 space-y-2">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
                    <span className="font-bebas text-base tracking-wider text-white">
                      {exp.role} <span className="text-red-500">@ {exp.company}</span>
                    </span>
                    <span className="font-bebas text-xs tracking-wider text-neutral-400 px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800">
                      {exp.period} | {exp.location}
                    </span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs text-neutral-300 pl-1 font-sans-main">
                    {exp.description.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Projects */}
          <div>
            <h2 className="font-bebas text-base tracking-widest uppercase text-red-500 border-b border-neutral-800 pb-1 mb-3">
              KEY PROJECTS &amp; PRODUCTS
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {portfolio.projects.slice(0, 4).map((proj) => (
                <div key={proj.id} className="p-3.5 rounded-xl bg-[#0c0c0d] border border-neutral-800 text-xs">
                  <div className="font-bebas text-base text-white tracking-wider font-bold">{proj.title}</div>
                  <div className="text-xs text-neutral-400 line-clamp-2 mt-1 font-sans-main">{proj.description}</div>
                  <div className="font-bebas text-xs text-red-500 font-bold mt-2">TECH: {proj.tags.join(', ')}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="font-bebas text-base tracking-widest uppercase text-red-500 border-b border-neutral-800 pb-1 mb-2">
              SKILLS &amp; CORE TECHNOLOGIES
            </h2>
            <div className="text-xs text-neutral-300 space-y-1.5 font-sans-main">
              {portfolio.skillCategories.map((cat) => (
                <div key={cat.name} className="flex flex-wrap items-center gap-1.5">
                  <span className="font-bebas text-sm tracking-wider text-white font-bold">{cat.name}:</span>
                  <span className="text-neutral-400">{cat.skills.map(s => s.name).join(', ')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="font-bebas text-base tracking-widest uppercase text-red-500 border-b border-neutral-800 pb-1 mb-2">
              EDUCATION &amp; DEGREES
            </h2>
            {portfolio.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-center text-xs text-neutral-300 p-2.5 rounded-lg bg-[#0c0c0d] border border-neutral-800">
                <div>
                  <span className="font-bebas text-sm tracking-wider text-white font-bold">{edu.degree}</span>
                  <span className="text-neutral-400"> — {edu.institution}</span>
                </div>
                <div className="font-bebas text-xs text-red-500 font-bold px-2 py-0.5 rounded bg-red-950/60 border border-red-900">{edu.period}</div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};

