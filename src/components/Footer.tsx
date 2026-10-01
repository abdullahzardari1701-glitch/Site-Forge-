import React from 'react';
import { BUSINESS_CONFIG } from '../services/storage';
import { Phone, Mail, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#070a10] border-t border-slate-900 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <button
              onClick={() => onNavigate('home')}
              className="text-left group cursor-pointer focus-visible:outline-none"
            >
              <span className="font-display text-2xl font-extrabold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                Site<span className="text-cyan-400">Forge</span>
              </span>
            </button>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              "Professional websites built around your ideas."
            </p>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Founded and managed by Abdullah Zardari. Providing bespoke web design, modern frontends, and custom digital services for businesses and individuals worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">
              Navigation
            </p>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('how-it-works')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('categories')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Website Types
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('pricing')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Pricing & Quotes
                </button>
              </li>
            </ul>
          </div>

          {/* Core Categories */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">
              Popular Website Types
            </p>
            <ul className="space-y-2 text-[11px]">
              <li>Business & Corporate Websites</li>
              <li>E-Commerce & Online Stores</li>
              <li>Portfolio & Creative Showcase</li>
              <li>Salon, Spa & Beauty Portals</li>
              <li>Restaurant Menus & Reservations</li>
              <li>Jewellery & Luxury Showrooms</li>
              <li>School, Madarsa & NGO Portals</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">
              Direct Contact
            </p>
            <div className="space-y-2.5">
              <a
                href={BUSINESS_CONFIG.phoneHref}
                className="flex items-center gap-2 hover:text-white transition-colors group"
              >
                <Phone className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span>+91 7563026232</span>
              </a>
              <a
                href={BUSINESS_CONFIG.emailHref}
                className="flex items-center gap-2 hover:text-white transition-colors group truncate"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="truncate">{BUSINESS_CONFIG.email}</span>
              </a>
              <a
                href={`${BUSINESS_CONFIG.whatsappHref}?text=${encodeURIComponent(BUSINESS_CONFIG.whatsappDefaultMsg)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold"
              >
                <span>WhatsApp: +91 7563026232</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>

            <div className="pt-2 text-[11px] text-slate-400">
              <p>Owner: Abdullah Zardari</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© 2026 SiteForge. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigate('about')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Contact
            </button>
            <span className="hover:text-slate-300 cursor-default">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-default">Terms & Conditions</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
