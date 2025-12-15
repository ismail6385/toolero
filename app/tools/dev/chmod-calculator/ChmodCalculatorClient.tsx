'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser, faUsers, faGlobe, faCopy, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export default function ChmodCalculatorClient() {
    // 4 for read, 2 for write, 1 for execute
    const [owner, setOwner] = useState({ read: true, write: true, execute: true }); // 7
    const [group, setGroup] = useState({ read: true, write: false, execute: true }); // 5
    const [public_, setPublic] = useState({ read: true, write: false, execute: true }); // 5
    const [octal, setOctal] = useState('755');
    const [symbolic, setSymbolic] = useState('-rwxr-xr-x');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const calculate = () => {
            const o = (owner.read ? 4 : 0) + (owner.write ? 2 : 0) + (owner.execute ? 1 : 0);
            const g = (group.read ? 4 : 0) + (group.write ? 2 : 0) + (group.execute ? 1 : 0);
            const p = (public_.read ? 4 : 0) + (public_.write ? 2 : 0) + (public_.execute ? 1 : 0);

            setOctal(`${o}${g}${p}`);

            const sym = [
                '-',
                owner.read ? 'r' : '-', owner.write ? 'w' : '-', owner.execute ? 'x' : '-',
                group.read ? 'r' : '-', group.write ? 'w' : '-', group.execute ? 'x' : '-',
                public_.read ? 'r' : '-', public_.write ? 'w' : '-', public_.execute ? 'x' : '-'
            ].join('');
            setSymbolic(sym);
        };
        calculate();
    }, [owner, group, public_]);

    const Checkbox = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: () => void }) => (
        <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200">
            <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${checked ? 'bg-sky-600 border-sky-600' : 'bg-white border-gray-300'}`}>
                {checked && <div className="w-2 h-2 bg-white rounded-full" />}
            </div>
            <span className="text-sm font-medium text-text">{label}</span>
        </label>
    );

    const copyCode = (code: string) => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-sky-100 rounded-full mb-4 text-sky-600">
                    <FontAwesomeIcon icon={faLock} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Calculadora Chmod</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Genera permisos de archivos Linux fácilmente.
                </p>
            </div>

            <div className="bg-surface rounded-3xl shadow-xl border border-gray-200 p-8 md:p-12 mb-8">

                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {/* Owner */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-2 mb-4 text-sky-700 font-bold">
                            <FontAwesomeIcon icon={faUser} />
                            <h3>Propietario (Owner)</h3>
                        </div>
                        <div className="space-y-2">
                            <Checkbox label="Leer (Read - 4)" checked={owner.read} onChange={() => setOwner({ ...owner, read: !owner.read })} />
                            <Checkbox label="Escribir (Write - 2)" checked={owner.write} onChange={() => setOwner({ ...owner, write: !owner.write })} />
                            <Checkbox label="Ejecutar (Execute - 1)" checked={owner.execute} onChange={() => setOwner({ ...owner, execute: !owner.execute })} />
                        </div>
                    </div>

                    {/* Group */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-2 mb-4 text-indigo-700 font-bold">
                            <FontAwesomeIcon icon={faUsers} />
                            <h3>Grupo (Group)</h3>
                        </div>
                        <div className="space-y-2">
                            <Checkbox label="Leer (Read - 4)" checked={group.read} onChange={() => setGroup({ ...group, read: !group.read })} />
                            <Checkbox label="Escribir (Write - 2)" checked={group.write} onChange={() => setGroup({ ...group, write: !group.write })} />
                            <Checkbox label="Ejecutar (Execute - 1)" checked={group.execute} onChange={() => setGroup({ ...group, execute: !group.execute })} />
                        </div>
                    </div>

                    {/* Public */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-2 mb-4 text-teal-700 font-bold">
                            <FontAwesomeIcon icon={faGlobe} />
                            <h3>Público (Public)</h3>
                        </div>
                        <div className="space-y-2">
                            <Checkbox label="Leer (Read - 4)" checked={public_.read} onChange={() => setPublic({ ...public_, read: !public_.read })} />
                            <Checkbox label="Escribir (Write - 2)" checked={public_.write} onChange={() => setPublic({ ...public_, write: !public_.write })} />
                            <Checkbox label="Ejecutar (Execute - 1)" checked={public_.execute} onChange={() => setPublic({ ...public_, execute: !public_.execute })} />
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-center">
                        <span className="block text-xs font-bold text-text/40 uppercase mb-2">Notación Octal</span>
                        <div className="text-5xl font-mono font-bold text-sky-600 mb-4">{octal}</div>
                        <button
                            onClick={() => copyCode(`chmod ${octal} filename`)}
                            className="bg-white border border-gray-200 hover:border-sky-500 text-text/80 px-4 py-2 rounded-lg font-bold text-sm transition-all inline-flex items-center gap-2"
                        >
                            <FontAwesomeIcon icon={faCopy} /> Copiar comando
                        </button>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-center">
                        <span className="block text-xs font-bold text-text/40 uppercase mb-2">Notación Simbólica</span>
                        <div className="text-3xl font-mono font-bold text-indigo-600 mb-8 pt-2">{symbolic}</div>
                        <button
                            onClick={() => copyCode(`chmod ${symbolic} filename`)}
                            className="bg-white border border-gray-200 hover:border-indigo-500 text-text/80 px-4 py-2 rounded-lg font-bold text-sm transition-all inline-flex items-center gap-2"
                        >
                            <FontAwesomeIcon icon={faCopy} /> Copiar comando
                        </button>
                    </div>
                </div>

                {copied && (
                    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 animate-fade-in-up">
                        <FontAwesomeIcon icon={faCheckCircle} className="text-green-400" />
                        <span>¡Comando copiado al portapapeles!</span>
                    </div>
                )}
            </div>
        </div>
    );
}
