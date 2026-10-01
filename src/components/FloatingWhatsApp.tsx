import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { BUSINESS_CONFIG } from '../services/storage';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappUrl = `${BUSINESS_CONFIG.whatsappHref}?text=${encodeURIComponent(
    BUSINESS_CONFIG.whatsappDefaultMsg
  )}`;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end pointer-events-auto">
      {/* Tooltip callout */}
      {showTooltip && (
        <div className="mb-2 hidden sm:flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-700 shadow-xl max-w-xs animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
          <p className="text-xs text-slate-200">
            Chat directly with <strong className="text-white">Abdullah Zardari</strong> on WhatsApp
          </p>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-white p-1 ml-1"
            aria-label="Dismiss chat tooltip"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer relative group"
        aria-label="Chat on WhatsApp with Abdullah Zardari"
      >
        <MessageCircle className="w-7 h-7 fill-slate-950/20" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-cyan-400 border-2 border-[#0b0f17] rounded-full" />
      </a>
    </div>
  );
};
