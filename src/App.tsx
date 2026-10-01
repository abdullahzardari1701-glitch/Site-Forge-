/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { User, WebsiteRequest } from './types';
import { authService } from './services/authService';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { WebsiteCategoriesSection } from './components/WebsiteCategoriesSection';
import { ServicesSection } from './components/ServicesSection';
import { PricingSection } from './components/PricingSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { CustomerDashboard } from './components/CustomerDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { WebsiteRequestWizard } from './components/WebsiteRequestWizard';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<string>('home');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');
  
  // Pre-fill parameters for the wizard
  const [wizardPreselectedCategory, setWizardPreselectedCategory] = useState<string | undefined>();
  const [wizardPreselectedTier, setWizardPreselectedTier] = useState<string | undefined>();

  // Sync auth state
  const refreshUser = () => {
    const user = authService.getCurrentUser();
    setCurrentUser(user);
  };

  useEffect(() => {
    refreshUser();

    const handleStorageUpdate = () => {
      refreshUser();
    };

    window.addEventListener('siteforge_store_updated', handleStorageUpdate);
    return () => {
      window.removeEventListener('siteforge_store_updated', handleStorageUpdate);
    };
  }, []);

  const handleOpenAuth = (tab: 'login' | 'register' = 'login') => {
    setAuthModalTab(tab);
    setAuthModalOpen(true);
  };

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
    setCurrentView('home');
  };

  const handleStartRequest = (category?: string, tier?: string) => {
    setWizardPreselectedCategory(category);
    setWizardPreselectedTier(tier);
    setCurrentView('request-wizard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (view: string) => {
    if (view === 'dashboard') {
      if (!currentUser) {
        handleOpenAuth('login');
        return;
      }
      setCurrentView('dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (view === 'admin') {
      if (!currentUser || currentUser.role !== 'admin') {
        handleOpenAuth('login');
        return;
      }
      setCurrentView('admin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (view === 'request-wizard') {
      handleStartRequest();
      return;
    }

    // Anchor navigation or main sections
    setCurrentView(view);
    const element = document.getElementById(view);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white">
      
      {/* Navigation Bar */}
      <Navbar
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        onNavigate={handleNavigate}
        currentView={currentView}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentView === 'request-wizard' ? (
          <WebsiteRequestWizard
            currentUser={currentUser}
            onOpenAuth={() => handleOpenAuth('login')}
            onSuccess={(req) => {
              setCurrentView('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onCancel={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            preselectedCategory={wizardPreselectedCategory}
            preselectedTier={wizardPreselectedTier}
          />
        ) : currentView === 'dashboard' ? (
          currentUser ? (
            <CustomerDashboard
              currentUser={currentUser}
              onCreateNewRequest={() => handleStartRequest()}
              onNavigateHome={() => handleNavigate('home')}
            />
          ) : (
            <div className="py-20 text-center">
              <p className="text-slate-400 mb-4">Please log in to view your customer dashboard.</p>
              <button
                onClick={() => handleOpenAuth('login')}
                className="px-5 py-2.5 bg-cyan-400 text-cyan-950 font-bold rounded-xl text-xs"
              >
                Sign In
              </button>
            </div>
          )
        ) : currentView === 'admin' ? (
          currentUser && currentUser.role === 'admin' ? (
            <AdminDashboard
              currentUser={currentUser}
              onNavigateHome={() => handleNavigate('home')}
            />
          ) : (
            <div className="py-20 text-center">
              <p className="text-rose-400 mb-4">Admin privileges required to access this panel.</p>
              <button
                onClick={() => handleOpenAuth('login')}
                className="px-5 py-2.5 bg-slate-800 text-white font-bold rounded-xl text-xs"
              >
                Admin Login
              </button>
            </div>
          )
        ) : (
          /* Public Website Presentation */
          <div className="space-y-0">
            <HeroSection
              onStartRequest={() => handleStartRequest()}
              onExploreServices={() => handleNavigate('services')}
              onSelectCategory={(cat) => handleStartRequest(cat)}
            />

            <HowItWorksSection
              onStartRequest={() => handleStartRequest()}
            />

            <WebsiteCategoriesSection
              onRequestCategory={(cat) => handleStartRequest(cat)}
            />

            <ServicesSection
              onStartRequest={() => handleStartRequest()}
            />

            <PricingSection
              onSelectTier={(tier) => handleStartRequest(undefined, tier)}
            />

            <AboutSection
              onStartRequest={() => handleStartRequest()}
            />

            <ContactSection />
          </div>
        )}
      </main>

      {/* Floating WhatsApp Action Trigger */}
      <FloatingWhatsApp />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialTab={authModalTab}
        onAuthSuccess={(user) => {
          setCurrentUser(user);
          if (user.role === 'admin') {
            setCurrentView('admin');
          } else {
            setCurrentView('dashboard');
          }
        }}
      />

    </div>
  );
}
