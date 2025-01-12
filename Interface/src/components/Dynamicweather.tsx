import React, { useEffect, useState } from 'react';
import { FaSun, FaCloudRain } from 'react-icons/fa'; // Icônes de soleil et pluie

interface DynamicweatherProps {
  isRaining: boolean;
}

const Dynamicweather: React.FC<DynamicweatherProps> = ({ isRaining }) => {
  return (
    <section className="flex justify-center items-center h-96 bg-white text-blue-500">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">
          {isRaining ? 'Il pleut actuellement' : 'Il fait beau !'}
        </h2>
        
        {/* Affichage de l'icône en fonction de la météo */}
        <div className="text-6xl">
          {isRaining ? <FaCloudRain /> : <FaSun />}
        </div>
      </div>
    </section>
  );
};

export default Dynamicweather;
