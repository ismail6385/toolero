"use client";

import React from 'react';

export default function InternetSpeedClient() {
  const [speed, setSpeed] = React.useState('100');
  const [fileSize, setFileSize] = React.useState('1');
  const [unit, setUnit] = React.useState<'GB' | 'MB'>('GB');
  const [downloadTime, setDownloadTime] = React.useState('');

  const calculate = () => {
    const speedMbps = parseFloat(speed) || 0;
    const size = parseFloat(fileSize) || 0;

    const sizeInMB = unit === 'GB' ? size * 1024 : size;
    const speedMBps = speedMbps / 8;
    const timeSeconds = sizeInMB / (speedMBps || 1);

    if (timeSeconds < 60) {
      setDownloadTime(`${Math.round(timeSeconds)} segundos`);
    } else if (timeSeconds < 3600) {
      const mins = Math.floor(timeSeconds / 60);
      const secs = Math.round(timeSeconds % 60);
      setDownloadTime(`${mins} min ${secs} seg`);
    } else {
      const hours = Math.floor(timeSeconds / 3600);
      const mins = Math.floor((timeSeconds % 3600) / 60);
      setDownloadTime(`${hours} h ${mins} min`);
    }
  };

  React.useEffect(() => {
    calculate();
  }, [speed, fileSize, unit]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Velocidad de Internet (Mbps)</label>
            <input
              type="number"
              value={speed}
              onChange={(e) => setSpeed(e.target.value)}
              className="w-full p-4 text-2xl text-center border-2 border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Tamaño del Archivo</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={fileSize}
                onChange={(e) => setFileSize(e.target.value)}
                className="flex-1 p-4 text-2xl text-center border-2 border-gray-300 rounded-lg"
              />
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value as 'GB' | 'MB')}
                className="px-4 border-2 border-gray-300 rounded-lg"
              >
                <option value="MB">MB</option>
                <option value="GB">GB</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-4">Tiempo de Descarga</h3>
        <div className="text-center p-8 bg-cyan-50 rounded-xl border border-cyan-100">
          <div className="text-5xl font-bold text-cyan-600">{downloadTime}</div>
        </div>
      </div>
    </div>
  );
}


