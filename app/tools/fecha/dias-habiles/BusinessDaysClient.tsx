"use client";

import React from 'react';

export default function BusinessDaysClient() {
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [businessDays, setBusinessDays] = React.useState(0);
  const [totalDays, setTotalDays] = React.useState(0);

  const calculate = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) return;

    let count = 0;
    let total = 0;
    const current = new Date(start);

    while (current <= end) {
      const dayOfWeek = current.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        count++;
      }
      total++;
      current.setDate(current.getDate() + 1);
    }

    setBusinessDays(count);
    setTotalDays(total);
  };

  React.useEffect(() => {
    if (startDate && endDate) {
      calculate();
    }
  }, [startDate, endDate]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Fecha Inicio</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Fecha Fin</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
      </div>

      {startDate && endDate && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 text-center">
            <div className="text-sm text-gray-500 mb-2">Días Hábiles</div>
            <div className="text-5xl font-bold text-teal-600">{businessDays}</div>
            <div className="text-xs text-gray-400 mt-1">Lunes a Viernes</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 text-center">
            <div className="text-sm text-gray-500 mb-2">Días Totales</div>
            <div className="text-5xl font-bold text-gray-600">{totalDays}</div>
            <div className="text-xs text-gray-400 mt-1">Incluyendo fines de semana</div>
          </div>
        </div>
      )}
    </div>
  );
}


