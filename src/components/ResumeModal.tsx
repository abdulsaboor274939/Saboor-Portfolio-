import React from 'react';
import { X, Printer, Download, Mail, Github, Linkedin, MapPin, ExternalLink } from 'lucide-react';
import { PortfolioData } from '../types';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  portfolio: PortfolioData;
  isDarkMode: boolean;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  portfolio,
  isDarkMode
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className={`relative w-full max-w-4xl max-h-[90vh] rounded-3xl border shadow-2xl overflow-hidden flex flex-col my-auto ${
        isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* Top Control Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm">Curriculum Vitae / Resume</span>
            <span className="text-xs text-emerald-500 font-semibold px-2 py-0.5 rounded bg-emerald-500/10">
              Printable Format
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Paper Body Container */}
        <div className="p-6 sm:p-10 overflow-y-auto flex-1 bg-white text-slate-900 space-y-6 printable-resume">
          
          {/* Header */}
          <div className="border-b-2 border-slate-900 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900">
                {portfolio.name}
              </h1>
              <div className="text-sm font-bold text-emerald-700 mt-1">
                {portfolio.title}
              </div>
            </div>

            <div className="text-xs space-y-1 text-slate-600">
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-800" />
                <span>{portfolio.socials.email}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-800" />
                <span>{portfolio.socials.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Github className="w-3.5 h-3.5 text-slate-800" />
                <span>{portfolio.socials.github}</span>
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
              Professional Summary
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed">
              {portfolio.about}
            </p>
          </div>

          {/* Experience */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">
              Work Experience
            </h2>
            <div className="space-y-4">
              {portfolio.experiences.map((exp) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-bold text-slate-900">{exp.role} — <span className="text-emerald-700">{exp.company}</span></span>
                    <span className="text-[11px] font-medium text-slate-500">{exp.period} | {exp.location}</span>
                  </div>
                  <ul className="list-disc list-inside space-y-0.5 text-xs text-slate-700 pl-1">
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
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">
              Key Projects
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {portfolio.projects.slice(0, 4).map((proj) => (
                <div key={proj.id} className="p-2.5 rounded border border-slate-200 text-xs">
                  <div className="font-bold text-slate-900">{proj.title}</div>
                  <div className="text-[11px] text-slate-600 line-clamp-2 mt-0.5">{proj.description}</div>
                  <div className="text-[10px] text-emerald-700 font-semibold mt-1">Tech: {proj.tags.join(', ')}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
              Skills & Core Technologies
            </h2>
            <div className="text-xs text-slate-700 space-y-1">
              {portfolio.skillCategories.map((cat) => (
                <div key={cat.name}>
                  <span className="font-bold text-slate-900">{cat.name}:</span>{' '}
                  {cat.skills.map(s => s.name).join(', ')}
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
              Education
            </h2>
            {portfolio.education.map((edu) => (
              <div key={edu.id} className="flex justify-between text-xs text-slate-700">
                <div>
                  <span className="font-bold text-slate-900">{edu.degree}</span> — {edu.institution}
                </div>
                <div className="font-medium text-slate-500">{edu.period}</div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};
