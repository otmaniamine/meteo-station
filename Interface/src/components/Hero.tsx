import React from 'react';
import { Cloud, Wind, Droplets } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Weather Station ENSTA
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-blue-200 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Votre Tableau de Bord Météorologique Intelligente
          </p>
          <div className="mt-8 flex justify-center space-x-8">
            <Feature
              icon={<Cloud className="w-8 h-8" />}
              title="Données Précises"
              description="Informations météorologiques en temps réel"
            />
            <Feature
              icon={<Wind className="w-8 h-8" />}
              title="Prévisions IA"
              description="Prédictions basées sur l'intelligence artificielle"
            />
            <Feature
              icon={<Droplets className="w-8 h-8" />}
              title="Interactive"
              description="Carte interactive avec données localisées"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Feature = ({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="p-3 bg-blue-700 rounded-lg">
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-medium">{title}</h3>
      <p className="mt-2 text-sm text-blue-200">{description}</p>
    </div>
  );
};

export default Hero;