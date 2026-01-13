'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImage, faDownload } from '@fortawesome/free-solid-svg-icons';

export default function Base64ToImageClient() {
    const [base64, setBase64] = useState('');

    const downloadImage = () => {
        if (!base64) return;
        const link = document.createElement('a');
        link.href = base64;
        link.download = 'image-decoded.png';
        link.click();
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4 text-primary">
                    <FontAwesomeIcon icon={faFileImage} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Decodificador Base64 a Imagen</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Pega tu cadena Base64 y visualiza la imagen original al instante.
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
                <div className="flex flex-col gap-4">
                    <label className="font-bold text-gray-700">Código Base64</label>
                    <textarea
                        value={base64}
                        onChange={(e) => setBase64(e.target.value)}
                        placeholder="data:image/png;base64,..."
                        className="flex-1 w-full h-[400px] bg-white border border-gray-200 rounded-2xl p-4 font-mono text-xs text-gray-600 resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
                    />
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[400px]">
                    {base64 ? (
                        <>
                            <img src={base64} alt="Decoded" className="max-w-full max-h-[300px] object-contain mb-6 shadow-lg rounded-lg bg-[url('/checker.png')] bg-white" />
                            <button
                                onClick={downloadImage}
                                className="bg-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-secondary transition-colors flex items-center gap-2"
                            >
                                <FontAwesomeIcon icon={faDownload} />
                                Descargar Imagen
                            </button>
                        </>
                    ) : (
                        <div className="text-gray-400 flex flex-col items-center gap-2">
                            <FontAwesomeIcon icon={faFileImage} className="text-4xl opacity-30" />
                            <p>La vista previa aparecerá aquí</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
