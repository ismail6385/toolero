"use client";

import React from 'react';

export default function ExcuseGeneratorClient() {
  const [excuse, setExcuse] = React.useState('');
  const [copied, setCopied] = React.useState(false);

  const SUBJECTS = [
    'Mi perro', 'Mi gato', 'Mi abuela', 'Mi vecino', 'Mi jefe', 'El cartero',
    'Un extraterrestre', 'Mi teléfono', 'Mi despertador', 'El wifi'
  ];

  const ACTIONS = [
    'se comió', 'escondió', 'destruyó', 'robó', 'perdió', 'olvidó',
    'rompió', 'mojó', 'quemó', 'borró'
  ];

  const OBJECTS = [
    'mi tarea', 'mis llaves', 'mi proyecto', 'mi informe', 'mi presentación',
    'mis apuntes', 'mi trabajo', 'mi documento', 'mi archivo', 'mi código'
  ];

  const ENDINGS = [
    'justo antes de salir', 'esta mañana temprano', 'hace 5 minutos',
    'mientras dormía', 'sin que me diera cuenta', 'de forma misteriosa',
    'y no pude hacer nada', 'cuando no estaba mirando'
  ];

  const generateExcuse = () => {
    const subject = SUBJECTS[Math.floor(Math.random() * SUBJECTS.length)];
    const action = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
    const object = OBJECTS[Math.floor(Math.random() * OBJECTS.length)];
    const ending = ENDINGS[Math.floor(Math.random() * ENDINGS.length)];

    setExcuse(`${subject} ${action} ${object} ${ending}.`);
  };

  const copyExcuse = () => {
    navigator.clipboard.writeText(excuse);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  React.useEffect(() => {
    generateExcuse();
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        {excuse && (
          <div className="text-center p-8 bg-yellow-50 rounded-xl border border-yellow-100 mb-6">
            <div className="text-2xl text-gray-800 italic">"{excuse}"</div>
          </div>
        )}

        <div className="flex gap-4">
          <button
            onClick={generateExcuse}
            className="flex-1 bg-yellow-600 text-white font-bold py-4 rounded-lg hover:bg-yellow-700 transition-all"
          >
            🎲 Nueva Excusa
          </button>
          {excuse && (
            <button
              onClick={copyExcuse}
              className={`px-6 py-4 rounded-lg font-bold transition-all ${copied ? 'bg-green-500 text-white' : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                }`}
            >
              {copied ? '✓ Copiado!' : 'Copiar'}
            </button>
          )}
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          ⚠️ Advertencia: Usar con responsabilidad. Solo para entretenimiento.
        </div>
      </div>
    </div>
  );
}


