import React, { useState } from 'react';
import { User } from '../types';
import { BUSINESS_CONFIG } from '../services/storage';
import { 
  Menu, 
  X, 
  User as UserIcon, 
  LogOut, 
  LayoutDashboard, 
  PlusCircle, 
  Shield, 
  PhoneCall, 
  MessageCircle 
} from 'lucide-react';

interface NavbarProps {
  currentUser: User | null;
  onOpenAuth: (initialTab?: 'login' | 'register') => void;
  onLogout: () => void;
  onNavigate: (view: string) => void;
  currentView: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  onOpenAuth,
  onLogout,
  onNavigate,
  currentView,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleNavClick = (viewOrAnchor: string) => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    onNavigate(viewOrAnchor);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0b0f17]/90 backdrop-blur-md border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark (Strict Top Bar Contract) */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left group cursor-pointer focus-visible:outline-none"
        >
          <span className="font-display text-2xl font-extrabold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
            Site<span className="text-cyan-400">Forge</span>
          </span>
        </button>

        {/* Zone 2: 4–6 clean nav links with subtle hover underlines */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button
            onClick={() => handleNavClick('services')}
            className={`transition-colors cursor-pointer py-1 border-b-2 ${
              currentView === 'services'
                ? 'text-cyan-400 border-cyan-400 font-semibold'
                : 'border-transparent text-slate-300 hover:text-white hover:border-slate-500'
            }`}
          >
            Services
          </button>
          <button
            onClick={() => handleNavClick('how-it-works')}
            className={`transition-colors cursor-pointer py-1 border-b-2 ${
              currentView === 'how-it-works'
                ? 'text-cyan-400 border-cyan-400 font-semibold'
                : 'border-transparent text-slate-300 hover:text-white hover:border-slate-500'
            }`}
          >
            How It Works
          </button>
          <button
            onClick={() => handleNavClick('categories')}
            className={`transition-colors cursor-pointer py-1 border-b-2 ${
              currentView === 'categories'
                ? 'text-cyan-400 border-cyan-400 font-semibold'
                : 'border-transparent text-slate-300 hover:text-white hover:border-slate-500'
            }`}
          >
            Website Types
          </button>
          <button
            onClick={() => handleNavClick('pricing')}
            className={`transition-colors cursor-pointer py-1 border-b-2 ${
              currentView === 'pricing'
                ? 'text-cyan-400 border-cyan-400 font-semibold'
                : 'border-transparent text-slate-300 hover:text-white hover:border-slate-500'
            }`}
          >
            Pricing
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`transition-colors cursor-pointer py-1 border-b-2 ${
              currentView === 'about'
                ? 'text-cyan-400 border-cyan-400 font-semibold'
                : 'border-transparent text-slate-300 hover:text-white hover:border-slate-500'
            }`}
          >
            About
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className={`transition-colors cursor-pointer py-1 border-b-2 ${
              currentView === 'contact'
                ? 'text-cyan-400 border-cyan-400 font-semibold'
                : 'border-transparent text-slate-300 hover:text-white hover:border-slate-500'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Zone 3: 1–2 primary actions */}
        <div className="hidden md:flex items-center gap-3">
          {currentUser ? (
            <div className="flex items-center gap-3 relative">
              <button
                onClick={() => handleNavClick('request-wizard')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-cyan-950 bg-cyan-400 rounded-lg hover:bg-cyan-300 transition-colors shadow-sm whitespace-nowrap cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>+ Create Website</span>
              </button>

              <button
                onClick={() => handleNavClick(currentUser.role === 'admin' ? 'admin' : 'dashboard')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-200 bg-slate-800/90 border border-slate-700/80 rounded-lg hover:bg-slate-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                {currentUser.role === 'admin' ? (
                  <>
                    <Shield className="w-3.5 h-3.5 text-amber-400" />
                    <span>Admin Panel</span>
                  </>
                ) : (
                  <>
                    <LayoutDashboard className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Dashboard</span>
                  </>
                )}
              </button>

              {/* User Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-cyan-400 hover:border-cyan-400 transition-colors cursor-pointer"
                  title={currentUser.name}
                >
                  {currentUser.name.charAt(0).toUpperCase()}
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#0f172a] border border-slate-800 shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                    <div className="px-3.5 py-2 border-b border-slate-800/80">
                      <p className="text-xs font-semibold text-white truncate">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{currentUser.email}</p>
                      <div className="mt-1 text-[10px] uppercase font-bold tracking-wider text-cyan-400">
                        {currentUser.role === 'admin' ? 'Master Admin' : 'Customer Account'}
                      </div>
                    </div>

                    <button
                      onClick={() => handleNavClick('dashboard')}
                      className="w-full text-left px-3.5 py-2 text-xs text-slate-300 hover:bg-slate-800/70 hover:text-white flex items-center gap-2 cursor-pointer"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5 text-slate-400" />
                      <span>My Requests Dashboard</span>
                    </button>

                    {currentUser.role === 'admin' && (
                      <button
                        onClick={() => handleNavClick('admin')}
                        className="w-full text-left px-3.5 py-2 text-xs text-amber-300 hover:bg-slate-800/70 flex items-center gap-2 cursor-pointer"
                      >
                        <Shield className="w-3.5 h-3.5 text-amber-400" />
                        <span>Admin Management</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onLogout();
                      }}
                      className="w-full text-left px-3.5 py-2 text-xs text-rose-400 hover:bg-rose-950/30 flex items-center gap-2 cursor-pointer border-t border-slate-800/80 mt-1"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenAuth('login')}
                className="px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                Login
              </button>
              <button
                onClick={() => onOpenAuth('register')}
                className="px-4 py-2 text-xs font-semibold text-cyan-950 bg-cyan-400 rounded-lg hover:bg-cyan-300 transition-colors shadow-sm whitespace-nowrap cursor-pointer"
              >
                Create Your Website
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          {currentUser && (
            <button
              onClick={() => handleNavClick('request-wizard')}
              className="px-2.5 py-1.5 text-xs font-semibold text-cyan-950 bg-cyan-400 rounded-md"
            >
              + Request
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#0b0f17] px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-2 text-sm font-medium">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('services')}
              className="text-left px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              Services
            </button>
            <button
              onClick={() => handleNavClick('how-it-works')}
              className="text-left px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              How It Works
            </button>
            <button
              onClick={() => handleNavClick('categories')}
              className="text-left px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              Website Types
            </button>
            <button
              onClick={() => handleNavClick('pricing')}
              className="text-left px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              Pricing
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="text-left px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              About SiteForge
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-left px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              Contact Us
            </button>
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            {currentUser ? (
              <>
                <div className="px-3 py-1.5 bg-slate-900 rounded-lg text-xs text-slate-300 flex items-center justify-between">
                  <span>Logged in as: <strong className="text-white">{currentUser.name}</strong></span>
                  <span className="text-[10px] text-cyan-400 uppercase font-semibold">{currentUser.role}</span>
                </div>
                <button
                  onClick={() => handleNavClick('request-wizard')}
                  className="w-full py-2.5 text-center text-xs font-semibold text-cyan-950 bg-cyan-400 rounded-lg"
                >
                  + Create Website Request
                </button>
                <button
                  onClick={() => handleNavClick('dashboard')}
                  className="w-full py-2.5 text-center text-xs font-medium text-slate-200 bg-slate-800 rounded-lg"
                >
                  My Requests Dashboard
                </button>
                {currentUser.role === 'admin' && (
                  <button
                    onClick={() => handleNavClick('admin')}
                    className="w-full py-2.5 text-center text-xs font-semibold text-amber-300 bg-amber-950/40 border border-amber-800/60 rounded-lg"
                  >
                    Open Admin Management
                  </button>
                )}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="w-full py-2 text-center text-xs font-medium text-rose-400 hover:bg-rose-950/30 rounded-lg"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('register');
                  }}
                  className="w-full py-2.5 text-center text-xs font-semibold text-cyan-950 bg-cyan-400 rounded-lg"
                >
                  Create Your Website
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('login');
                  }}
                  className="w-full py-2.5 text-center text-xs font-medium text-slate-200 bg-slate-800 rounded-lg"
                >
                  Login to Account
                </button>
              </>
            )}

            {/* Quick Contact Links on Mobile */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
              <a
                href={BUSINESS_CONFIG.phoneHref}
                className="flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-slate-300 bg-slate-900 border border-slate-800 rounded-lg"
              >
                <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
                <span>Call Us</span>
              </a>
              <a
                href={`${BUSINESS_CONFIG.whatsappHref}?text=${encodeURIComponent(BUSINESS_CONFIG.whatsappDefaultMsg)}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-emerald-400 bg-emerald-950/30 border border-emerald-800/40 rounded-lg"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
