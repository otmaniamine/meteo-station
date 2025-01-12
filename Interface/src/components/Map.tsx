import React, { useEffect, useRef } from 'react';

// Remove local leaflet import and declare L globally
declare const L: any;

interface MapProps {
  onLocationSelect: (location: string) => void;
}

const Map: React.FC<MapProps> = ({ onLocationSelect }) => {
  const mapRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView([36.75, 3.06], 6);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapRef.current);

      const locations = [
        { name: 'Tiaret', coords: [35.371, 1.316] },
        { name: 'Béjaïa', coords: [36.755, 5.084] },
        { name: 'Alger', coords: [36.75, 3.06] }
      ];

      locations.forEach(location => {
        const marker = L.marker(location.coords).addTo(mapRef.current!);
        marker.bindPopup(location.name);
        marker.on('click', () => {
          onLocationSelect(location.name);
        });
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [onLocationSelect]);

  return <div ref={mapContainerRef} className="w-full h-full" />;
};

export default Map;