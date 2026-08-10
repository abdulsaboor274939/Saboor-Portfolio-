import React, { useState } from 'react';
import { 
  X, 
  Save, 
  RotateCcw, 
  User, 
  FolderGit2, 
  Cpu, 
  Briefcase, 
  Share2, 
  Plus, 
  Trash2, 
  Sparkles,
  Download,
  Upload
} from 'lucide-react';
import { PortfolioData, Project, ExperienceItem } from '../types';
import { compressImageFile } from '../utils/imageCompressor';

interface EditPortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  portfolio: PortfolioData;
  onSave: (data: PortfolioData) => void;
  onReset: () => void;
  isDarkMode?: boolean;
}

export const EditPortfolioModal: React.FC<EditPortfolioModalProps> = ({
  isOpen,
  onClose,
  portfolio,
  onSave,
  onReset
}) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState<PortfolioData>(JSON.parse(JSON.stringify(portfolio)));
  const [activeTab, setActiveTab] = useState<'profile' | 'socials' | 'projects' | 'experience'>('profile');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    onSave(formData);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 1000);
  };

  const handleExportJSON = () => {
    const blob = new Blob([JSON.stringify(formData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.name.toLowerCase().replace(/\s+/g, '_')}_portfolio.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        if (imported.name && imported.projects) {
          setFormData(imported);
          alert('Portfolio data imported successfully!');
        }
      } catch (err) {
        alert('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
  };

  const handleAddProject = () => {
    const newProj: Project = {
      id: `p_${Date.now()}`,
      title: "New Project",
      tagline: "Brief catchphrase for the project",
      description: "Detailed description of what you built and how it works.",
      category: "Full Stack",
      tags: ["React", "TypeScript", "Node.js"],
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      featured: false,
      demoUrl: "https://github.com",
      githubUrl: "https://github.com"
    };
    setFormData({
      ...formData,
      projects: [newProj, ...formData.projects]
    });
  };

  const handleRemoveProject = (id: string) => {
    setFormData({
      ...formData,
      projects: formData.projects.filter(p => p.id !== id)
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[90vh] rounded-2xl border border-neutral-800 bg-[#0c0c0d] text-white shadow-2xl flex flex-col overflow-hidden my-auto glass-3d">
        
        {/* Header Bar */}
        <div className="p-5 sm:p-6 border-b border-neutral-800 flex items-center justify-between shrink-0 bg-[#080808]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-red-950/80 border border-red-800 text-red-500">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bebas text-2xl tracking-wide text-white uppercase">
                CUSTOMIZE PORTFOLIO CONTENT
              </h2>
              <p className="text-xs text-neutral-400 font-sans-main">
                Update bio, title, socials, and project entries instantly.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-neutral-800 bg-[#080808] overflow-x-auto shrink-0">
          {[
            { id: 'profile', label: 'PERSONAL INFO', icon: User },
            { id: 'socials', label: 'SOCIAL & LINKS', icon: Share2 },
            { id: 'projects', label: `PROJECTS (${formData.projects.length})`, icon: FolderGit2 },
            { id: 'experience', label: 'EXPERIENCE', icon: Briefcase },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-3 font-bebas text-sm tracking-wider flex items-center gap-2 transition-all border-b-2 whitespace-nowrap ${
                  isActive
                    ? 'border-red-600 text-red-500 bg-neutral-900/80'
                    : 'border-transparent text-neutral-400 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-[#0c0c0d]">
          
          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bebas text-xs tracking-wider text-neutral-300 uppercase mb-1">
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg text-xs font-sans-main font-bold border border-neutral-800 bg-neutral-900 text-white focus:outline-none focus:border-red-600"
                  />
                </div>

                <div>
                  <label className="block font-bebas text-xs tracking-wider text-neutral-300 uppercase mb-1">
                    PROFESSIONAL TITLE *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg text-xs font-sans-main font-bold border border-neutral-800 bg-neutral-900 text-white focus:outline-none focus:border-red-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bebas text-xs tracking-wider text-neutral-300 uppercase mb-1">
                  CATCHY TAGLINE
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg text-xs font-sans-main font-medium border border-neutral-800 bg-neutral-900 text-white focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="block font-bebas text-xs tracking-wider text-neutral-300 uppercase mb-1">
                  ABOUT BIO
                </label>
                <textarea
                  rows={4}
                  value={formData.about}
                  onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg text-xs font-sans-main font-normal border border-neutral-800 bg-neutral-900 text-white focus:outline-none focus:border-red-600 leading-relaxed"
                />
              </div>

              <div className="p-4 rounded-xl bg-neutral-900/90 border border-neutral-800 flex flex-col sm:flex-row items-center gap-5">
                <div className="relative shrink-0 w-20 h-20 rounded-full overflow-hidden border-2 border-red-600 shadow-lg bg-black">
                  <img
                    src={formData.avatarUrl}
                    alt="Profile Avatar Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>

                <div className="flex-1 space-y-2 w-full">
                  <label className="block font-bebas text-xs tracking-wider text-neutral-300 uppercase">
                    PROFILE PHOTO / AVATAR
                  </label>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={formData.avatarUrl}
                      onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                      placeholder="Paste Image URL or upload file"
                      className="flex-1 px-3.5 py-2 rounded-lg text-xs font-sans-main border border-neutral-800 bg-black text-white focus:outline-none focus:border-red-600 placeholder-neutral-500"
                    />

                    <label className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-bebas text-xs tracking-wider bg-red-600 hover:bg-red-700 text-white cursor-pointer transition-all shrink-0">
                      <Upload className="w-4 h-4" />
                      <span>UPLOAD FILE</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          try {
                            const res = await compressImageFile(file, 600, 0.82);
                            if (res) {
                              setFormData({ ...formData, avatarUrl: res });
                            }
                          } catch (err) {
                            console.error("Image error:", err);
                            alert("Failed to process image file.");
                          }
                        }}
                      />
                    </label>
                  </div>
                  <p className="text-[11px] text-neutral-400 font-sans-main">
                    Supports PNG, JPG, WebP images from local device or web URL.
                  </p>
                </div>
              </div>

              <div>
                <label className="block font-bebas text-xs tracking-wider text-neutral-300 uppercase mb-1">
                  AVAILABILITY STATUS
                </label>
                <input
                  type="text"
                  value={formData.statusText}
                  onChange={(e) => setFormData({ ...formData, statusText: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg text-xs font-sans-main border border-neutral-800 bg-neutral-900 text-white focus:outline-none focus:border-red-600"
                />
              </div>
            </div>
          )}

          {/* SOCIALS TAB */}
          {activeTab === 'socials' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bebas text-xs tracking-wider text-neutral-300 uppercase mb-1">
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    value={formData.socials.email}
                    onChange={(e) => setFormData({
                      ...formData,
                      socials: { ...formData.socials, email: e.target.value }
                    })}
                    className="w-full px-4 py-3 rounded-lg text-xs font-sans-main font-bold border border-neutral-800 bg-neutral-900 text-white focus:outline-none focus:border-red-600"
                  />
                </div>

                <div>
                  <label className="block font-bebas text-xs tracking-wider text-neutral-300 uppercase mb-1">
                    LOCATION
                  </label>
                  <input
                    type="text"
                    value={formData.socials.location}
                    onChange={(e) => setFormData({
                      ...formData,
                      socials: { ...formData.socials, location: e.target.value }
                    })}
                    className="w-full px-4 py-3 rounded-lg text-xs font-sans-main font-bold border border-neutral-800 bg-neutral-900 text-white focus:outline-none focus:border-red-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bebas text-xs tracking-wider text-neutral-300 uppercase mb-1">
                    GITHUB URL
                  </label>
                  <input
                    type="text"
                    value={formData.socials.github}
                    onChange={(e) => setFormData({
                      ...formData,
                      socials: { ...formData.socials, github: e.target.value }
                    })}
                    className="w-full px-4 py-3 rounded-lg text-xs font-sans-main border border-neutral-800 bg-neutral-900 text-white focus:outline-none focus:border-red-600"
                  />
                </div>

                <div>
                  <label className="block font-bebas text-xs tracking-wider text-neutral-300 uppercase mb-1">
                    LINKEDIN URL
                  </label>
                  <input
                    type="text"
                    value={formData.socials.linkedin}
                    onChange={(e) => setFormData({
                      ...formData,
                      socials: { ...formData.socials, linkedin: e.target.value }
                    })}
                    className="w-full px-4 py-3 rounded-lg text-xs font-sans-main border border-neutral-800 bg-neutral-900 text-white focus:outline-none focus:border-red-600"
                  />
                </div>

                <div>
                  <label className="block font-bebas text-xs tracking-wider text-neutral-300 uppercase mb-1">
                    TWITTER / X URL
                  </label>
                  <input
                    type="text"
                    value={formData.socials.twitter || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      socials: { ...formData.socials, twitter: e.target.value }
                    })}
                    className="w-full px-4 py-3 rounded-lg text-xs font-sans-main border border-neutral-800 bg-neutral-900 text-white focus:outline-none focus:border-red-600"
                  />
                </div>
              </div>
            </div>
          )}

          {/* PROJECTS TAB */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="font-bebas text-sm tracking-wider text-neutral-400 uppercase">
                  MANAGE PORTFOLIO PROJECTS
                </span>
                <button
                  onClick={handleAddProject}
                  className="px-3.5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bebas text-xs tracking-wider flex items-center gap-1.5 shadow-md shadow-red-600/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>ADD PROJECT</span>
                </button>
              </div>

              <div className="space-y-4">
                {formData.projects.map((proj, idx) => (
                  <div key={proj.id} className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/80 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="font-bebas text-base text-red-500 font-bold tracking-wider">
                        PROJECT #{idx + 1}
                      </div>
                      <button
                        onClick={() => handleRemoveProject(proj.id)}
                        className="p-1.5 rounded-lg text-red-500 hover:bg-red-950/50"
                        title="Remove Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Project Title"
                        value={proj.title}
                        onChange={(e) => {
                          const updated = [...formData.projects];
                          updated[idx].title = e.target.value;
                          setFormData({ ...formData, projects: updated });
                        }}
                        className="px-3 py-2 rounded-lg text-xs font-sans-main border border-neutral-800 bg-black text-white focus:outline-none focus:border-red-600"
                      />

                      <select
                        value={proj.category}
                        onChange={(e) => {
                          const updated = [...formData.projects];
                          updated[idx].category = e.target.value as any;
                          setFormData({ ...formData, projects: updated });
                        }}
                        className="px-3 py-2 rounded-lg text-xs font-sans-main border border-neutral-800 bg-black text-white focus:outline-none focus:border-red-600"
                      >
                        <option value="Full Stack">Full Stack</option>
                        <option value="AI / GenAI">AI / GenAI</option>
                        <option value="Web App">Web App</option>
                        <option value="Cloud & API">Cloud & API</option>
                      </select>
                    </div>

                    <textarea
                      rows={2}
                      placeholder="Short Description"
                      value={proj.description}
                      onChange={(e) => {
                        const updated = [...formData.projects];
                        updated[idx].description = e.target.value;
                        setFormData({ ...formData, projects: updated });
                      }}
                      className="w-full px-3 py-2 rounded-lg text-xs font-sans-main border border-neutral-800 bg-black text-white focus:outline-none focus:border-red-600"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Tags (comma separated)"
                        value={proj.tags.join(', ')}
                        onChange={(e) => {
                          const updated = [...formData.projects];
                          updated[idx].tags = e.target.value.split(',').map(t => t.trim()).filter(Boolean);
                          setFormData({ ...formData, projects: updated });
                        }}
                        className="px-3 py-2 rounded-lg text-xs font-sans-main border border-neutral-800 bg-black text-white focus:outline-none focus:border-red-600"
                      />

                      <input
                        type="text"
                        placeholder="Image URL"
                        value={proj.imageUrl}
                        onChange={(e) => {
                          const updated = [...formData.projects];
                          updated[idx].imageUrl = e.target.value;
                          setFormData({ ...formData, projects: updated });
                        }}
                        className="px-3 py-2 rounded-lg text-xs font-sans-main border border-neutral-800 bg-black text-white focus:outline-none focus:border-red-600"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EXPERIENCE TAB */}
          {activeTab === 'experience' && (
            <div className="space-y-4">
              <span className="font-bebas text-sm tracking-wider text-neutral-400 uppercase">
                WORK EXPERIENCE ENTRIES
              </span>
              {formData.experiences.map((exp, idx) => (
                <div key={exp.id} className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/80 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Role Title"
                      value={exp.role}
                      onChange={(e) => {
                        const updated = [...formData.experiences];
                        updated[idx].role = e.target.value;
                        setFormData({ ...formData, experiences: updated });
                      }}
                      className="px-3 py-2 rounded-lg text-xs font-sans-main border border-neutral-800 bg-black text-white focus:outline-none focus:border-red-600"
                    />
                    <input
                      type="text"
                      placeholder="Company"
                      value={exp.company}
                      onChange={(e) => {
                        const updated = [...formData.experiences];
                        updated[idx].company = e.target.value;
                        setFormData({ ...formData, experiences: updated });
                      }}
                      className="px-3 py-2 rounded-lg text-xs font-sans-main border border-neutral-800 bg-black text-white focus:outline-none focus:border-red-600"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="p-5 border-t border-neutral-800 bg-[#080808] flex flex-wrap items-center justify-between gap-3 shrink-0">
          
          <div className="flex items-center gap-2">
            <button
              onClick={onReset}
              className="px-3.5 py-2 rounded-lg font-bebas text-xs tracking-wider text-red-500 border border-red-900/80 bg-red-950/30 hover:bg-red-950/60 flex items-center gap-1.5 transition-colors"
              title="Reset all content to original defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>RESET DEFAULTS</span>
            </button>

            <button
              onClick={handleExportJSON}
              className="px-3.5 py-2 rounded-lg font-bebas text-xs tracking-wider border border-neutral-800 text-neutral-300 hover:bg-neutral-800 hover:text-white flex items-center gap-1.5 transition-colors"
              title="Download portfolio as JSON file"
            >
              <Download className="w-3.5 h-3.5" />
              <span>EXPORT JSON</span>
            </button>

            <label className="px-3.5 py-2 rounded-lg font-bebas text-xs tracking-wider border border-neutral-800 text-neutral-300 hover:bg-neutral-800 hover:text-white flex items-center gap-1.5 cursor-pointer transition-colors">
              <Upload className="w-3.5 h-3.5" />
              <span>IMPORT JSON</span>
              <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
            </label>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg font-bebas text-xs tracking-wider border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800"
            >
              CANCEL
            </button>

            <button
              onClick={handleSave}
              className="px-5 py-2.5 rounded-lg btn-3d-red text-white font-bebas text-xs tracking-widest shadow-lg shadow-red-600/30 flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>{saveSuccess ? 'SAVED!' : 'SAVE PORTFOLIO'}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

