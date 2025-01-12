import React from 'react';
import { Check } from 'lucide-react';

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 bg-blue-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">Tarifs Simples et Transparents</h2>
          <p className="mt-4 text-xl text-blue-100">
            Choisissez le plan qui correspond à vos besoins
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PricingCard
            title="Starter"
            price="0DZD"
            features={[
              "Accès aux données de base",
              "Carte interactive limitée",
              "Mises à jour quotidiennes",
              "Support par email"
            ]}
          />
          <PricingCard
            title="Pro"
            price="2900DZD"
            features={[
              "Données en temps réel",
              "Carte interactive complète",
              "Prévisions IA avancées",
              "API Access",
              "Support prioritaire"
            ]}
            highlighted
          />
          <PricingCard
            title="Enterprise"
            price="Sur mesure"
            features={[
              "Solutions personnalisées",
              "Intégration sur mesure",
              "SLA garanti",
              "Support dédié 24/7",
              "Formation incluse"
            ]}
          />
        </div>
      </div>
    </section>
  );
};

const PricingCard = ({ title, price, features, highlighted = false }: {
  title: string;
  price: string;
  features: string[];
  highlighted?: boolean;
}) => (
  <div className={`
    rounded-xl p-8 backdrop-blur-sm
    ${highlighted ? 'bg-blue-600/50 transform scale-105' : 'bg-blue-800/50'}
  `}>
    <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
    <p className="text-3xl font-bold text-blue-300 mb-6">{price}<span className="text-sm">/mois</span></p>
    <ul className="space-y-4">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center text-blue-100">
          <Check className="w-5 h-5 text-blue-300 mr-2" />
          {feature}
        </li>
      ))}
    </ul>
    <button className={`
      w-full mt-8 px-6 py-3 rounded-lg font-semibold transition-colors
      ${highlighted
        ? 'bg-white text-blue-600 hover:bg-blue-50'
        : 'bg-blue-600 text-white hover:bg-blue-700'
      }
    `}>
      Commencer
    </button>
  </div>
);

export default Pricing;