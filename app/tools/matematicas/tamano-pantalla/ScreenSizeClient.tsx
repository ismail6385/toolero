"use client";

import React from 'react';

export default function ScreenSizeClient() {
  const [inches, setInches] = React.useState('27');
  const [ratio, setRatio] = React.useState('16:9');
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);

  const calculate = () => {
    const diagonal = parseFloat(inches) || 0;
    const [w, h] = ratio.split(':').map(Number);

    const x = diagonal / Math.sqrt(w * w + h * h);
    const widthInches = w * x;
    const heightInches = h * x;

    setWidth(widthInches * 2.54);
    setHeight(heightInches * 2.54);
  };

  React.useEffect(() => {
    calculate();
  }, [inches, ratio]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Tamaño (pulgadas)</label>
            <input
              type="number"
              value={inches}
              onChange={(e) => setInches(e.target.value)}
              className="w-full p-4 text-2xl text-center border-2 border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Relación de Aspecto</label>
            <select
              value={ratio}
              onChange={(e) => setRatio(e.target.value)}
              className="w-full p-4 text-xl border-2 border-gray-300 rounded-lg"
            >
              <option value="16:9">16:9 (HD)</option>
              <option value="16:10">16:10</option>
              <option value="21:9">21:9 (Ultrawide)</option>
              <option value="4:3">4:3 (Clásico)</option>
              <option value="1:1">1:1 (Cuadrado)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-6 text-center">Dimensiones Reales</h3>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-6 bg-purple-50 rounded-xl border border-purple-100">
            <div className="text-sm text-purple-500 font-bold uppercase mb-2">Ancho</div>
            <div className="text-4xl font-bold text-purple-600">{width.toFixed(1)}</div>
            <div className="text-gray-600 mt-1">cm</div>
          </div>

          <div className="text-center p-6 bg-purple-50 rounded-xl border border-purple-100">
            <div className="text-sm text-purple-500 font-bold uppercase mb-2">Alto</div>
            <div className="text-4xl font-bold text-purple-600">{height.toFixed(1)}</div>
            <div className="text-gray-600 mt-1">cm</div>
          </div>
        </div>

        <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-500 mb-1">Diagonal</div>
          <div className="text-2xl font-bold text-gray-800">
            {inches}" = {(parseFloat(inches) * 2.54).toFixed(1)} cm
          </div>
        </div>
      </div>
    </div>
  );
}


