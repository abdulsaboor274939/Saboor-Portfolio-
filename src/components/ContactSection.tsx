import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  Copy, 
  Check, 
  MapPin, 
  Clock, 
  MessageSquare,
  PhoneCall
} from 'lucide-react';
import { PortfolioData } from '../types';

interface ContactSectionProps {
  portfolio: PortfolioData;
  isDarkMode?: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ portfolio }) => {
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
    <section id="contact" className="py-20 md:py-28 relative overflow-hidden bg-[#080808] text-white transition-colors border-b border-neutral-900">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6 border-b border-neutral-900 pb-6">
          <div>
            <h2 className="font-bebas text-4xl sm:text-6xl tracking-wide uppercase text-white leading-none">
              LET'S TALK
            </h2>
          </div>

          <p className="text-neutral-400 text-xs sm:text-sm max-w-md font-sans-main leading-relaxed">
            Have a commercial video project, brand strategy inquiry, or custom web development proposal? Reach out directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Details & Copy Box */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0c0c0d] border border-neutral-900 card-3d shine-overlay shadow-xl">
              <h3 className="font-bebas text-2xl mb-2 text-white uppercase tracking-wide">
                DIRECT CONTACT INFORMATION
              </h3>
              <p className="text-xs mb-6 text-neutral-400 font-sans-main">
                Reach out on WhatsApp or email for rapid response times.
              </p>

              {/* WhatsApp & Email Cards */}
              <div className="space-y-4 mb-6">
                {/* Direct WhatsApp Callout Card */}
                <a
                  href="https://wa.me/923329742260?text=Hi%20MALIK%20ABDUL%20SABOOR%2C%20I%20would%20like%20to%20discuss%20a%20project!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white flex items-center justify-between gap-3 transition-all shadow-lg shadow-red-600/20"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center shrink-0">
                      <PhoneCall className="w-5 h-5 animate-bounce" />
                    </div>
                    <div>
                      <div className="font-bebas text-xs tracking-wider opacity-90 uppercase">
                        WHATSAPP DIRECT
                      </div>
                      <div className="font-bebas text-base font-bold tracking-wider">
                        03329742260
                      </div>
                    </div>
                  </div>
                  <span className="px-3 py-1.5 rounded-lg bg-white text-red-700 font-bebas text-xs tracking-wider shrink-0">
                    OPEN CHAT
                  </span>
                </a>

                {/* Email Copy Card */}
                <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-10 h-10 rounded-full bg-neutral-800 text-red-500 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="overflow-hidden">
                      <div className="font-bebas text-xs tracking-wider text-neutral-500 uppercase">
                        EMAIL ADDRESS
                      </div>
                      <div className="text-xs sm:text-sm font-sans-main font-bold truncate text-white">
                        {portfolio.socials.email}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleCopyEmail}
                    className="p-2.5 rounded-lg text-xs font-bebas tracking-wider flex items-center gap-1.5 transition-all shrink-0 bg-red-600 text-white hover:bg-red-700"
                    title="Copy email address"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-white" />
                        <span className="hidden sm:inline">COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span className="hidden sm:inline">COPY</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Quick Info */}
              <div className="space-y-4 mb-6 pt-4 border-t border-neutral-900">
                {portfolio.socials.location && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-neutral-900 text-red-500 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bebas text-xs text-neutral-500 uppercase">LOCATION</div>
                      <div className="text-xs font-sans-main text-neutral-200">
                        {portfolio.socials.location}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-neutral-900 text-red-500 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bebas text-xs text-neutral-500 uppercase">RESPONSE TIME</div>
                    <div className="text-xs font-sans-main text-neutral-200">
                      Within 12 - 24 hours
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Interactive Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0c0c0d] border border-neutral-900">
              
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="w-5 h-5 text-red-500" />
                <h3 className="font-bebas text-2xl text-white uppercase tracking-wide">
                  SEND A DIRECT MESSAGE
                </h3>
              </div>

              {formSubmitted ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-14 h-14 bg-red-950 text-red-500 rounded-full flex items-center justify-center mx-auto border border-red-800">
                    <Check className="w-7 h-7" />
                  </div>
                  <h4 className="font-bebas text-2xl text-white uppercase">
                    MESSAGE RECEIVED
                  </h4>
                  <p className="text-xs sm:text-sm max-w-md mx-auto text-neutral-400 font-sans-main">
                    Thank you for reaching out, {formData.name || 'friend'}. Abdul Saboor will review your message and reply promptly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bebas text-xs text-neutral-400 tracking-wider mb-1.5 uppercase">
                        YOUR NAME *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sarah Jenkins"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg text-xs font-sans-main transition-all focus:outline-none focus:border-red-600 border border-neutral-800 bg-neutral-900 text-white placeholder-neutral-500"
                      />
                    </div>

                    <div>
                      <label className="block font-bebas text-xs text-neutral-400 tracking-wider mb-1.5 uppercase">
                        YOUR EMAIL *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. sarah@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg text-xs font-sans-main transition-all focus:outline-none focus:border-red-600 border border-neutral-800 bg-neutral-900 text-white placeholder-neutral-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bebas text-xs text-neutral-400 tracking-wider mb-1.5 uppercase">
                      SUBJECT
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Project Proposal / Consultation"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg text-xs font-sans-main transition-all focus:outline-none focus:border-red-600 border border-neutral-800 bg-neutral-900 text-white placeholder-neutral-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bebas text-xs text-neutral-400 tracking-wider mb-1.5 uppercase">
                      MESSAGE *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Share details about your project or video requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg text-xs font-sans-main transition-all focus:outline-none focus:border-red-600 border border-neutral-800 bg-neutral-900 text-white placeholder-neutral-500"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between gap-4">
                    <button
                      type="submit"
                      className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-lg bg-red-600 text-white hover:bg-red-700 font-bebas text-xs tracking-widest transition-all shadow-lg shadow-red-600/20"
                    >
                      <Send className="w-4 h-4" />
                      <span>SEND DIRECT MESSAGE</span>
                    </button>

                    <a
                      href={`mailto:${portfolio.socials.email}?subject=${encodeURIComponent(formData.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(formData.message || '')}`}
                      className="py-3.5 px-5 rounded-lg font-bebas text-xs tracking-wider border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors"
                      title="Open email app"
                    >
                      MAIL APP
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

