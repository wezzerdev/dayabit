import { useState, lazy, Suspense } from 'react';
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

  const handleSelectPlan = (planId: string) => {
    setTriggerPlan({ planId, timestamp: Date.now() });
  };

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
