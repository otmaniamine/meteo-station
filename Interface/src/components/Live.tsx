import React, { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { easeElastic } from 'd3-ease';

const Live = () => {
  const [lastTenData, setLastTenData] = useState<any[]>([]);
  const API_URL =
    'https://sheets.googleapis.com/v4/spreadsheets/1EmGSNS0JdeQoriExc_iZdWEMjqZQghc6B3T8flW0vzc/values/sheet?key=AIzaSyC0tqAHGGL4vlFhf7U060qmfj_-dlTvBqs';

  // Fonction pour récupérer les données
  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      if (data.values && data.values.length > 1) {
        const headers = data.values[0]; // En-têtes
        const rows = data.values.slice(1); // Données sans les en-têtes

        // Mapper les données
        const formattedData = rows.map((row: string[]) =>
          headers.reduce((acc: any, key: string, index: number) => {
            acc[key.trim()] = row[index];
            return acc;
          }, {})
        );

        // Trier par date et heure
        const sortedData = formattedData.sort(
          (a: any, b: any) => new Date(a["Date "]).getTime() - new Date(b["Date "]).getTime()
        );

        // Extraire les 10 derniers résultats
        const lastTenEntries = sortedData.slice(-10);

        const graphData = lastTenEntries.map((entry: any) => ({
          name: entry["Time"], 
          temperature: parseFloat(entry["Temperature (°C)"].replace(",", ".")), 
        }));

        setLastTenData(graphData);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 30000); // Récupérer les données toutes les 30 secondes

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <section id="Live" className="py-20 bg-gradient-to-r from-blue-100 via-blue-200 to-indigo-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold text-blue-900 tracking-tight leading-tight">
            Température - Derniers Résultats
          </h2>
          <p className="mt-6 text-xl text-blue-800">
            Voici les 10 dernières mesures de température relevées. Suivez les changements en temps réel !
          </p>
        </div>

        {/* Graphique */}
        <div className="relative bg-white rounded-xl shadow-2xl p-8 transform hover:scale-105 transition-all">
          <h3 className="text-2xl font-bold text-blue-900 mb-6 text-center">
            Température au fil des 10 Derniers Résultats
          </h3>
          <div className="h-[400px] w-full flex items-center justify-center">
            {lastTenData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={lastTenData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                >
                  <Line
                    type="monotone"
                    dataKey="temperature"
                    stroke="url(#gradient)"
                    strokeWidth={3}
                    dot={{ r: 6 }}
                    activeDot={{ r: 8, stroke: '#FF5733', strokeWidth: 2 }}
                    animationDuration={500}
                  />
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      borderRadius: '8px',
                      padding: '10px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    }}
                    labelStyle={{ color: '#2563EB' }}
                    formatter={(value: any) => `${value}°C`}
                  />
                  <Legend verticalAlign="top" align="center" iconSize={12} />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2563EB" />
                      <stop offset="100%" stopColor="#FF5733" />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-blue-800">Chargement des données...</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Live;
