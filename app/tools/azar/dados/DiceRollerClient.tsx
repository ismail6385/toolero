'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDice } from '@fortawesome/free-solid-svg-icons';

export default function DiceRollerClient() {
    const [numDice, setNumDice] = useState(1);
    const [results, setResults] = useState<number[]>([1]);
    const [rolling, setRolling] = useState(false);

    const roll = () => {
        setRolling(true);
        const interval = setInterval(() => {
            setResults(Array.from({ length: numDice }, () => Math.floor(Math.random() * 6) + 1));
        }, 100);

        setTimeout(() => {
            clearInterval(interval);
            setResults(Array.from({ length: numDice }, () => Math.floor(Math.random() * 6) + 1));
            setRolling(false);
        }, 1000);
    };

    const Die = ({ value }: { value: number }) => {
        const dot = "w-3 h-3 bg-gray-800 rounded-full";

        let dots = [];
        switch (value) {
            case 1: dots = [<div key={1} className="col-start-2 row-start-2 place-self-center w-4 h-4 bg-red-500 rounded-full" />]; break;
            case 2: dots = [<div key={1} className={dot} />, <div key={2} className={`${dot} col-start-3 row-start-3`} />]; break;
            case 3: dots = [<div key={1} className={dot} />, <div key={2} className={`${dot} col-start-2 row-start-2`} />, <div key={3} className={`${dot} col-start-3 row-start-3`} />]; break;
            case 4: dots = [<div key={1} className={dot} />, <div key={2} className={`${dot} col-start-3`} />, <div key={3} className={`${dot} row-start-3`} />, <div key={4} className={`${dot} col-start-3 row-start-3`} />]; break;
            case 5: dots = [<div key={1} className={dot} />, <div key={2} className={`${dot} col-start-3`} />, <div key={3} className={`${dot} col-start-2 row-start-2`} />, <div key={4} className={`${dot} row-start-3`} />, <div key={5} className={`${dot} col-start-3 row-start-3`} />]; break;
            case 6: dots = [<div key={1} className={dot} />, <div key={2} className={`${dot} col-start-3`} />, <div key={3} className={`${dot} row-start-2`} />, <div key={4} className={`${dot} col-start-3 row-start-2`} />, <div key={5} className={`${dot} row-start-3`} />, <div key={6} className={`${dot} col-start-3 row-start-3`} />]; break;
        }

        return (
            <div className="w-24 h-24 bg-white border-2 border-gray-200 rounded-2xl shadow-lg grid grid-cols-3 grid-rows-3 p-4 gap-1 transform transition-transform hover:scale-105">
                {dots}
            </div>
        );
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4 text-primary">
                    <FontAwesomeIcon icon={faDice} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Lanzar Dados Online</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Generador de dados virtuales. Elige cuántos dados usar (1-6).
                </p>
            </div>

            <div className="flex flex-col items-center gap-12">
                <div className="bg-surface p-4 rounded-xl border border-gray-100 flex items-center gap-4">
                    <span className="font-bold text-gray-700">Número de Dados:</span>
                    {[1, 2, 3, 4, 5, 6].map(n => (
                        <button
                            key={n}
                            onClick={() => { setNumDice(n); setResults(Array.from({ length: n }, () => 1)); }}
                            className={`w-10 h-10 rounded-lg font-bold transition-all ${numDice === n ? 'bg-primary text-white shadow-lg' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                        >
                            {n}
                        </button>
                    ))}
                </div>

                <div className="flex flex-wrap items-center justify-center gap-6 min-h-[150px]">
                    {results.map((val, idx) => <Die key={idx} value={val} />)}
                </div>

                <div className="text-2xl font-bold text-gray-700">
                    Total: <span className="text-primary text-4xl">{results.reduce((a, b) => a + b, 0)}</span>
                </div>

                <button
                    onClick={roll}
                    disabled={rolling}
                    className="bg-primary text-white font-bold py-4 px-16 rounded-full text-xl shadow-lg hover:bg-secondary transition-all active:scale-95 disabled:scale-100"
                >
                    {rolling ? 'Rodando...' : 'Lanzar'}
                </button>
            </div>
        </div>
    );
}
