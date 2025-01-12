import React, { useState } from 'react';
import Map from './Map';
import WeatherDashboard from './WeatherDashboard';

const MapSection = () => {
  const [showDashboard, setShowDashboard] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setShowDashboard(true);
  };
  
  return (
    <section id="map" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">Carte Interactive</h2>
          <p className="mt-4 text-xl text-blue-100">
            Explorez les conditions météorologiques en temps réel
          </p>
        </div>
        <div className="relative w-full h-[600px] rounded-xl overflow-hidden shadow-2xl">
          <Map onLocationSelect={handleLocationSelect} />
          {showDashboard && (
            <WeatherDashboard
              location={selectedLocation}
              onClose={() => setShowDashboard(false)}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default MapSection;