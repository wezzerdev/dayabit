import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeatureGrid from './components/FeatureGrid';
import HowItWorks from './components/HowItWorks';
import InteractiveDemo from './components/InteractiveDemo';
import PricingCards from './components/PricingCards';
import ContactLocation from './components/ContactLocation';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';

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
        <InteractiveDemo />

        {/* Three Plan Pricing Cards */}
        <PricingCards onSelectPlan={handleSelectPlan} />

        {/* Contact and Location Section */}
        <ContactLocation />
      </main>

      {/* Footer copyright and social navigation */}
      <Footer />

      {/* Professional floating WhatsApp chat widget */}
      <WhatsAppWidget triggerPlan={triggerPlan} />
    </div>
  );
}

export default App;
