import { Metadata } from 'next';
import GcdLcmClient from './GcdLcmClient';

export const metadata: Metadata = {
    title: 'Calculadora MCD y MCM Online - Toolero.es',
    description: 'Encuentra el Máximo Común Divisor (MCD) y Mínimo Común Múltiplo (MCM) de varios números al instante.',
    keywords: ['mcd calculadora', 'mcm calculadora', 'maximo comun divisor', 'minimo comun multiplo', 'matematicas escolares']
};

export default function GcdLcmPage() {
    return <GcdLcmClient />;
}
