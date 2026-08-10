import React from 'react';
import { X, ExternalLink, Github, Sparkles, CheckCircle2, Star, Tag } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  isDarkMode?: boolean;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl max-h-[90vh] rounded-2xl border border-neutral-800 bg-[#0c0c0d] text-white shadow-2xl overflow-hidden flex flex-col my-auto glass-3d">
        
        {/* Header Image Area */}
        <div className="relative h-64 sm:h-80 bg-black shrink-0">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0d] via-[#0c0c0d]/40 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-black/80 text-white backdrop-blur-md hover:bg-red-600 transition-colors border border-neutral-700"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-red-600 text-white font-bebas text-xs tracking-wider font-bold px-2.5 py-1 rounded-md shadow-md">
                {project.category}
              </span>
              {project.featured && (
                <span className="bg-neutral-900 border border-red-500/50 text-red-400 font-bebas text-xs tracking-wider font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current text-red-500" />
                  FEATURED
                </span>
              )}
            </div>

            <h2 className="font-bebas text-3xl sm:text-4xl tracking-wide uppercase text-white font-black text-3d-white">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 font-sans-main mt-1">
              {project.tagline}
            </p>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 bg-[#0c0c0d]">
          
          {/* Detailed Overview */}
          <div>
            <h3 className="font-bebas text-sm tracking-widest uppercase text-red-500 mb-2">
              PROJECT CASE OVERVIEW
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed text-neutral-200 font-sans-main">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Key Features List */}
          {project.keyFeatures && project.keyFeatures.length > 0 && (
            <div>
              <h3 className="font-bebas text-sm tracking-widest uppercase text-red-500 mb-3">
                KEY TECHNICAL HIGHLIGHTS &amp; FEATURES
              </h3>
              <div className="grid grid-cols-1 gap-2.5">
                {project.keyFeatures.map((feature, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl border border-neutral-800 bg-neutral-900/80 flex items-start gap-2.5 text-xs sm:text-sm text-neutral-200 font-sans-main"
                  >
                    <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Impact Metric */}
          {project.impactMetric && (
            <div className="p-4 rounded-xl border border-red-900/60 bg-red-950/40 text-red-300 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-red-500 shrink-0" />
              <div>
                <div className="font-bebas text-xs tracking-wider uppercase text-red-400">MEASURABLE RESULT</div>
                <div className="text-xs sm:text-sm font-semibold text-white">{project.impactMetric}</div>
              </div>
            </div>
          )}

          {/* Tech Stack Used */}
          <div>
            <h3 className="font-bebas text-sm tracking-widest uppercase text-red-500 mb-2">
              TECHNOLOGIES &amp; FRAMEWORKS
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-lg text-xs font-bebas tracking-wider border border-neutral-800 bg-neutral-900 text-neutral-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer Links */}
        <div className="p-5 border-t border-neutral-800 bg-[#080808] flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-lg font-bebas text-xs tracking-wider border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800"
          >
            CLOSE
          </button>

          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-lg font-bebas text-xs tracking-wider border border-neutral-800 bg-neutral-900 text-neutral-200 hover:text-white hover:border-neutral-700 flex items-center gap-2 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>SOURCE REPOSITORY</span>
              </a>
            )}

            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-lg btn-3d-red text-white font-bebas text-xs tracking-wider flex items-center gap-2 shadow-lg shadow-red-600/30"
              >
                <span>LIVE PREVIEW</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

