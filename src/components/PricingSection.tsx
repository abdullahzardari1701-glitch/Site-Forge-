import React from 'react';
import { Check, ArrowRight, HelpCircle } from 'lucide-react';
import { PricingPlan } from '../types';

interface PricingSectionProps {
  onSelectTier: (tierName: string) => void;
}

const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Basic Website',
    tagline: 'Ideal for local businesses, portfolios, and individual professionals getting online.',
    idealFor: '1-5 clean pages with fast turnaround',
    features: [
      'Up to 5 custom-designed pages (Home, About, Services, Gallery, Contact)',
      '100% Mobile & tablet responsive design',
      'Direct WhatsApp and Phone click-to-call buttons',
      'Google Maps and address integration',
      'Basic SEO & OpenGraph share cards setup',
      'Fast loading speed optimization',
      'Contact form connected to your email',
    ],
  },
  {
    id: 'professional',
    name: 'Professional Website',
    tagline: 'Comprehensive online presence for established shops, clinics, restaurants, and growing brands.',
    idealFor: 'Multi-page dynamic presentation with catalog',
    popular: true,
    features: [
      'Everything in Basic Website',
      'Up to 10-15 tailored pages with rich media layouts',
      'Product or service catalog showcase',
      'Social media feeds & channel integrations',
      'Customer testimonial & reviews showcase',
      'Custom inquiries & quote request forms',
      'Priority development & iterative revisions',
      'Domain configuration and SSL certificate guidance',
    ],
  },
  {
    id: 'custom',
    name: 'Custom Website',
    tagline: 'Engineered web applications, e-commerce stores, organizations, or specialized portals.',
    idealFor: 'Complex workflows, payment gateways & databases',
    features: [
      'Full custom architecture engineered to your workflow',
      'E-commerce shopping cart & payment gateway integration',
      'Client login & dashboard capabilities if required',
      'Dynamic database records & custom forms',
      'API connections and third-party integrations',
      'Comprehensive security hardening',
      'Dedicated launch assistance & ongoing technical support',
    ],
  },
];

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectTier }) => {
  return (
    <section id="pricing" className="py-20 bg-[#0b0f17] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
            Transparent Quotations
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Flexible Packages Tailored to Your Scope
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            We don't show generic arbitrary price tags because every project has distinct requirements.
            Select a plan to request an exact, obligation-free quote.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PRICING_PLANS.map((plan) => {
            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl flex flex-col justify-between transition-all duration-200 p-7 ${
                  plan.popular
                    ? 'bg-slate-900 border-2 border-cyan-400 shadow-xl shadow-cyan-950/40 ring-1 ring-cyan-400/20'
                    : 'bg-slate-900/60 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Popularity indicator */}
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-0.5 bg-cyan-400 text-cyan-950 text-[11px] font-extrabold uppercase tracking-wider rounded-full shadow-sm">
                    Most Popular Choice
                  </div>
                )}

                <div>
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed min-h-[38px]">
                      {plan.tagline}
                    </p>
                  </div>

                  {/* Quote Banner */}
                  <div className="py-4 my-4 border-y border-slate-800/80">
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-black tracking-tight text-white">
                        Custom Quote
                      </span>
                      <span className="text-xs text-cyan-400 font-medium">
                        Based on your needs
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      {plan.idealFor}
                    </p>
                  </div>

                  {/* Feature list */}
                  <div className="space-y-3 pt-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Included in this tier:
                    </p>
                    <ul className="space-y-2.5">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                          <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-8 mt-6 border-t border-slate-800/60">
                  <button
                    onClick={() => onSelectTier(plan.name)}
                    className={`w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      plan.popular
                        ? 'bg-cyan-400 text-cyan-950 hover:bg-cyan-300 shadow-md shadow-cyan-400/20'
                        : 'bg-slate-800 text-white hover:bg-slate-700'
                    }`}
                  >
                    <span>Get a Quote for {plan.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Note on pricing transparency */}
        <div className="mt-12 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
          <HelpCircle className="w-4 h-4 text-slate-400" />
          <span>Have a specific budget or unique timeline? Mention it in your request and we will customize a package.</span>
        </div>

      </div>
    </section>
  );
};
