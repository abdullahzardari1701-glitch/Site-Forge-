import React from 'react';
import { RequestStatus } from '../types';
import { 
  CheckCircle2, 
  Clock, 
  FileCheck, 
  Code, 
  Eye, 
  Rocket, 
  XCircle,
  AlertTriangle
} from 'lucide-react';

interface RequestStatusTimelineProps {
  currentStatus: RequestStatus;
  updatedAt?: string;
}

interface StageConfig {
  status: RequestStatus;
  label: string;
  description: string;
  icon: any;
}

const STAGES: StageConfig[] = [
  { 
    status: 'Submitted', 
    label: 'Submitted', 
    description: 'Request received and queued for initial evaluation',
    icon: Clock 
  },
  { 
    status: 'Under Review', 
    label: 'Under Review', 
    description: 'Abdullah is reviewing your business specifications & assets',
    icon: FileCheck 
  },
  { 
    status: 'Requirements Confirmed', 
    label: 'Requirements Confirmed', 
    description: 'Scope, pages, and delivery timeline finalized',
    icon: CheckCircle2 
  },
  { 
    status: 'In Development', 
    label: 'In Development', 
    description: 'Active coding, responsive layouts & feature integration',
    icon: Code 
  },
  { 
    status: 'Review Required', 
    label: 'Review Required', 
    description: 'Live staging preview ready for client review & feedback',
    icon: Eye 
  },
  { 
    status: 'Completed', 
    label: 'Completed', 
    description: 'Website deployed, domain connected & live to the public',
    icon: Rocket 
  },
];

export const RequestStatusTimeline: React.FC<RequestStatusTimelineProps> = ({
  currentStatus,
  updatedAt,
}) => {
  const isCancelled = currentStatus === 'Cancelled';
  const currentIndex = STAGES.findIndex(s => s.status === currentStatus);

  if (isCancelled) {
    return (
      <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/80 text-rose-200 text-xs flex items-start gap-3">
        <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white uppercase tracking-wider text-[11px]">Status: Cancelled</span>
            <span className="text-[10px] text-rose-400">Request Closed</span>
          </div>
          <p className="text-slate-300">
            This website request was marked as cancelled. If this was done by mistake or you'd like to reactivate this build, please message Abdullah Zardari on WhatsApp or by phone.
          </p>
        </div>
      </div>
    );
  }

  const currentStageInfo = STAGES[currentIndex] || STAGES[0];

  return (
    <div className="w-full bg-slate-950/70 border border-slate-800/90 rounded-2xl p-4 sm:p-5">
      {/* Top Banner: Current Highlight */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-5 border-b border-slate-800/80 gap-2">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs text-slate-400">Current Progress Stage:</span>
          <span className="text-xs font-bold text-cyan-300 px-2.5 py-0.5 rounded-md bg-cyan-950/80 border border-cyan-800/80">
            {currentStatus}
          </span>
        </div>

        {updatedAt && (
          <span className="text-[11px] text-slate-400">
            Updated: {new Date(updatedAt).toLocaleDateString()} at{' '}
            {new Date(updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        )}
      </div>

      {/* Current Stage Explanation Note */}
      <div className="mb-6 p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-3">
        <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
          {React.createElement(currentStageInfo.icon, { className: 'w-4 h-4' })}
        </div>
        <div>
          <p className="text-xs font-bold text-white">{currentStageInfo.label}</p>
          <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
            {currentStageInfo.description}
          </p>
        </div>
      </div>

      {/* Stepper Tracker for Desktop & Tablet */}
      <div className="relative pt-2 pb-1">
        {/* Background track line */}
        <div className="hidden md:block absolute top-7 left-8 right-8 h-1 bg-slate-800 rounded-full" />
        
        {/* Active progress fill */}
        <div
          className="hidden md:block absolute top-7 left-8 h-1 bg-gradient-to-r from-cyan-500 to-teal-400 rounded-full transition-all duration-700"
          style={{
            width: currentIndex >= 0 ? `${(currentIndex / (STAGES.length - 1)) * 88}%` : '0%',
          }}
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4 relative z-10">
          {STAGES.map((stage, idx) => {
            const Icon = stage.icon;
            const isCompleted = idx < currentIndex;
            const isCurrent = idx === currentIndex;
            const isUpcoming = idx > currentIndex;

            return (
              <div
                key={stage.status}
                className={`flex flex-col items-center p-2.5 rounded-xl transition-all ${
                  isCurrent
                    ? 'bg-slate-900 border border-cyan-500/40 shadow-md shadow-cyan-500/10'
                    : 'bg-transparent'
                }`}
              >
                {/* Stage Icon Node */}
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                    isCompleted
                      ? 'bg-cyan-400 text-cyan-950 font-bold shadow-sm'
                      : isCurrent
                      ? 'bg-cyan-500/20 text-cyan-300 border-2 border-cyan-400 ring-4 ring-cyan-400/20'
                      : 'bg-slate-900 border border-slate-800 text-slate-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                {/* Stage Title */}
                <span
                  className={`mt-2 text-[11px] font-bold text-center leading-tight ${
                    isCurrent
                      ? 'text-cyan-300'
                      : isCompleted
                      ? 'text-slate-200'
                      : 'text-slate-500'
                  }`}
                >
                  {stage.label}
                </span>

                {/* Stage Step Indicator */}
                <span className="text-[9px] uppercase tracking-wider text-slate-500 mt-1">
                  Step {idx + 1}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
