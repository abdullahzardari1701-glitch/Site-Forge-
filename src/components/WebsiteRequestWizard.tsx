import React, { useState } from 'react';
import { User, WebsiteRequest, UploadedFileItem } from '../types';
import { requestService } from '../services/requestService';
import { BUSINESS_CONFIG } from '../services/storage';
import { 
  Building2, 
  FileText, 
  Layers, 
  Palette, 
  UploadCloud, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  Trash2, 
  Check, 
  AlertCircle,
  MessageCircle,
  LayoutDashboard,
  Sparkles,
  Paperclip
} from 'lucide-react';

interface WebsiteRequestWizardProps {
  currentUser: User | null;
  onOpenAuth: () => void;
  onSuccess: (request: WebsiteRequest) => void;
  onCancel: () => void;
  preselectedCategory?: string;
  preselectedTier?: string;
}

const WEBSITE_TYPES = [
  { id: 'Business', label: 'Business / Company', desc: 'Corporate presence, service offerings & lead capture' },
  { id: 'Portfolio', label: 'Portfolio / Showcase', desc: 'Creative work, case studies & visual galleries' },
  { id: 'E-commerce', label: 'E-commerce / Online Shop', desc: 'Catalog, cart, payment & order management' },
  { id: 'Restaurant', label: 'Restaurant / Cafe', desc: 'Food menus, table bookings & location directions' },
  { id: 'Salon', label: 'Salon & Beauty', desc: 'Beauty parlours, spas & grooming service menus' },
  { id: 'Jewellery', label: 'Jewellery & Luxury', desc: 'Gold, diamond & gemstone luxury collections' },
  { id: 'Education', label: 'Educational / Academy', desc: 'Courses, faculty profiles & admission forms' },
  { id: 'Personal', label: 'Personal Brand', desc: 'Consultants, authors, public speakers & influencers' },
  { id: 'Organization', label: 'Organization / NGO', desc: 'Charities, foundations, trusts & institutions' },
  { id: 'Blog', label: 'Blog / Publication', desc: 'Articles, editorial columns & reader newsletters' },
  { id: 'Other', label: 'Custom Specification', desc: 'Unique platforms, custom portals & specialized apps' },
];

const AVAILABLE_PAGES = [
  'Home',
  'About',
  'Services',
  'Products',
  'Gallery',
  'Pricing',
  'Contact',
  'Blog',
  'Testimonials',
  'FAQ',
  'Other',
];

const DESIGN_STYLES = [
  'Modern',
  'Minimal',
  'Luxury',
  'Corporate',
  'Creative',
  'Elegant',
  'Dark',
  'Light',
];

