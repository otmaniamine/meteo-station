import React from 'react';
import { Truck, Calendar, Leaf } from 'lucide-react';

const UseCases = () => {
  return (
    <section id="use-cases" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-900">Adapté à votre secteur</h2>
          <p className="mt-4 text-xl text-gray-600">
            Des solutions sur mesure pour chaque industrie
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <UseCaseCard
            icon={<Truck className="w-12 h-12" />}
            title="Transport & Logistique"
            description="Optimisez vos itinéraires en fonction des conditions météorologiques"
          />
          <UseCaseCard
            icon={<Calendar className="w-12 h-12" />}
            title="Événementiel"
            description="Planifiez vos événements en toute confiance avec des prévisions précises"
          />
          <UseCaseCard
            icon={<Leaf className="w-12 h-12" />}
            title="Agriculture"
            description="Prenez des décisions éclairées basées sur des données météorologiques détaillées"
          />
        </div>
      </div>
    </section>
  );
};

const UseCaseCard = ({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="bg-white rounded-xl p-8 shadow-lg text-center">
    <div className="inline-block p-4 bg-blue-50 rounded-full text-blue-600 mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-blue-900 mb-4">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default UseCases;