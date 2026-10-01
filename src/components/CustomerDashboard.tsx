import React, { useState, useEffect } from 'react';
import { User, WebsiteRequest } from '../types';
import { requestService } from '../services/requestService';
import { messageService } from '../services/messageService';
import { BUSINESS_CONFIG } from '../services/storage';
import { RequestStatusTimeline } from './RequestStatusTimeline';
import { RequestChatBox } from './RequestChatBox';
import { 
  PlusCircle, 
  FileText, 
  Clock, 
  Code2, 
  CheckCircle2, 
  MessageSquare, 
  Phone, 
  MessageCircle, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  Paperclip, 
  Building2,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';

interface CustomerDashboardProps {
  currentUser: User;
  onCreateNewRequest: () => void;
  onNavigateHome: () => void;
}

export const CustomerDashboard: React.FC<CustomerDashboardProps> = ({
  currentUser,
  onCreateNewRequest,
  onNavigateHome,
}) => {
  const [requests, setRequests] = useState<WebsiteRequest[]>([]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'in_progress' | 'completed'>('all');
  const [expandedRequestId, setExpandedRequestId] = useState<string | null>(null);
  const [chatOpenRequestId, setChatOpenRequestId] = useState<string | null>(null);

  // Load user's requests
  const loadData = () => {
    const list = requestService.getUserRequests(currentUser.id);
    setRequests(list);
    if (list.length > 0 && !expandedRequestId) {
      setExpandedRequestId(list[0].id);
      setChatOpenRequestId(list[0].id);
    }
  };

  useEffect(() => {
    loadData();

    const handleStorageUpdate = () => {
      loadData();
    };

    window.addEventListener('siteforge_store_updated', handleStorageUpdate);
    return () => {
      window.removeEventListener('siteforge_store_updated', handleStorageUpdate);
    };
  }, [currentUser.id]);

  // Metric Computations
  const totalRequests = requests.length;
  const pendingRequests = requests.filter(r => r.status === 'Submitted' || r.status === 'Under Review').length;
  const inProgressRequests = requests.filter(
    r => r.status === 'Requirements Confirmed' || r.status === 'In Development' || r.status === 'Review Required'
  ).length;
  const completedRequests = requests.filter(r => r.status === 'Completed').length;
  const unreadMessagesCount = messageService.getUnreadCountForCustomer(currentUser.id);
  const totalMessagesCount = messageService.getTotalMessageCountForCustomer(currentUser.id);

  // Filter requests
  const filteredRequests = requests.filter(r => {
    if (activeFilter === 'pending') {
      return r.status === 'Submitted' || r.status === 'Under Review';
    }
    if (activeFilter === 'in_progress') {
      return r.status === 'Requirements Confirmed' || r.status === 'In Development' || r.status === 'Review Required';
    }
    if (activeFilter === 'completed') {
      return r.status === 'Completed';
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 mb-8 border-b border-slate-800 gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
            Customer Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Welcome, {currentUser.name}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track your website development stages, upload brand assets, and converse directly with Abdullah.
          </p>
        </div>

        {/* Prominent Action Button as requested */}
        <div className="flex items-center gap-3">
          <button
            onClick={onCreateNewRequest}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold text-cyan-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all shadow-md shadow-cyan-500/20 cursor-pointer whitespace-nowrap"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Create New Website Request</span>
          </button>
        </div>
      </div>

      {/* 5 KPI Metric Cards as per user specs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 mb-10">
        
        {/* Card 1: My Website Requests */}
        <button
          onClick={() => setActiveFilter('all')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
            activeFilter === 'all'
              ? 'bg-slate-900 border-cyan-400/80 ring-1 ring-cyan-400/30'
              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-xs font-medium">My Requests</span>
            <FileText className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-2xl font-black text-white font-mono">{totalRequests}</p>
          <p className="text-[10px] text-slate-500 mt-1">All submitted builds</p>
        </button>

        {/* Card 2: Pending Requests */}
        <button
          onClick={() => setActiveFilter('pending')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
            activeFilter === 'pending'
              ? 'bg-slate-900 border-amber-400/80 ring-1 ring-amber-400/30'
              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-xs font-medium">Pending Requests</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-black text-white font-mono">{pendingRequests}</p>
          <p className="text-[10px] text-slate-500 mt-1">Under review</p>
        </button>

        {/* Card 3: In Progress */}
        <button
          onClick={() => setActiveFilter('in_progress')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
            activeFilter === 'in_progress'
              ? 'bg-slate-900 border-sky-400/80 ring-1 ring-sky-400/30'
              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-xs font-medium">In Progress</span>
            <Code2 className="w-4 h-4 text-sky-400" />
          </div>
          <p className="text-2xl font-black text-white font-mono">{inProgressRequests}</p>
          <p className="text-[10px] text-slate-500 mt-1">Active development</p>
        </button>

        {/* Card 4: Completed */}
        <button
          onClick={() => setActiveFilter('completed')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
            activeFilter === 'completed'
              ? 'bg-slate-900 border-emerald-400/80 ring-1 ring-emerald-400/30'
              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-xs font-medium">Completed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-white font-mono">{completedRequests}</p>
          <p className="text-[10px] text-slate-500 mt-1">Launched & live</p>
        </button>

        {/* Card 5: Messages */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-xs font-medium">Messages</span>
            <div className="relative">
              <MessageSquare className="w-4 h-4 text-cyan-400" />
              {unreadMessagesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping" />
              )}
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-black text-white font-mono">{totalMessagesCount}</p>
            {unreadMessagesCount > 0 && (
              <span className="text-[11px] font-bold text-rose-400">
                ({unreadMessagesCount} new)
              </span>
            )}
          </div>
          <p className="text-[10px] text-slate-500 mt-1">Real-time developer chat</p>
        </div>

      </div>

      {/* Main Content Area */}
      <div className="space-y-6">
        
        {/* Requests Header & Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>Your Submitted Projects</span>
            <span className="text-xs text-slate-500 font-normal">({filteredRequests.length})</span>
          </h2>

          <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-cyan-400 text-cyan-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All ({totalRequests})
            </button>
            <button
              onClick={() => setActiveFilter('pending')}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                activeFilter === 'pending'
                  ? 'bg-cyan-400 text-cyan-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Pending ({pendingRequests})
            </button>
            <button
              onClick={() => setActiveFilter('in_progress')}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                activeFilter === 'in_progress'
                  ? 'bg-cyan-400 text-cyan-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              In Progress ({inProgressRequests})
            </button>
            <button
              onClick={() => setActiveFilter('completed')}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                activeFilter === 'completed'
                  ? 'bg-cyan-400 text-cyan-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Completed ({completedRequests})
            </button>
          </div>
        </div>

        {/* Requests List */}
        {filteredRequests.length === 0 ? (
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-12 text-center">
            <FileText className="w-10 h-10 text-slate-700 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white">No website requests found</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              You haven't submitted any website requests in this filter category yet.
            </p>
            <button
              onClick={onCreateNewRequest}
              className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-cyan-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-colors cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create Your First Request</span>
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredRequests.map((req) => {
              const isExpanded = expandedRequestId === req.id;
              const isChatOpen = chatOpenRequestId === req.id;
              const whatsappLink = `${BUSINESS_CONFIG.whatsappHref}?text=${encodeURIComponent(
                `Hello Abdullah, I am inquiring regarding my SiteForge request [${req.id}] for "${req.basicInfo.businessName}".`
              )}`;

              return (
                <div
                  key={req.id}
                  className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden transition-all shadow-lg"
                >
                  {/* Request Summary Card Header */}
                  <div className="p-5 sm:p-6 bg-slate-900/90 border-b border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="font-mono text-sm font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-800/80 px-2.5 py-0.5 rounded-lg">
                          {req.id}
                        </span>
                        <h3 className="text-base font-bold text-white">
                          {req.basicInfo.businessName}
                        </h3>
                        <span className="text-xs text-slate-400">· {req.websiteType} Website</span>
                      </div>
                      <p className="text-xs text-slate-400">
                        Submitted on {new Date(req.createdAt).toLocaleDateString()} by {req.basicInfo.fullName}
                      </p>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-wrap items-center gap-2.5">
                      <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 hover:bg-emerald-950/80 transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Chat on WhatsApp</span>
                      </a>

                      <button
                        onClick={() => setChatOpenRequestId(isChatOpen ? null : req.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                          isChatOpen
                            ? 'bg-cyan-400 text-cyan-950 font-bold'
                            : 'bg-slate-800 text-slate-300 hover:text-white'
                        }`}
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Messages</span>
                      </button>

                      <button
                        onClick={() => setExpandedRequestId(isExpanded ? null : req.id)}
                        className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                        aria-label="Toggle details"
                      >
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* VISUAL PROGRESS TRACKER (Integrated directly as requested) */}
                  <div className="p-5 sm:p-6 bg-[#080c14] border-b border-slate-800/80">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                      Live Development Status Tracker
                    </p>
                    <RequestStatusTimeline currentStatus={req.status} updatedAt={req.updatedAt} />
                  </div>

                  {/* Real-Time Messaging Drawer if opened */}
                  {isChatOpen && (
                    <div className="p-5 sm:p-6 bg-slate-950 border-b border-slate-800">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="w-4 h-4 text-cyan-400" />
                          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                            Direct Message Channel with Abdullah Zardari
                          </h4>
                        </div>
                        <span className="text-[10px] text-slate-500">Real-time bi-directional messaging</span>
                      </div>
                      <RequestChatBox
                        requestId={req.id}
                        currentUser={currentUser}
                        compact={false}
                      />
                    </div>
                  )}

                  {/* Expandable Full Specifications */}
                  {isExpanded && (
                    <div className="p-5 sm:p-6 space-y-6 text-xs text-slate-300 animate-in fade-in duration-150">
                      
                      {/* Admin Updates / Milestones */}
                      {req.adminNotes && req.adminNotes.length > 0 && (
                        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                          <p className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider mb-2">
                            Developer Milestones & Notes
                          </p>
                          <div className="space-y-2">
                            {req.adminNotes
                              .filter(n => n.isClientVisible)
                              .map(note => (
                                <div key={note.id} className="text-xs text-slate-300 pb-2 border-b border-slate-900 last:border-0 last:pb-0">
                                  <div className="flex items-center justify-between text-[10px] text-slate-500 mb-0.5">
                                    <span>{note.authorName}</span>
                                    <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                                  </div>
                                  <p>{note.text}</p>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}

                      {/* Scope & Details Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                          <span className="text-slate-400 text-[10px] uppercase font-bold">Main Purpose</span>
                          <p className="text-white">{req.websiteRequirements.mainPurpose || 'None specified'}</p>
                        </div>

                        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                          <span className="text-slate-400 text-[10px] uppercase font-bold">Pages Requested</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {req.websiteRequirements.pages.map(p => (
                              <span key={p} className="px-2 py-0.5 bg-slate-900 border border-slate-800 rounded text-[10px] text-slate-200">
                                {p}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                          <span className="text-slate-400 text-[10px] uppercase font-bold">Design Direction</span>
                          <p className="text-white">{req.designPreferences.styles.join(', ')}</p>
                          {req.designPreferences.preferredColors && (
                            <p className="text-[11px] text-slate-400">
                              Colors: {req.designPreferences.preferredColors}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Uploads Preview */}
                      {req.uploads && req.uploads.length > 0 && (
                        <div>
                          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">
                            Uploaded Brand Assets ({req.uploads.length})
                          </p>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {req.uploads.map(file => (
                              <div
                                key={file.id}
                                className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2.5 truncate"
                              >
                                {file.dataUrl && file.type.startsWith('image/') ? (
                                  <img
                                    src={file.dataUrl}
                                    alt={file.name}
                                    className="w-8 h-8 rounded object-cover border border-slate-800 shrink-0"
                                  />
                                ) : (
                                  <div className="w-8 h-8 rounded bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 text-[10px] font-mono shrink-0">
                                    FILE
                                  </div>
                                )}
                                <div className="truncate">
                                  <p className="font-semibold text-white truncate text-[11px]">{file.name}</p>
                                  <p className="text-[9px] text-slate-500 uppercase">{file.category}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Direct Developer Contacts Banner */}
                      <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
                        <span>Lead Developer: <strong className="text-white">Abdullah Zardari</strong></span>
                        <div className="flex items-center gap-4">
                          <a href={BUSINESS_CONFIG.phoneHref} className="text-cyan-400 hover:underline">
                            Call {BUSINESS_CONFIG.phoneDisplay}
                          </a>
                          <a href={BUSINESS_CONFIG.emailHref} className="text-cyan-400 hover:underline">
                            {BUSINESS_CONFIG.email}
                          </a>
                        </div>
                      </div>

                    </div>
                  )}

                </div>
              );
            })}
          </div>
        )}

      </div>

    </div>
  );
};
