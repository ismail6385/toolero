'use client';

import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRandom, faPlay } from '@fortawesome/free-solid-svg-icons';

export default function RouletteClient() {
    const [options, setOptions] = useState("Pizza\nHamburguesa\nSushi\nTacos\nEnsalada");
    const [spinning, setSpinning] = useState(false);
    const [winner, setWinner] = useState<string | null>(null);
    const wheelRef = useRef<HTMLDivElement>(null);

    const spin = () => {
        if (spinning) return;

        const list = options.split('\n').filter(o => o.trim() !== '');
        if (list.length < 2) {
            alert("Necesitas al menos 2 opciones.");
            return;
        }

        setSpinning(true);
        setWinner(null);

        // Random rotation between 3000 and 6000 degrees (approx 8-16 spins) + random offset
        const totalSpins = 360 * (5 + Math.random() * 5);
        const randomOffset = Math.random() * 360;
        const totalRotation = totalSpins + randomOffset;

        if (wheelRef.current) {
            wheelRef.current.style.transition = 'transform 4s cubic-bezier(0.1, 0, 0.2, 1)';
            wheelRef.current.style.transform = `rotate(${totalRotation}deg)`;
        }

        setTimeout(() => {
            setSpinning(false);
            if (wheelRef.current) {
                // Determine winner based on final angle
                // NOTE: This logic needs to match the visual segments.
                // The wheel rotates clockwise. The pointer is usually at top (0 deg) or right (90 deg).
                // Let's assume pointer is at TOP (arrow pointing down).
                // 0 deg is at 3 o'clock in standard CSS rotation for conic gradients?
                // Actually conic-gradient starts at 12 o'clock (0deg) usually? Or 0deg is top?
                // Let's assume standard 0deg is top.

                // Effective angle is (totalRotation % 360).
                const finalAngle = totalRotation % 360;

                // The wheel rotated `finalAngle`. The slice AT the top is the one that was at 
                // position (360 - finalAngle) originally.
                const winningAngle = (360 - finalAngle) % 360;

                const sliceSize = 360 / list.length;
                const winningIndex = Math.floor(winningAngle / sliceSize);

                setWinner(list[winningIndex]);

                // Reset transform without transition for next spin? 
                // No, kept simple: just accumulate rotation or reset carefully.
                // For this simple version, we leave it rotated. Next spin adds to it.
                // Actually, re-setting adds complexity to animation. 
                // Better approach: use a state for rotation and increment it.
            }
        }, 4000);
    };

    // Calculate conic gradient
    const list = options.split('\n').filter(o => o.trim() !== '');
    const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#6366f1'];

    let gradient = '';
    const step = 100 / list.length;
    list.forEach((_, idx) => {
        const color = colors[idx % colors.length];
        gradient += `${color} ${step * idx}% ${step * (idx + 1)}%,`;
    });
    gradient = gradient.slice(0, -1); // remove last comma

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4 text-primary">
                    <FontAwesomeIcon icon={faRandom} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Ruleta de Decisiones</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    ¿No te decides? Deja que la suerte elija por ti. Personaliza las opciones y gira la rueda.
                </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-12">
                {/* Inputs */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    <div className="bg-surface p-6 rounded-2xl shadow-sm border border-gray-100 flex-1 flex flex-col">
                        <label className="font-bold text-gray-700 mb-2">Opciones (una por línea)</label>
                        <textarea
                            value={options}
                            onChange={(e) => setOptions(e.target.value)}
                            className="flex-1 w-full bg-gray-50 border border-gray-200 rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[300px]"
                        />
                        <p className="text-xs text-gray-400 mt-2 text-right">{list.length} opciones</p>
                    </div>
                </div>

                {/* Wheel */}
                <div className="lg:col-span-8 flex flex-col items-center justify-center min-h-[500px] bg-gray-50 rounded-3xl border border-gray-100 p-8 relative overflow-hidden">

                    {/* Pointer */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[220px] z-20">
                        <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[40px] border-t-gray-800 drop-shadow-lg"></div>
                    </div>

                    {/* The Wheel */}
                    <div
                        className="relative w-[400px] h-[400px] rounded-full shadow-2xl border-8 border-white overflow-hidden"
                        style={{
                            background: list.length > 1 ? `conic-gradient(${gradient})` : '#ccc'
                        }}
                    >
                        <div
                            ref={wheelRef}
                            className="w-full h-full rounded-full"
                            style={{ transformOrigin: 'center center' }} // Ensure rotation is centered
                        >
                            {/* Though we set BG on parent, to rotate we need to rotate the content. 
                                Actually, `conic-gradient` doesn't rotate with `transform` if applied to background? 
                                Wait, if I rotate the DIV, the background rotates too.
                                So I should apply background to THIS div.
                             */}
                        </div>
                    </div>
                    {/* Re-apply BG to the inner rotating div logic */}
                    <style jsx>{`
                        .rotating-wheel {
                            background: conic-gradient(${gradient});
                        }
                    `}</style>

                    {/* Wait, standard style prop is easier */}
                    <div className="absolute flex items-center justify-center pointer-events-none w-[400px] h-[400px]">
                        <div
                            ref={wheelRef}
                            className="w-full h-full rounded-full"
                            style={{
                                background: list.length > 1 ? `conic-gradient(${gradient})` : '#eee',
                                transform: 'rotate(0deg)'
                            }}
                        >
                            {/* Labels? Hard to place perfectly with pure CSS conic. 
                                Could use absolute positioned spans rotated.
                            */}
                            {list.map((item, idx) => {
                                const angle = (360 / list.length) * idx + (360 / list.length) / 2;
                                return (
                                    <div
                                        key={idx}
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[20px] text-right pr-4 font-bold text-white drop-shadow-md text-sm"
                                        style={{
                                            transform: `rotate(${angle - 90}deg) translate(0) `, // This rotation logic is tricky for text placement
                                            // Simpler: transform-origin left center.
                                            width: '50%', // Half width
                                            left: '50%',
                                            transformOrigin: '0% 50%',
                                            transform: `rotate(${angle - 90}deg)`
                                        }}
                                    >
                                        <span className="truncate block ml-8">{item}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Center Cap */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-lg z-10 flex items-center justify-center border-4 border-gray-100">
                        <FontAwesomeIcon icon={faRandom} className="text-gray-300" />
                    </div>

                    <button
                        onClick={spin}
                        disabled={spinning || list.length < 2}
                        className="mt-12 bg-primary text-white font-bold py-4 px-12 rounded-full text-xl shadow-lg hover:bg-secondary transition-all active:scale-95 disabled:grayscale z-30"
                    >
                        {spinning ? 'Girando...' : '¡Girar!'}
                    </button>

                    {winner && !spinning && (
                        <div className="absolute inset-0 bg-black/50 z-40 flex items-center justify-center p-4 animate-fade-in backdrop-blur-sm" onClick={() => setWinner(null)}>
                            <div className="bg-white p-8 rounded-3xl shadow-2xl text-center transform scale-110">
                                <h3 className="text-2xl font-bold text-gray-500 mb-2">¡Ha salido!</h3>
                                <div className="text-5xl font-black text-primary mb-6">{winner}</div>
                                <button className="bg-gray-100 text-gray-800 font-bold py-3 px-8 rounded-xl hover:bg-gray-200">
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
