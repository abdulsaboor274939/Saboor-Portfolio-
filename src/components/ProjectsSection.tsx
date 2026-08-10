import React, { useState } from 'react';
import { 
  ExternalLink, 
  Github, 
  Search, 
  Eye,
  ArrowRight
} from 'lucide-react';
import { Project } from '../types';

interface ProjectsSectionProps {
  projects: Project[];
  isDarkMode?: boolean;
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  onSelectProject
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'AI / GenAI', 'Media / Video', 'Full Stack', 'Digital Marketing', 'Web App', 'Graphic Design'];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="py-20 md:py-28 relative overflow-hidden bg-[#080808] text-white transition-colors border-b border-neutral-900">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header matching Reference Image: "SELECTED PROJECTS" */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-neutral-900 pb-6">
          <div>
            <h2 className="font-bebas text-4xl sm:text-6xl tracking-wide uppercase text-white leading-none">
              SELECTED PROJECTS
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs font-bebas tracking-widest text-neutral-400 hover:text-red-500 cursor-pointer transition-colors">
            <span>VIEW ALL PROJECTS</span>
            <ArrowRight className="w-4 h-4 text-red-500" />
          </div>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-2 md:pb-0 scrollbar-none w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-bebas text-xs tracking-wider transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-red-600 text-white font-bold shadow-lg shadow-red-600/20'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              placeholder="Search works..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2 rounded-lg font-bebas text-xs tracking-wider transition-all focus:outline-none focus:border-red-600 border border-neutral-800 bg-neutral-900 text-white placeholder-neutral-500"
            />
          </div>

        </div>

        {/* Projects Grid - 3-Column Layout matching Reference Image */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => {
              const formattedIndex = (index + 1).toString().padStart(2, '0');
              return (
                <div
                  key={project.id}
                  className="group rounded-2xl overflow-hidden bg-[#0c0c0d] border border-neutral-900 hover:border-red-600/50 flex flex-col justify-between transition-all duration-300 p-4 card-3d shine-overlay shadow-xl"
                >
                  <div>
                    {/* Thumbnail Frame */}
                    <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-neutral-900 mb-4">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      />
                      
                      {/* Dark Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                    </div>

                    {/* Card Footer matching Reference Image: Red Number + Title + Subtitle + Arrow */}
                    <div className="flex items-start justify-between gap-3 pt-2">
                      <div className="flex items-baseline gap-3">
                        <span className="font-bebas text-3xl sm:text-4xl font-bold text-red-600 shrink-0">
                          {formattedIndex}
                        </span>
                        <div>
                          <h3 className="font-bebas text-xl sm:text-2xl font-bold text-white uppercase group-hover:text-red-500 transition-colors leading-tight">
                            {project.title}
                          </h3>
                          <p className="font-bebas text-xs text-neutral-400 tracking-wider uppercase mt-0.5">
                            {project.category}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => onSelectProject(project)}
                        className="p-2 rounded-full border border-neutral-800 bg-neutral-900 text-neutral-300 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all shrink-0 mt-1"
                        title="View Project"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="mt-3 text-xs text-neutral-400 font-sans-main line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="font-bebas text-[10px] tracking-wider px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 pt-3 border-t border-neutral-900 flex items-center justify-between text-xs">
                    <button
                      onClick={() => onSelectProject(project)}
                      className="font-bebas tracking-wider text-neutral-300 hover:text-red-500 flex items-center gap-1 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 text-red-500" />
                      <span>CASE STUDY</span>
                    </button>

                    <div className="flex items-center gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded bg-neutral-900 text-neutral-400 hover:text-white transition-colors"
                          title="Source Code"
                        >
                          <Github className="w-3.5 h-3.5" />
                        </a>
                      )}

                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded bg-red-600 text-white hover:bg-red-700 transition-colors"
                          title="Live Demo"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 px-4 rounded-2xl border border-neutral-900 bg-neutral-900/50">
            <Search className="w-10 h-10 text-neutral-500 mx-auto mb-3" />
            <h3 className="font-bebas text-xl text-white mb-1">NO MATCHING PROJECTS FOUND</h3>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto mb-4 font-sans-main">
              Try adjusting your search query or switching categories.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-5 py-2 rounded-lg font-bebas text-xs tracking-wider bg-red-600 text-white"
            >
              RESET FILTERS
            </button>
          </div>
        )}

      </div>
    </section>
  );
};



