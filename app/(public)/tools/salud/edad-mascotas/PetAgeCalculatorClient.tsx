"use client";

import React from 'react';

export default function PetAgeCalculatorClient() {
  const [petType, setPetType] = React.useState<'dog' | 'cat'>('dog');
  const [age, setAge] = React.useState('1');
  const [humanAge, setHumanAge] = React.useState(15);

  const calculateHumanAge = () => {
    const years = parseInt(age) || 0;
    let result = 0;

    if (years === 1) result = 15;
    else if (years === 2) result = 24;
    else if (years > 2) result = 24 + (years - 2) * 4;

    setHumanAge(result);
  };

  React.useEffect(() => {
    calculateHumanAge();
  }, [petType, age]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Tipo de Mascota</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setPetType('dog')}
              className={`p-4 rounded-lg border-2 transition-all ${petType === 'dog'
                ? 'border-amber-500 bg-amber-50 text-amber-700'
                : 'border-gray-200 hover:border-amber-200'
                }`}
            >
              🐕 Perro
            </button>
            <button
              onClick={() => setPetType('cat')}
              className={`p-4 rounded-lg border-2 transition-all ${petType === 'cat'
                ? 'border-amber-500 bg-amber-50 text-amber-700'
                : 'border-gray-200 hover:border-amber-200'
                }`}
            >
              🐈 Gato
            </button>
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Edad (años)</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            min="0"
            max="30"
            className="w-full p-4 text-2xl text-center border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      <div className="text-center p-8 bg-amber-50 rounded-xl border border-amber-100">
        <div className="text-sm text-amber-500 font-bold uppercase mb-2">Edad en Años Humanos</div>
        <div className="text-6xl font-bold text-amber-600 mb-2">{humanAge}</div>
        <div className="text-gray-600">años</div>
      </div>
    </div>
  );
}


