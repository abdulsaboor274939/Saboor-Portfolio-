import React, { useState, useRef } from 'react';
import { 
  Film, 
  Video, 
  Play, 
  Plus, 
  X, 
  Sparkles, 
  Palette, 
  Trash2, 
  Edit3, 
  ExternalLink, 
  Upload, 
  CheckCircle2, 
  Maximize2,
  Clock,
  Clapperboard,
  Scissors,
  Layers,
  Smartphone,
  ChevronDown,
  ChevronUp,
  FolderPlus
} from 'lucide-react';
import { EditItem, PortfolioData } from '../types';
import { compressImageFile } from '../utils/imageCompressor';

interface EditsSectionProps {
  portfolio: PortfolioData;
  isDarkMode: boolean;
  onUpdatePortfolio: (newData: PortfolioData) => void;
}

export const EditsSection: React.FC<EditsSectionProps> = ({
  portfolio,
  isDarkMode,
  onUpdatePortfolio
}) => {
  const edits = portfolio.edits || [];
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedMedia, setSelectedMedia] = useState<EditItem | null>(null);
  
  // Modal states for adding/editing an Edit Item
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<EditItem | null>(null);

  // Form states
  const [formTitle, setFormTitle] = useState('');
  const [formType, setFormType] = useState<'video' | 'design' | 'reel' | 'motion'>('video');
  const [formCategoryLabel, setFormCategoryLabel] = useState('Video Edit');
  const [formDescription, setFormDescription] = useState('');
  const [formThumbnailUrl, setFormThumbnailUrl] = useState('');
  const [formMediaUrl, setFormMediaUrl] = useState('');
  const [formSoftwareUsed, setFormSoftwareUsed] = useState('Adobe Premiere Pro, After Effects');
  const [formAspectRatio, setFormAspectRatio] = useState<'16:9' | '9:16' | '1:1' | '4:5'>('16:9');
  const [formDuration, setFormDuration] = useState('1:00');

  const [visibleCount, setVisibleCount] = useState<number>(6);
  const [itemToDelete, setItemToDelete] = useState<EditItem | null>(null);

  const imageFileInputRef = useRef<HTMLInputElement>(null);
  const videoFileInputRef = useRef<HTMLInputElement>(null);
  const batchVideoInputRef = useRef<HTMLInputElement>(null);

  const [isUploadingMedia, setIsUploadingMedia] = useState(false);

  const filterTabs = [
    { id: 'all', label: 'All Edits', icon: Layers },
    { id: 'video', label: 'Video Edits', icon: Video },
    { id: 'reel', label: 'Reels & Shorts', icon: Smartphone },
    { id: 'design', label: 'Graphic Designs', icon: Palette },
    { id: 'motion', label: 'Motion Graphics', icon: Clapperboard },
  ];

  const filteredEdits = edits.filter((item) => {
    if (activeTab === 'all') return true;
    return item.type === activeTab;
  });

  const displayedEdits = filteredEdits.slice(0, visibleCount);

  // Batch Video Upload Handler (Select 4-5 or multiple videos at once)
  const handleBatchVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsUploadingMedia(true);
    const newEditItems: EditItem[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const blobUrl = URL.createObjectURL(file);
        let finalMediaUrl = blobUrl;

        // If file is reasonable size (< 30MB), convert to Data URL for persistence
        if (file.size <= 30 * 1024 * 1024) {
          try {
            finalMediaUrl = await new Promise<string>((resolve) => {
              const reader = new FileReader();
              reader.onload = (evt) => resolve((evt.target?.result as string) || blobUrl);
              reader.onerror = () => resolve(blobUrl);
              reader.readAsDataURL(file);
            });
          } catch (err) {
            console.warn('DataURL conversion failed:', err);
          }
        }

        // Generate frame thumbnail
        let frameThumbnail = 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80';
        try {
          frameThumbnail = await new Promise<string>((resolve) => {
            const video = document.createElement('video');
            video.src = blobUrl;
            video.muted = true;
            video.playsInline = true;
            video.preload = 'metadata';

            const timeout = setTimeout(() => {
              resolve(frameThumbnail);
            }, 2500);

            video.onloadedmetadata = () => {
              try {
                video.currentTime = Math.min(1.0, (video.duration || 2) / 2);
              } catch (err) {
                clearTimeout(timeout);
                resolve(frameThumbnail);
              }
            };

            video.onseeked = () => {
              clearTimeout(timeout);
              try {
                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth || 640;
                canvas.height = video.videoHeight || 360;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                  const frameDataUrl = canvas.toDataURL('image/jpeg', 0.8);
                  if (frameDataUrl && frameDataUrl.length > 200) {
                    resolve(frameDataUrl);
                    return;
                  }
                }
              } catch (err) {
                console.log('Frame capture error:', err);
              }
              resolve(frameThumbnail);
            };

            video.onerror = () => {
              clearTimeout(timeout);
              resolve(frameThumbnail);
            };
          });
        } catch (err) {
          console.warn('Thumbnail generation failed:', err);
        }

        // Clean title from filename
        const rawName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        const formattedTitle = rawName ? (rawName.charAt(0).toUpperCase() + rawName.slice(1)) : `Video Edit ${i + 1}`;

        const isReel = file.name.toLowerCase().includes('reel') || file.name.toLowerCase().includes('short') || file.name.toLowerCase().includes('tiktok');

        const newEdit: EditItem = {
          id: `batch-${Date.now()}-${i}-${Math.random().toString(36).substring(2, 7)}`,
          title: formattedTitle,
          type: isReel ? 'reel' : 'video',
          categoryLabel: isReel ? 'Reels & Shorts' : 'Commercial Edit',
          description: `High-quality video edit created by Abdul Saboor.`,
          thumbnailUrl: frameThumbnail,
          mediaUrl: finalMediaUrl,
          softwareUsed: ['Adobe Premiere Pro', 'After Effects'],
          aspectRatio: isReel ? '9:16' : '16:9',
          duration: '1:00',
          featured: true,
          date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        };

        newEditItems.push(newEdit);
      } catch (err) {
        console.error(`Error processing video ${file.name}:`, err);
      }
    }

    setIsUploadingMedia(false);

    if (newEditItems.length > 0) {
      onUpdatePortfolio({
        ...portfolio,
        edits: [...newEditItems, ...edits]
      });
      alert(`🎉 Successfully uploaded ${newEditItems.length} video(s) to your portfolio!`);
    }

    // Reset input so re-selecting same files triggers change event
    if (e.target) {
      e.target.value = '';
    }
  };

  const openAddModal = (itemToEdit?: EditItem) => {
    if (itemToEdit) {
      setEditingItem(itemToEdit);
      setFormTitle(itemToEdit.title);
      setFormType(itemToEdit.type);
      setFormCategoryLabel(itemToEdit.categoryLabel || 'Video Edit');
      setFormDescription(itemToEdit.description || '');
      setFormThumbnailUrl(itemToEdit.thumbnailUrl || '');
      setFormMediaUrl(itemToEdit.mediaUrl || '');
      setFormSoftwareUsed(itemToEdit.softwareUsed ? itemToEdit.softwareUsed.join(', ') : 'Adobe Premiere Pro');
      setFormAspectRatio(itemToEdit.aspectRatio || '16:9');
      setFormDuration(itemToEdit.duration || '1:00');
    } else {
      setEditingItem(null);
      setFormTitle('');
      setFormType('video');
      setFormCategoryLabel('Video Edit');
      setFormDescription('');
      setFormThumbnailUrl('');
      setFormMediaUrl('');
      setFormSoftwareUsed('Adobe Premiere Pro, After Effects');
      setFormAspectRatio('16:9');
      setFormDuration('1:00');
    }
    setIsAddModalOpen(true);
  };

  const handleThumbnailFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const compressedDataUrl = await compressImageFile(file, 800, 0.85);
      if (compressedDataUrl) {
        setFormThumbnailUrl(compressedDataUrl);
      }
    } catch (err) {
      console.error('Image compression error:', err);
      alert('Could not process image file.');
    }
  };

  const handleVideoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingMedia(true);
    try {
      // 1. Create Blob URL for instant immediate preview & playback
      const blobUrl = URL.createObjectURL(file);
      setFormMediaUrl(blobUrl);

      // 2. If file size is under 30MB, read as Data URL for persistent storage
      if (file.size <= 30 * 1024 * 1024) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const dataUrl = event.target?.result as string;
          if (dataUrl) {
            setFormMediaUrl(dataUrl);
          }
        };
        reader.readAsDataURL(file);
      } else {
        console.warn('Video is over 30MB, using session Blob URL and generating thumbnail frame.');
      }

      // 3. Extract thumbnail cover image frame from video using canvas
      const video = document.createElement('video');
      video.src = blobUrl;
      video.muted = true;
      video.playsInline = true;
      video.preload = 'metadata';

      video.onloadedmetadata = () => {
        try {
          video.currentTime = Math.min(1.0, (video.duration || 2) / 2);
        } catch (err) {
          console.warn('Could not set video currentTime:', err);
          setIsUploadingMedia(false);
        }
      };

      video.onseeked = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth || 640;
          canvas.height = video.videoHeight || 360;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const frameDataUrl = canvas.toDataURL('image/jpeg', 0.82);
            if (frameDataUrl && frameDataUrl.length > 200 && !formThumbnailUrl) {
              setFormThumbnailUrl(frameDataUrl);
            }
          }
        } catch (err) {
          console.log('Video frame capture skipped:', err);
        } finally {
          setIsUploadingMedia(false);
        }
      };

      video.onerror = () => {
        setIsUploadingMedia(false);
      };

      setTimeout(() => {
        setIsUploadingMedia(false);
      }, 3000);
    } catch (err) {
      console.error('Video file upload error:', err);
      alert('Could not load video file. Please check the file format.');
      setIsUploadingMedia(false);
    }
  };

  const handleSaveEditItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      alert('Please provide a title for this edit.');
      return;
    }

    const softwareArr = formSoftwareUsed
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const fallbackThumbnail = formType === 'design'
      ? 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'
      : 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80';

    const newItem: EditItem = {
      id: editingItem ? editingItem.id : `edit-${Date.now()}`,
      title: formTitle,
      type: formType,
      categoryLabel: formCategoryLabel || (formType === 'video' ? 'Video Edit' : formType === 'reel' ? 'Reel / Short' : formType === 'design' ? 'Graphic Design' : 'Motion Graphics'),
      description: formDescription,
      thumbnailUrl: formThumbnailUrl.trim() || fallbackThumbnail,
      mediaUrl: formMediaUrl.trim() || undefined,
      softwareUsed: softwareArr.length > 0 ? softwareArr : ['Adobe Premiere Pro'],
      aspectRatio: formAspectRatio,
      duration: formDuration || (formType === 'design' ? 'Graphic Design' : '1:00'),
      featured: true,
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    };

    let updatedEdits: EditItem[] = [];
    if (editingItem) {
      updatedEdits = edits.map((item) => (item.id === editingItem.id ? newItem : item));
    } else {
      updatedEdits = [newItem, ...edits];
    }

    onUpdatePortfolio({
      ...portfolio,
      edits: updatedEdits
    });

    setIsAddModalOpen(false);
  };

  const handleDeleteRequest = (item: EditItem, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setItemToDelete(item);
  };

  const handleDeleteEditItem = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const item = edits.find((i) => i.id === id);
    if (item) {
      setItemToDelete(item);
    }
  };

  const confirmDelete = () => {
    if (!itemToDelete) return;
    const updatedEdits = edits.filter((item) => item.id !== itemToDelete.id);
    onUpdatePortfolio({
      ...portfolio,
      edits: updatedEdits
    });
    if (selectedMedia?.id === itemToDelete.id) {
      setSelectedMedia(null);
    }
    if (editingItem?.id === itemToDelete.id) {
      setIsAddModalOpen(false);
    }
    setItemToDelete(null);
  };

  // Helper to resolve embeddable video links or local uploaded video blobs/data URLs
  const getEmbedInfo = (url?: string) => {
    if (!url) return { isEmbeddable: false };

    const trimmed = url.trim();

    // Direct uploaded video file (Data URL or Blob URL)
    if (trimmed.startsWith('data:video/') || trimmed.startsWith('blob:')) {
      return { isEmbeddable: true, isMp4: true, embedUrl: trimmed };
    }

    // Google Drive video link
    if (trimmed.includes('drive.google.com/file/d/')) {
      const parts = trimmed.split('/file/d/')[1]?.split('/');
      const fileId = parts?.[0];
      if (fileId) {
        return { isEmbeddable: true, isIframe: true, embedUrl: `https://drive.google.com/file/d/${fileId}/preview` };
      }
    }

    // YouTube watch or short or shortened links
    if (trimmed.includes('youtube.com/watch?v=')) {
      const id = trimmed.split('v=')[1]?.split('&')[0];
      return { isEmbeddable: true, isIframe: true, embedUrl: `https://www.youtube.com/embed/${id}?autoplay=1` };
    }
    if (trimmed.includes('youtu.be/')) {
      const id = trimmed.split('youtu.be/')[1]?.split('?')[0];
      return { isEmbeddable: true, isIframe: true, embedUrl: `https://www.youtube.com/embed/${id}?autoplay=1` };
    }
    if (trimmed.includes('youtube.com/shorts/')) {
      const id = trimmed.split('youtube.com/shorts/')[1]?.split('?')[0];
      return { isEmbeddable: true, isIframe: true, embedUrl: `https://www.youtube.com/embed/${id}?autoplay=1` };
    }
    if (trimmed.includes('youtube.com/embed/')) {
      return { isEmbeddable: true, isIframe: true, embedUrl: trimmed };
    }

    // Vimeo
    if (trimmed.includes('vimeo.com/')) {
      const id = trimmed.split('vimeo.com/')[1]?.split('?')[0];
      return { isEmbeddable: true, isIframe: true, embedUrl: `https://player.vimeo.com/video/${id}?autoplay=1` };
    }

    // Direct MP4 / WebM / MOV / M4V file extension
    const lower = trimmed.toLowerCase();
    if (lower.endsWith('.mp4') || lower.endsWith('.webm') || lower.endsWith('.mov') || lower.endsWith('.m4v') || lower.includes('.mp4?')) {
      return { isEmbeddable: true, isMp4: true, embedUrl: trimmed };
    }

    // General HTTP/HTTPS links
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      return { isEmbeddable: true, isIframe: true, embedUrl: trimmed };
    }

    return { isEmbeddable: false, rawUrl: trimmed };
  };

  return (
    <section id="my-edits" className="py-16 sm:py-24 relative overflow-hidden bg-[#080808] border-b border-neutral-900">
      
      {/* Hidden Batch Video Input */}
      <input
        type="file"
        ref={batchVideoInputRef}
        onChange={handleBatchVideoUpload}
        multiple
        accept="video/*,.mp4,.mov,.webm,.m4v,.mkv"
        className="hidden"
      />

      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-neutral-900 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bebas font-black tracking-widest uppercase border border-red-500/40 bg-red-950/80 text-red-400 mb-3 shadow-md">
              <Scissors className="w-3.5 h-3.5 text-red-500" />
              <span>CREATIVE SHOWCASE</span>
            </div>
            
            <h2 className="font-bebas text-4xl sm:text-6xl tracking-wide uppercase text-white leading-none text-3d-white">
              MY EDITS <span className="text-red-500 text-3d-red">&amp; DESIGNS</span>
            </h2>

            <p className="mt-2 text-neutral-300 text-xs sm:text-sm max-w-2xl font-sans-main leading-relaxed">
              Explore my personal collection of commercial video edits, viral Reels &amp; Shorts, motion graphics, and graphic design assets.
            </p>
          </div>

          {/* Action Buttons: Batch Upload & Add New Edit */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => batchVideoInputRef.current?.click()}
              id="batch-upload-videos-btn"
              title="Select 4-5 videos at once to upload to gallery"
              className="group relative inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-white font-bebas font-black text-xs tracking-wider shadow-md transition-all duration-300 hover:scale-[1.03] active:scale-95"
            >
              <FolderPlus className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
              <span>UPLOAD MULTIPLE VIDEOS</span>
            </button>

            <button
              onClick={() => openAddModal()}
              id="add-new-edit-btn"
              className="group relative inline-flex items-center gap-2.5 px-5 py-3 rounded-xl btn-3d-red text-white font-bebas font-black text-xs tracking-wider shadow-lg shadow-red-600/30 transition-all duration-300 hover:scale-[1.03] active:scale-95"
            >
              <Plus className="w-4 h-4 text-white group-hover:rotate-90 transition-transform duration-300" />
              <span>+ ADD EDIT / DESIGN</span>
            </button>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {filterTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const count = tab.id === 'all' ? edits.length : edits.filter((e) => e.type === tab.id).length;

            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setVisibleCount(6);
                }}
                className={`px-4 py-2.5 rounded-xl text-xs font-bebas font-black tracking-wider flex items-center gap-2 whitespace-nowrap transition-all duration-200 border ${
                  isActive
                    ? 'bg-red-600 text-white border-red-500 shadow-lg shadow-red-600/30 scale-105'
                    : 'bg-neutral-900/90 text-neutral-300 border-neutral-800 hover:border-neutral-700 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-red-500'}`} />
                <span>{tab.label.toUpperCase()}</span>
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-black ${
                  isActive ? 'bg-black/40 text-white' : 'bg-neutral-800 text-neutral-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Edits Grid Display */}
        {filteredEdits.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-3xl border border-dashed border-slate-800 bg-slate-900/40">
            <Film className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-300">No edits found in this category</h3>
            <p className="text-xs text-slate-400 mt-1 mb-4">Click below to upload videos or add your first graphic design!</p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => batchVideoInputRef.current?.click()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 text-cyan-300 border border-slate-700 font-bold text-xs hover:bg-slate-700"
              >
                <FolderPlus className="w-4 h-4 text-cyan-400" />
                <span>Upload 4-5 Videos</span>
              </button>
              <button
                onClick={() => openAddModal()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400"
              >
                <Plus className="w-4 h-4" />
                <span>Add Edit Now</span>
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {displayedEdits.map((item) => {
                const isVideo = item.type === 'video' || item.type === 'reel' || item.type === 'motion';

                return (
                  <div
                    key={item.id}
                    className="group relative rounded-3xl border border-slate-800 bg-slate-900/80 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] overflow-hidden flex flex-col justify-between"
                  >
                    {/* Card Media Preview Header */}
                    <div className={`relative overflow-hidden bg-slate-950 ${
                      item.aspectRatio === '9:16' ? 'aspect-[9/16] max-h-80' : item.aspectRatio === '4:5' ? 'aspect-[4/5] max-h-80' : 'aspect-video'
                    }`}>
                      <img
                        src={item.thumbnailUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                      {/* Category Badge Top Left */}
                      <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
                        <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-950/90 text-cyan-300 border border-cyan-500/30 backdrop-blur-md shadow-md">
                          {item.categoryLabel}
                        </span>
                      </div>

                      {/* Top Right Duration & Delete Action Bar */}
                      <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5">
                        {item.duration && (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/80 text-white backdrop-blur-md border border-white/10 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-cyan-400" />
                            <span>{item.duration}</span>
                          </span>
                        )}

                        {/* Top-Right Delete Icon Button */}
                        <button
                          onClick={(e) => handleDeleteEditItem(item.id, e)}
                          title="Delete this Video/Edit"
                          className="p-1.5 rounded-full bg-slate-950/80 hover:bg-rose-600 text-slate-300 hover:text-white border border-slate-700 transition-colors shadow-lg"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Hover Play Button Overlay for Videos */}
                      {isVideo && (
                        <button
                          onClick={() => setSelectedMedia(item)}
                          className="absolute inset-0 flex items-center justify-center z-10 focus:outline-none group/play"
                          title="Click to view video"
                        >
                          <div className="w-14 h-14 rounded-full bg-cyan-400/90 text-slate-950 flex items-center justify-center shadow-[0_0_25px_rgba(6,182,212,0.8)] group-hover/play:scale-110 transition-transform duration-300 border-2 border-white">
                            <Play className="w-6 h-6 fill-slate-950 ml-1" />
                          </div>
                        </button>
                      )}

                      {/* Image Lightbox Trigger for Graphic Designs */}
                      {!isVideo && (
                        <button
                          onClick={() => setSelectedMedia(item)}
                          className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-950/60 backdrop-blur-xs"
                        >
                          <div className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 text-xs font-black flex items-center gap-2 shadow-lg">
                            <Maximize2 className="w-4 h-4" />
                            <span>View Graphic Design</span>
                          </div>
                        </button>
                      )}

                      {/* Quick Edit & Delete Controls for Malik */}
                      <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openAddModal(item);
                          }}
                          title="Edit Item"
                          className="p-2 rounded-xl bg-slate-900/90 hover:bg-cyan-500 text-white hover:text-slate-950 border border-slate-700 transition-colors shadow-lg"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => handleDeleteEditItem(item.id, e)}
                          title="Delete Item"
                          className="p-2.5 rounded-xl bg-rose-600/90 hover:bg-rose-500 text-white border border-rose-500 transition-colors shadow-lg flex items-center gap-1 text-[11px] font-bold"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>

                    {/* Card Content Footer */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1 mb-1.5">
                          {item.title}
                        </h3>

                        {item.description && (
                          <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                            {item.description}
                          </p>
                        )}
                      </div>

                      <div>
                        {/* Software Tools Badges */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {item.softwareUsed.map((tool, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700/60"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>

                        {/* Card Action Row: Play Preview & Delete Button */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedMedia(item)}
                            className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800/90 hover:bg-cyan-500 text-slate-200 hover:text-slate-950 border border-slate-700 hover:border-cyan-400 text-xs font-black transition-all duration-200 flex items-center justify-center gap-2 group/btn"
                          >
                            {isVideo ? (
                              <>
                                <Play className="w-3.5 h-3.5 fill-current" />
                                <span>Play Preview</span>
                              </>
                            ) : (
                              <>
                                <Maximize2 className="w-3.5 h-3.5" />
                                <span>View Design</span>
                              </>
                            )}
                          </button>

                          <button
                            onClick={(e) => handleDeleteEditItem(item.id, e)}
                            title="Delete Video"
                            className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-400 hover:text-white border border-slate-700 hover:border-rose-500 text-xs transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* See More / View All Videos Pagination Option */}
            {filteredEdits.length > 6 && (
              <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
                {visibleCount < filteredEdits.length ? (
                  <button
                    onClick={() => setVisibleCount(filteredEdits.length)}
                    id="see-more-videos-btn"
                    className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-black text-xs sm:text-sm tracking-wide shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all duration-300 hover:scale-[1.03] active:scale-95"
                  >
                    <span>See More ({filteredEdits.length - visibleCount} More Items)</span>
                    <ChevronDown className="w-4 h-4 text-white group-hover:translate-y-1 transition-transform" />
                  </button>
                ) : (
                  <button
                    onClick={() => setVisibleCount(6)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white font-bold text-xs sm:text-sm transition-all"
                  >
                    <span>Show Less</span>
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* ========================================================= */}
      {/* MEDIA PREVIEW MODAL (FULL SCREEN WATCH / GRAPHIC LIGHTBOX) */}
      {/* ========================================================= */}
      {selectedMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fade-in">
          <div className="relative w-full max-w-4xl bg-slate-950 rounded-3xl border border-cyan-500/40 shadow-2xl overflow-hidden text-white flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-slate-900/90">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                  {selectedMedia.type === 'design' ? <Palette className="w-5 h-5" /> : <Video className="w-5 h-5" />}
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white line-clamp-1">{selectedMedia.title}</h3>
                  <span className="text-xs text-cyan-400 font-bold">{selectedMedia.categoryLabel}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedMedia(null)}
                className="p-2 rounded-full bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Player or Image */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 flex flex-col items-center justify-center bg-black/60">
              {(() => {
                const isVideo = selectedMedia.type === 'video' || selectedMedia.type === 'reel' || selectedMedia.type === 'motion';
                const defaultSampleVideo = selectedMedia.type === 'reel' 
                  ? "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoypasses.mp4"
                  : selectedMedia.type === 'motion'
                  ? "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
                  : "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";

                const activeMediaUrl = (selectedMedia.mediaUrl && selectedMedia.mediaUrl.trim().length > 5 && !selectedMedia.mediaUrl.endsWith('...'))
                  ? selectedMedia.mediaUrl
                  : (isVideo ? defaultSampleVideo : undefined);

                const embed = getEmbedInfo(activeMediaUrl);

                if (isVideo && embed.isEmbeddable && embed.embedUrl) {
                  if (embed.isMp4) {
                    return (
                      <div className="w-full max-h-[60vh] flex flex-col items-center justify-center relative">
                        <video
                          key={selectedMedia.id + (embed.embedUrl.substring(0, 50))}
                          src={embed.embedUrl}
                          controls
                          autoPlay
                          playsInline
                          preload="auto"
                          className="w-full max-h-[60vh] rounded-2xl object-contain bg-black shadow-2xl border border-slate-800"
                        >
                          <source src={embed.embedUrl} type="video/mp4" />
                          <source src={embed.embedUrl} type="video/webm" />
                          <source src={embed.embedUrl} type="video/quicktime" />
                          Your browser does not support HTML5 video playback.
                        </video>
                      </div>
                    );
                  }
                  return (
                    <div className="w-full aspect-video rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-black">
                      <iframe
                        src={embed.embedUrl}
                        title={selectedMedia.title}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  );
                }

                // Fallback for image / graphic design lightbox
                return (
                  <div className="relative w-full max-h-[65vh] flex items-center justify-center">
                    <img
                      src={selectedMedia.thumbnailUrl}
                      alt={selectedMedia.title}
                      className="max-h-[60vh] max-w-full rounded-2xl object-contain shadow-2xl border border-slate-800"
                    />
                  </div>
                );
              })()}

              {/* Description & Tools */}
              <div className="w-full mt-5 pt-4 border-t border-slate-800/80">
                <p className="text-sm text-slate-300 mb-4">{selectedMedia.description}</p>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs text-slate-400 font-bold">Tools Used:</span>
                    {selectedMedia.softwareUsed.map((tool, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-800 text-cyan-300 text-xs font-bold border border-slate-700">
                        {tool}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    {selectedMedia.mediaUrl && (
                      <a
                        href={selectedMedia.mediaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-black text-xs hover:bg-cyan-400 transition-colors"
                      >
                        <span>Open Link ↗</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}

                    <button
                      type="button"
                      onClick={(e) => {
                        handleDeleteEditItem(selectedMedia.id, e);
                        setSelectedMedia(null);
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs shadow-lg transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete Video</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* ADD / EDIT ITEM MODAL */}
      {/* ========================================================= */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl bg-slate-950 rounded-3xl border border-cyan-500/40 shadow-2xl overflow-hidden text-white">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-900/90">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">
                    {editingItem ? 'Edit Portfolio Item' : 'Add New Edit or Design'}
                  </h3>
                  <span className="text-xs text-slate-400">Add videos, reels, motion graphics, or graphic artwork</span>
                </div>
              </div>

              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 rounded-full bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSaveEditItem} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              
              {/* Title */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Commercial Video Edit for Luxury Shoes"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-cyan-400 focus:outline-none"
                />
              </div>

              {/* Type & Category Label */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Category Type
                  </label>
                  <select
                    value={formType}
                    onChange={(e) => {
                      const newType = e.target.value as 'video' | 'design' | 'reel' | 'motion';
                      setFormType(newType);
                      if (newType === 'video') setFormCategoryLabel('Video Edit');
                      if (newType === 'reel') setFormCategoryLabel('Reels & Shorts');
                      if (newType === 'design') setFormCategoryLabel('Graphic Design');
                      if (newType === 'motion') setFormCategoryLabel('Motion Graphics');
                    }}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="video">Video Edit</option>
                    <option value="reel">Reels &amp; Shorts (Vertical)</option>
                    <option value="design">Graphic Design</option>
                    <option value="motion">Motion Graphics</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Badge Label
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Commercial Reel / Graphic Design"
                    value={formCategoryLabel}
                    onChange={(e) => setFormCategoryLabel(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Describe your editing techniques, sound design, color grading, or design concepts..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-cyan-400 focus:outline-none"
                />
              </div>

              {/* Hidden File Inputs */}
              <input
                type="file"
                ref={imageFileInputRef}
                onChange={handleThumbnailFileUpload}
                accept="image/*"
                className="hidden"
              />
              <input
                type="file"
                ref={videoFileInputRef}
                onChange={handleVideoFileUpload}
                accept="video/*,.mp4,.mov,.webm,.m4v,.mkv"
                className="hidden"
              />

              {/* Upload Media Section */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                    <Video className="w-4 h-4 text-cyan-400" />
                    <span>Upload Video &amp; Image Media</span>
                  </span>
                  {isUploadingMedia && (
                    <span className="text-xs text-amber-400 font-bold animate-pulse">
                      Processing Video &amp; Extracting Frame...
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Upload Video File Button */}
                  <button
                    type="button"
                    onClick={() => videoFileInputRef.current?.click()}
                    className="p-3.5 rounded-xl bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-cyan-300 border border-slate-700 hover:border-cyan-400 text-xs font-extrabold flex items-center justify-center gap-2 transition-all group"
                  >
                    <Video className="w-4 h-4 text-cyan-400 group-hover:text-slate-950" />
                    <span>Upload Video File (From Gallery)</span>
                  </button>

                  {/* Upload Thumbnail/Photo Button */}
                  <button
                    type="button"
                    onClick={() => imageFileInputRef.current?.click()}
                    className="p-3.5 rounded-xl bg-slate-800 hover:bg-purple-500 hover:text-white text-purple-300 border border-slate-700 hover:border-purple-400 text-xs font-extrabold flex items-center justify-center gap-2 transition-all group"
                  >
                    <Upload className="w-4 h-4 text-purple-400 group-hover:text-white" />
                    <span>Upload Photo / Graphic</span>
                  </button>
                </div>

                {/* Video Media Link / Data URL */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Video Media URL or YouTube / Shorts / Google Drive Link
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. https://www.youtube.com/watch?v=... or Google Drive link or upload video file above"
                    value={formMediaUrl}
                    onChange={(e) => setFormMediaUrl(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:border-cyan-400 focus:outline-none"
                  />
                  {formMediaUrl.startsWith('data:video') && (
                    <p className="text-[11px] text-emerald-400 font-bold mt-1.5 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Video File Loaded &amp; Saved directly!
                    </p>
                  )}

                  {/* Form Live Video Test Player */}
                  {formMediaUrl && formMediaUrl.trim().length > 5 && (
                    <div className="mt-3 p-2.5 rounded-xl bg-slate-950 border border-cyan-500/30">
                      <p className="text-[10px] font-black uppercase text-cyan-400 mb-1.5 flex items-center gap-1">
                        <Play className="w-3 h-3 fill-current" /> Live Video Preview Test:
                      </p>
                      {(() => {
                        const testEmbed = getEmbedInfo(formMediaUrl);
                        if (testEmbed.isMp4) {
                          return (
                            <video
                              src={testEmbed.embedUrl}
                              controls
                              muted
                              playsInline
                              className="w-full max-h-40 rounded-lg bg-black object-contain border border-slate-800"
                            />
                          );
                        }
                        if (testEmbed.isIframe) {
                          return (
                            <div className="w-full aspect-video max-h-40 rounded-lg overflow-hidden border border-slate-800 bg-black">
                              <iframe
                                src={testEmbed.embedUrl}
                                className="w-full h-full border-0"
                                title="Video Preview"
                              />
                            </div>
                          );
                        }
                        return (
                          <p className="text-[11px] text-slate-400 italic">
                            Link set: <a href={formMediaUrl} target="_blank" rel="noreferrer" className="text-cyan-400 underline">{formMediaUrl.substring(0, 40)}...</a>
                          </p>
                        );
                      })()}
                    </div>
                  )}
                </div>

                {/* Cover Thumbnail Image URL */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Cover / Graphic Thumbnail Image
                  </label>
                  <input
                    type="text"
                    placeholder="https://... or upload photo above"
                    value={formThumbnailUrl}
                    onChange={(e) => setFormThumbnailUrl(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Software Used & Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Software Used (Comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Premiere Pro, After Effects, Photoshop"
                    value={formSoftwareUsed}
                    onChange={(e) => setFormSoftwareUsed(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Duration / Label
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 0:45 or 1:30 or Graphic Poster"
                    value={formDuration}
                    onChange={(e) => setFormDuration(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Aspect Ratio */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Card Display Aspect Ratio
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: '16:9', label: '16:9 Landscape' },
                    { id: '9:16', label: '9:16 Vertical Reel' },
                    { id: '1:1', label: '1:1 Square' },
                    { id: '4:5', label: '4:5 Social Post' },
                  ].map((ratio) => (
                    <button
                      key={ratio.id}
                      type="button"
                      onClick={() => setFormAspectRatio(ratio.id as any)}
                      className={`py-2 px-1 rounded-xl text-xs font-bold text-center border transition-all ${
                        formAspectRatio === ratio.id
                          ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                          : 'bg-slate-900 text-slate-400 border-slate-800'
                      }`}
                    >
                      {ratio.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Buttons */}
              <div className="pt-4 flex items-center justify-between gap-3 border-t border-slate-800">
                {editingItem ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      handleDeleteEditItem(editingItem.id, e);
                      setIsAddModalOpen(false);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-rose-600/80 hover:bg-rose-600 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete This Item</span>
                  </button>
                ) : <div />}

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-black text-xs hover:from-cyan-400 hover:to-indigo-500 shadow-lg"
                  >
                    {editingItem ? 'Update Edit' : 'Save To Portfolio'}
                  </button>
                </div>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* CUSTOM DELETE CONFIRMATION MODAL */}
      {/* ========================================================= */}
      {itemToDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative bg-slate-900 border border-rose-500/40 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-[0_0_50px_rgba(244,63,94,0.25)] text-center">
            
            {/* Trash Icon Badge */}
            <div className="w-16 h-16 rounded-2xl bg-rose-500/20 text-rose-500 border border-rose-500/40 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Trash2 className="w-8 h-8" />
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
              Delete Video / Edit?
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
              Are you sure you want to permanently delete <span className="font-bold text-cyan-300">"{itemToDelete.title}"</span> from your portfolio gallery?
            </p>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setItemToDelete(null)}
                className="flex-1 py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm transition-colors border border-slate-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                id="confirm-delete-btn"
                className="flex-1 py-3 px-4 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs sm:text-sm shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Yes, Delete</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
