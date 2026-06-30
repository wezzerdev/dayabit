import { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeatureGrid from './components/FeatureGrid';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';

// Lazy loaded components for lightning-fast initial page loads
const InteractiveDemo = lazy(() => import('./components/InteractiveDemo'));
const PricingCards = lazy(() => import('./components/PricingCards'));
const ContactLocation = lazy(() => import('./components/ContactLocation'));
const WhatsAppWidget = lazy(() => import('./components/WhatsAppWidget'));
const AdminAnalytics = lazy(() => import('./components/AdminAnalytics'));

const SectionLoader = () => (
  <div className="w-full py-20 flex items-center justify-center">
    <div className="w-6 h-6 rounded-full border-2 border-violet-500/20 border-t-violet-400 animate-spin" />
  </div>
);

interface TriggerPlan {
  planId: string;
  timestamp: number;
}

function App() {
  const [triggerPlan, setTriggerPlan] = useState<TriggerPlan | null>(null);
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    // 1. Detect if the admin URL is active (?admin=true or ?analytics=true)
    const params = new URLSearchParams(window.location.search);
    if (params.has('admin') || params.has('analytics')) {
      setShowAdmin(true);
    }

    // 2. Log visit to serverless analytics endpoint (only for actual landing page visitors)
    if (!params.has('admin') && !params.has('analytics')) {
      const logVisit = async () => {
        try {
          await fetch('/api/analytics', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              path: window.location.pathname,
              referrer: document.referrer || 'Directo',
              gclid: params.get('gclid') || null,
              screenWidth: window.innerWidth,
              isMobile: window.innerWidth < 768
            })
          });
        } catch (e) {
          // Fail silently to avoid breaking UX
        }
      };
      logVisit();
    }
  }, []);

  const handleSelectPlan = (planId: string) => {
    setTriggerPlan({ planId, timestamp: Date.now() });
  };

  if (showAdmin) {
    return (
      <Suspense fallback={<SectionLoader />}>
        <AdminAnalytics onClose={() => {
          // Clear query parameters from address bar to return cleanly
          window.history.pushState({}, '', window.location.pathname);
          setShowAdmin(false);
        }} />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg text-slate-100 flex flex-col justify-between selection:bg-violet-500/30 selection:text-white">
      {/* Navigation Header */}
      <Navbar />

      {/* Main content grid */}
      <main className="flex-grow">
        {/* Entry Hero Section */}
        <Hero />

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
    </div>
  );
}

export default App;
