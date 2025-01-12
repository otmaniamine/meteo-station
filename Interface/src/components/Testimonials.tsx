import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  return (
    <section className="py-20 bg-blue-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">Ce que nos clients disent</h2>
          <p className="mt-4 text-xl text-blue-100">
            Découvrez pourquoi les entreprises nous font confiance
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <TestimonialCard
            quote="WeatherENST nous a permis d'optimiser nos livraisons en fonction des conditions météorologiques."
            author="SOFIANE BOUZRARA"
            role="Directeur Logistique, TransCorp"
            rating={5}
          />
          <TestimonialCard
            quote="Les prévisions IA sont d'une précision remarquable. Un outil indispensable pour notre activité agricole."
            author="FAOUZI ASSOUS"
            role="Agricultrice"
            rating={4}
          />
                    <TestimonialCard
            quote="Les prévisions IA sont d'une précision remarquable."
            author="MOHAMED HOUMEL"
            role="INGENIEUR EN TELECOMUNICATIONS (messenger)"
            rating={5}
          />
          <TestimonialCard
            quote="L'interface est intuitive et les données sont toujours à jour. Exactement ce dont nous avions besoin."
            author="ISLAM BOUADJADJ"
            role="Organisateur d'événements"
            rating={4}
          />
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ quote, author, role, rating }: {
  quote: string;
  author: string;
  role: string;
  rating: number;
}) => (
  <div className="bg-blue-800/50 rounded-xl p-8 backdrop-blur-sm">
    <div className="flex mb-4">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
      ))}
    </div>
    <Quote className="w-8 h-8 text-blue-300 mb-4" />
    <p className="text-blue-100 mb-6">{quote}</p>
    <div>
      <p className="font-semibold text-white">{author}</p>
      <p className="text-blue-300">{role}</p>
    </div>
  </div>
);

export default Testimonials;