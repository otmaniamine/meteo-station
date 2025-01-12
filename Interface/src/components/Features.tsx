import React from 'react';
import { Brain, BarChart3, Cloud, Wind } from 'lucide-react';

const Features = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-12">Fonctionnalités Clés</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<Brain className="w-8 h-8" />}
            title="Prévisions IA"
            description="Algorithmes avancés pour des prédictions météorologiques précises"
          />
          <FeatureCard
            icon={<BarChart3 className="w-8 h-8" />}
            title="Tableaux Personnalisés"
            description="Configurez vos tableaux de bord selon vos besoins"
          />
          <FeatureCard
            icon={<Cloud className="w-8 h-8" />}
            title="Données en Temps Réel"
            description="Informations météorologiques actualisées en continu"
          />
          <FeatureCard
            icon={<Wind className="w-8 h-8" />}
            title="API Complète"
            description="Intégrez nos données dans vos applications"
          />
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all hover:transform hover:scale-105">
    <div className="text-blue-600 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-blue-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default Features;