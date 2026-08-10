import React, { useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Download, 
  Edit2,
  Globe,
  PhoneCall,
  Play,
  X,
  Film,
  Volume2,
  ShoppingBag,
  ArrowUpRight
} from 'lucide-react';
import { PortfolioData } from '../types';

interface HeroSectionProps {
  portfolio: PortfolioData;
  isDarkMode?: boolean;
  onOpenResume: () => void;
  onOpenEdit: () => void;
  onUpdatePortfolio?: (updated: PortfolioData) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  portfolio,
  onOpenResume,
  onOpenEdit,
}) => {
  const [showVideoModal, setShowVideoModal] = useState(false);

  const whatsappNumber = "923329742260";
  const whatsappDisplayNumber = "03329742260";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi MALIK ABDUL SABOOR, I saw your portfolio and would like to discuss a project!")}`;

  return (
    <section id="about" className="pt-28 sm:pt-36 pb-16 md:pb-24 relative overflow-hidden bg-[#080808] text-white transition-colors border-b border-neutral-900">
      
      {/* Dynamic 3D Floating Ambient Light Orbs */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-red-600/15 rounded-full blur-3xl animate-float-orb pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-red-900/10 rounded-full blur-3xl animate-float-orb pointer-events-none" style={{ animationDelay: '3s' }} />

      {/* GIGANTIC CRIMSON BACKDROP HEADLINE: "PORTFOLIO" */}
      <div className="absolute top-20 sm:top-24 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none z-0 overflow-hidden opacity-90">
        <h1 className="font-bebas text-[22vw] sm:text-[20vw] font-black text-red-600 leading-none tracking-tight text-glow-red">
          PORTFOLIO
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HERO CONTENT THREE-COLUMN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[580px] pt-4 sm:pt-12">
          
          {/* LEFT COLUMN: Hello Cursive + Single Bold ABDUL SABOOR Title + Subtitle + Bio */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left">
            
            {/* Cursive Handwriting Overlay */}
            <div className="font-handwriting text-3xl sm:text-5xl text-red-400 tracking-wide mb-1 opacity-90">
              Hello, I'm
            </div>

            {/* Single Giant Condensed Headline with 3D Shine Effect */}
            <h1 className="font-bebas text-6xl sm:text-8xl lg:text-8xl font-black text-white leading-none tracking-tight uppercase text-3d-white">
              ABDUL <br />
              <span className="text-red-500 text-3d-red">SABOOR</span>
            </h1>

            {/* Red Subtitle Badge with Soundwave Visualizer */}
            <div className="mt-4 flex items-center gap-3">
              <span className="font-bebas text-xl sm:text-2xl font-bold tracking-wider text-red-500 uppercase">
                VIDEO EDITOR & DIGITAL MEDIA CREATOR
              </span>

              {/* Soundwave Bars Visualizer */}
              <div className="hidden sm:flex items-center gap-1 h-5">
                <span className="w-1 bg-red-500 rounded-full soundwave-bar" style={{ animationDelay: '0s' }}></span>
                <span className="w-1 bg-red-400 rounded-full soundwave-bar" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-1 bg-red-600 rounded-full soundwave-bar" style={{ animationDelay: '0.4s' }}></span>
                <span className="w-1 bg-red-500 rounded-full soundwave-bar" style={{ animationDelay: '0.1s' }}></span>
              </div>
            </div>

            {/* Bio Paragraph */}
            <p className="mt-4 text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-md font-sans-main">
              I design and build high-converting video campaigns, digital media assets, and e-commerce software solutions that combine video editing craftsmanship with performance strategy.
            </p>

            {/* Available Worldwide Badge & Direct Lylo Store Link */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/90 text-xs font-black text-neutral-200 shadow-md">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <Globe className="w-3.5 h-3.5 text-red-500" />
                <span className="font-bebas font-bold tracking-wider text-sm">AVAILABLE WORLDWIDE</span>
              </div>

              {/* Direct Link to Lylo Web Store */}
              <a
                href="https://ais-pre-yfltm4x7chjq5khrgnqlh3-159123720771.asia-east1.run.app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-red-500 bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-500 hover:to-red-600 transition-all text-xs font-bebas font-black tracking-wider shadow-lg shadow-red-600/40 hover:scale-105 active:scale-95"
              >
                <ShoppingBag className="w-4 h-4 fill-white text-red-700" />
                <span className="text-sm font-black">VISIT LYLO STORE (LIVE WEB APP)</span>
                <ArrowUpRight className="w-4 h-4 text-white" />
              </a>
            </div>

          </div>

          {/* CENTER COLUMN: PORTRAIT IMAGE LAYERED WITH 3D SHADOW & GLASS BADGE */}
          <div className="lg:col-span-4 flex justify-center items-end relative py-4 sm:py-0">
            <div className="relative w-64 sm:w-80 md:w-96 aspect-[3/4] group card-3d">
              
              {/* Crimson Atmosphere Glow */}
              <div className="absolute inset-0 rounded-3xl bg-red-600/25 blur-2xl transition-all group-hover:scale-110" />
              
              {/* Photo Frame */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-900 shine-overlay">
                <img
                  src={portfolio.avatarUrl}
                  alt={portfolio.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Dark Vignette Blend */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-85" />
                
                {/* Floating 3D Badge on Image */}
                <div className="absolute top-4 left-4 glass-3d px-3 py-1.5 rounded-xl flex items-center gap-2 text-white border border-red-500/40 shadow-xl">
                  <Film className="w-4 h-4 text-red-500" />
                  <span className="font-bebas text-xs tracking-wider">DIRECTOR & EDITOR</span>
                </div>
              </div>

              {/* Quick Edit Profile Photo Button */}
              <button
                onClick={onOpenEdit}
                title="Change Profile Photo"
                className="absolute bottom-3 right-3 p-2.5 rounded-full bg-neutral-900 text-white shadow-xl border border-neutral-700 hover:bg-red-600 transition-all z-20"
              >
                <Edit2 className="w-4 h-4 text-red-500 hover:text-white" />
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: FLOATING BADGE & 3D METRICS */}
          <div className="lg:col-span-3 flex flex-col justify-center items-start lg:items-end text-left lg:text-right gap-6">
            
            {/* Quote / Star Floating Card */}
            <div className="p-4 rounded-2xl border border-neutral-800 bg-neutral-900/90 backdrop-blur-md max-w-xs text-left card-3d shadow-xl">
              <div className="flex items-center gap-2 mb-2 text-red-500">
                <Sparkles className="w-4 h-4 fill-red-500" />
                <span className="font-bebas text-xs tracking-wider uppercase text-neutral-400">CREATIVE PHILOSOPHY</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed font-sans-main">
                Turning creative ideas into high-converting video campaigns and digital experiences.
              </p>
            </div>

            {/* Key Metric Stats List */}
            <div className="space-y-5 w-full max-w-xs">
              
              {/* Metric 1 */}
              <div className="flex items-baseline justify-between lg:justify-end lg:gap-4 border-b border-neutral-900 pb-3">
                <div className="font-bebas text-4xl sm:text-5xl font-black text-white text-3d-white">
                  4<span className="text-red-500 text-3d-red">+</span>
                </div>
                <div className="font-bebas text-xs sm:text-sm text-neutral-400 tracking-widest uppercase">
                  YEARS <br /> EXPERIENCE
                </div>
              </div>

              {/* Metric 2 */}
              <div className="flex items-baseline justify-between lg:justify-end lg:gap-4 border-b border-neutral-900 pb-3">
                <div className="font-bebas text-4xl sm:text-5xl font-black text-white text-3d-white">
                  18<span className="text-red-500 text-3d-red">+</span>
                </div>
                <div className="font-bebas text-xs sm:text-sm text-neutral-400 tracking-widest uppercase">
                  PROJECTS <br /> COMPLETED
                </div>
              </div>

              {/* Metric 3 */}
              <div className="flex items-baseline justify-between lg:justify-end lg:gap-4 border-b border-neutral-900 pb-3">
                <div className="font-bebas text-4xl sm:text-5xl font-black text-white text-3d-white">
                  66.1K<span className="text-red-500 text-3d-red">+</span>
                </div>
                <div className="font-bebas text-xs sm:text-sm text-neutral-400 tracking-widest uppercase">
                  YOUTUBE <br /> SUBSCRIBERS
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* BOTTOM ACTION BAR WITH 3D BUTTONS */}
        <div className="mt-12 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center shrink-0 shadow-lg">
              <PhoneCall className="w-4 h-4 animate-bounce" />
            </div>
            <div>
              <div className="font-bebas text-xs text-neutral-400 tracking-wider">DIRECT WHATSAPP</div>
              <div className="text-xs sm:text-sm font-bold text-white font-mono">{whatsappDisplayNumber}</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bebas text-sm tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30"
            >
              <PhoneCall className="w-4 h-4" />
              <span>CHAT ON WHATSAPP</span>
            </a>

            <a
              href="#projects"
              className="flex-1 sm:flex-none px-6 py-3 rounded-lg btn-3d-red text-white font-bebas text-sm tracking-wider transition-all flex items-center justify-center gap-2"
            >
              <span>EXPLORE SELECTED PROJECTS</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={onOpenResume}
              className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-red-600 transition-colors"
              title="Download CV"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

      {/* 3D VIDEO REEL SHOWCASE MODAL */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-4xl bg-[#0c0c0d] rounded-2xl border border-red-600/40 p-6 shadow-2xl glass-3d">
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <Film className="w-6 h-6 text-red-500" />
              <div>
                <h3 className="font-bebas text-2xl text-white uppercase tracking-wide">
                  ABDUL SABOOR — VIDEO EDITING SHOWREEL
                </h3>
                <p className="text-xs text-neutral-400 font-sans-main">
                  High-retention social media hooks, e-commerce promos, and YouTube automation edits.
                </p>
              </div>
            </div>

            {/* Video Player Mockup Container */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800 flex items-center justify-center group">
              <img
                src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80"
                alt="Showreel Preview"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />

              {/* Glowing Play Button */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 w-20 h-20 rounded-full bg-red-600 text-white flex items-center justify-center shadow-2xl shadow-red-600/60 hover:scale-110 transition-transform"
              >
                <Play className="w-8 h-8 fill-current ml-1" />
              </a>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-bebas tracking-wider text-neutral-300">
                <span className="flex items-center gap-1.5">
                  <Volume2 className="w-4 h-4 text-red-500" /> 1080P 60FPS FULL HD REEL
                </span>
                <span>DURATION: 01:45</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};





