import React from 'react';
import { Cloud } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-blue-900/50 backdrop-blur-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Cloud className="w-8 h-8 text-blue-300" />
            <span className="ml-2 text-xl font-bold text-white">WeatherENSTA</span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink href="#features">Fonctionnalités</NavLink>
              <NavLink href="#map">Carte</NavLink>
              <NavLink href="#pricing">tarifs</NavLink>
              <NavLink href="#use-cases">Cas d'utilisation</NavLink>
              <NavLink href="#team">Équipe</NavLink>
              

            </div>
          </div>
          <div className="flex items-center">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
              Commencer
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
  >
    {children}
  </a>
);

export default Navbar;