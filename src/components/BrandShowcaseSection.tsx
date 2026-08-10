import React from 'react';
import { ArrowUpRight, Youtube, ShoppingBag, Briefcase, Flame, Globe } from 'lucide-react';

import beastModeLogoImg from '../assets/images/beast_mode_logo_1786250772569.jpg';
import veloraLogoImg from '../assets/images/velora_brand_logo_1786250789703.jpg';
import flxWaveLogoImg from '../assets/images/flx_wave_logo_1786250804785.jpg';
import boltMindzLogoImg from '../assets/images/bolt_mindz_logo_1786250820049.jpg';
import bicAustLogoImg from '../assets/images/bic_aust_logo_1786252102413.jpg';
import ydcLogoImg from '../assets/images/ydc_aust_logo_1786252124984.jpg';

interface BrandShowcaseSectionProps {
  isDarkMode?: boolean;
}

export const BrandShowcaseSection: React.FC<BrandShowcaseSectionProps> = () => {
  const brands = [
    {
      id: "lylo-web-store",
      name: "LYLO Web Store App",
      role: "Founder & Full Stack Developer",
      category: "Personal E-Commerce Web App",
      tagline: "Custom Built Live E-Commerce Web Application",
      description: "My personal e-commerce web application designed and developed ground-up with custom UI, footwear, luxury timepieces, and high-speed checkout flow.",
      imageUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='500' height='500' viewBox='0 0 500 500'><defs><linearGradient id='bg' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%23180204'/><stop offset='50%' stop-color='%232c0509'/><stop offset='100%' stop-color='%23080001'/></linearGradient></defs><rect width='500' height='500' rx='40' fill='url(%23bg)' stroke='%23dc2626' stroke-width='8' stroke-opacity='0.8'/><circle cx='250' cy='180' r='90' fill='%23dc2626' fill-opacity='0.15' stroke='%23ef4444' stroke-width='4'/><path d='M200 160 L300 160 L310 240 C310 260 290 270 250 270 C210 270 190 260 190 240 Z' fill='none' stroke='%23ef4444' stroke-width='12' stroke-linejoin='round'/><path d='M220 160 C220 120 280 120 280 160' fill='none' stroke='%23ef4444' stroke-width='10' stroke-linecap='round'/><path d='M235 200 L265 200 M250 185 L250 215' stroke='%23f87171' stroke-width='8' stroke-linecap='round'/><text x='250' y='345' font-family='system-ui, sans-serif' font-weight='900' font-size='50' fill='%23ffffff' text-anchor='middle' letter-spacing='4'>LYLO WEB</text><text x='250' y='390' font-family='system-ui, sans-serif' font-weight='800' font-size='22' fill='%23ef4444' text-anchor='middle' letter-spacing='3'>CUSTOM E-STORE APP</text><rect x='140' y='418' width='220' height='32' rx='16' fill='%23450a0a' stroke='%23dc2626' stroke-width='2'/><text x='250' y='439' font-family='system-ui, sans-serif' font-weight='800' font-size='14' fill='%23fca5a5' text-anchor='middle' letter-spacing='2'>LIVE FULL STACK</text></svg>",
      badge: "Live Web App",
      linkUrl: "https://ais-pre-yfltm4x7chjq5khrgnqlh3-159123720771.asia-east1.run.app",
      icon: Globe
    },
    {
      id: "lylo-store-instagram",
      name: "LYLO Store (@lylo.store.x)",
      role: "Owner & E-Com Director",
      category: "Local E-Commerce Brand",
      tagline: "Local Direct-to-Consumer Shoes & Fashion E-Store",
      description: "My personal local e-commerce store brand (@lylo.store.x on Instagram) providing genuine men's footwear, watches, and fashion apparel with nationwide COD.",
      imageUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='500' height='500' viewBox='0 0 500 500'><defs><linearGradient id='bg2' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%231a0205'/><stop offset='50%' stop-color='%2338070d'/><stop offset='100%' stop-color='%230a0102'/></linearGradient></defs><rect width='500' height='500' rx='40' fill='url(%23bg2)' stroke='%23dc2626' stroke-width='8' stroke-opacity='0.8'/><circle cx='250' cy='180' r='90' fill='%23dc2626' fill-opacity='0.15' stroke='%23ef4444' stroke-width='4'/><path d='M205 215 L225 145 L250 180 L275 145 L295 215 Z' fill='none' stroke='%23ef4444' stroke-width='12' stroke-linejoin='round'/><circle cx='225' cy='135' r='8' fill='%23dc2626'/><circle cx='250' cy='165' r='8' fill='%23dc2626'/><circle cx='275' cy='135' r='8' fill='%23dc2626'/><text x='250' y='340' font-family='system-ui, sans-serif' font-weight='900' font-size='46' fill='%23ffffff' text-anchor='middle' letter-spacing='3'>LYLO STORE</text><text x='250' y='385' font-family='system-ui, sans-serif' font-weight='800' font-size='22' fill='%23ef4444' text-anchor='middle' letter-spacing='2'>@lylo.store.x</text><rect x='130' y='418' width='240' height='32' rx='16' fill='%23450a0a' stroke='%23dc2626' stroke-width='2'/><text x='250' y='439' font-family='system-ui, sans-serif' font-weight='800' font-size='14' fill='%23fca5a5' text-anchor='middle' letter-spacing='2'>LOCAL E-COM BRAND</text></svg>",
      badge: "Local E-Com Brand",
      linkUrl: "https://www.instagram.com/lylo.store.x?igsh=dTRvazJtemRucWgw",
      icon: ShoppingBag
    },
    {
      id: "epic-international",
      name: "Epic International & Co.",
      role: "Director Video Editing",
      category: "Commercial Production House",
      tagline: "4K Commercial Ads & Film Production",
      description: "Leading director for commercial post-production, high-conversion ad campaigns, and multi-channel video media.",
      imageUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80",
      badge: "Commercial Production",
      linkUrl: "https://epicinternationalandco.com",
      icon: Briefcase
    },
    {
      id: "bolt-mindz",
      name: "Bolt Mindz YouTube Platform",
      role: "Creator & Automation Director",
      category: "YouTube Media Platform",
      tagline: "66.1K+ Subscribers • 8M+ Views",
      description: "Faceless YouTube engine (@BoltMindzYT) scaled using AI script pipelines, voice synthesis, and dynamic video editing.",
      imageUrl: boltMindzLogoImg,
      badge: "66.1K+ Subscribers",
      linkUrl: "https://youtube.com/@boltmindzyt?si=p6XMsQPQFXshqP7S",
      icon: Youtube
    },
    {
      id: "bic-aust",
      name: "BIC AUST Incubator",
      role: "Director Media Communications",
      category: "University Incubator",
      tagline: "Business Incubation Center AUST",
      description: "Directing official press releases, founder video interview series, pitch events, and incubator cohort media releases.",
      imageUrl: bicAustLogoImg,
      badge: "Director Media PR",
      linkUrl: "https://www.instagram.com/bicaust?igsh=MXRqYmRiOWNuN2V5cg==",
      icon: Briefcase
    },
    {
      id: "ydc-aust",
      name: "Youth Development Center (YDC)",
      role: "Media Head (3-Year Term)",
      category: "Youth PR & Communications",
      tagline: "Prime Minister's Youth Programme",
      description: "Directed 3 years of youth empowerment documentaries, official event coverage, and public relations campaigns.",
      imageUrl: ydcLogoImg,
      badge: "3-Year Media Head",
      linkUrl: "https://www.instagram.com/ydc_aust?igsh=bWUxb3oxbjk5YjYw",
      icon: Briefcase
    },
    {
      id: "beast-mode",
      name: "Beast Mod Studio",
      role: "Founder & CEO",
      category: "Software House & Agency",
      tagline: "Custom Web & Digital Agency",
      description: "Active software house delivering custom web/app development, video production, and high-ROI digital marketing.",
      imageUrl: beastModeLogoImg,
      badge: "Active Software House",
      linkUrl: "https://www.instagram.com/beastmodstudio?igsh=MXNocmZhbzMxY3R3Zg==",
      icon: Briefcase
    },
    {
      id: "flxwave",
      name: "Flexwawes Technologies",
      role: "Ex-CTO & Software Lead",
      category: "Software Agency",
      tagline: "Tech Architecture & Web Solutions",
      description: "Former CTO leading software architecture, client deliverables, dev team output, and enterprise web solutions.",
      imageUrl: flxWaveLogoImg,
      badge: "Tech Leadership",
      linkUrl: "https://flexwavetechnologies.com/",
      icon: Briefcase
    },
    {
      id: "velora",
      name: "VELORA & LYLO.store",
      role: "Founder & E-Com Operator",
      category: "E-Commerce Stores",
      tagline: "Trending Women's & Men's Stores",
      description: "Direct-to-consumer online stores featuring curated ladies' apparel, luxury watches, footwear, and Meta ad campaigns.",
      imageUrl: veloraLogoImg,
      badge: "E-Commerce Brand",
      linkUrl: "https://lylo.store",
      icon: ShoppingBag
    },
    {
      id: "hult-prize",
      name: "Hult Prize Pakistan",
      role: "Lead Graphic Designer",
      category: "Global Entrepreneurship",
      tagline: "Core Squad Lead Designer",
      description: "Selected as Lead Graphic Designer for Hult Prize Pakistan, creating full official event media, banners, and decks.",
      imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
      badge: "Core Squad Lead",
      linkUrl: "https://www.instagram.com/hultprize?igsh=dXI3MTFhdHcycXE4",
      icon: Flame
    }
  ];

  return (
    <section id="brands" className="py-20 md:py-28 relative overflow-hidden bg-[#080808] text-white transition-colors border-b border-neutral-900">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6 border-b border-neutral-900 pb-6">
          <div>
            <h2 className="font-bebas text-4xl sm:text-6xl tracking-wide uppercase text-white leading-none">
              ASSOCIATED VENTURES & AGENCIES
            </h2>
          </div>

          <p className="text-neutral-400 text-xs sm:text-sm max-w-md font-sans-main leading-relaxed">
            Software houses, university incubators, e-commerce web stores, and commercial video agencies directed by Abdul Saboor.
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {brands.map((brand) => {
            const Icon = brand.icon;
            return (
              <div
                key={brand.id}
                className="group rounded-2xl p-6 bg-[#0c0c0d] border border-neutral-900 hover:border-red-600/50 flex flex-col sm:flex-row items-center gap-6 transition-all duration-300 card-3d shine-overlay shadow-xl"
              >
                {/* Brand Visual Logo Image */}
                <div className="w-full sm:w-32 h-32 shrink-0 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 p-2 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                  <img
                    src={brand.imageUrl}
                    alt={`${brand.name} Logo`}
                    referrerPolicy="no-referrer"
                    className="max-w-full max-h-full object-contain rounded-lg"
                  />
                </div>

                {/* Text Information & Details */}
                <div className="flex-1 flex flex-col justify-between w-full text-center sm:text-left">
                  <div>
                    <div className="flex flex-wrap items-center justify-center sm:justify-between gap-2 mb-2">
                      <span className="font-bebas text-xs tracking-wider px-2.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-red-500">
                        {brand.badge}
                      </span>

                      <span className="font-bebas text-xs tracking-wider flex items-center gap-1 text-neutral-400">
                        <Icon className="w-3.5 h-3.5 text-red-500" />
                        <span>{brand.role}</span>
                      </span>
                    </div>

                    <h3 className="font-bebas text-2xl text-white tracking-wide uppercase mb-1 group-hover:text-red-500 transition-colors">
                      {brand.name}
                    </h3>

                    <p className="text-xs leading-relaxed mb-4 text-neutral-400 font-sans-main line-clamp-2">
                      {brand.description}
                    </p>
                  </div>

                  <a
                    href={brand.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center sm:justify-between font-bebas text-xs tracking-widest py-2.5 px-5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-all w-full"
                  >
                    <span>VISIT VENTURE LINK</span>
                    <ArrowUpRight className="w-4 h-4 ml-1" />
                  </a>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};


