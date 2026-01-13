import { Metadata } from 'next';
import NumberToWordsClient from './NumberToWordsClient';

export const metadata: Metadata = {
    title: 'Convertir Números a Letras Online | Toolero.es',
    description: 'Convierte cifras numéricas a texto. Ideal para rellenar cheques, facturas y documentos legales.',
    keywords: ['numeros a letras', 'convertir numero a texto', 'escribir numeros', 'cheques', 'facturas', 'toolero'],
};

export default function NumberToWordsPage() {
    return <NumberToWordsClient />;
}
