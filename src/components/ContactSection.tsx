import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  Copy, 
  Check, 
  MapPin, 
  Github, 
  Linkedin, 
  Twitter, 
  Sparkles, 
  Clock, 
  MessageSquare,
  PhoneCall
} from 'lucide-react';
import { PortfolioData } from '../types';

interface ContactSectionProps {
  portfolio: PortfolioData;
  isDarkMode: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ portfolio, isDarkMode }) => {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolio.socials.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className={`py-16 md:py-24 relative overflow-hidden transition-colors ${
      isDarkMode ? 'bg-[#0b1329] text-slate-100' : 'bg-[#080d1a] text-slate-100'
    }`}>
      {/* Background Atmosphere Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/10 rounded-full blur-[170px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-3 bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 shadow-md">
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
            <span>Get In Touch</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4 text-white">
            Let's Build Something <span className="text-cyan-shine text-glow-cyan">Great Together</span>
          </h2>

          <p className="text-sm sm:text-base max-w-2xl text-slate-300">
            Have a project in mind, a position to discuss, or just want to connect? Send a message below!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Details & Copy Box */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            <div className="p-6 sm:p-8 rounded-3xl card-3d-glass border-cyan-500/30">
              <h3 className="text-xl font-black mb-2 text-white">
                Direct Contact Details
              </h3>
              <p className="text-xs mb-6 text-slate-300">
                Feel free to email me directly or connect across social platforms.
              </p>

              {/* WhatsApp & Email Contact Cards */}
              <div className="space-y-4 mb-6">
                {/* Direct WhatsApp Callout Card */}
                <a
                  href="https://wa.me/923329742260?text=Hi%20MALIK%20ABDUL%20SABOOR%2C%20I%20would%20like%20to%20discuss%20a%20project!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-3d-emerald p-4 rounded-2xl flex items-center justify-between gap-3 transition-all group"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2.5 rounded-xl bg-slate-950 text-emerald-400 shrink-0 shadow-md border border-emerald-500/30">
                      <PhoneCall className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-extrabold tracking-wider text-emerald-950">
                        WhatsApp Direct
                      </div>
                      <div className="text-sm font-black text-slate-950">
                        03329742260
                      </div>
                    </div>
                  </div>
                  <span className="px-3 py-1.5 rounded-xl bg-slate-950 text-emerald-300 text-xs font-black shrink-0 border border-emerald-500/40">
                    Open Chat
                  </span>
                </a>

                {/* Email Copy Card */}
                <div className="p-4 rounded-2xl border border-cyan-500/30 bg-slate-950/80 backdrop-blur-md flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2.5 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-500/30 shrink-0 font-bold">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-[10px] uppercase font-bold tracking-wider text-cyan-400">
                        Primary Email
                      </div>
                      <div className="text-xs sm:text-sm font-bold truncate text-slate-100">
                        {portfolio.socials.email}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleCopyEmail}
                    className="p-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shrink-0 btn-3d-cyan"
                    title="Copy email to clipboard"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span className="hidden sm:inline">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span className="hidden sm:inline">Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Quick Info Items */}
              <div className="space-y-4 mb-6">
                {portfolio.socials.location && (
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">Location</div>
                      <div className="text-xs font-medium text-slate-200">
                        {portfolio.socials.location}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-indigo-950 text-indigo-400 border border-indigo-500/30">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400">Response Time</div>
                    <div className="text-xs font-medium text-slate-200">
                      Usually within 12 - 24 hours
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Buttons */}
              <div className="pt-4 border-t border-cyan-500/20">
                <div className="text-xs font-bold mb-3 text-cyan-400">
                  Social Profiles
                </div>
                <div className="flex items-center gap-2">
                  {portfolio.socials.tiktok && (
                    <a
                      href={portfolio.socials.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 px-3 rounded-xl border border-pink-500/30 bg-slate-900/90 text-slate-100 hover:border-pink-400 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                    >
                      <svg className="w-4 h-4 fill-pink-400" viewBox="0 0 24 24">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68 6.34 6.34 0 0 0 9.35 22a6.34 6.34 0 0 0 6.33-6.32V9.05a8.16 8.16 0 0 0 4.91 1.63V7.2a4.86 4.86 0 0 1-1-.51z"/>
                      </svg>
                      <span>TikTok</span>
                    </a>
                  )}

                  {portfolio.socials.snapchat && (
                    <a
                      href={portfolio.socials.snapchat}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 px-3 rounded-xl border border-yellow-500/30 bg-slate-900/90 text-slate-100 hover:border-yellow-400 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                    >
                      <svg className="w-4 h-4 fill-yellow-400" viewBox="0 0 24 24">
                        <path d="M12.001 2c-3.834 0-6.19 2.812-6.19 5.894 0 1.294.462 2.766 1.134 3.655.151.2.185.385.084.588-.168.337-.89 1.713-1.077 2.05-.084.152-.034.337.118.422.336.185 1.446.404 2.085.118.252-.118.454-.084.622.101.908.992 2.068 1.48 3.224 1.48 1.156 0 2.316-.488 3.224-1.48.168-.185.37-.219.622-.101.639.286 1.749.067 2.085-.118.152-.085.202-.27.118-.422-.187-.337-.909-1.713-1.077-2.05-.101-.203-.067-.388.084-.588.672-.889 1.134-2.361 1.134-3.655 0-3.082-2.356-5.894-6.19-5.894z"/>
                      </svg>
                      <span>Snapchat</span>
                    </a>
                  )}
                </div>
              </div>

            </div>

          </div>

          {/* Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl card-3d-glass border-cyan-500/30">
              
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="w-5 h-5 text-cyan-400" />
                <h3 className="text-xl font-black text-white">
                  Send a Direct Message
                </h3>
              </div>

              {formSubmitted ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                    <Check className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-bold text-white">
                    Message Received!
                  </h4>
                  <p className="text-xs sm:text-sm max-w-md mx-auto text-slate-300">
                    Thank you for reaching out, {formData.name || 'friend'}. I will get back to you shortly at {formData.email || 'your email'}.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold mb-1.5 text-slate-300">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sarah Jenkins"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-xs sm:text-sm transition-all focus:outline-none focus:border-cyan-400 border border-cyan-500/30 bg-slate-900/90 text-slate-100 placeholder-slate-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-1.5 text-slate-300">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. sarah@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-xs sm:text-sm transition-all focus:outline-none focus:border-cyan-400 border border-cyan-500/30 bg-slate-900/90 text-slate-100 placeholder-slate-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1.5 text-slate-300">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Hiring / Project Proposal / Inquiry"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-xs sm:text-sm transition-all focus:outline-none focus:border-cyan-400 border border-cyan-500/30 bg-slate-900/90 text-slate-100 placeholder-slate-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1.5 text-slate-300">
                      Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Share details about your idea, position, or question..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-xs sm:text-sm transition-all focus:outline-none focus:border-cyan-400 border border-cyan-500/30 bg-slate-900/90 text-slate-100 placeholder-slate-500"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between gap-4">
                    <button
                      type="submit"
                      className="btn-3d-cyan flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Direct Message</span>
                    </button>

                    <a
                      href={`mailto:${portfolio.socials.email}?subject=${encodeURIComponent(formData.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(formData.message || '')}`}
                      className="py-3.5 px-4 rounded-xl text-xs font-semibold border border-cyan-500/30 bg-slate-900 text-slate-300 hover:border-cyan-400 transition-colors"
                      title="Open default email app"
                    >
                      Open Mail App
                    </a>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
