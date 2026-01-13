'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faRandom } from '@fortawesome/free-solid-svg-icons';

export default function TeamGeneratorClient() {
    const [names, setNames] = useState('');
    const [numTeams, setNumTeams] = useState(2);
    const [teams, setTeams] = useState<string[][]>([]);

    const generateTeams = () => {
        const list = names.split('\n').map(n => n.trim()).filter(n => n !== '');
        if (list.length < 2) return;

        // Shuffle
        for (let i = list.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [list[i], list[j]] = [list[j], list[i]];
        }

        const result: string[][] = Array.from({ length: numTeams }, () => []);

        list.forEach((name, idx) => {
            result[idx % numTeams].push(name);
        });

        setTeams(result);
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4 text-primary">
                    <FontAwesomeIcon icon={faUsers} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Generador de Equipos Aleatorios</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Divide una lista de nombres en grupos equilibrados al azar. Ideal para deportes, clases o juegos.
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
                <div className="flex flex-col gap-6">
                    <div className="bg-surface p-6 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col">
                        <label className="font-bold text-gray-700 mb-2">Lista de Participantes (uno por línea)</label>
                        <textarea
                            value={names}
                            onChange={(e) => setNames(e.target.value)}
                            placeholder="Juan&#10;María&#10;Pedro&#10;Sofía&#10;..."
                            className="flex-1 min-h-[300px] w-full bg-gray-50 border border-gray-200 rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                        <div className="mt-4 flex flex-col sm:flex-row gap-4 items-center">
                            <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl border border-gray-200 w-full sm:w-auto">
                                <span className="text-sm font-bold text-gray-500 whitespace-nowrap">Nº Equipos:</span>
                                <input
                                    type="number"
                                    min="2" max="50"
                                    value={numTeams}
                                    onChange={(e) => setNumTeams(parseInt(e.target.value) || 2)}
                                    className="w-16 bg-transparent font-bold text-center focus:outline-none"
                                />
                            </div>
                            <button
                                onClick={generateTeams}
                                disabled={!names.trim()}
                                className="w-full sm:flex-1 bg-primary text-white font-bold py-3 px-6 rounded-xl hover:bg-secondary transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FontAwesomeIcon icon={faRandom} />
                                Generar Equipos
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 min-h-[400px]">
                    {teams.length > 0 ? (
                        <div className="grid md:grid-cols-2 gap-4">
                            {teams.map((team, idx) => (
                                <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                                    <h3 className="font-bold text-primary mb-3 flex items-center gap-2 border-b border-gray-100 pb-2">
                                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs">
                                            {idx + 1}
                                        </div>
                                        Equipo {idx + 1}
                                        <span className="ml-auto text-xs text-gray-400 font-normal">{team.length} {team.length === 1 ? 'persona' : 'personas'}</span>
                                    </h3>
                                    <ul className="space-y-1">
                                        {team.map((member, mIdx) => (
                                            <li key={mIdx} className="text-gray-700 text-sm pl-2 border-l-2 border-gray-100">{member}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-4 opacity-50">
                            <FontAwesomeIcon icon={faUsers} className="text-6xl" />
                            <p>Aquí aparecerán los equipos</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
