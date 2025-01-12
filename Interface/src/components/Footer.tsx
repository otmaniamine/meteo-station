import React from 'react';
import { Cloud, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-blue-900/50 backdrop-blur-md py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Cloud className="w-8 h-8 text-blue-300" />
              <span className="ml-2 text-xl font-bold text-white">Weather ENSTA</span>
            </div>
            <p className="text-blue-100">
              Votre solution météorologique intelligente pour des décisions éclairées.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <FooterLink href="#features">Fonctionnalités</FooterLink>
              <FooterLink href="#team">Équipe</FooterLink>
              <FooterLink href="#contact">Contact</FooterLink>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Légal</h3>
            <ul className="space-y-2">
              <FooterLink href="/privacy">Confidentialité</FooterLink>
              <FooterLink href="/terms">Conditions d'utilisation</FooterLink>
              <FooterLink href="/cookies">Cookies</FooterLink>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-blue-100">
                <Mail className="w-5 h-5 mr-2" />
                contact@weatherenst.com
              </li>
              <li className="flex items-center text-blue-100">
                <Phone className="w-5 h-5 mr-2" />
                +213 6 69 43 20 19
              </li>
              <li className="flex items-center text-blue-100">
                <MapPin className="w-5 h-5 mr-2" />
                Algiers, Algeria
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-blue-800">
          <p className="text-center text-blue-200">
            © {new Date().getFullYear()} WeatherENSTA. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li>
    <a href={href} className="text-blue-100 hover:text-white transition-colors">
      {children}
    </a>
  </li>
);

export default Footer;