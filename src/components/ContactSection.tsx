import React, { useState } from 'react';
import { 
  Phone, 
  MessageCircle, 
  Mail, 
  Send, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { BUSINESS_CONFIG } from '../services/storage';

export const ContactSection: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    // Construct WhatsApp message or open email client
    const encoded = encodeURIComponent(
      `Quick Inquiry from SiteForge:\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nMessage: ${formData.message}`
    );
    
    // Automatically trigger WhatsApp or open email
    window.open(`${BUSINESS_CONFIG.whatsappHref}?text=${encoded}`, '_blank');
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 bg-[#0b0f17] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
            Direct Developer Communication
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Get in Touch with Abdullah Zardari
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Have questions before submitting your request? Reach out directly via WhatsApp, call, or email.
          </p>
        </div>

        {/* 3 Quick Action Cards as per user specs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          {/* Card 1: Call Now */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 text-center hover:border-slate-700 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">Call Directly</h3>
              <p className="text-xs text-slate-400 mb-4">Speak directly regarding project scope and immediate requirements.</p>
              <p className="font-mono text-sm text-cyan-300 font-semibold mb-6">
                {BUSINESS_CONFIG.phoneDisplay}
              </p>
            </div>
            <a
              href={BUSINESS_CONFIG.phoneHref}
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>Call Now</span>
            </a>
          </div>

          {/* Card 2: WhatsApp Us */}
          <div className="bg-slate-900/70 border border-emerald-900/40 rounded-2xl p-6 text-center hover:border-emerald-700/60 transition-all flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-3 right-3 text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-full">
              Recommended
            </div>
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">WhatsApp Us</h3>
              <p className="text-xs text-slate-400 mb-4">Fastest response for sharing links, references, audio notes, and instant questions.</p>
              <p className="font-mono text-sm text-emerald-300 font-semibold mb-6">
                +91 7563026232
              </p>
            </div>
            <a
              href={`${BUSINESS_CONFIG.whatsappHref}?text=${encodeURIComponent(BUSINESS_CONFIG.whatsappDefaultMsg)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-bold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 transition-colors cursor-pointer shadow-md shadow-emerald-500/10"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Us</span>
            </a>
          </div>

          {/* Card 3: Send Email */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 text-center hover:border-slate-700 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">Send Email</h3>
              <p className="text-xs text-slate-400 mb-4">For detailed RFPs, project briefs, or official corporate communications.</p>
              <p className="text-xs text-sky-300 font-semibold mb-6 truncate px-2">
                {BUSINESS_CONFIG.email}
              </p>
            </div>
            <a
              href={BUSINESS_CONFIG.emailHref}
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 text-sky-400" />
              <span>Send Email</span>
            </a>
          </div>

        </div>

        {/* Quick Message Form */}
        <div className="max-w-2xl mx-auto bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-white">Send a Quick Message</h3>
            <p className="text-xs text-slate-400 mt-1">We typically reply within 2 to 4 hours on working days.</p>
          </div>

          {formSubmitted ? (
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800 text-xs text-emerald-200 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <p className="font-bold text-white">Thank you for reaching out!</p>
                <p className="mt-1">
                  Your message was formatted and ready in WhatsApp. Abdullah Zardari will review your message promptly.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="mt-3 text-cyan-400 underline cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 9876543210"
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@company.com"
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">How can we help? *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your website requirement, timeline, or any specific questions..."
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 text-xs font-bold text-cyan-950 bg-cyan-400 rounded-xl hover:bg-cyan-300 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit & Chat on WhatsApp</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
