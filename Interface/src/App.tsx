import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Live from './components/Live';
import MapSection from './components/MapSection';
import UseCases from './components/UseCases';
import FAQ from './components/FAQ';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import Team from './components/Team';
import Footer from './components/Footer';

function App() {
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-800">
      <Navbar />
      <Hero />
      <Features />
      <Live />
      <MapSection />
      <UseCases />
      <Pricing/>
      <FAQ />
      <Testimonials />
      <Team />
      <Footer />
    </div>
  );
}

export default App;
