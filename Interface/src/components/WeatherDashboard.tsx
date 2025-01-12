import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface WeatherDashboardProps {
  location: string;
  onClose: () => void;
}

const WeatherDashboard: React.FC<WeatherDashboardProps> = ({ location, onClose }) => {
  const [weatherData, setWeatherData] = useState<any[]>([]);

  const sheetId = 'your-google-sheet-id'; // Replace with your actual Google Sheets ID
  const apiKey = 'your-google-api-key'; // Replace with your actual API key

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // Fetch data from Google Sheets
        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/1EmGSNS0JdeQoriExc_iZdWEMjqZQghc6B3T8flW0vzc/values/sheet?key=AIzaSyC0tqAHGGL4vlFhf7U060qmfj_-dlTvBqs`
        );
        const data = await response.json();
        const rows = data.values;

        if (rows) {
          // Group measurements by date
          const groupedByDate: Record<string, any[]> = {};
          rows.slice(1).forEach((row: any) => {
            const date = row[0];
            if (!groupedByDate[date]) {
              groupedByDate[date] = [];
            }
            groupedByDate[date].push(row);
          });

          // Calculate the average for each day
          const filteredData = Object.keys(groupedByDate).map((date) => {
            const dailyData = groupedByDate[date];
            const averageTemperature = dailyData.reduce((sum, entry) => sum + parseFloat(entry[2]), 0) / dailyData.length;
            const averageHumidity = dailyData.reduce((sum, entry) => sum + parseFloat(entry[3].replace(',', '.')), 0) / dailyData.length;
            const averageWindSpeed = dailyData.reduce((sum, entry) => sum + parseFloat(entry[6]), 0) / dailyData.length;
            const luminosity = dailyData[0][4]; // Assuming luminosity doesn't change much during the day
            const averageRainy = dailyData.reduce((sum, entry) => sum + parseFloat(entry[7]), 0) / dailyData.length;

            return {
              date,
              temperature: averageTemperature.toFixed(2),
              humidity: averageHumidity.toFixed(2),
              windSpeed: averageWindSpeed.toFixed(2),
              luminosity,

            };
          });

          setWeatherData(filteredData);
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, []); // Empty dependency array ensures the data is fetched once when the component mounts

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="max-w-6xl mx-auto my-8 p-6 bg-gradient-to-br from-blue-900 to-blue-950 rounded-2xl shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white">Météo à {location}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-blue-800 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="bg-blue-800/50 p-6 rounded-xl mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl text-blue-200">{weatherData[0]?.date}</p>
              <p className="text-lg text-blue-300">Lieu : {location}</p>
            </div>
            <div className="text-6xl font-bold text-white">{weatherData[0]?.temperature}°C</div>
            <div className="text-5xl">{weatherData[0]?.rainy === '0.00' ? '☀️' : '🌧️'}</div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-blue-800/50 text-blue-100">
                <th className="px-4 py-3 text-left">Jour</th>
                <th className="px-4 py-3">Température</th>
                <th className="px-4 py-3">Humidité</th>
                <th className="px-4 py-3">Vitesse Vent</th>
                <th className="px-4 py-3">Luminosité</th>
                <th className="px-4 py-3">Pluie</th>
              </tr>
            </thead>
            <tbody>
              {weatherData.map((day, index) => (
                <tr
                  key={index}
                  className="border-b border-blue-800/30 text-blue-100 hover:bg-blue-800/20 transition-colors"
                >
                  <td className="px-4 py-3">{day.date}</td>
                  <td className="px-4 py-3 text-center">{day.temperature}°C</td>
                  <td className="px-4 py-3 text-center">{day.humidity}%</td>
                  <td className="px-4 py-3 text-center">{day.windSpeed} m/s</td>
                  <td className="px-4 py-3 text-center">{day.luminosity}</td>
                  <td className="px-4 py-3 text-center">{day.rainy === '0.00' ? 'Non' : 'Oui'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
