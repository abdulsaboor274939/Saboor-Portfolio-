import React from 'react';
import { X, ExternalLink, Github, Sparkles, CheckCircle2, Star, Tag } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  isDarkMode: boolean;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, isDarkMode }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className={`relative w-full max-w-3xl max-h-[90vh] rounded-3xl border shadow-2xl overflow-hidden flex flex-col my-auto ${
        isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* Header Image Area */}
        <div className="relative h-64 sm:h-80 bg-slate-950 shrink-0">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-900/80 text-white backdrop-blur-md hover:bg-slate-800 transition-colors border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-emerald-500 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-md">
                {project.category}
              </span>
              {project.featured && (
                <span className="bg-amber-500 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-md flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  Featured
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
              {project.tagline}
            </p>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          
          {/* Detailed Overview */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-500 mb-2">
              Project Case Overview
            </h3>
            <p className={`text-sm sm:text-base leading-relaxed ${
              isDarkMode ? 'text-slate-300' : 'text-slate-700'
            }`}>
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Key Features List */}
          {project.keyFeatures && project.keyFeatures.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-500 mb-3">
                Key Technical Highlights & Features
              </h3>
              <div className="grid grid-cols-1 gap-2.5">
                {project.keyFeatures.map((feature, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-xl border flex items-start gap-2.5 text-xs sm:text-sm ${
                      isDarkMode
                        ? 'bg-slate-800/60 border-slate-700/60 text-slate-200'
                        : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Impact Metric */}
          {project.impactMetric && (
            <div className={`p-4 rounded-2xl border flex items-center gap-3 ${
              isDarkMode
                ? 'bg-emerald-950/40 border-emerald-900/60 text-emerald-300'
                : 'bg-emerald-50 border-emerald-200 text-emerald-900'
            }`}>
              <Sparkles className="w-5 h-5 text-emerald-500 shrink-0" />
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-500">Measurable Result</div>
                <div className="text-xs sm:text-sm font-semibold">{project.impactMetric}</div>
              </div>
            </div>
          )}

          {/* Tech Stack Used */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-500 mb-2">
              Technologies & Frameworks
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                    isDarkMode
                      ? 'bg-slate-800 border-slate-700 text-slate-200'
                      : 'bg-slate-100 border-slate-200 text-slate-800'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer Links */}
        <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Close
          </button>

          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold border flex items-center gap-2 transition-colors ${
                  isDarkMode
                    ? 'border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700'
                    : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-100'
                }`}
              >
                <Github className="w-4 h-4" />
                <span>Source Repository</span>
              </a>
            )}

            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-2 shadow-md shadow-emerald-600/20"
              >
                <span>Live Preview</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
