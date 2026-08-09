import React, { useState } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  Github, 
  Search, 
  Sparkles, 
  Star, 
  Eye,
  Crown,
  Flame
} from 'lucide-react';
import { Project } from '../types';

interface ProjectsSectionProps {
  projects: Project[];
  isDarkMode: boolean;
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  isDarkMode,
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
    <section id="projects" className={`py-16 md:py-24 relative overflow-hidden transition-colors ${
      isDarkMode ? 'bg-[#080d1a] text-slate-100' : 'bg-[#0d172a] text-slate-100'
    }`}>
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-3 bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 shadow-md">
            <Crown className="w-3.5 h-3.5 text-cyan-400" />
            <span>Featured Case Studies ({projects.length}+ Projects)</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4 text-white">
            18+ Commercial & <span className="text-cyan-shine text-glow-cyan">Creative Deliverables</span>
          </h2>

          <p className="text-sm sm:text-base max-w-2xl text-slate-300">
            Explore 18+ software builds, YouTube automation platforms (@BoltMindzYT 66.1K+ Subs), e-commerce brands, and video production projects.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-2 md:pb-0 scrollbar-none w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'btn-3d-cyan'
                    : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-cyan-500/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400" />
            <input
              type="text"
              placeholder="Search 18+ projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all focus:outline-none focus:border-cyan-400 border border-cyan-500/30 bg-slate-900/90 text-slate-100 placeholder-slate-400"
            />
          </div>

        </div>

        {/* Wide Landscape Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group rounded-3xl overflow-hidden card-3d-glass border-cyan-500/25 flex flex-col sm:flex-row items-stretch hover:border-cyan-400/60 transition-all duration-300"
              >
                {/* Image Frame - Landscape Format */}
                <div className="sm:w-2/5 shrink-0 relative overflow-hidden bg-slate-950 min-h-[220px]">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-slate-950/80 via-transparent to-transparent" />

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1 shadow-lg">
                      <Star className="w-3 h-3 fill-slate-950" />
                      <span>FEATURED</span>
                    </div>
                  )}

                  {/* Category Tag */}
                  <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md text-cyan-300 border border-cyan-500/30 text-[10px] font-bold px-2.5 py-1 rounded-full">
                    {project.category}
                  </div>
                </div>

                {/* Content Area */}
                <div className="sm:w-3/5 p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-black mb-1 group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-xs font-semibold text-cyan-400/90 mb-3 line-clamp-1">
                      {project.tagline}
                    </p>

                    <p className="text-xs leading-relaxed mb-4 text-slate-400 font-normal line-clamp-3">
                      {project.description}
                    </p>

                    {/* Impact Metric Highlight */}
                    {project.impactMetric && (
                      <div className="mb-4 px-3 py-2 rounded-xl text-[11px] font-bold flex items-center gap-2 border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="line-clamp-1">{project.impactMetric}</span>
                      </div>
                    )}

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-extrabold px-2 py-0.5 rounded-md border border-slate-700/60 bg-slate-900 text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onSelectProject(project)}
                      className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Case Details</span>
                    </button>

                    <div className="flex items-center gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-slate-900 text-slate-300 hover:text-white border border-slate-700 transition-all"
                          title="GitHub Code"
                        >
                          <Github className="w-3.5 h-3.5" />
                        </a>
                      )}

                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black transition-all"
                          title="Live Preview / Link"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>

                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 rounded-3xl border border-slate-800 bg-slate-900/60">
            <Search className="w-10 h-10 text-cyan-400 mx-auto mb-3 opacity-80" />
            <h3 className="text-lg font-bold mb-1">
              No matching projects found
            </h3>
            <p className="text-xs max-w-sm mx-auto text-slate-400">
              Try adjusting your search criteria or selecting another category.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-xl text-xs font-bold btn-3d-cyan text-white"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};


