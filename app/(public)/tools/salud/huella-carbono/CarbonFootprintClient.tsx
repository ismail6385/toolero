"use client";

import React from 'react';

export default function CarbonFootprintClient() {
  const [electricity, setElectricity] = React.useState('200');
  const [gas, setGas] = React.useState('50');
  const [car, setCar] = React.useState('1000');
  const [flights, setFlights] = React.useState('2');
  const [total, setTotal] = React.useState(0);

  const calculate = () => {
    const elec = (parseFloat(electricity) || 0) * 12 * 0.5;
    const gasVal = (parseFloat(gas) || 0) * 12 * 2.3;
    const carVal = (parseFloat(car) || 0) * 12 * 0.2;
    const flightVal = (parseFloat(flights) || 0) * 500;

    setTotal(Math.round(elec + gasVal + carVal + flightVal));
  };

  React.useEffect(() => {
    calculate();
  }, [electricity, gas, car, flights]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-6">Datos Mensuales</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Electricidad (kWh/mes)</label>
            <input
              type="number"
              value={electricity}
              onChange={(e) => setElectricity(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Gas Natural (m³/mes)</label>
            <input
              type="number"
              value={gas}
              onChange={(e) => setGas(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Kilómetros en Coche (km/mes)</label>
            <input
              type="number"
              value={car}
              onChange={(e) => setCar(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Vuelos al Año</label>
            <input
              type="number"
              value={flights}
              onChange={(e) => setFlights(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-4">Huella de Carbono Anual</h3>
        <div className="text-center p-8 bg-green-50 rounded-xl border border-green-100">
          <div className="text-6xl font-bold text-green-600 mb-2">{total.toLocaleString()}</div>
          <div className="text-gray-600">kg CO₂ / año</div>
        </div>
        <div className="mt-6 text-sm text-gray-500 text-center">
          Promedio mundial: ~4,000 kg CO₂/año por persona
        </div>
      </div>
    </div>
  );
}


