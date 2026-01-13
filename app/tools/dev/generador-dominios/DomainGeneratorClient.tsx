"use client";

import React from 'react';

export default function DomainGeneratorClient() {
  const [keyword, setKeyword] = React.useState('');
  const [domains, setDomains] = React.useState<string[]>([]);
  const [copied, setCopied] = React.useState<number | null>(null);

  const PREFIXES = ['get', 'try', 'my', 'the', 'go', 'use', 'hey', 'app', 'pro', 'best'];
  const SUFFIXES = ['app', 'hub', 'lab', 'io', 'ly', 'ai', 'tech', 'pro', 'zone', 'online'];

  const generateDomains = () => {
    if (!keyword) return;

    const generated: string[] = [];
    const base = keyword.toLowerCase().replace(/\s+/g, '');

    generated.push(`${base}.com`);
    generated.push(`${base}.net`);
    generated.push(`${base}.io`);

    PREFIXES.slice(0, 5).forEach(prefix => {
      generated.push(`${prefix}${base}.com`);
    });

    SUFFIXES.slice(0, 5).forEach(suffix => {
      generated.push(`${base}${suffix}.com`);
    });

    setDomains(generated.slice(0, 15));
  };

  const copyDomain = (domain: string, index: number) => {
    navigator.clipboard.writeText(domain);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <div className="flex gap-2">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Ej: miempresa, blog, tienda..."
            className="flex-1 p-4 border border-gray-300 rounded-lg"
            onKeyPress={(e) => e.key === 'Enter' && generateDomains()}
          />
          <button
            onClick={generateDomains}
            disabled={!keyword}
            className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50"
          >
            Generar
          </button>
        </div>
      </div>

      {domains.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {domains.map((domain, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 border border-gray-100 flex justify-between items-center"
            >
              <span className="font-mono text-lg text-gray-800">{domain}</span>
              <button
                onClick={() => copyDomain(domain, index)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${copied === index ? 'bg-green-500 text-white' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  }`}
              >
                {copied === index ? '✓' : 'Copiar'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


