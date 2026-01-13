'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faQuoteRight,
    faBook,
    faLaptop,
    faCopy,
    faCheck,
    faEraser,
    faPlus,
    faHistory
} from '@fortawesome/free-solid-svg-icons';

type CitationStyle = 'apa' | 'mla' | 'chicago' | 'harvard';
type SourceType = 'website' | 'book';

interface CitationData {
    firstName: string;
    lastName: string;
    title: string;
    publisher: string;
    year: string;
    url: string;
    accessDate: string;
}

export default function CitationGeneratorClient() {
    const [style, setStyle] = useState<CitationStyle>('apa');
    const [sourceType, setSourceType] = useState<SourceType>('website');
    const [data, setData] = useState<CitationData>({
        firstName: '',
        lastName: '',
        title: '',
        publisher: '',
        year: new Date().getFullYear().toString(),
        url: '',
        accessDate: new Date().toISOString().split('T')[0]
    });
    const [result, setResult] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        generateCitation();
    }, [data, style, sourceType]);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const generateCitation = () => {
        if (!data.title && !data.lastName) {
            setResult('');
            return;
        }

        let citation = '';
        const { lastName, firstName, title, year, publisher, url, accessDate } = data;
        const author = lastName ? `${lastName}, ${firstName ? firstName[0] + '.' : ''}` : publisher;

        if (style === 'apa') {
            // APA 7: Author, A. A. (Year). Title of work. Publisher/Site. URL
            citation = `${author} (${year}). *${title}*. ${publisher || ''}. ${url}`;
        } else if (style === 'mla') {
            // MLA 9: Author. "Title." Container, Publisher, Year, URL.
            const name = lastName ? `${lastName}, ${firstName}.` : '';
            citation = `${name} "${title}." *${publisher}*, ${year}, ${url}.`;
        } else if (style === 'chicago') {
            // Chicago: Author. "Title." Publisher, Year. URL.
            const name = lastName ? `${lastName}, ${firstName}.` : '';
            citation = `${name} "${title}." ${publisher}, ${year}. ${url}.`;
        } else if (style === 'harvard') {
            // Harvard: Author, A. (Year) Title. Place: Publisher.
            citation = `${author} (${year}) *${title}*. ${publisher ? publisher + '.' : ''} ${url ? 'Available at: ' + url : ''} [Accessed ${accessDate}].`;
        }

        // Simple cleanup of double punctuation or empty segments
        setResult(citation.replace(/\.\./g, '.').replace(/\s\./g, '.'));
    };

    const copyToClipboard = () => {
        if (!result) return;
        // Strip markdown stars for clipboard if plain text, or keep rich text? 
        // For simplicity let's strip styling markers or use html copy. 
        // We'll copy plain text but without the asterisks used for preview
        const plainText = result.replace(/\*/g, '');
        navigator.clipboard.writeText(plainText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const clearForm = () => {
        setData({
            firstName: '',
            lastName: '',
            title: '',
            publisher: '',
            year: new Date().getFullYear().toString(),
            url: '',
            accessDate: new Date().toISOString().split('T')[0]
        });
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                    <FontAwesomeIcon icon={faQuoteRight} className="text-3xl text-primary" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Generador de Citas APA, MLA y más</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Crea referencias bibliográficas perfectas para tus trabajos académicos y artículos.
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Form Section */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Style & Type Selectors */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="bg-surface p-1 rounded-xl shadow-sm border border-gray-200 flex">
                            {['apa', 'mla', 'chicago', 'harvard'].map((s) => (
                                <button
                                    key={s}
                                    onClick={() => setStyle(s as CitationStyle)}
                                    className={`flex-1 py-2 text-sm font-bold uppercase rounded-lg transition-all ${style === s ? 'bg-primary text-white shadow-md' : 'text-text/60 hover:bg-gray-50'
                                        }`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                        <div className="bg-surface p-1 rounded-xl shadow-sm border border-gray-200 flex">
                            <button
                                onClick={() => setSourceType('website')}
                                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${sourceType === 'website' ? 'bg-secondary text-white shadow-md' : 'text-text/60 hover:bg-gray-50'
                                    }`}
                            >
                                <FontAwesomeIcon icon={faLaptop} /> Sitio Web
                            </button>
                            <button
                                onClick={() => setSourceType('book')}
                                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${sourceType === 'book' ? 'bg-secondary text-white shadow-md' : 'text-text/60 hover:bg-gray-50'
                                    }`}
                            >
                                <FontAwesomeIcon icon={faBook} /> Libro
                            </button>
                        </div>
                    </div>

                    {/* Input Fields */}
                    <div className="bg-surface rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8">
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-text/80">Nombre Autor</label>
                                <input
                                    name="firstName"
                                    value={data.firstName}
                                    onChange={handleInput}
                                    className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    placeholder="Ej: John"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-text/80">Apellidos Autor</label>
                                <input
                                    name="lastName"
                                    value={data.lastName}
                                    onChange={handleInput}
                                    className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    placeholder="Ej: Doe"
                                />
                            </div>

                            <div className="md:col-span-2 space-y-2">
                                <label className="text-sm font-semibold text-text/80">
                                    {sourceType === 'website' ? 'Título de la Página / Artículo' : 'Título del Libro'}
                                </label>
                                <input
                                    name="title"
                                    value={data.title}
                                    onChange={handleInput}
                                    className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    placeholder="Título completo..."
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-text/80">
                                    {sourceType === 'website' ? 'Nombre del Sitio Web' : 'Editorial'}
                                </label>
                                <input
                                    name="publisher"
                                    value={data.publisher}
                                    onChange={handleInput}
                                    className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    placeholder={sourceType === 'website' ? "Ej: Wikipedia" : "Ej: Penguin Books"}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-text/80">Año de Publicación</label>
                                <input
                                    name="year"
                                    value={data.year}
                                    onChange={handleInput}
                                    className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    placeholder="YYYY"
                                />
                            </div>

                            {sourceType === 'website' && (
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-sm font-semibold text-text/80">URL</label>
                                    <input
                                        name="url"
                                        value={data.url}
                                        onChange={handleInput}
                                        className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                        placeholder="https://..."
                                    />
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={clearForm}
                                className="text-sm text-text/40 hover:text-red-500 flex items-center gap-2 px-4 py-2 hover:bg-red-50 rounded-lg transition-all"
                            >
                                <FontAwesomeIcon icon={faEraser} /> Limpiar Formulario
                            </button>
                        </div>
                    </div>
                </div>

                {/* Preview Section */}
                <div className="space-y-6">
                    <div className="bg-surface rounded-2xl shadow-lg border border-gray-200 p-6 sticky top-8">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-text flex items-center gap-2">
                                <FontAwesomeIcon icon={faCheck} className="text-green-500" />
                                Cita Generada
                            </h3>
                            <button
                                onClick={copyToClipboard}
                                disabled={!result}
                                className={`
                                    flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all
                                    ${copied
                                        ? 'bg-green-500 text-white'
                                        : 'bg-primary text-white hover:bg-secondary disabled:bg-gray-200 disabled:text-gray-400'
                                    }
                                `}
                            >
                                <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
                                {copied ? 'Copiada' : 'Copiar'}
                            </button>
                        </div>

                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 min-h-[160px] flex items-center justify-center relative overflow-hidden group">
                            {result ? (
                                <p
                                    className="text-text/80 font-serif leading-relaxed text-lg"
                                    dangerouslySetInnerHTML={{ __html: result.replace(/\*(.*?)\*/g, '<i>$1</i>') }}
                                />
                            ) : (
                                <div className="text-center opacity-40">
                                    <p className="text-sm">Rellena el formulario para ver tu cita aquí.</p>
                                </div>
                            )}
                        </div>

                        <div className="mt-4 p-4 bg-primary/5 rounded-xl border border-primary/10">
                            <h4 className="font-bold text-primary text-sm mb-2">Consejo {style.toUpperCase()}</h4>
                            <p className="text-xs text-text/70 leading-relaxed">
                                {style === 'apa' && "En APA, solo se escribe con mayúscula la primera letra del título y de los subtítulos, además de los nombres propios."}
                                {style === 'mla' && "En MLA, los títulos de las fuentes principales (como libros y webs) van en cursiva."}
                                {style === 'chicago' && "El estilo Chicago es común en historia y humanidades. Verifica si necesitas notas al pie."}
                                {style === 'harvard' && "Estilo autor-fecha muy usado en UK y Australia. Asegúrate de incluir la fecha de acceso para webs."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
