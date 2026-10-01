import React from 'react';
import { UserPlus, FileText, Code2, Rocket, ArrowRight } from 'lucide-react';

interface HowItWorksSectionProps {
  onStartRequest: () => void;
}

const STEPS = [
  {
    stepNumber: '01',
    title: 'Register',
    subtitle: 'Create your account',
    description:
      'Sign up securely in 30 seconds to access your personalized project dashboard and track progress anytime.',
    icon: UserPlus,
  },
  {
    stepNumber: '02',
    title: 'Tell Us Your Requirement',
    subtitle: 'Choose your website type & details',
    description:
      'Select your website category, describe your business, choose needed pages, upload your logo and photos.',
    icon: FileText,
  },
  {
    stepNumber: '03',
    title: 'We Build Your Website',
    subtitle: 'Expert design & engineering',
    description:
      'Abdullah Zardari personally reviews your requirements, engineers modern layouts, and configures responsive mobile code.',
    icon: Code2,
  },
  {
    stepNumber: '04',
    title: 'Launch',
    subtitle: 'Review & proceed to launch',
    description:
      'Test your live preview staging link, provide feedback for revisions, and deploy your site to your custom domain.',
    icon: Rocket,
  },
];

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ onStartRequest }) => {
  return (
    <section id="how-it-works" className="py-20 bg-[#080c14] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
            Seamless 4-Step Process
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
            How SiteForge Brings Your Vision Online
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            From initial concept to deployment, we keep the process simple, transparent, and collaborative.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.stepNumber}
                className="relative bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all group flex flex-col justify-between"
              >
                <div>
                  {/* Top row with step number and icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-display text-3xl font-extrabold text-slate-700 group-hover:text-cyan-400/80 transition-colors">
                      {step.stepNumber}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-slate-800/90 border border-slate-700 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-cyan-400/90 font-medium mt-0.5 mb-2.5">
                    {step.subtitle}
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/60 flex items-center text-[11px] text-slate-400">
                  <span>Step {idx + 1} of 4</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Bar */}
        <div className="mt-12 text-center">
          <button
            onClick={onStartRequest}
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold text-cyan-950 bg-cyan-400 rounded-xl hover:bg-cyan-300 active:scale-[0.98] transition-all cursor-pointer shadow-md shadow-cyan-500/10"
          >
            <span>Ready to Begin? Submit Your Requirement</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
