"use client";

import React from 'react';

export default function EmailSignatureClient() {
  const [name, setName] = React.useState('Juan Pérez');
  const [title, setTitle] = React.useState('Director de Marketing');
  const [company, setCompany] = React.useState('Mi Empresa S.A.');
  const [email, setEmail] = React.useState('juan@empresa.com');
  const [phone, setPhone] = React.useState('+34 600 123 456');
  const [website, setWebsite] = React.useState('www.empresa.com');
  const [copied, setCopied] = React.useState(false);

  const generateHTML = () => {
    return `<div style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">
  <p style="margin: 0; font-weight: bold; font-size: 16px;">${name}</p>
  <p style="margin: 5px 0 0 0; color: #666;">${title}</p>
  <p style="margin: 5px 0 0 0; font-weight: bold;">${company}</p>
  <p style="margin: 10px 0 0 0;">
    📧 <a href="mailto:${email}" style="color: #0066cc; text-decoration: none;">${email}</a><br/>
    📱 ${phone}<br/>
    🌐 <a href="https://${website}" style="color: #0066cc; text-decoration: none;">${website}</a>
  </p>
</div>`;
  };

  const copyHTML = () => {
    navigator.clipboard.writeText(generateHTML());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-4">Información</h3>

          <div className="space-y-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre completo"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Cargo"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Empresa"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Teléfono"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="Sitio web"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800">Vista Previa</h3>
            <button
              onClick={copyHTML}
              className={`px-4 py-2 rounded-lg font-medium ${copied ? 'bg-green-500 text-white' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
            >
              {copied ? '✓ Copiado!' : 'Copiar HTML'}
            </button>
          </div>

          <div
            className="p-4 bg-gray-50 rounded-lg border border-gray-200"
            dangerouslySetInnerHTML={{ __html: generateHTML() }}
          />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-2">Código HTML</h3>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-xs">
            <code>{generateHTML()}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}


