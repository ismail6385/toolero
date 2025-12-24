'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteRight, faBook, faGlobe, faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';

type SourceType = 'website' | 'book';
type StyleType = 'apa' | 'mla' | 'chicago';

export default function CitationGeneratorClient() {
    const [sourceType, setSourceType] = useState<SourceType>('website');
    const [style, setStyle] = useState<StyleType>('apa');
    const [copied, setCopied] = useState(false);

    const [data, setData] = useState({
        authorFirst: '',
        authorLast: '',
        title: '',
        websiteName: '', // Website only
        publisher: '', // Book only
        url: '', // Website only
        year: '',
        month: '',
        day: '',
        accessDate: ''
    });

    const [citation, setCitation] = useState('');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        setData(prev => ({
            ...prev,
            year: new Date().getFullYear().toString(),
            accessDate: new Date().toISOString().split('T')[0]
        }));
    }, []);

    useEffect(() => {
        generateCitation();
    }, [data, style, sourceType]);

    const generateCitation = () => {
        const { authorLast, authorFirst, title, year, websiteName, url, publisher, day, month, accessDate } = data;
        let result = '';

        const author = authorLast && authorFirst ? `${authorLast}, ${authorFirst[0]}.` : (authorLast || authorFirst || '');
        const authorMLA = authorLast && authorFirst ? `${authorLast}, ${authorFirst}.` : (authorLast || authorFirst || '');

        if (style === 'apa') {
            // APA 7th Edition
            if (sourceType === 'website') {
                // Author, A. A. (Year, Month Day). Title of page. Site Name. URL
                const datePart = year ? `(${year}${month ? `, ${month}` : ''}${day ? ` ${day}` : ''})` : '(n.d.)';
                result = `${author ? author + ' ' : ''}${datePart}. <i class="italic font-serif">${title}</i>. ${websiteName}. ${url}`;
            } else {
                // Author, A. A. (Year). Title of work. Publisher.
                result = `${author ? author + ' ' : ''}(${year}). <i class="italic font-serif">${title}</i>. ${publisher}.`;
            }
        }
        else if (style === 'mla') {
            // MLA 9th Edition
            if (sourceType === 'website') {
                // Author. "Title." Site Name, Date, URL. Accessed Date.
                const datePart = year ? `${day ? day + ' ' : ''}${month ? month + ' ' : ''}${year}` : '';
                result = `${authorMLA ? authorMLA + ' ' : ''}"${title}." <i class="italic font-serif">${websiteName}</i>, ${datePart ? datePart + ', ' : ''}${url}. Accessed ${formatDate(accessDate)}.`;
            } else {
                // Author. Title. Publisher, Year.
                result = `${authorMLA ? authorMLA + ' ' : ''}<i class="italic font-serif">${title}</i>. ${publisher}, ${year}.`;
            }
        }
        else if (style === 'chicago') {
            // Chicago 17th
            if (sourceType === 'website') {
                // Author. "Title." Site Name. Last modified Date. URL.
                const datePart = year ? `${month ? month + ' ' : ''}${day ? day + ', ' : ''}${year}` : 'n.d.';
                result = `${authorMLA ? authorMLA + ' ' : ''}"${title}." ${websiteName}. Last modified ${datePart}. ${url}.`;
            } else {
                // Author. Title. City: Publisher, Year. (City omitted in simple version)
                result = `${authorMLA ? authorMLA + ' ' : ''}<i class="italic font-serif">${title}</i>. ${publisher}, ${year}.`;
            }
        }

        setCitation(result);
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const d = new Date(dateString);
        return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    const copyToClipboard = () => {
        // We need to strip HTML tags for clipboard if plain text, but rich text is better for word.
        // For this simple button, let's copy plain text or html?
        // Let's copy HTML logic:
        const blob = new Blob([citation], { type: "text/html" });
        const blobText = new Blob([citation.replace(/<[^>]*>/g, '')], { type: "text/plain" });

        try {
            navigator.clipboard.write([
                new ClipboardItem({
                    "text/html": blob,
                    "text/plain": blobText,
                })
            ]);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (e) {
            // Fallback
            navigator.clipboard.writeText(citation.replace(/<[^>]*>/g, ''));
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="w-full">
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-600 to-blue-700 rounded-3xl p-8 mb-8 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">Generador de Citas APA, MLA, Chicago</h1>
                    <p className="text-cyan-100 text-lg">
                        Cita tus fuentes correctamente y evita el plagio en tus trabajos académicos.
                    </p>
                </div>
                <div className="absolute right-0 top-0 opacity-10 transform translate-x-4 -translate-y-2">
                    <FontAwesomeIcon icon={faQuoteRight} className="text-9xl" />
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
                {/* Form */}
                <div className="lg:col-span-7 space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">

                        {/* Source Type Selector */}
                        <div className="flex gap-4 mb-6">
                            <button
                                onClick={() => setSourceType('website')}
                                className={`flex-1 py-3 px-4 rounded-xl border-2 flex items-center justify-center gap-2 font-bold transition-all ${sourceType === 'website' ? 'border-cyan-500 bg-cyan-50 text-cyan-700' : 'border-gray-200 hover:border-gray-300'}`}
                            >
                                <FontAwesomeIcon icon={faGlobe} /> Sitio Web
                            </button>
                            <button
                                onClick={() => setSourceType('book')}
                                className={`flex-1 py-3 px-4 rounded-xl border-2 flex items-center justify-center gap-2 font-bold transition-all ${sourceType === 'book' ? 'border-cyan-500 bg-cyan-50 text-cyan-700' : 'border-gray-200 hover:border-gray-300'}`}
                            >
                                <FontAwesomeIcon icon={faBook} /> Libro
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-bold text-gray-700 mb-1 block">Nombre Autor</label>
                                    <input value={data.authorFirst} onChange={e => setData({ ...data, authorFirst: e.target.value })} className="w-full p-2 border border-gray-300 rounded focus:border-cyan-500 outline-none" placeholder="Ej. Juan" />
                                </div>
                                <div>
                                    <label className="text-sm font-bold text-gray-700 mb-1 block">Apellido Autor</label>
                                    <input value={data.authorLast} onChange={e => setData({ ...data, authorLast: e.target.value })} className="w-full p-2 border border-gray-300 rounded focus:border-cyan-500 outline-none" placeholder="Ej. Pérez" />
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-bold text-gray-700 mb-1 block">Título</label>
                                <input value={data.title} onChange={e => setData({ ...data, title: e.target.value })} className="w-full p-2 border border-gray-300 rounded focus:border-cyan-500 outline-none" placeholder={sourceType === 'website' ? 'Título del artículo o página' : 'Título del libro'} />
                            </div>

                            {sourceType === 'website' && (
                                <>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm font-bold text-gray-700 mb-1 block">Nombre del Sitio Web</label>
                                            <input value={data.websiteName} onChange={e => setData({ ...data, websiteName: e.target.value })} className="w-full p-2 border border-gray-300 rounded focus:border-cyan-500 outline-none" placeholder="Ej. Wikipedia" />
                                        </div>
                                        <div>
                                            <label className="text-sm font-bold text-gray-700 mb-1 block">Fecha Acceso</label>
                                            <input type="date" value={data.accessDate} onChange={e => setData({ ...data, accessDate: e.target.value })} className="w-full p-2 border border-gray-300 rounded focus:border-cyan-500 outline-none" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-bold text-gray-700 mb-1 block">URL</label>
                                        <input value={data.url} onChange={e => setData({ ...data, url: e.target.value })} className="w-full p-2 border border-gray-300 rounded focus:border-cyan-500 outline-none" placeholder="https://..." />
                                    </div>
                                </>
                            )}

                            {sourceType === 'book' && (
                                <div>
                                    <label className="text-sm font-bold text-gray-700 mb-1 block">Editorial (Publisher)</label>
                                    <input value={data.publisher} onChange={e => setData({ ...data, publisher: e.target.value })} className="w-full p-2 border border-gray-300 rounded focus:border-cyan-500 outline-none" placeholder="Ej. Editorial Planeta" />
                                </div>
                            )}

                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="text-sm font-bold text-gray-700 mb-1 block">Año</label>
                                    <input value={data.year} onChange={e => setData({ ...data, year: e.target.value })} className="w-full p-2 border border-gray-300 rounded focus:border-cyan-500 outline-none" placeholder="2023" />
                                </div>
                                <div>
                                    <label className="text-sm font-bold text-gray-700 mb-1 block">Mes (Opc)</label>
                                    <input value={data.month} onChange={e => setData({ ...data, month: e.target.value })} className="w-full p-2 border border-gray-300 rounded focus:border-cyan-500 outline-none" placeholder="Mayo" />
                                </div>
                                <div>
                                    <label className="text-sm font-bold text-gray-700 mb-1 block">Día (Opc)</label>
                                    <input value={data.day} onChange={e => setData({ ...data, day: e.target.value })} className="w-full p-2 border border-gray-300 rounded focus:border-cyan-500 outline-none" placeholder="15" />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Output */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="bg-cyan-50 p-6 rounded-2xl border border-cyan-100 sticky top-6">
                        <h3 className="font-bold text-cyan-900 mb-4 flex items-center gap-2">
                            <FontAwesomeIcon icon={faQuoteRight} />
                            Tu Cita Generada
                        </h3>

                        {/* Format Switch */}
                        <div className="flex bg-white p-1 rounded-lg border border-cyan-200 mb-6">
                            {['apa', 'mla', 'chicago'].map(s => (
                                <button
                                    key={s}
                                    onClick={() => setStyle(s as StyleType)}
                                    className={`flex-1 py-1 text-sm rounded font-bold uppercase transition-all ${style === s ? 'bg-cyan-600 text-white shadow' : 'text-gray-500 hover:bg-gray-50'}`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>

                        {/* Result Box */}
                        <div className="relative group">
                            <div
                                className="bg-white p-6 rounded-xl border border-cyan-200 font-serif text-lg leading-relaxed text-gray-800 shadow-sm min-h-[100px] flex items-center"
                                dangerouslySetInnerHTML={{ __html: citation }}
                            ></div>
                        </div>

                        {/* Copy Button */}
                        <button
                            onClick={copyToClipboard}
                            className={`w-full mt-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${copied ? 'bg-green-500 text-white' : 'bg-cyan-600 text-white hover:bg-cyan-700 shadow-lg hover:shadow-cyan-500/30'}`}
                        >
                            <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
                            {copied ? '¡Copiado!' : 'Copiar Cita'}
                        </button>

                        <div className="mt-4 text-xs text-center text-cyan-800 bg-cyan-100/50 p-2 rounded">
                            Las cursivas se copiarán si tu editor de texto lo soporta (Word, Docs).
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
