import React from 'react';
import { BUSINESS_CONFIG } from '../services/storage';
import { 
  ShieldCheck, 
  User, 
  Phone, 
  Mail, 
  MessageSquare, 
  Sparkles, 
  CheckCircle2, 
  Laptop
} from 'lucide-react';

interface AboutSectionProps {
  onStartRequest: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onStartRequest }) => {
  return (
    <section id="about" className="py-20 bg-[#080c14] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual & Workstation Preview */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
              <img
                src="/src/assets/images/workspace_preview_1790876499703.jpg"
                alt="Abdullah Zardari - SiteForge digital workspace and responsive design mockups"
                className="w-full h-auto object-cover aspect-[4/3]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f17] via-transparent to-transparent opacity-70" />
              
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-950/90 border border-slate-800 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-cyan-400 text-cyan-950 font-bold flex items-center justify-center text-sm shrink-0">
                    AZ
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Abdullah Zardari</h4>
                    <p className="text-[11px] text-cyan-400">Founder & Full-Stack Web Developer</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Card */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-2.5">
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-2 text-slate-400">
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Direct Mobile:</span>
                </span>
                <a href={BUSINESS_CONFIG.phoneHref} className="text-white font-semibold hover:text-cyan-400">
                  {BUSINESS_CONFIG.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-2 text-slate-400">
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Email:</span>
                </span>
                <a href={BUSINESS_CONFIG.emailHref} className="text-white font-semibold hover:text-cyan-400 truncate max-w-[190px]">
                  {BUSINESS_CONFIG.email}
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Grounded Honest Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
                About SiteForge
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
                Built Around Your Ideas, Without the Agency Runaround
              </h2>
            </div>

            <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
              <p>
                <strong className="text-white font-semibold">SiteForge</strong> was created by{' '}
                <strong className="text-white font-semibold">Abdullah Zardari</strong> with a straightforward mission: to help individuals, small shops, growing businesses, and organizations build genuine, professional websites without confusing jargon, unpredictable pricing, or abandoned promises.
              </p>
              <p>
                Many traditional agencies pass projects between sales reps, junior contractors, and account managers. At SiteForge, you communicate directly with the engineer who designs and codes your website. We listen carefully to what you need, advise on the best layout and features, and translate your business offerings into an easy-to-use digital presence.
              </p>
            </div>

            {/* Core Values / Commitments */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center gap-2 text-xs font-bold text-white mb-1">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Direct Communication</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  No middle layers. Direct WhatsApp and call discussions throughout the project.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center gap-2 text-xs font-bold text-white mb-1">
                  <Laptop className="w-4 h-4 text-cyan-400" />
                  <span>Clean, Modern Standards</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Fast code, responsive layouts, and intuitive controls on mobile and desktop.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center gap-2 text-xs font-bold text-white mb-1">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>Complete Transparency</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Clear requirement summaries, realistic timelines, and no unexpected hidden charges.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center gap-2 text-xs font-bold text-white mb-1">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Beginner-Friendly Guidance</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Never owned a website before? We guide you step-by-step through domain and content.
                </p>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-2">
              <button
                onClick={onStartRequest}
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold text-cyan-950 bg-cyan-400 rounded-xl hover:bg-cyan-300 transition-colors cursor-pointer"
              >
                <span>Tell Us About Your Project</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
