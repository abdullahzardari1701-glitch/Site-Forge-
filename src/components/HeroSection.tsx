import React from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Code2, 
  Smartphone, 
  ShieldCheck, 
  PhoneCall, 
  MessageCircle 
} from 'lucide-react';
import { BUSINESS_CONFIG } from '../services/storage';

interface HeroSectionProps {
  onStartRequest: () => void;
  onExploreServices: () => void;
  onSelectCategory: (categoryName: string) => void;
}

const CATEGORY_CHIPS = [
  'Business Websites',
  'Portfolio Websites',
  'E-commerce Websites',
  'Salon & Beauty Websites',
  'Restaurant Websites',
  'Jewellery Websites',
  'Personal Websites',
  'Educational Websites',
  'Organization Websites',
  'Custom Websites',
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartRequest,
  onExploreServices,
  onSelectCategory,
}) => {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-gradient-to-b from-[#0b0f17] via-[#0d1424] to-[#0b0f17]">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-cyan-500/10 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-7">
            
            {/* Direct personal service trust marker */}
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Direct Website Engineering & Design with Abdullah Zardari</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] text-balance">
              Your Website. <br />
              Your Brand. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-sky-400">
                Built Professionally.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed">
              Tell us what you need, and we'll help turn your idea into a high-converting, mobile-optimized professional website tailored to your business.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onStartRequest}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-bold text-cyan-950 bg-cyan-400 rounded-xl hover:bg-cyan-300 active:scale-[0.98] transition-all shadow-lg shadow-cyan-500/20 cursor-pointer whitespace-nowrap"
              >
                <span>Create Your Website</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreServices}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-200 bg-slate-800/80 border border-slate-700/80 rounded-xl hover:bg-slate-700/90 active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Explore Services</span>
              </button>

              <a
                href={`${BUSINESS_CONFIG.whatsappHref}?text=${encodeURIComponent(BUSINESS_CONFIG.whatsappDefaultMsg)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors py-2 px-3 rounded-lg border border-emerald-900/60 bg-emerald-950/20"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Discuss on WhatsApp</span>
              </a>
            </div>

            {/* Supported Categories Quick Selection */}
            <div className="pt-4 border-t border-slate-800/80">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Tailored solutions for every requirement:
              </p>
              <div className="flex flex-wrap gap-2">
                {CATEGORY_CHIPS.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => onSelectCategory(cat.replace(' Websites', ''))}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-300 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 px-3 py-1.5 rounded-lg transition-all cursor-pointer group"
                  >
                    <CheckCircle2 className="w-3 h-3 text-cyan-400 group-hover:scale-110 transition-transform" />
                    <span>{cat}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Trust markers */}
            <div className="grid grid-cols-3 gap-4 pt-2 text-slate-400 text-xs">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>100% Mobile Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Custom Built For You</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Direct Contact: 7563026232</span>
              </div>
            </div>

          </div>

          {/* Right Column: High-Fidelity Visual Carrier */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl p-2 bg-gradient-to-b from-slate-700/40 via-slate-800/20 to-slate-900/40 border border-slate-700/60 shadow-2xl backdrop-blur-sm">
              
              {/* Window Header */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800/80 bg-[#0d1424]/80 rounded-t-xl text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="font-mono text-[10px] text-slate-400">siteforge.app/build</span>
                <span className="text-[10px] text-cyan-400 font-semibold">Active Studio</span>
              </div>

              {/* Visual Container with Image & Fallback */}
              <div className="relative rounded-b-xl overflow-hidden aspect-[16/10] bg-slate-900">
                <img
                  src="/src/assets/images/hero_web_craft_1790876487540.jpg"
                  alt="Modern web design and responsive website creation by SiteForge"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback to stylized SVG mesh if file fails
                    e.currentTarget.style.display = 'none';
                  }}
                />

                {/* Subtle dark gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f17] via-transparent to-transparent opacity-80" />

                {/* Floating Preview Card */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-slate-950/90 border border-slate-800/90 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white">Full-Stack Digital Solutions</p>
                      <p className="text-[11px] text-slate-400">Fast Turnaround · SEO · WhatsApp Integrated</p>
                    </div>
                    <button
                      onClick={onStartRequest}
                      className="px-3 py-1.5 text-[11px] font-semibold text-cyan-950 bg-cyan-400 rounded-lg hover:bg-cyan-300 transition-colors"
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick floating review badge */}
            <div className="mt-4 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
              <div>
                <span className="text-slate-400">Owner & Developer: </span>
                <strong className="text-white">Abdullah Zardari</strong>
              </div>
              <a
                href={BUSINESS_CONFIG.phoneHref}
                className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
              >
                <PhoneCall className="w-3 h-3" />
                <span>+91 7563026232</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
