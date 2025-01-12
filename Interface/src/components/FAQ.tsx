import React from 'react';

const FAQ = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-900">Questions Fréquentes</h2>
        </div>
        <div className="space-y-6">
          <FAQItem
            question="Comment fonctionne la carte interactive ?"
            answer="Notre carte interactive utilise des données en temps réel pour afficher les conditions météorologiques actuelles. Cliquez simplement sur un emplacement pour voir les détails."
          />
          <FAQItem
            question="Puis-je intégrer les données dans mon système existant ?"
            answer="Oui, nous proposons une API RESTful complète qui vous permet d'intégrer facilement nos données météorologiques dans vos applications existantes."
          />
          <FAQItem
            question="Offrez-vous un essai gratuit ?"
            answer="Oui, nous proposons un essai gratuit de 14 jours avec accès à toutes les fonctionnalités premium, sans engagement."
          />
        </div>
      </div>
    </section>
  );
};

const FAQItem = ({ question, answer }: { question: string; answer: string }) => (
  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
    <h3 className="text-lg font-semibold text-blue-900 mb-2">{question}</h3>
    <p className="text-gray-600">{answer}</p>
  </div>
);

export default FAQ;