"use client";

import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
import FeatureSection from './components/FeatureSection';
import HowItWorks from './components/HowItWorks';
import ShowcaseSection from './components/ShowcaseSection';
import PricingSection from './components/PricingSection';
import CtaSection from './components/CtaSection';
import Footer from './components/Footer';

const navItems = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Showcase', href: '#showcase' },
  { label: 'Pricing', href: '#pricing' }
];

const footerSections = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#' },
      { label: 'Pricing', href: '#' },
      { label: 'Integrations', href: '#' },
      { label: 'Changelog', href: '#' },
      { label: 'Roadmap', href: '#' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '#' },
      { label: 'Tutorials', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Community', href: '#' },
      { label: 'Help Center', href: '#' }
    ]
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' },
      { label: 'Contact', href: '#' },
      { label: 'Legal', href: '#' }
    ]
  }
];

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <NavBar />
      <main className="flex-1">
        <div className='py-1 bg-[#101c2c]'>
        <HeroSection />
        </div>
        
        <div className='py-1 bg-[#101c2c]'>
        <FeatureSection />
        </div>

        <div className='py-10 bg-[#101c2c]'>
        <HowItWorks />
        </div>

        <div className='py-5 bg-[#101c2c]'>
        <ShowcaseSection />
        </div>

        <div>
        <PricingSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;