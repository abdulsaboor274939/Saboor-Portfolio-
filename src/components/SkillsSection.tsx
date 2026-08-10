import React from 'react';
import { 
  Search, 
  Lightbulb, 
  PenTool, 
  Code, 
  Send,
  Quote,
  Sparkles
} from 'lucide-react';
import { PortfolioData } from '../types';

interface SkillsSectionProps {
  portfolio: PortfolioData;
  isDarkMode?: boolean;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ portfolio }) => {
  const skillsList = [
    "VIDEO EDITING",
    "PREMIERE PRO",
    "AFTER EFFECTS",
    "CAPCUT PRO",
    "YOUTUBE AUTOMATION",
    "META ADS",
    "E-COMMERCE",
    "CANVA PRO",
    "PHOTOSHOP",
    "REACT / TS",
    "WEB DEVELOPMENT",
    "SEO BASICS",
    "GRAPHIC DESIGN",
    "MEDIA PR"
  ];

  const workProcessSteps = [
    {
      step: "01",
      title: "DISCOVER",
      desc: "Understanding goals, target audience, and project specifications.",
      icon: Search
    },
    {
      step: "02",
      title: "IDEATE",
      desc: "Scripting, storyboarding, planning hooks and concept wireframes.",
      icon: Lightbulb
    },
    {
      step: "03",
      title: "DESIGN & EDIT",
      desc: "Crafting visual design and dynamic video editing for retention.",
      icon: PenTool
    },
    {
      step: "04",
      title: "DEVELOP & ENGAGE",
      desc: "Building fast, high-converting stores and video motion graphics.",
      icon: Code
    },
    {
      step: "05",
      title: "DELIVER",
      desc: "Testing, rendering, optimizing, and launching with perfection.",
      icon: Send
    }
  ];

  return (
    <section id="skills" className="py-20 md:py-28 relative overflow-hidden bg-[#080808] text-white transition-colors border-b border-neutral-900">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* THREE-COLUMN GRID matching Reference Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* COLUMN 1: EDUCATION & SKILLS */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-8 bg-[#0c0c0d] p-6 sm:p-8 rounded-2xl border border-neutral-900 card-3d shine-overlay shadow-xl">
            <div>
              <h2 className="font-bebas text-2xl sm:text-3xl tracking-wide text-white uppercase mb-6 pb-2 border-b border-neutral-900 flex items-center justify-between">
                <span>EDUCATION & SKILLS</span>
                <span className="text-xs text-red-500 font-bold">100% PRO</span>
              </h2>

              {/* Education List */}
              <div className="space-y-6 mb-8">
                <div className="text-xs font-bebas tracking-widest text-red-500 uppercase flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  EDUCATION
                </div>

                {portfolio.education.map((edu) => (
                  <div key={edu.id} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bebas text-base text-white font-bold">{edu.degree}</h4>
                      <span className="font-bebas text-xs text-red-500 font-bold px-2 py-0.5 rounded bg-red-950/60 border border-red-900">{edu.period}</span>
                    </div>
                    <p className="text-xs text-neutral-400 font-sans-main">{edu.institution}</p>
                  </div>
                ))}
              </div>

              {/* Skills Progress Bars */}
              <div className="space-y-4">
                <div className="text-xs font-bebas tracking-widest text-red-500 uppercase flex items-center justify-between">
                  <span>SKILLS & MASTERY</span>
                  <span className="text-neutral-400">95% AVG</span>
                </div>

                <div className="space-y-3">
                  {[
                    { name: "Video Editing & Motion Graphics", pct: "98%" },
                    { name: "YouTube Automation & Retention", pct: "95%" },
                    { name: "E-Commerce & Digital Marketing", pct: "92%" },
                    { name: "React, TS & Full Stack Dev", pct: "90%" }
                  ].map((s) => (
                    <div key={s.name} className="space-y-1">
                      <div className="flex justify-between text-xs font-bebas tracking-wider text-neutral-300">
                        <span>{s.name}</span>
                        <span className="text-red-500 font-bold">{s.pct}</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-neutral-900 overflow-hidden border border-neutral-800">
                        <div
                          className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full shadow-sm shadow-red-500/50"
                          style={{ width: s.pct }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Skills Tags Grid */}
                <div className="pt-3">
                  <div className="flex flex-wrap gap-2">
                    {skillsList.map((skill) => (
                      <span
                        key={skill}
                        className="font-bebas text-xs tracking-wider px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200 hover:border-red-600 hover:text-white transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMN 2: WORK PROCESS */}
          <div className="lg:col-span-5 bg-[#0c0c0d] p-6 sm:p-8 rounded-2xl border border-neutral-900 flex flex-col justify-between card-3d shine-overlay shadow-xl">
            <div>
              <h2 className="font-bebas text-2xl sm:text-3xl tracking-wide text-white uppercase mb-6 pb-2 border-b border-neutral-900">
                WORK PROCESS
              </h2>

              {/* Vertical Stepper */}
              <div className="space-y-6">
                {workProcessSteps.map((step) => {
                  const IconComponent = step.icon;
                  return (
                    <div key={step.step} className="flex items-start gap-4 group">
                      {/* Red Number */}
                      <span className="font-bebas text-2xl font-bold text-red-600 w-6 shrink-0 mt-0.5">
                        {step.step}
                      </span>

                      {/* Icon Pill */}
                      <div className="w-8 h-8 rounded-full border border-neutral-800 bg-neutral-900 text-red-500 flex items-center justify-center shrink-0 group-hover:border-red-600 transition-colors">
                        <IconComponent className="w-4 h-4" />
                      </div>

                      {/* Step Details */}
                      <div>
                        <h4 className="font-bebas text-base text-white tracking-wider font-bold group-hover:text-red-500 transition-colors">
                          {step.title}
                        </h4>
                        <p className="text-xs text-neutral-400 font-sans-main leading-relaxed mt-0.5">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* COLUMN 3: CRIMSON RED QUOTE BANNER */}
          <div className="lg:col-span-3 bg-gradient-to-br from-[#2a080d] via-[#1c0508] to-[#0d0204] p-6 sm:p-8 rounded-2xl border border-red-950/80 flex flex-col justify-between relative overflow-hidden shadow-2xl">
            
            {/* Subtle glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/20 rounded-full blur-2xl pointer-events-none" />

            <div>
              <Quote className="w-10 h-10 text-red-600 fill-red-600/20 mb-6" />

              <blockquote className="text-lg sm:text-xl font-sans-main font-semibold text-white leading-relaxed tracking-tight">
                "Good design is not just how it looks, but how it works."
              </blockquote>

              <div className="mt-8 font-handwriting text-3xl text-red-400">
                Abdul Saboor
              </div>
            </div>

            <div className="mt-12 pt-6 border-t border-red-900/40">
              <div className="flex items-center gap-2 text-xs font-bebas tracking-wider text-neutral-300">
                <Sparkles className="w-4 h-4 text-red-500 fill-red-500" />
                <span>LET'S CREATE SOMETHING GREAT TOGETHER.</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

