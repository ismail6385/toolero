"use client";

import React from 'react';

export default function PassphraseGeneratorClient() {
  const [wordCount, setWordCount] = React.useState('4');
  const [separator, setSeparator] = React.useState('-');
  const [passphrase, setPassphrase] = React.useState('');
  const [copied, setCopied] = React.useState(false);

  const WORDS = [
    'casa', 'perro', 'gato', 'sol', 'luna', 'mar', 'rio', 'monte', 'valle', 'cielo',
    'nube', 'flor', 'arbol', 'viento', 'lluvia', 'nieve', 'fuego', 'agua', 'tierra', 'aire',
    'libro', 'mesa', 'silla', 'puerta', 'ventana', 'coche', 'tren', 'avion', 'barco', 'bici',
    'rojo', 'azul', 'verde', 'amarillo', 'negro', 'blanco', 'gris', 'rosa', 'morado', 'naranja',
    'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez'
  ];

  const generatePassphrase = () => {
    const count = parseInt(wordCount) || 4;
    const words: string[] = [];
    for (let i = 0; i < count; i++) {
      const word = WORDS[Math.floor(Math.random() * WORDS.length)];
      words.push(word.charAt(0).toUpperCase() + word.slice(1));
    }
    const phrase = words.join(separator) + Math.floor(Math.random() * 100);
    setPassphrase(phrase);
  };

  const copyPassphrase = () => {
    navigator.clipboard.writeText(passphrase);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  React.useEffect(() => {
    generatePassphrase();
  }, [wordCount, separator]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Número de Palabras</label>
            <input
              type="number"
              value={wordCount}
              onChange={(e) => setWordCount(e.target.value)}
              min="3"
              max="8"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Separador</label>
            <select
              value={separator}
              onChange={(e) => setSeparator(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="-">Guión (-)</option>
              <option value="_">Guión bajo (_)</option>
              <option value=".">Punto (.)</option>
              <option value="">Sin separador</option>
            </select>
          </div>
        </div>

        <button
          onClick={generatePassphrase}
          className="w-full bg-green-600 text-white font-bold py-4 rounded-lg hover:bg-green-700 transition-all"
        >
          Generar Nueva Frase
        </button>
      </div>

      {passphrase && (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800">Frase Generada</h3>
            <button
              onClick={copyPassphrase}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${copied ? 'bg-green-500 text-white' : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
            >
              {copied ? '✓ Copiado!' : 'Copiar'}
            </button>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-2xl font-mono text-center text-gray-800 break-all">{passphrase}</div>
          </div>
        </div>
      )}
    </div>
  );
}