export const WebsiteRequestWizard: React.FC<WebsiteRequestWizardProps> = ({
  currentUser,
  onOpenAuth,
  onSuccess,
  onCancel,
  preselectedCategory,
  preselectedTier,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [submittedRequest, setSubmittedRequest] = useState<WebsiteRequest | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Form State across all 7 steps
  const [basicInfo, setBasicInfo] = useState({
    fullName: currentUser?.name || '',
    businessName: '',
    phone: currentUser?.phone || '',
    email: currentUser?.email || '',
    city: '',
    state: '',
    country: 'India',
  });

  const [websiteType, setWebsiteType] = useState<string>(preselectedCategory || 'Business');
  const [customWebsiteType, setCustomWebsiteType] = useState('');

  const [businessInfo, setBusinessInfo] = useState({
    description: '',
    servicesProducts: '',
    aboutBusiness: '',
    address: '',
    googleMapsLink: '',
    whatsappNumber: currentUser?.phone || '',
    instagramLink: '',
    facebookLink: '',
    youtubeLink: '',
    otherLinks: '',
  });

  const [websiteRequirements, setWebsiteRequirements] = useState({
    mainPurpose: '',
    pages: ['Home', 'About', 'Services', 'Contact'],
    customPages: '',
  });

  const [designPreferences, setDesignPreferences] = useState({
    styles: ['Modern', 'Minimal'],
    preferredColors: '',
    referenceUrl: '',
    specialInstructions: '',
  });

  const [uploads, setUploads] = useState<UploadedFileItem[]>([]);
  const [quoteTier] = useState<string>(preselectedTier || 'Professional Website');

  // Handle file uploads (with base64 simulation and validation)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, category: UploadedFileItem['category']) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach(file => {
      // Validate file size (< 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setErrorMsg(`File "${file.name}" exceeds the 10MB limit.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const newItem: UploadedFileItem = {
          id: `file-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          name: file.name,
          size: file.size,
          type: file.type,
          dataUrl: typeof reader.result === 'string' ? reader.result : undefined,
          category,
          uploadedAt: new Date().toISOString(),
        };
        setUploads(prev => [...prev, newItem]);
      };
      reader.readAsDataURL(file);
    });

    e.target.value = '';
  };

  const removeUpload = (fileId: string) => {
    setUploads(prev => prev.filter(f => f.id !== fileId));
  };

  // Validation per step
  const validateStep = (stepNumber: number): boolean => {
    setErrorMsg(null);
    if (stepNumber === 1) {
      if (!basicInfo.fullName.trim() || !basicInfo.businessName.trim()) {
        setErrorMsg('Please enter both your name and business/brand name.');
        return false;
      }
      if (!basicInfo.phone.trim() || !basicInfo.email.trim()) {
        setErrorMsg('Please provide a valid phone number and email address.');
        return false;
      }
      return true;
    }
    if (stepNumber === 2) {
      if (websiteType === 'Other' && !customWebsiteType.trim()) {
        setErrorMsg('Please specify your custom website type.');
        return false;
      }
      return true;
    }
    if (stepNumber === 3) {
      if (!businessInfo.description.trim()) {
        setErrorMsg('Please provide a brief description of your business.');
        return false;
      }
      return true;
    }
    if (stepNumber === 4) {
      if (!websiteRequirements.mainPurpose.trim()) {
        setErrorMsg('Please describe the main purpose of your website.');
        return false;
      }
      if (websiteRequirements.pages.length === 0) {
        setErrorMsg('Please select at least one page for your website.');
        return false;
      }
      return true;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 7));
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setErrorMsg(null);
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const togglePageSelection = (page: string) => {
    setWebsiteRequirements(prev => {
      const exists = prev.pages.includes(page);
      return {
        ...prev,
        pages: exists ? prev.pages.filter(p => p !== page) : [...prev.pages, page],
      };
    });
  };

  const toggleStyleSelection = (style: string) => {
    setDesignPreferences(prev => {
      const exists = prev.styles.includes(style);
      return {
        ...prev,
        styles: exists ? prev.styles.filter(s => s !== style) : [...prev.styles, style],
      };
    });
  };

  const handleSubmitRequest = async () => {
    if (!currentUser) {
      onOpenAuth();
      return;
    }

    setSubmitting(true);
    setErrorMsg(null);

    const effectiveWebsiteType = websiteType === 'Other' ? customWebsiteType.trim() : websiteType;

    const res = requestService.createRequest(
      {
        userId: currentUser.id,
        userName: basicInfo.fullName,
        userEmail: basicInfo.email,
        userPhone: basicInfo.phone,
        basicInfo,
        websiteType: effectiveWebsiteType,
        businessInfo,
        websiteRequirements,
        designPreferences,
        uploads,
        quoteTier,
      },
      currentUser
    );

    if (res.success && res.request) {
      setSubmittedRequest(res.request);
      onSuccess(res.request);
    } else {
      setErrorMsg(res.error || 'Submission failed. Please check inputs and try again.');
    }
    setSubmitting(false);
  };

  // SUCCESS SCREEN
  if (submittedRequest) {
    const whatsappLink = `${BUSINESS_CONFIG.whatsappHref}?text=${encodeURIComponent(
      `Hello Abdullah, I have submitted a website creation request on SiteForge. My Request ID is ${submittedRequest.id} for "${submittedRequest.basicInfo.businessName}". I would like to discuss next steps.`
    )}`;

    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Request Received
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Your website request has been received successfully.
            </h2>
            <p className="text-sm text-slate-300 mt-2 max-w-lg mx-auto">
              Abdullah Zardari will personally examine your business requirements, pages, and assets.
            </p>
          </div>

          {/* Unique Request ID Card */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 max-w-sm mx-auto">
            <p className="text-xs text-slate-400">Your Unique Request ID</p>
            <p className="font-mono text-2xl font-black text-cyan-400 tracking-wider mt-1">
              {submittedRequest.id}
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              Please save this ID or quote it in WhatsApp communications.
            </p>
          </div>

          {/* Dual Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-colors cursor-pointer shadow-md shadow-emerald-500/20"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Discuss Request on WhatsApp</span>
            </a>

            <button
              onClick={() => onSuccess(submittedRequest)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
            >
              <LayoutDashboard className="w-4 h-4 text-cyan-400" />
              <span>View in Customer Dashboard</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Multi-step Wizard Container
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      
      {/* Wizard Header */}
      <div className="mb-8">
        <button
          onClick={onCancel}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white mb-3 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Homepage</span>
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Create Your Website Request
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Follow our 7-step guide to provide your exact specifications and brand assets.
            </p>
          </div>
          <div className="text-xs font-semibold text-cyan-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg shrink-0">
            Step {currentStep} of 7
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-slate-800 rounded-full mt-4 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-teal-400 transition-all duration-300"
            style={{ width: `${(currentStep / 7) * 100}%` }}
          />
        </div>

        {/* Step Indicator Tabs */}
        <div className="hidden sm:grid grid-cols-7 gap-1 mt-2 text-[10px] font-semibold text-slate-500">
          <span className={currentStep >= 1 ? 'text-cyan-400' : ''}>1. Basic Info</span>
          <span className={currentStep >= 2 ? 'text-cyan-400' : ''}>2. Type</span>
          <span className={currentStep >= 3 ? 'text-cyan-400' : ''}>3. Business</span>
          <span className={currentStep >= 4 ? 'text-cyan-400' : ''}>4. Pages</span>
          <span className={currentStep >= 5 ? 'text-cyan-400' : ''}>5. Design</span>
          <span className={currentStep >= 6 ? 'text-cyan-400' : ''}>6. Uploads</span>
          <span className={currentStep >= 7 ? 'text-cyan-400' : ''}>7. Review</span>
        </div>
      </div>

      {/* Error notification */}
      {errorMsg && (
        <div className="mb-6 p-3.5 rounded-xl bg-rose-950/50 border border-rose-800/80 text-rose-200 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Wizard Form Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-xl">
        
        {/* STEP 1: Basic Information */}
        {currentStep === 1 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h2 className="text-lg font-bold text-white">Step 1 — Basic Information</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Who should we contact regarding this website build?
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={basicInfo.fullName}
                  onChange={(e) => setBasicInfo({ ...basicInfo, fullName: e.target.value })}
                  placeholder="e.g. Tariq Mansoor"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Business / Brand Name *
                </label>
                <input
                  type="text"
                  required
                  value={basicInfo.businessName}
                  onChange={(e) => setBasicInfo({ ...basicInfo, businessName: e.target.value })}
                  placeholder="e.g. Royal Oud Fragrances"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Phone Number (WhatsApp Ready) *
                </label>
                <input
                  type="tel"
                  required
                  value={basicInfo.phone}
                  onChange={(e) => setBasicInfo({ ...basicInfo, phone: e.target.value })}
                  placeholder="e.g. 7563026232"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={basicInfo.email}
                  onChange={(e) => setBasicInfo({ ...basicInfo, email: e.target.value })}
                  placeholder="contact@business.com"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={basicInfo.city}
                  onChange={(e) => setBasicInfo({ ...basicInfo, city: e.target.value })}
                  placeholder="e.g. Mumbai"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    value={basicInfo.state}
                    onChange={(e) => setBasicInfo({ ...basicInfo, state: e.target.value })}
                    placeholder="e.g. Maharashtra"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    value={basicInfo.country}
                    onChange={(e) => setBasicInfo({ ...basicInfo, country: e.target.value })}
                    placeholder="e.g. India"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Website Type */}
        {currentStep === 2 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h2 className="text-lg font-bold text-white">Step 2 — Website Type</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Select the primary category that best matches your project goal.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {WEBSITE_TYPES.map((t) => (
                <button
                  type="button"
                  key={t.id}
                  onClick={() => setWebsiteType(t.id)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    websiteType === t.id
                      ? 'bg-slate-950 border-cyan-400 ring-2 ring-cyan-400/20'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{t.label}</span>
                      {websiteType === t.id && (
                        <Check className="w-4 h-4 text-cyan-400" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                      {t.desc}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {websiteType === 'Other' && (
              <div className="pt-2">
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Specify Your Custom Website Requirements *
                </label>
                <input
                  type="text"
                  value={customWebsiteType}
                  onChange={(e) => setCustomWebsiteType(e.target.value)}
                  placeholder="e.g. Real Estate Portal, Medical Diagnostics Directory..."
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            )}
          </div>
        )}

        {/* STEP 3: Business Information */}
        {currentStep === 3 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h2 className="text-lg font-bold text-white">Step 3 — Business Information</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Help us understand your company, services, and online channels.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Business Description & Overview *
                </label>
                <textarea
                  rows={3}
                  value={businessInfo.description}
                  onChange={(e) => setBusinessInfo({ ...businessInfo, description: e.target.value })}
                  placeholder="Briefly describe what your business does, who you serve, and your core mission..."
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Services or Products to Highlight
                </label>
                <textarea
                  rows={2}
                  value={businessInfo.servicesProducts}
                  onChange={(e) => setBusinessInfo({ ...businessInfo, servicesProducts: e.target.value })}
                  placeholder="List your key offerings, packages, pricing tiers, or product lines..."
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Physical Address / Shop Location
                  </label>
                  <input
                    type="text"
                    value={businessInfo.address}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, address: e.target.value })}
                    placeholder="Shop/Office number, Street, Landmark"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Google Maps Link
                  </label>
                  <input
                    type="url"
                    value={businessInfo.googleMapsLink}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, googleMapsLink: e.target.value })}
                    placeholder="https://maps.google.com/..."
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    WhatsApp Number for Inquiries
                  </label>
                  <input
                    type="tel"
                    value={businessInfo.whatsappNumber}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, whatsappNumber: e.target.value })}
                    placeholder="e.g. 7563026232"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Instagram Profile Link
                  </label>
                  <input
                    type="text"
                    value={businessInfo.instagramLink}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, instagramLink: e.target.value })}
                    placeholder="https://instagram.com/yourhandle"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Facebook Page Link
                  </label>
                  <input
                    type="text"
                    value={businessInfo.facebookLink}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, facebookLink: e.target.value })}
                    placeholder="https://facebook.com/yourpage"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    YouTube / Channel Link
                  </label>
                  <input
                    type="text"
                    value={businessInfo.youtubeLink}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, youtubeLink: e.target.value })}
                    placeholder="https://youtube.com/@channel"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Website Requirements */}
        {currentStep === 4 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h2 className="text-lg font-bold text-white">Step 4 — Website Requirements</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                What is the main goal of your site, and which pages do you need?
              </p>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                What is the main purpose of your website? *
              </label>
              <textarea
                rows={3}
                value={websiteRequirements.mainPurpose}
                onChange={(e) => setWebsiteRequirements({ ...websiteRequirements, mainPurpose: e.target.value })}
                placeholder="e.g. Generate phone & WhatsApp inquiries for our clinic; sell products online; showcase our interior design portfolio..."
                className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">
                Select the pages you need: *
              </label>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_PAGES.map((page) => {
                  const isSelected = websiteRequirements.pages.includes(page);
                  return (
                    <button
                      type="button"
                      key={page}
                      onClick={() => togglePageSelection(page)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-cyan-400 text-cyan-950 shadow-sm'
                          : 'bg-slate-950 border border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      {isSelected ? <Check className="w-3.5 h-3.5" /> : null}
                      <span>{page}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Additional Custom Pages or Features
              </label>
              <input
                type="text"
                value={websiteRequirements.customPages}
                onChange={(e) => setWebsiteRequirements({ ...websiteRequirements, customPages: e.target.value })}
                placeholder="e.g. EMI Calculator, Career Application Portal, Live Rate Card..."
                className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>
        )}

        {/* STEP 5: Design Preferences */}
        {currentStep === 5 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h2 className="text-lg font-bold text-white">Step 5 — Design Preferences</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Define the aesthetic direction and visual feel for your new website.
              </p>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">
                Select visual styles you like:
              </label>
              <div className="flex flex-wrap gap-2">
                {DESIGN_STYLES.map((style) => {
                  const isSelected = designPreferences.styles.includes(style);
                  return (
                    <button
                      type="button"
                      key={style}
                      onClick={() => toggleStyleSelection(style)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-cyan-400 text-cyan-950 shadow-sm'
                          : 'bg-slate-950 border border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      {isSelected ? <Check className="w-3.5 h-3.5" /> : null}
                      <span>{style}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Preferred Brand Colors
                </label>
                <input
                  type="text"
                  value={designPreferences.preferredColors}
                  onChange={(e) => setDesignPreferences({ ...designPreferences, preferredColors: e.target.value })}
                  placeholder="e.g. Navy Blue & Gold, Emerald & Off-White, Monochrome Black"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Reference Website URL (Inspiration)
                </label>
                <input
                  type="url"
                  value={designPreferences.referenceUrl}
                  onChange={(e) => setDesignPreferences({ ...designPreferences, referenceUrl: e.target.value })}
                  placeholder="https://example.com"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Special Instructions or Preferences
              </label>
              <textarea
                rows={3}
                value={designPreferences.specialInstructions}
                onChange={(e) => setDesignPreferences({ ...designPreferences, specialInstructions: e.target.value })}
                placeholder="Mention any specific typography, layout preferences, or accessibility requirements..."
                className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>
        )}

        {/* STEP 6: Uploads */}
        {currentStep === 6 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h2 className="text-lg font-bold text-white">Step 6 — Uploads & Assets</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Upload your brand logo, business photos, product images, or PDF catalogs.
              </p>
            </div>

            {/* Upload Category Pickers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              {/* Logo Upload */}
              <label className="p-4 rounded-xl border border-dashed border-slate-700 bg-slate-950/60 hover:border-cyan-400 hover:bg-slate-950 transition-all flex flex-col items-center justify-center text-center cursor-pointer group">
                <UploadCloud className="w-6 h-6 text-slate-400 group-hover:text-cyan-400 transition-colors mb-2" />
                <span className="text-xs font-bold text-white">Upload Brand Logo</span>
                <span className="text-[10px] text-slate-400 mt-0.5">PNG, SVG, JPG up to 10MB</span>
                <input
                  type="file"
                  accept="image/*,.svg"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, 'logo')}
                />
              </label>

              {/* Photos Upload */}
              <label className="p-4 rounded-xl border border-dashed border-slate-700 bg-slate-950/60 hover:border-cyan-400 hover:bg-slate-950 transition-all flex flex-col items-center justify-center text-center cursor-pointer group">
                <UploadCloud className="w-6 h-6 text-slate-400 group-hover:text-cyan-400 transition-colors mb-2" />
                <span className="text-xs font-bold text-white">Business / Shop Photos</span>
                <span className="text-[10px] text-slate-400 mt-0.5">Showcase your store or team</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, 'business_photos')}
                />
              </label>

              {/* Documents Upload */}
              <label className="p-4 rounded-xl border border-dashed border-slate-700 bg-slate-950/60 hover:border-cyan-400 hover:bg-slate-950 transition-all flex flex-col items-center justify-center text-center cursor-pointer group">
                <Paperclip className="w-6 h-6 text-slate-400 group-hover:text-cyan-400 transition-colors mb-2" />
                <span className="text-xs font-bold text-white">Catalog / Documents</span>
                <span className="text-[10px] text-slate-400 mt-0.5">PDF rate cards, brochures, etc.</span>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.txt"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, 'documents')}
                />
              </label>
            </div>

            {/* Uploaded Files List */}
            <div className="pt-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Attached Files ({uploads.length})
              </h3>

              {uploads.length === 0 ? (
                <p className="text-xs text-slate-400 italic">
                  No files attached yet. You can also share files later over WhatsApp if preferred.
                </p>
              ) : (
                <div className="space-y-2">
                  {uploads.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs"
                    >
                      <div className="flex items-center gap-3 truncate">
                        {file.dataUrl && file.type.startsWith('image/') ? (
                          <img
                            src={file.dataUrl}
                            alt={file.name}
                            className="w-9 h-9 rounded-lg object-cover border border-slate-800 shrink-0"
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 shrink-0 font-mono text-[10px]">
                            DOC
                          </div>
                        )}
                        <div className="truncate">
                          <p className="font-semibold text-white truncate">{file.name}</p>
                          <p className="text-[10px] text-slate-400 uppercase">
                            {file.category.replace('_', ' ')} · {(file.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeUpload(file.id)}
                        className="text-slate-500 hover:text-rose-400 p-1.5 transition-colors cursor-pointer"
                        title="Remove file"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 7: Review & Submit */}
        {currentStep === 7 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="text-lg font-bold text-white">Step 7 — Review & Submit</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Review your website request details before submitting.
              </p>
            </div>

            {/* Summary Review Cards */}
            <div className="space-y-4 text-xs">
              
              {/* Basic Info Summary */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800/80 mb-2">
                  <span className="font-bold text-cyan-400 uppercase tracking-wider text-[10px]">
                    Client & Contact Information
                  </span>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-cyan-400 hover:underline text-[11px]"
                  >
                    Edit
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-300">
                  <div>
                    <span className="text-slate-400 text-[11px] block">Name:</span>
                    <strong className="text-white">{basicInfo.fullName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] block">Business Name:</span>
                    <strong className="text-white">{basicInfo.businessName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] block">Phone:</span>
                    <span>{basicInfo.phone}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] block">Email:</span>
                    <span className="truncate block">{basicInfo.email}</span>
                  </div>
                </div>
              </div>

              {/* Website Type & Requirements */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800/80 mb-2">
                  <span className="font-bold text-cyan-400 uppercase tracking-wider text-[10px]">
                    Website Scope & Pages
                  </span>
                  <button
                    onClick={() => setCurrentStep(4)}
                    className="text-cyan-400 hover:underline text-[11px]"
                  >
                    Edit
                  </button>
                </div>
                <div className="space-y-2 text-slate-300">
                  <div>
                    <span className="text-slate-400 text-[11px] block">Website Type:</span>
                    <span className="font-bold text-white">
                      {websiteType === 'Other' ? customWebsiteType : websiteType}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] block">Main Purpose:</span>
                    <p className="text-slate-200">{websiteRequirements.mainPurpose || 'None specified'}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] block">Pages Requested:</span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {websiteRequirements.pages.map((p) => (
                        <span key={p} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Design Preferences & Files */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800/80 mb-2">
                  <span className="font-bold text-cyan-400 uppercase tracking-wider text-[10px]">
                    Design & Uploads
                  </span>
                  <button
                    onClick={() => setCurrentStep(5)}
                    className="text-cyan-400 hover:underline text-[11px]"
                  >
                    Edit
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
                  <div>
                    <span className="text-slate-400 text-[11px] block">Style Direction:</span>
                    <span>{designPreferences.styles.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] block">Attached Files:</span>
                    <span>{uploads.length} files attached</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Non-logged in notice */}
            {!currentUser && (
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 text-xs text-cyan-200 flex items-center justify-between">
                <span>Please log in or register so we can attach this request to your personal dashboard.</span>
                <button
                  onClick={onOpenAuth}
                  className="px-3.5 py-1.5 text-xs font-bold text-cyan-950 bg-cyan-400 rounded-lg hover:bg-cyan-300"
                >
                  Log In / Register
                </button>
              </div>
            )}
          </div>
        )}

        {/* Wizard Footer Controls */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-950 hover:bg-slate-800 border border-slate-800 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 7 ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs font-bold text-cyan-950 bg-cyan-400 hover:bg-cyan-300 transition-colors cursor-pointer"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              disabled={submitting}
              onClick={handleSubmitRequest}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-xs font-bold text-cyan-950 bg-cyan-400 hover:bg-cyan-300 active:scale-[0.98] transition-all shadow-lg shadow-cyan-500/20 cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{submitting ? 'Submitting Request...' : 'Submit Website Request'}</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
