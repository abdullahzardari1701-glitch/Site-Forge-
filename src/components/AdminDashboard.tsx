import React, { useState, useEffect } from 'react';
import { User, WebsiteRequest, RequestStatus } from '../types';
import { requestService } from '../services/requestService';
import { messageService } from '../services/messageService';
import { getStoredUsers, BUSINESS_CONFIG } from '../services/storage';
import { RequestStatusTimeline } from './RequestStatusTimeline';
import { RequestChatBox } from './RequestChatBox';
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  CheckCircle, 
  Clock, 
  MessageSquare, 
  Phone, 
  Mail, 
  MessageCircle, 
  FileText, 
  UserCheck, 
  ChevronRight, 
  X, 
  PlusCircle, 
  Eye, 
  Sparkles, 
  ExternalLink,
  Lock,
  Layers,
  Check
} from 'lucide-react';

interface AdminDashboardProps {
  currentUser: User;
  onNavigateHome: () => void;
}

const ALL_STATUSES: RequestStatus[] = [
  'Submitted',
  'Under Review',
  'Requirements Confirmed',
  'In Development',
  'Review Required',
  'Completed',
  'Cancelled',
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentUser,
  onNavigateHome,
}) => {
  // Security guard check
  if (currentUser.role !== 'admin') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="p-8 rounded-2xl bg-rose-950/40 border border-rose-800 text-rose-200 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-900/50 text-rose-400 flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white">Unauthorized Access</h2>
          <p className="text-xs text-rose-300">
            This administration portal is restricted strictly to authorized SiteForge administrators.
          </p>
          <button
            onClick={onNavigateHome}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-xl"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    );
  }

  const [activeTab, setActiveTab] = useState<'requests' | 'customers' | 'categories'>('requests');
  const [requests, setRequests] = useState<WebsiteRequest[]>([]);
  const [customers, setCustomers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedRequest, setSelectedRequest] = useState<WebsiteRequest | null>(null);

  // Status update state inside detail modal
  const [newStatus, setNewStatus] = useState<RequestStatus>('Submitted');
  const [adminNoteText, setAdminNoteText] = useState('');
  const [isNoteClientVisible, setIsNoteClientVisible] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const loadAdminData = () => {
    const allReqs = requestService.getAllRequests();
    setRequests(allReqs);

    const allUsers = getStoredUsers().filter(u => u.role === 'customer');
    setCustomers(allUsers);

    if (selectedRequest) {
      const refreshed = allReqs.find(r => r.id === selectedRequest.id);
      if (refreshed) {
        setSelectedRequest(refreshed);
        setNewStatus(refreshed.status);
      }
    }
  };

  useEffect(() => {
    loadAdminData();

    const handleStorageUpdate = () => {
      loadAdminData();
    };

    window.addEventListener('siteforge_store_updated', handleStorageUpdate);
    return () => {
      window.removeEventListener('siteforge_store_updated', handleStorageUpdate);
    };
  }, []);

  const openRequestDetail = (req: WebsiteRequest) => {
    setSelectedRequest(req);
    setNewStatus(req.status);
    setAdminNoteText('');
    setUpdateSuccess(false);
  };

  const handleStatusUpdate = () => {
    if (!selectedRequest) return;
    setUpdating(true);

    requestService.updateRequestStatus(
      selectedRequest.id,
      newStatus,
      currentUser.name,
      adminNoteText.trim() ? adminNoteText : undefined
    );

    setUpdateSuccess(true);
    setUpdating(false);
    setTimeout(() => setUpdateSuccess(false), 2500);
    loadAdminData();
  };

  // Filter requests
  const filteredRequests = requests.filter(req => {
    const matchesSearch =
      req.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.basicInfo.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.websiteType.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || req.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const unreadMessagesTotal = messageService.getUnreadCountForAdmin();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 mb-8 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              SiteForge Master Administration
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Platform Management & Lead Controls
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Review incoming project requirements, converse with clients, and update live milestone statuses.
          </p>
        </div>

        {/* Top Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl">
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'requests'
                ? 'bg-amber-400 text-amber-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Requests ({requests.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('customers')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'customers'
                ? 'bg-amber-400 text-amber-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Clients ({customers.length})</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-[11px] text-slate-400 block">Total Requests</span>
          <p className="text-xl font-black text-white font-mono mt-0.5">{requests.length}</p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-[11px] text-amber-400 block">Under Review</span>
          <p className="text-xl font-black text-amber-300 font-mono mt-0.5">
            {requests.filter(r => r.status === 'Submitted' || r.status === 'Under Review').length}
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-[11px] text-sky-400 block">In Development</span>
          <p className="text-xl font-black text-sky-300 font-mono mt-0.5">
            {requests.filter(r => r.status === 'In Development' || r.status === 'Requirements Confirmed').length}
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-[11px] text-emerald-400 block">Completed</span>
          <p className="text-xl font-black text-emerald-300 font-mono mt-0.5">
            {requests.filter(r => r.status === 'Completed').length}
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-[11px] text-slate-400 block">Registered Clients</span>
          <p className="text-xl font-black text-white font-mono mt-0.5">{customers.length}</p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-[11px] text-rose-400 block">Unread Messages</span>
          <p className="text-xl font-black text-rose-300 font-mono mt-0.5">{unreadMessagesTotal}</p>
        </div>
      </div>

      {/* TAB 1: WEBSITE REQUESTS */}
      {activeTab === 'requests' && (
        <div className="space-y-6">
          
          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by ID, client name, business, or category..."
                className="w-full pl-9 pr-4 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-500 shrink-0" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="all">All Statuses ({requests.length})</option>
                {ALL_STATUSES.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Requests Table / Cards */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="py-3.5 px-4 font-semibold">Request ID</th>
                    <th className="py-3.5 px-4 font-semibold">Client & Business</th>
                    <th className="py-3.5 px-4 font-semibold">Type</th>
                    <th className="py-3.5 px-4 font-semibold">Current Status</th>
                    <th className="py-3.5 px-4 font-semibold">Date</th>
                    <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {filteredRequests.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-500">
                        No requests match your search criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredRequests.map(req => {
                      const whatsappLink = `${BUSINESS_CONFIG.whatsappHref}?text=${encodeURIComponent(
                        `Hello ${req.userName}, Abdullah here regarding your SiteForge website request [${req.id}] for "${req.basicInfo.businessName}".`
                      )}`;

                      return (
                        <tr key={req.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-3.5 px-4 font-mono font-bold text-cyan-400">
                            {req.id}
                          </td>

                          <td className="py-3.5 px-4">
                            <p className="font-semibold text-white">{req.basicInfo.businessName}</p>
                            <p className="text-[11px] text-slate-400">{req.userName} · {req.userPhone}</p>
                          </td>

                          <td className="py-3.5 px-4 text-slate-300">
                            {req.websiteType}
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-950 border border-slate-700 text-slate-300">
                              {req.status}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                            {new Date(req.createdAt).toLocaleDateString()}
                          </td>

                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <a
                                href={whatsappLink}
                                target="_blank"
                                rel="noreferrer"
                                className="p-1.5 text-emerald-400 hover:bg-emerald-950/50 rounded-lg transition-colors"
                                title="WhatsApp Customer"
                              >
                                <MessageCircle className="w-4 h-4" />
                              </a>
                              <a
                                href={`tel:${req.userPhone}`}
                                className="p-1.5 text-cyan-400 hover:bg-cyan-950/50 rounded-lg transition-colors"
                                title="Call Customer"
                              >
                                <Phone className="w-4 h-4" />
                              </a>
                              <button
                                onClick={() => openRequestDetail(req)}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-amber-950 bg-amber-400 hover:bg-amber-300 transition-colors cursor-pointer"
                              >
                                <span>Manage</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: REGISTERED CLIENTS */}
      {activeTab === 'customers' && (
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Registered Customer Accounts ({customers.length})</h3>
            <span className="text-xs text-slate-500">Encrypted credentials stored client-side</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">Client Name</th>
                  <th className="py-3.5 px-4 font-semibold">Email</th>
                  <th className="py-3.5 px-4 font-semibold">Phone</th>
                  <th className="py-3.5 px-4 font-semibold">Registered</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Direct Outreach</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {customers.map(c => (
                  <tr key={c.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-white">
                      {c.name}
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">
                      {c.email}
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">
                      {c.phone}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`https://wa.me/91${c.phone.replace(/[^\d]/g, '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2.5 py-1 text-xs text-emerald-400 bg-emerald-950/40 rounded-lg hover:bg-emerald-950"
                        >
                          WhatsApp
                        </a>
                        <a
                          href={`tel:${c.phone}`}
                          className="px-2.5 py-1 text-xs text-cyan-400 bg-cyan-950/40 rounded-lg hover:bg-cyan-950"
                        >
                          Call
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* REQUEST MANAGEMENT MODAL / DRAWER */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-4xl max-h-[90vh] bg-[#0d1424] border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            
            {/* Modal Header */}
            <div className="px-6 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-cyan-400 bg-cyan-950 px-2.5 py-0.5 rounded-lg border border-cyan-800">
                    {selectedRequest.id}
                  </span>
                  <h3 className="text-base font-bold text-white">
                    {selectedRequest.basicInfo.businessName}
                  </h3>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Client: {selectedRequest.userName} · {selectedRequest.userPhone} · {selectedRequest.userEmail}
                </p>
              </div>

              <button
                onClick={() => setSelectedRequest(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-slate-300">
              
              {/* Progress Timeline Preview */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Live Stage Tracker (Client View)
                </p>
                <RequestStatusTimeline currentStatus={selectedRequest.status} updatedAt={selectedRequest.updatedAt} />
              </div>

              {/* Status Update Panel */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-white uppercase tracking-wider">
                    Update Request Status
                  </p>
                  {updateSuccess && (
                    <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>Status updated successfully!</span>
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Select Stage:</label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value as RequestStatus)}
                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-400"
                    >
                      {ALL_STATUSES.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">
                      Add Progress Note / Milestone (Optional):
                    </label>
                    <input
                      type="text"
                      value={adminNoteText}
                      onChange={(e) => setAdminNoteText(e.target.value)}
                      placeholder="e.g. Design wireframes completed, moving to code..."
                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-slate-500">
                    Changes immediately reflect on customer's dashboard.
                  </span>
                  <button
                    onClick={handleStatusUpdate}
                    disabled={updating}
                    className="px-4 py-2 text-xs font-bold text-amber-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors cursor-pointer"
                  >
                    {updating ? 'Updating...' : 'Save Status Update'}
                  </button>
                </div>
              </div>

              {/* REAL-TIME MESSAGING BOX */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Client Direct Message Thread
                </p>
                <RequestChatBox
                  requestId={selectedRequest.id}
                  currentUser={currentUser}
                  compact={true}
                />
              </div>

              {/* Detailed Business & Requirements Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <p className="font-bold text-white text-xs uppercase tracking-wider">Business Details</p>
                  <p><strong className="text-slate-400">Description:</strong> {selectedRequest.businessInfo.description}</p>
                  <p><strong className="text-slate-400">Services:</strong> {selectedRequest.businessInfo.servicesProducts || 'N/A'}</p>
                  <p><strong className="text-slate-400">Address:</strong> {selectedRequest.businessInfo.address || 'N/A'}</p>
                  {selectedRequest.businessInfo.googleMapsLink && (
                    <a href={selectedRequest.businessInfo.googleMapsLink} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline block">
                      Google Maps Link ↗
                    </a>
                  )}
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <p className="font-bold text-white text-xs uppercase tracking-wider">Website Requirements</p>
                  <p><strong className="text-slate-400">Main Purpose:</strong> {selectedRequest.websiteRequirements.mainPurpose}</p>
                  <p><strong className="text-slate-400">Pages:</strong> {selectedRequest.websiteRequirements.pages.join(', ')}</p>
                  <p><strong className="text-slate-400">Styles:</strong> {selectedRequest.designPreferences.styles.join(', ')}</p>
                  <p><strong className="text-slate-400">Colors:</strong> {selectedRequest.designPreferences.preferredColors || 'None'}</p>
                  {selectedRequest.designPreferences.referenceUrl && (
                    <a href={selectedRequest.designPreferences.referenceUrl} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline block">
                      Inspiration Reference URL ↗
                    </a>
                  )}
                </div>
              </div>

              {/* Uploaded Files */}
              {selectedRequest.uploads && selectedRequest.uploads.length > 0 && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Client Attachments ({selectedRequest.uploads.length})
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {selectedRequest.uploads.map(file => (
                      <div key={file.id} className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl">
                        {file.dataUrl && file.type.startsWith('image/') ? (
                          <img src={file.dataUrl} alt={file.name} className="w-full h-24 object-cover rounded-lg mb-2" />
                        ) : (
                          <div className="w-full h-24 bg-slate-900 rounded-lg flex items-center justify-center font-mono text-cyan-400 mb-2">
                            DOC
                          </div>
                        )}
                        <p className="font-semibold text-white truncate text-[11px]">{file.name}</p>
                        <p className="text-[9px] text-slate-500 uppercase">{file.category}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">SiteForge Secure Management</span>
              <button
                onClick={() => setSelectedRequest(null)}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-xl"
              >
                Close Window
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
