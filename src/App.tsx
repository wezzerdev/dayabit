import { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeatureGrid from './components/FeatureGrid';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';
import WhatsAppOrderingDemo from './components/WhatsAppOrderingDemo';
import StorefrontRenderer from './components/StorefrontRenderer';
import TenantDashboard from './components/TenantDashboard';
import OnboardingFlow from './components/OnboardingFlow';

import { TenantStorageService } from './services/tenantStore';
import type { PlanTier, TenantStore } from './types/tenant';

// Lazy loaded components for lightning-fast initial page loads
const InteractiveDemo = lazy(() => import('./components/InteractiveDemo'));
const PricingCards = lazy(() => import('./components/PricingCards'));
const ContactLocation = lazy(() => import('./components/ContactLocation'));
const WhatsAppWidget = lazy(() => import('./components/WhatsAppWidget'));
const AdminAnalytics = lazy(() => import('./components/AdminAnalytics'));

const SectionLoader = () => (
  <div className="w-full py-20 flex items-center justify-center">
    <div className="w-6 h-6 rounded-full border-2 border-emerald-500/20 border-t-emerald-600 animate-spin" />
  </div>
);

interface TriggerPlan {
  planId: string;
  timestamp: number;
}

function App() {
  const [triggerPlan, setTriggerPlan] = useState<TriggerPlan | null>(null);
  const [showAdmin, setShowAdmin] = useState(false);

  // Multi-tenant routing states
  const [viewMode, setViewMode] = useState<'main' | 'dashboard' | 'storefront'>('main');
  const [currentStoreSlug, setCurrentStoreSlug] = useState<string | null>(null);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [onboardingPlan, setOnboardingPlan] = useState<PlanTier>('vitrina');

  // Detect route on initial load and handle browser back/forward buttons
  useEffect(() => {
    const syncRouteWithUrl = () => {
      const pathname = window.location.pathname;
      const search = window.location.search;
      const params = new URLSearchParams(search);

      // 1. Check if store URL (e.g. /p/cafeteria-geisha or ?store=cafeteria-geisha)
      if (pathname.startsWith('/p/')) {
        const slug = pathname.replace('/p/', '').replace(/\/$/, '');
        if (slug) {
          setCurrentStoreSlug(slug);
          setViewMode('storefront');
          return;
        }
      }
      if (params.has('store')) {
        setCurrentStoreSlug(params.get('store'));
        setViewMode('storefront');
        return;
      }

      // 2. Check if Dashboard URL (e.g. /dashboard or ?view=dashboard)
      if (pathname === '/dashboard' || params.get('view') === 'dashboard') {
        setViewMode('dashboard');
        return;
      }

      // 3. Check if Onboarding URL (e.g. /onboarding or ?view=onboarding)
      if (pathname === '/onboarding' || params.get('view') === 'onboarding') {
        setIsOnboardingOpen(true);
        setViewMode('main');
        return;
      }

      // 4. Check if Admin Analytics (?admin=true or ?analytics=true)
      if (params.has('admin') || params.has('analytics')) {
        setShowAdmin(true);
        return;
      }

      // Default to main landing page
      setViewMode('main');
    };

    syncRouteWithUrl();
    window.addEventListener('popstate', syncRouteWithUrl);
    return () => window.removeEventListener('popstate', syncRouteWithUrl);
  }, []);

  // Serverless Analytics visit logging (only on main landing page)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (!params.has('admin') && !params.has('analytics') && viewMode === 'main') {
      const logVisit = async () => {
        try {
          await fetch('/api/analytics', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              path: window.location.pathname,
              referrer: document.referrer || 'Directo',
              gclid: params.get('gclid') || null,
              screenWidth: window.innerWidth,
              isMobile: window.innerWidth < 768
            })
          });
        } catch {
          // Fail silently to avoid breaking UX
        }
      };
      logVisit();
    }
  }, [viewMode]);

  // Handle plan selection from PricingCards
  const handleSelectPlan = (planId: string) => {
    const validPlan: PlanTier = (planId === 'esencial' || planId === 'vitrina' || planId === 'pro') ? planId : 'vitrina';
    setOnboardingPlan(validPlan);
    setIsOnboardingOpen(true);
    setTriggerPlan({ planId, timestamp: Date.now() });
  };

  // Switch to specific store view
  const handleOpenStore = (slug: string) => {
    window.history.pushState({}, '', `/p/${slug}`);
    setCurrentStoreSlug(slug);
    setViewMode('storefront');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Switch back to Dayabit main portal
  const handleBackToMain = () => {
    window.history.pushState({}, '', '/');
    setViewMode('main');
    setCurrentStoreSlug(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Switch to dashboard view
  const handleOpenDashboard = () => {
    window.history.pushState({}, '', '/dashboard');
    setViewMode('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle successful store creation
  const handleOnboardingSuccess = (newStore: TenantStore) => {
    setIsOnboardingOpen(false);
    handleOpenStore(newStore.slug);
  };

  // 1. Admin Analytics View
  if (showAdmin) {
    return (
      <Suspense fallback={<SectionLoader />}>
        <AdminAnalytics onClose={() => {
          window.history.pushState({}, '', window.location.pathname);
          setShowAdmin(false);
        }} />
      </Suspense>
    );
  }

  // 2. Tenant Dashboard View
  if (viewMode === 'dashboard') {
    return (
      <TenantDashboard
        onOpenStore={handleOpenStore}
        onBackToMain={handleBackToMain}
        onCreateNewStore={() => {
          setOnboardingPlan('vitrina');
          setIsOnboardingOpen(true);
        }}
      />
    );
  }

  // 3. Public Storefront View
  if (viewMode === 'storefront' && currentStoreSlug) {
    const store = TenantStorageService.getStoreBySlug(currentStoreSlug);
    if (store) {
      return (
        <StorefrontRenderer
          store={store}
          onBackToMain={handleBackToMain}
        />
      );
    }
    // If store slug not found, fallback to 404/helper
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-2xl mb-4">
          🔍
        </div>
        <h2 className="font-display font-black text-2xl text-slate-900 mb-2">
          Tienda no encontrada
        </h2>
        <p className="text-sm text-slate-500 max-w-sm mb-6">
          No se encontró ninguna tienda registrada con la URL <strong>/p/{currentStoreSlug}</strong>.
        </p>
        <button
          onClick={handleBackToMain}
          className="px-6 py-2.5 rounded-full bg-[#00b37e] text-white font-bold text-xs shadow-xs"
        >
          Volver a Dayabit.com
        </button>
      </div>
    );
  }

  // 4. Main Marketing Landing Page View (dayabit.com)
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between selection:bg-emerald-500/20 selection:text-emerald-900">
      
      {/* Navigation Header */}
      <Navbar
        onOpenOnboarding={() => {
          setOnboardingPlan('vitrina');
          setIsOnboardingOpen(true);
        }}
        onOpenDashboard={handleOpenDashboard}
      />

      {/* Main content grid */}
      <main className="flex-grow">
        {/* Entry Hero Section */}
        <Hero />

        {/* Interactive WhatsApp Ordering System Showcase (Inspired by Pulpos) */}
        <WhatsAppOrderingDemo />

        {/* Pillars / Core Features */}
        <FeatureGrid />

        {/* 3 Step Workflow Process */}
        <HowItWorks />

        {/* Live Catalog & Checkout Simulator */}
        <Suspense fallback={<SectionLoader />}>
          <InteractiveDemo />
        </Suspense>

        {/* Three Plan Pricing Cards */}
        <Suspense fallback={<SectionLoader />}>
          <PricingCards onSelectPlan={handleSelectPlan} />
        </Suspense>

        {/* Contact and Location Section */}
        <Suspense fallback={<SectionLoader />}>
          <ContactLocation />
        </Suspense>
      </main>

      {/* Footer copyright and social navigation */}
      <Footer />

      {/* Professional floating WhatsApp chat widget */}
      <Suspense fallback={null}>
        <WhatsAppWidget triggerPlan={triggerPlan} />
      </Suspense>

      {/* Onboarding Wizard Modal */}
      {isOnboardingOpen && (
        <OnboardingFlow
          initialPlanId={onboardingPlan}
          onClose={() => setIsOnboardingOpen(false)}
          onSuccess={handleOnboardingSuccess}
        />
      )}

    </div>
  );
}

export default App;
