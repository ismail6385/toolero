"use client";

import React from 'react';

export default function BarcodeGeneratorClient() {
  const [text, setText] = React.useState('123456789012');
  const [type, setType] = React.useState('code128');

  const generateBarcode = () => {
    const bars = text.split('').map((char, i) => (
      <div
        key={i}
        className={`inline-block ${i % 2 === 0 ? 'bg-black' : 'bg-white'}`}
        style={{ width: '4px', height: '80px' }}
      />
    ));
    return bars;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Tipo de Código</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="code128">Code 128</option>
              <option value="ean13">EAN-13</option>
              <option value="upc">UPC-A</option>
              <option value="code39">Code 39</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Texto/Número</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="123456789012"
              className="w-full p-3 border border-gray-300 rounded-lg font-mono"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-4 text-center">Vista Previa</h3>
        <div className="flex justify-center items-center p-8 bg-white border border-gray-200 rounded-lg">
          <div className="text-center">
            <div className="flex justify-center mb-2">
              {generateBarcode()}
            </div>
            <div className="font-mono text-sm text-gray-600">{text}</div>
          </div>
        </div>
        <div className="mt-4 text-center">
          <button className="px-6 py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-900">
            Descargar PNG
          </button>
        </div>
      </div>
    </div>
  );
}


