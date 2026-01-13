import { Metadata } from 'next';
import TextGeneratorClient from './TextGeneratorClient';

export const metadata: Metadata = {
    title: 'Generador de Texto Aleatorio - Lorem Ipsum Generator | Toolero.es',
    description: 'Generador de texto aleatorio gratuito. Crea Lorem Ipsum, cadenas de texto aleatorias, contraseñas seguras y datos de prueba para tus diseños.',
    keywords: ['generador de texto', 'lorem ipsum generator', 'texto aleatorio', 'generador contraseñas', 'random string generator', 'texto de relleno', 'toolero'],
    openGraph: {
        title: 'Generador de Lorem Ipsum y Texto Aleatorio - Toolero.es',
        description: 'Genera texto de relleno y cadenas aleatorias al instante. Ideal para diseñadores y desarrolladores.',
        type: 'website',
    }
};

export default function TextGeneratorPage() {
    return <TextGeneratorClient />;
}
