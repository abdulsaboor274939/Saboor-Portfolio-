import React, { useRef } from 'react';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  MapPin, 
  ArrowRight, 
  Sparkles, 
  Download, 
  Terminal, 
  Edit2,
  Crown,
  Youtube,
  Briefcase,
  Award,
  Camera,
  Video,
  Palette,
  Share2,
  Megaphone,
  PhoneCall,
  Upload
} from 'lucide-react';
import { PortfolioData } from '../types';
import { compressImageFile } from '../utils/imageCompressor';
import { TechVideoBackground } from './TechVideoBackground';

interface HeroSectionProps {
  portfolio: PortfolioData;
  isDarkMode: boolean;
  onOpenResume: () => void;
  onOpenEdit: () => void;
  onUpdatePortfolio?: (updated: PortfolioData) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  portfolio,
  isDarkMode,
  onOpenResume,
  onOpenEdit,
  onUpdatePortfolio
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Direct profile photo upload handler using canvas compression
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const compressedDataUrl = await compressImageFile(file, 600, 0.82);
      if (compressedDataUrl && onUpdatePortfolio) {
        const updated = {
          ...portfolio,
          avatarUrl: compressedDataUrl
        };
        onUpdatePortfolio(updated);
      }
    } catch (err) {
      console.error("Photo upload error:", err);
      alert("Could not process image file. Please try another image.");
    }
  };

  const roles = [
    { label: "Digital Marketer", icon: Megaphone, color: "text-zinc-100 bg-zinc-900/90 border-zinc-700" },
    { label: "Video Editor", icon: Video, color: "text-zinc-100 bg-zinc-900/90 border-zinc-700" },
    { label: "Social Media Manager", icon: Share2, color: "text-zinc-100 bg-zinc-900/90 border-zinc-700" },
    { label: "Graphic Designer", icon: Palette, color: "text-zinc-100 bg-zinc-900/90 border-zinc-700" },
  ];

  const whatsappNumber = "923329742260";
  const whatsappDisplayNumber = "03329742260";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi MALIK ABDUL SABOOR, I saw your portfolio and would like to discuss a project!")}`;

  return (
    <section id="about" className={`pt-24 sm:pt-32 pb-16 md:pb-24 overflow-hidden relative transition-colors ${
      isDarkMode ? 'bg-[#080d1a] text-white' : 'bg-[#0d172a] text-white'
    }`}>
      
      {/* 3D Raw Animated Tech Video Background */}
      <TechVideoBackground />

      {/* Decent Cyan & Violet Atmosphere Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Balanced Responsive Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Main Content Column */}
          <div className="lg:col-span-7 flex flex-col items-center sm:items-start text-center sm:text-left">
            
            {/* Flagship LYLO Web Store App Banner */}
            <a
              href="https://ais-pre-yfltm4x7chjq5khrgnqlh3-159123720771.asia-east1.run.app"
              target="_blank"
              rel="noopener noreferrer"
              className="group mb-5 w-full sm:w-auto inline-flex items-center gap-2.5 p-1.5 pr-4 rounded-2xl border border-cyan-400/50 bg-gradient-to-r from-cyan-950/90 via-slate-900/90 to-indigo-950/90 hover:border-cyan-300 text-white shadow-[0_0_25px_rgba(6,182,212,0.35)] transition-all duration-300 hover:scale-[1.02] backdrop-blur-xl"
            >
              <span className="px-3 py-1.5 rounded-xl bg-cyan-400 text-slate-950 text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md shrink-0">
                <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
                <span>LYLO Web App</span>
              </span>
              <span className="text-xs font-black text-cyan-200 group-hover:text-white transition-colors truncate">
                Live Personal Custom E-Store ↗
              </span>
              <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform ml-auto shrink-0" />
            </a>

            {/* Status / Availability Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase border border-cyan-500/30 bg-cyan-950/60 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.2)] mb-5 backdrop-blur-md">
              <Crown className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span className="text-center sm:text-left">{portfolio.statusText}</span>
            </div>

            {/* Main Name Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-4 text-white">
              Hi, I'm <span className="text-cyan-shine text-glow-cyan">MALIK ABDUL SABOOR</span>
            </h1>

            {/* Requested Roles Pill Badges */}
            <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 mb-6">
              {roles.map((role, idx) => {
                const Icon = role.icon;
                return (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold border border-cyan-500/25 bg-slate-900/80 text-cyan-200 backdrop-blur-md shadow-md hover:scale-105 transition-transform"
                  >
                    <Icon className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{role.label}</span>
                  </span>
                );
              })}
            </div>

            <h2 className="text-base sm:text-lg font-bold mb-5 flex items-center justify-center sm:justify-start gap-2 text-slate-200">
              <Terminal className="w-4 h-4 text-cyan-400 inline-block shrink-0" />
              <span className="tracking-wide text-center sm:text-left">{portfolio.tagline}</span>
            </h2>

            {/* Bio / About */}
            <p className="text-sm sm:text-base leading-relaxed mb-8 max-w-2xl text-slate-300 font-normal">
              {portfolio.about}
            </p>

            {/* Key Metric Cards - Mobile Single/Double Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8 w-full max-w-2xl">
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-cyan-500/20 backdrop-blur-md flex items-center gap-3 shadow-lg hover:border-cyan-400/50 transition-all">
                <div className="p-2.5 rounded-xl bg-cyan-500 text-slate-950 font-black">
                  <Youtube className="w-4 h-4 fill-slate-950" />
                </div>
                <div className="text-left">
                  <div className="text-xs text-white font-bold">66.1K+ Subs</div>
                  <div className="text-[10px] text-cyan-300/80 font-medium">Bolt Mindz YT</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-indigo-500/20 backdrop-blur-md flex items-center gap-3 shadow-lg hover:border-indigo-400/50 transition-all">
                <div className="p-2.5 rounded-xl bg-indigo-500 text-white font-black">
                  <Briefcase className="w-4 h-4 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-xs text-white font-bold">Software House</div>
                  <div className="text-[10px] text-indigo-200/80 font-medium">Beast Mod Studio</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-emerald-500/20 backdrop-blur-md flex items-center gap-3 col-span-2 sm:col-span-1 shadow-lg hover:border-emerald-400/50 transition-all">
                <div className="p-2.5 rounded-xl bg-emerald-500 text-slate-950 font-black">
                  <Award className="w-4 h-4 text-slate-950" />
                </div>
                <div className="text-left">
                  <div className="text-xs text-white font-bold">Lead Designer</div>
                  <div className="text-[10px] text-emerald-200/80 font-medium">Hult Prize PK</div>
                </div>
              </div>
            </div>

            {/* Quick Action CTAs - Responsive Mobile & Desktop Layout */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8 w-full">
              {/* Direct WhatsApp Action Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-3d-emerald flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl font-extrabold text-sm tracking-wide shadow-xl"
                id="hero-whatsapp-btn"
              >
                <PhoneCall className="w-4 h-4 text-white animate-bounce" />
                <span>WhatsApp Direct ({whatsappDisplayNumber})</span>
              </a>

              <a
                href="#projects"
                className="btn-3d-cyan flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-sm tracking-wide"
                id="hero-view-projects-btn"
              >
                <span>View 18+ Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenResume}
                className="flex items-center justify-center gap-2 px-5 py-4 rounded-xl font-bold text-sm transition-all border border-indigo-500/30 bg-slate-900/80 text-indigo-200 hover:bg-indigo-600 hover:text-white shadow-md"
                id="hero-resume-btn"
              >
                <Download className="w-4 h-4 text-indigo-300" />
                <span>CV / Resume</span>
              </button>
            </div>

            {/* Social Links & Location */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-4 border-t border-cyan-500/15 w-full">
              {portfolio.socials.location && (
                <div className="flex items-center gap-1.5 text-xs font-medium mr-2 text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{portfolio.socials.location}</span>
                </div>
              )}

              <div className="flex items-center gap-2">
                {portfolio.socials.github && (
                  <a
                    href={portfolio.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="GitHub Profile"
                    className="p-2.5 rounded-xl bg-slate-900 text-slate-300 border border-slate-700 hover:text-white hover:border-cyan-400 hover:bg-slate-800 transition-all shadow-md"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}

                {portfolio.socials.linkedin && (
                  <a
                    href={portfolio.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="LinkedIn Profile"
                    className="p-2.5 rounded-xl bg-slate-900 text-slate-300 border border-slate-700 hover:text-white hover:border-cyan-400 hover:bg-slate-800 transition-all shadow-md"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="WhatsApp Direct Chat"
                  className="p-2.5 rounded-xl bg-emerald-600 text-white border border-emerald-400 hover:bg-emerald-500 transition-all shadow-md"
                >
                  <PhoneCall className="w-4 h-4" />
                </a>

                <a
                  href={`mailto:${portfolio.socials.email}`}
                  title="Send Direct Email"
                  className="p-2.5 rounded-xl bg-slate-900 text-slate-300 border border-slate-700 hover:text-white hover:border-cyan-400 hover:bg-slate-800 transition-all shadow-md"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

          {/* Profile Card Column - Perfectly proportioned for Mobile & Desktop */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center w-full relative">
            
            {/* Top Left Floating Graphic Card (LYLO Store) */}
            <a
              href="https://ais-pre-yfltm4x7chjq5khrgnqlh3-159123720771.asia-east1.run.app"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex absolute -top-5 -left-4 z-20 items-center gap-2.5 p-2.5 px-4 rounded-2xl border border-cyan-400/50 bg-slate-950/90 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] backdrop-blur-xl hover:scale-105 transition-all group"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <div>
                <div className="text-[10px] font-black uppercase text-cyan-400 tracking-wider">Personal E-Store</div>
                <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">LYLO Web Live ↗</div>
              </div>
            </a>

            {/* Bottom Right Floating Graphic Card (Beast Mod Studio) */}
            <div className="hidden sm:flex absolute -bottom-5 -right-4 z-20 items-center gap-2.5 p-2.5 px-4 rounded-2xl border border-indigo-500/40 bg-slate-950/90 text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] backdrop-blur-xl">
              <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
                <Crown className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-[10px] font-black uppercase text-indigo-400 tracking-wider">Software House</div>
                <div className="text-xs font-bold text-white">Beast Mod Studio</div>
              </div>
            </div>

            <div className="relative w-full max-w-sm sm:max-w-md rounded-3xl p-6 sm:p-8 card-3d-glass transition-all border-cyan-500/30">
              
              {/* Badge */}
              <div className="absolute -top-4 right-6 sm:right-8 btn-3d-cyan px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider shadow-lg flex items-center gap-1">
                <Crown className="w-3.5 h-3.5 fill-white" />
                <span>Executive Director</span>
              </div>

              {/* Profile Image with Direct Photo Upload Overlay */}
              <div className="relative mx-auto w-36 h-36 sm:w-44 sm:h-44 mb-6 group">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white via-zinc-400 to-zinc-700 animate-spin-slow p-1 shadow-2xl">
                  <div className="w-full h-full rounded-full bg-zinc-950" />
                </div>
                
                <img
                  src={portfolio.avatarUrl}
                  alt={portfolio.name}
                  className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] rounded-full object-cover border-2 border-white/80 shadow-2xl"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />

                {/* Hidden File Input for Direct Photo Change */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handlePhotoUpload}
                  accept="image/*"
                  className="hidden"
                />

                {/* Interactive Upload Photo Button on Hover or Click */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  title="Upload / Change Profile Photo"
                  className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] rounded-full bg-zinc-950/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-1 text-white border-2 border-white cursor-pointer z-10"
                >
                  <Camera className="w-6 h-6 text-white animate-bounce" />
                  <span className="text-[11px] font-extrabold tracking-wider uppercase text-zinc-200">Change Photo</span>
                </button>

                {/* Floating Badge */}
                <div className="absolute -bottom-2 -right-2 bg-white text-zinc-950 p-2.5 rounded-2xl shadow-xl flex items-center justify-center border-2 border-zinc-950 animate-float-slow">
                  <Sparkles className="w-4 h-4 fill-zinc-950" />
                </div>
              </div>

              {/* Direct Upload Photo Button for Mobile & Desktop */}
              <div className="flex justify-center mb-5">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-zinc-800/90 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 text-xs font-bold transition-all shadow-sm group hover:border-zinc-500"
                >
                  <Upload className="w-3.5 h-3.5 text-white group-hover:scale-110 transition-transform" />
                  <span>Upload Your Photo</span>
                </button>
              </div>

              {/* Quick Info */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-black text-white tracking-tight">
                  MALIK ABDUL SABOOR
                </h3>
                <p className="text-xs font-semibold text-zinc-300 mt-1">
                  {portfolio.socials.email}
                </p>

                {/* Direct WhatsApp Callout Pill */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-emerald-600/90 text-white hover:bg-emerald-500 transition-all shadow-md"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>WhatsApp: {whatsappDisplayNumber}</span>
                </a>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-2.5 pt-4 border-t border-zinc-800">
                <div className="text-center p-2.5 rounded-2xl bg-zinc-900/90 border border-zinc-800">
                  <div className="text-lg font-black text-white">4+</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    Years Exp.
                  </div>
                </div>

                <div className="text-center p-2.5 rounded-2xl bg-zinc-900/90 border border-zinc-800">
                  <div className="text-lg font-black text-white">
                    18+
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    Projects
                  </div>
                </div>

                <div className="text-center p-2.5 rounded-2xl bg-zinc-900/90 border border-zinc-800">
                  <div className="text-lg font-black text-white">66.1K</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    YT Subs
                  </div>
                </div>
              </div>

              {/* Edit Portfolio Helper button */}
              <button
                onClick={onOpenEdit}
                className="w-full mt-5 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold border border-zinc-700 text-zinc-300 hover:border-white hover:text-white transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5 text-zinc-300" />
                <span>Customize Profile Data</span>
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};


