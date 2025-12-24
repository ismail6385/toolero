"use client";

import React from 'react';

export default function TipByCountryClient() {
  const [country, setCountry] = React.useState('US');
  const [amount, setAmount] = React.useState('100');
  const [tip, setTip] = React.useState(0);
  const [total, setTotal] = React.useState(0);

  const COUNTRIES = {
    US: { name: 'Estados Unidos', tip: 20, custom: 'Propina obligatoria en restaurantes' },
    ES: { name: 'España', tip: 10, custom: 'Propina opcional, 5-10%' },
    MX: { name: 'México', tip: 15, custom: 'Propina esperada 10-15%' },
    AR: { name: 'Argentina', tip: 10, custom: 'Propina común 10%' },
    FR: { name: 'Francia', tip: 0, custom: 'Servicio incluido en la cuenta' },
    JP: { name: 'Japón', tip: 0, custom: 'No se da propina, puede ser ofensivo' },
    UK: { name: 'Reino Unido', tip: 10, custom: 'Propina opcional 10-12%' },
    IT: { name: 'Italia', tip: 5, custom: 'Propina pequeña o redondear' },
    DE: { name: 'Alemania', tip: 10, custom: 'Redondear o 5-10%' },
    BR: { name: 'Brasil', tip: 10, custom: 'Servicio incluido 10%' },
  };

  const calculate = () => {
    const bill = parseFloat(amount) || 0;
    const tipPercent = COUNTRIES[country as keyof typeof COUNTRIES].tip;
    const tipAmount = (bill * tipPercent) / 100;
    setTip(tipAmount);
    setTotal(bill + tipAmount);
  };

  React.useEffect(() => {
    calculate();
  }, [country, amount]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">País</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              {Object.entries(COUNTRIES).map(([code, data]) => (
                <option key={code} value={code}>
                  {data.name}
                </option>
              ))}
            </select>
            <div className="mt-2 text-sm text-gray-500">
              {COUNTRIES[country as keyof typeof COUNTRIES].custom}
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Monto de la Cuenta</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 text-xl border border-gray-300 rounded-lg"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 text-center">
          <div className="text-sm text-gray-500 mb-2">Propina Sugerida</div>
          <div className="text-3xl font-bold text-emerald-600">${tip.toFixed(2)}</div>
          <div className="text-xs text-gray-400 mt-1">
            {COUNTRIES[country as keyof typeof COUNTRIES].tip}%
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 text-center">
          <div className="text-sm text-gray-500 mb-2">Total a Pagar</div>
          <div className="text-3xl font-bold text-gray-800">${total.toFixed(2)}</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 text-center">
          <div className="text-sm text-gray-500 mb-2">Cuenta Original</div>
          <div className="text-3xl font-bold text-gray-600">
            ${parseFloat(amount || '0').toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}


