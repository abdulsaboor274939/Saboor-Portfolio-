import React from 'react';

// 1. Beast Mode Studio Logo (Lion Shield in Gold & Dark Bronze)
export const BeastModeStudioLogo: React.FC<{ className?: string }> = ({ className = "w-full h-full" }) => (
  <div className={`relative flex flex-col items-center justify-center bg-slate-950 p-6 rounded-2xl border border-amber-500/30 overflow-hidden shadow-2xl group ${className}`}>
    {/* Geometric glow mesh background */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/15 via-slate-950 to-slate-950" />
    
    {/* Shield & Lion SVG */}
    <div className="relative z-10 w-24 h-24 mb-3 transition-transform duration-500 group-hover:scale-105">
      <svg viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_10px_20px_rgba(217,119,6,0.3)]">
        <defs>
          <linearGradient id="bms-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="30%" stopColor="#f59e0b" />
            <stop offset="70%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>
          <linearGradient id="bms-shield" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e1b4b" />
            <stop offset="50%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Shield Frame */}
        <path
          d="M100 10 L180 40 V110 C180 160 100 205 100 205 C100 205 20 160 20 110 V40 L100 10 Z"
          fill="url(#bms-shield)"
          stroke="url(#bms-gold)"
          strokeWidth="6"
        />

        {/* Inner Shield Accent */}
        <path
          d="M100 22 L168 48 V108 C168 150 100 190 100 190 C100 190 32 150 32 108 V48 L100 22 Z"
          fill="none"
          stroke="url(#bms-gold)"
          strokeWidth="2"
          strokeOpacity="0.5"
        />

        {/* Metallic Lion Head Silhouette */}
        <g fill="url(#bms-gold)">
          {/* Mane Left */}
          <path d="M55 70 C45 85 50 110 65 125 C55 115 50 100 55 70 Z" />
          <path d="M42 88 C38 105 45 125 60 138 C50 128 42 110 42 88 Z" />
          {/* Mane Right */}
          <path d="M145 70 C155 85 150 110 135 125 C145 115 150 100 145 70 Z" />
          <path d="M158 88 C162 105 155 125 140 138 C150 128 158 110 158 88 Z" />
          
          {/* Crown / Top Mane */}
          <path d="M100 45 L115 65 L100 60 L85 65 L100 45 Z" />
          <path d="M75 58 L90 70 L100 60 L80 50 Z" />
          <path d="M125 58 L110 70 L100 60 L120 50 Z" />

          {/* Forehead & Bridge */}
          <polygon points="100,65 112,85 100,100 88,85" opacity="0.9" />
          
          {/* Cheeks & Snout */}
          <path d="M88 85 L100 100 L70 120 L65 95 Z" />
          <path d="M112 85 L100 100 L130 120 L135 95 Z" />
          
          {/* Nose & Muzzle */}
          <polygon points="100,105 108,118 92,118" />
          <path d="M100 118 L100 130 L90 138 L100 132 L110 138 L100 130 Z" />
          
          {/* Chin & Jaw Shield */}
          <path d="M100 135 L118 152 L100 170 L82 152 Z" />
        </g>
      </svg>
    </div>

    {/* Brand Name Typography */}
    <div className="relative z-10 text-center">
      <h4 className="text-xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 uppercase">
        BEAST MODE
      </h4>
      <div className="text-xs font-bold tracking-[0.3em] text-amber-200/80 uppercase mt-0.5">
        STUDIO
      </div>
      <p className="text-[10px] text-amber-300/60 font-medium tracking-wider uppercase mt-1">
        Elevating Digital Excellence
      </p>
    </div>
  </div>
);

// 2. VELORA Femme Couture Logo (Luxury Monogram)
export const VeloraLogo: React.FC<{ className?: string }> = ({ className = "w-full h-full" }) => (
  <div className={`relative flex flex-col items-center justify-center bg-stone-100 dark:bg-stone-900 p-6 rounded-2xl border border-amber-300/40 dark:border-amber-500/20 shadow-xl group ${className}`}>
    {/* Subtle texture background */}
    <div className="absolute inset-0 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />

    {/* Monogram SVG */}
    <div className="relative z-10 w-24 h-24 mb-2 transition-transform duration-500 group-hover:scale-105">
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <linearGradient id="velora-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#92400e" />
          </linearGradient>
        </defs>

        {/* 'V' Stem */}
        <path
          d="M45 40 L85 160 H105 L65 40 H45 Z"
          fill="url(#velora-gold)"
        />

        {/* Intricate Floral Floral 'O' Motif */}
        <path
          d="M125 50 C90 50 80 85 80 115 C80 150 110 160 140 160 C175 160 185 125 185 95 C185 60 155 50 125 50 Z M130 70 C150 70 165 85 165 105 C165 130 148 142 130 142 C110 142 98 128 98 105 C98 82 112 70 130 70 Z"
          fill="url(#velora-gold)"
        />

        {/* Floral Leaves & Diamond accents inside Motif */}
        <path
          d="M120 75 C125 65 140 65 145 75 C140 85 125 85 120 75 Z"
          fill="url(#velora-gold)"
        />
        <path
          d="M100 110 C105 100 118 102 120 112 C112 120 102 118 100 110 Z"
          fill="url(#velora-gold)"
        />
        <circle cx="130" cy="105" r="4" fill="#ffffff" />
        <circle cx="145" cy="95" r="3" fill="#ffffff" />
        <circle cx="118" cy="125" r="3" fill="#ffffff" />
      </svg>
    </div>

    {/* Typography */}
    <div className="relative z-10 text-center">
      <h4 className="text-2xl font-serif font-bold tracking-[0.25em] text-amber-800 dark:text-amber-300 uppercase">
        VELORA
      </h4>
      <div className="text-[10px] font-sans font-semibold tracking-[0.35em] text-amber-900/70 dark:text-amber-200/70 uppercase mt-1">
        FEMME COUTURE
      </div>
    </div>
  </div>
);

