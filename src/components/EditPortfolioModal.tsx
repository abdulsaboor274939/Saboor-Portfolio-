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
  isDarkMode: boolean;
}

export const EditPortfolioModal: React.FC<EditPortfolioModalProps> = ({
  isOpen,
  onClose,
  portfolio,
  onSave,
  onReset,
  isDarkMode
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

  // Helper to add project
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className={`relative w-full max-w-4xl max-h-[90vh] rounded-3xl border shadow-2xl flex flex-col overflow-hidden my-auto ${
        isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* Header Bar */}
        <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Customize Portfolio Content</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Edit bio, title, socials, and projects instantly.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 overflow-x-auto shrink-0">
          {[
            { id: 'profile', label: 'Personal Info', icon: User },
            { id: 'socials', label: 'Social & Links', icon: Share2 },
            { id: 'projects', label: `Projects (${formData.projects.length})`, icon: FolderGit2 },
            { id: 'experience', label: 'Experience', icon: Briefcase },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all border-b-2 whitespace-nowrap ${
                  isActive
                    ? 'border-emerald-500 text-emerald-500 bg-white dark:bg-slate-900'
                    : 'border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold mb-1">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border bg-slate-50 dark:bg-slate-800 dark:border-slate-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">Professional Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border bg-slate-50 dark:bg-slate-800 dark:border-slate-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Catchy Tagline</label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border bg-slate-50 dark:bg-slate-800 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">About Bio</label>
                <textarea
                  rows={4}
                  value={formData.about}
                  onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border bg-slate-50 dark:bg-slate-800 dark:border-slate-700"
                />
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex flex-col sm:flex-row items-center gap-5">
                <div className="relative shrink-0 w-20 h-20 rounded-full overflow-hidden border-2 border-cyan-400 shadow-md bg-slate-900">
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
                  <label className="block text-xs font-bold">Profile Photo / Avatar</label>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={formData.avatarUrl}
                      onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                      placeholder="Paste Image URL or upload below"
                      className="flex-1 px-3.5 py-2 rounded-xl text-xs sm:text-sm border bg-white dark:bg-slate-900 dark:border-slate-700"
                    />

                    <label className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-600 text-white cursor-pointer transition-all shrink-0">
                      <Upload className="w-4 h-4" />
                      <span>Upload File</span>
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
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Supports PNG, JPG, WebP images from local device or web URL.
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Availability Status</label>
                <input
                  type="text"
                  value={formData.statusText}
                  onChange={(e) => setFormData({ ...formData, statusText: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border bg-slate-50 dark:bg-slate-800 dark:border-slate-700"
                />
              </div>
            </div>
          )}

          {/* SOCIALS TAB */}
          {activeTab === 'socials' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold mb-1">Email Address</label>
                  <input
                    type="email"
                    value={formData.socials.email}
                    onChange={(e) => setFormData({
                      ...formData,
                      socials: { ...formData.socials, email: e.target.value }
                    })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border bg-slate-50 dark:bg-slate-800 dark:border-slate-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.socials.location}
                    onChange={(e) => setFormData({
                      ...formData,
                      socials: { ...formData.socials, location: e.target.value }
                    })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border bg-slate-50 dark:bg-slate-800 dark:border-slate-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold mb-1">GitHub URL</label>
                  <input
                    type="text"
                    value={formData.socials.github}
                    onChange={(e) => setFormData({
                      ...formData,
                      socials: { ...formData.socials, github: e.target.value }
                    })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border bg-slate-50 dark:bg-slate-800 dark:border-slate-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">LinkedIn URL</label>
                  <input
                    type="text"
                    value={formData.socials.linkedin}
                    onChange={(e) => setFormData({
                      ...formData,
                      socials: { ...formData.socials, linkedin: e.target.value }
                    })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border bg-slate-50 dark:bg-slate-800 dark:border-slate-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">Twitter / X URL</label>
                  <input
                    type="text"
                    value={formData.socials.twitter || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      socials: { ...formData.socials, twitter: e.target.value }
                    })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border bg-slate-50 dark:bg-slate-800 dark:border-slate-700"
                  />
                </div>
              </div>
            </div>
          )}

          {/* PROJECTS TAB */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase">Manage Portfolio Projects</span>
                <button
                  onClick={handleAddProject}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Project</span>
                </button>
              </div>

              <div className="space-y-4">
                {formData.projects.map((proj, idx) => (
                  <div key={proj.id} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="font-bold text-sm text-emerald-500">
                        Project #{idx + 1}
                      </div>
                      <button
                        onClick={() => handleRemoveProject(proj.id)}
                        className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10"
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
                        className="px-3 py-2 rounded-xl text-xs border dark:bg-slate-900 dark:border-slate-700"
                      />

                      <select
                        value={proj.category}
                        onChange={(e) => {
                          const updated = [...formData.projects];
                          updated[idx].category = e.target.value as any;
                          setFormData({ ...formData, projects: updated });
                        }}
                        className="px-3 py-2 rounded-xl text-xs border dark:bg-slate-900 dark:border-slate-700"
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
                      className="w-full px-3 py-2 rounded-xl text-xs border dark:bg-slate-900 dark:border-slate-700"
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
                        className="px-3 py-2 rounded-xl text-xs border dark:bg-slate-900 dark:border-slate-700"
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
                        className="px-3 py-2 rounded-xl text-xs border dark:bg-slate-900 dark:border-slate-700"
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
              <span className="text-xs font-bold text-slate-500 uppercase">Work Experience Entries</span>
              {formData.experiences.map((exp, idx) => (
                <div key={exp.id} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
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
                      className="px-3 py-2 rounded-xl text-xs border dark:bg-slate-900 dark:border-slate-700"
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
                      className="px-3 py-2 rounded-xl text-xs border dark:bg-slate-900 dark:border-slate-700"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 flex flex-wrap items-center justify-between gap-3 shrink-0">
          
          <div className="flex items-center gap-2">
            <button
              onClick={onReset}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-500 border border-rose-200 dark:border-rose-900/50 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-1.5"
              title="Reset all content to original defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <button
              onClick={handleExportJSON}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5"
              title="Download portfolio as JSON file"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>

            <label className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer">
              <Upload className="w-3.5 h-3.5" />
              <span>Import JSON</span>
              <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
            </label>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>{saveSuccess ? 'Saved!' : 'Save Portfolio'}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
