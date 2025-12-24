'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFont, faCopy, faCheckCircle, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';

export default function NumberToWordsClient() {
    const [number, setNumber] = useState<string>('');
    const [currency, setCurrency] = useState('none'); // none, eur, usd, mxn
    const [copied, setCopied] = useState(false);

    // Basic Spanish Number to Words Logic
    // This is a simplified implementation. For production robust usage, a library like `numero-a-letras` or `written-number` is recommended.
    // However, since we want client-side and minimize deps, let's implement a decent recursive function.

    const Unidades = (num: number): string => {
        switch (num) {
            case 1: return "UN";
            case 2: return "DOS";
            case 3: return "TRES";
            case 4: return "CUATRO";
            case 5: return "CINCO";
            case 6: return "SEIS";
            case 7: return "SIETE";
            case 8: return "OCHO";
            case 9: return "NUEVE";
        }
        return "";
    }

    const Decenas = (num: number): string => {
        let decena = Math.floor(num / 10);
        let unidad = num - (decena * 10);

        switch (decena) {
            case 1:
                switch (unidad) {
                    case 0: return "DIEZ";
                    case 1: return "ONCE";
                    case 2: return "DOCE";
                    case 3: return "TRECE";
                    case 4: return "CATORCE";
                    case 5: return "QUINCE";
                    default: return "DIECI" + Unidades(unidad);
                }
            case 2:
                if (unidad === 0) return "VEINTE";
                else return "VEINTI" + Unidades(unidad);
            case 3: return DecenasY("TREINTA", unidad);
            case 4: return DecenasY("CUARENTA", unidad);
            case 5: return DecenasY("CINCUENTA", unidad);
            case 6: return DecenasY("SESENTA", unidad);
            case 7: return DecenasY("SETENTA", unidad);
            case 8: return DecenasY("OCHENTA", unidad);
            case 9: return DecenasY("NOVENTA", unidad);
            case 0: return Unidades(unidad);
        }
        return "";
    }

    const DecenasY = (str: string, num: number) => {
        if (num > 0) return str + " Y " + Unidades(num);
        return str;
    }

    const Centenas = (num: number): string => {
        let centenas = Math.floor(num / 100);
        let decenas = num - (centenas * 100);

        switch (centenas) {
            case 1:
                if (decenas > 0) return "CIENTO " + Decenas(decenas);
                return "CIEN";
            case 2: return "DOSCIENTOS " + Decenas(decenas);
            case 3: return "TRESCIENTOS " + Decenas(decenas);
            case 4: return "CUATROCIENTOS " + Decenas(decenas);
            case 5: return "QUINIENTOS " + Decenas(decenas);
            case 6: return "SEISCIENTOS " + Decenas(decenas);
            case 7: return "SETECIENTOS " + Decenas(decenas);
            case 8: return "OCHOCIENTOS " + Decenas(decenas);
            case 9: return "NOVECIENTOS " + Decenas(decenas);
        }
        return Decenas(decenas);
    }

    const Seccion = (num: number, divisor: number, strSingular: string, strPlural: string) => {
        let cientos = Math.floor(num / divisor)
        let resto = num - (cientos * divisor)
        let letras = "";
        if (cientos > 0) {
            if (cientos > 1) {
                letras = Centenas(cientos) + " " + strPlural;
            } else {
                letras = strSingular;
            }
        }
        if (resto > 0) {
            letras += "";
        }
        return letras;
    }

    const Miles = (num: number) => {
        let divisor = 1000;
        let cientos = Math.floor(num / divisor);
        let resto = num - (cientos * divisor);

        let strMiles = Seccion(num, divisor, "UN MIL", "MIL");
        let strCentenas = Centenas(resto);

        if (strMiles == "") return strCentenas;
        return strMiles + " " + strCentenas;
    }

    const Millones = (num: number) => {
        let divisor = 1000000;
        let cientos = Math.floor(num / divisor);
        let resto = num - (cientos * divisor);

        let strMillones = Seccion(num, divisor, "UN MILLON", "MILLONES");
        // Simplified Logic: This needs robust Seccion logic to call recursive parts properly.
        // Actually, let's use a simpler iterative approach for millions, thousands, etc.
        return "";
    }

    // Better Implementation adapted for Client Side quickly:
    function NumeroALetras(num: number): string {
        if (num === 0) return "CERO";

        // Integer part only for now, decimals separate
        const enteros = Math.floor(num);

        function readThree(n: number): string {
            let output = "";
            let c = Math.floor(n / 100);
            let d = Math.floor((n % 100) / 10);
            let u = n % 10;

            // Hundreds
            if (c === 1 && d === 0 && u === 0) output += "CIEN";
            else if (c === 1) output += "CIENTO ";
            else if (c === 2) output += "DOSCIENTOS ";
            else if (c === 3) output += "TRESCIENTOS ";
            else if (c === 4) output += "CUATROCIENTOS ";
            else if (c === 5) output += "QUINIENTOS ";
            else if (c === 6) output += "SEISCIENTOS ";
            else if (c === 7) output += "SETECIENTOS ";
            else if (c === 8) output += "OCHOCIENTOS ";
            else if (c === 9) output += "NOVECIENTOS ";

            // Tens and Units
            const du = n % 100;
            if (du === 0 && c > 0) return output.trim();
            if (du > 0) {
                if (du < 10) output += Unidades(du);
                else if (du === 10) output += "DIEZ";
                else if (du === 11) output += "ONCE";
                else if (du === 12) output += "DOCE";
                else if (du === 13) output += "TRECE";
                else if (du === 14) output += "CATORCE";
                else if (du === 15) output += "QUINCE";
                else if (du < 20) output += "DIECI" + Unidades(du - 10);
                else if (du === 20) output += "VEINTE";
                else if (du < 30) output += "VEINTI" + Unidades(du - 20);
                else {
                    const tenMap = ["", "", "VEINTE", "TREINTA", "CUARENTA", "CINCUENTA", "SESENTA", "SETENTA", "OCHENTA", "NOVENTA"];
                    output += tenMap[d];
                    if (u > 0) output += " Y " + Unidades(u);
                }
            }
            return output.trim();
        }

        if (enteros > 999999999) return "NÚMERO DEMASIADO GRANDE"; // Limit

        let str = "";
        let millones = Math.floor(enteros / 1000000);
        let miles = Math.floor((enteros % 1000000) / 1000);
        let resto = enteros % 1000;

        if (millones > 0) {
            if (millones === 1) str += "UN MILLÓN ";
            else str += readThree(millones) + " MILLONES ";
        }

        if (miles > 0) {
            if (miles === 1) str += "MIL ";
            else str += readThree(miles) + " MIL ";
        }

        if (resto > 0) {
            str += readThree(resto);
        }

        return str.trim();
    }

    // Final logic combining integer + decimals and Currency
    const getResult = () => {
        if (!number) return '';
        const val = parseFloat(number);
        if (isNaN(val)) return 'Número inválido';

        let text = NumeroALetras(val);

        // Decimals
        const decimals = Math.round((val - Math.floor(val)) * 100);

        if (currency === 'none') {
            if (decimals > 0) text += ` CON ${decimals}/100`;
            return text;
        }

        let label = "";
        let labels = "";

        if (currency === 'eur') { label = "EURO"; labels = "EUROS"; }
        if (currency === 'usd') { label = "DÓLAR"; labels = "DÓLARES"; }
        if (currency === 'mxn') { label = "PESO"; labels = "PESOS"; }

        // Suffix
        const intVal = Math.floor(val);
        const suffix = intVal === 1 ? label : labels;

        return `${text} ${suffix} ${decimals.toString().padStart(2, '0')}/100 M.N.`;
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(getResult());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-purple-100 rounded-full mb-4 text-purple-600">
                    <FontAwesomeIcon icon={faFont} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Convertir Números a Letras</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Transforma cifras en texto legal para facturas y cheques.
                </p>
            </div>

            <div className="bg-surface rounded-3xl shadow-xl border border-gray-200 p-8 md:p-12">

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div>
                        <label className="block text-sm font-bold text-text mb-2">Ingresa el número</label>
                        <input
                            type="number"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none text-2xl font-bold transition-all"
                            placeholder="1250.50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-text mb-2">Moneda / Formato</label>
                        <div className="grid grid-cols-2 gap-2">
                            {[
                                { id: 'none', label: 'Simple' },
                                { id: 'eur', label: 'Euros (€)' },
                                { id: 'usd', label: 'Dólares ($)' },
                                { id: 'mxn', label: 'Pesos ($)' },
                            ].map((c) => (
                                <button
                                    key={c.id}
                                    onClick={() => setCurrency(c.id)}
                                    className={`px-4 py-3 rounded-xl font-bold border transition-all text-sm ${currency === c.id ? 'bg-purple-600 text-white border-purple-600' : 'bg-gray-50 text-text/60 hover:bg-gray-100'}`}
                                >
                                    {c.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-gray-900 rounded-2xl p-8 relative min-h-[160px] flex items-center justify-center text-center">
                    {number ? (
                        <div className="text-2xl md:text-3xl font-bold text-white leading-relaxed">
                            {getResult()}
                        </div>
                    ) : (
                        <div className="text-white/30 font-bold text-xl">
                            El resultado aparecerá aquí...
                        </div>
                    )}

                    {number && (
                        <button
                            onClick={copyToClipboard}
                            className={`absolute bottom-4 right-4 px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${copied ? 'bg-green-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
                        >
                            <FontAwesomeIcon icon={copied ? faCheckCircle : faCopy} />
                            {copied ? 'Copiado' : 'Copiar Texto'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