// 3. FLX WAVE Logo (Stylized Gold Modern Tech Logo)
export const FlxWaveLogo: React.FC<{ className?: string }> = ({ className = "w-full h-full" }) => (
  <div className={`relative flex flex-col items-center justify-center bg-black p-6 rounded-2xl border border-amber-500/25 shadow-2xl group ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent pointer-events-none" />

    {/* FLX WAVE SVG */}
    <div className="relative z-10 w-full max-w-[220px] h-20 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
      <svg viewBox="0 0 320 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <linearGradient id="flx-gold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="40%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
        </defs>

        {/* F */}
        <path d="M20 25 H55 V35 H32 V45 H50 V55 H32 V75 H20 V25 Z" fill="url(#flx-gold)" />
        {/* L */}
        <path d="M65 25 H77 V65 H100 V75 H65 V25 Z" fill="url(#flx-gold)" />

        {/* Intersecting Extended 'X' Line Wave */}
        <path d="M100 25 L145 75 H132 L110 50 L122 25 H100 Z" fill="url(#flx-gold)" />
        <path
          d="M80 75 Q130 20 160 25 L150 35 Q125 30 92 75 H80 Z"
          fill="url(#flx-gold)"
        />

        {/* WAVE */}
        {/* W */}
        <path d="M165 25 L175 75 H187 L195 45 L203 75 H215 L225 25 H212 L206 58 L198 25 H192 L184 58 L178 25 H165 Z" fill="url(#flx-gold)" />
        {/* A */}
        <path d="M230 75 L245 25 H258 L273 75 H260 L256 62 H247 L243 75 H230 Z M249 52 H254 L251 40 L249 52 Z" fill="url(#flx-gold)" />
        {/* V */}
        <path d="M275 25 L288 75 H298 L311 25 H298 L293 58 L288 25 H275 Z" fill="url(#flx-gold)" />
      </svg>
    </div>

    <div className="relative z-10 text-[10px] font-mono tracking-widest text-amber-400/80 uppercase mt-2">
      SOFTWARE & DIGITAL AGENCY
    </div>
  </div>
);

// 4. Bolt Mindz Logo (YouTube Channel Badge)
export const BoltMindzLogo: React.FC<{ className?: string }> = ({ className = "w-full h-full" }) => (
  <div className={`relative flex flex-col items-center justify-center bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl group ${className}`}>
    {/* Banner effect */}
    <div className="w-full bg-slate-950 py-1.5 px-3 rounded-lg border border-slate-800 text-center mb-4">
      <span className="text-[11px] font-black tracking-widest text-white uppercase italic">
        SUBSCRIBE?
      </span>
    </div>

    {/* Circle Crest Logo */}
    <div className="relative z-10 flex items-center gap-3.5 mb-3 w-full">
      <div className="w-14 h-14 rounded-full bg-black border-2 border-slate-700 flex items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-transform">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white">
          {/* M Shield Icon */}
          <path
            d="M20 20 L50 35 L80 20 V50 L50 85 L20 50 Z"
            fill="black"
            stroke="white"
            strokeWidth="6"
          />
          <path
            d="M32 32 L50 42 L68 32 V48 L50 70 L32 48 Z"
            fill="white"
          />
        </svg>
      </div>

      <div className="text-left">
        <h4 className="text-lg font-black text-white leading-tight">
          Bolt Mindz
        </h4>
        <div className="text-xs font-semibold text-emerald-400">
          @BoltMindzYT
        </div>
        <div className="text-[11px] text-slate-400 mt-0.5 font-medium">
          66.1K+ Subscribers • 190 Videos
        </div>
      </div>
    </div>

    <p className="text-[11px] text-slate-400 italic text-center line-clamp-2 px-1">
      "Fuel Your Fire - Be Part of Millions Finding Daily Inspiration!"
    </p>
  </div>
);
