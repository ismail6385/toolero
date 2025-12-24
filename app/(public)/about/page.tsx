import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sobre Nosotros - Toolero',
    description: 'Conoce la misión de Toolero: Democratizar el acceso a herramientas digitales de productividad y educación.',
    robots: {
        index: true,
        follow: true
    }
};

export default function AboutPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16 prose prose-slate">
            <h1>Sobre Toolero</h1>
            <p className="lead">
                Nuestra misión es simple: <strong>Proporcionar herramientas digitales de alta calidad, gratuitas y accesibles para todos.</strong>
            </p>

            <h2>¿Quiénes somos?</h2>
            <p>
                Toolero nació en 2024 como una iniciativa para unificar las utilidades dispersas de internet en una sola plataforma segura y rápida.
                Somos un equipo pequeño de desarrolladores y diseñadores apasionados por la eficiencia y el software libre.
            </p>

            <h2>Nuestros Valores</h2>
            <ul>
                <li><strong>Privacidad ante todo:</strong> La mayoría de nuestras herramientas funcionan "Client-side", lo que significa que tus archivos y datos nunca salen de tu navegador.</li>
                <li><strong>Gratuidad:</strong> Creemos que las herramientas básicas de educación y productividad no deberían tener barreras de pago.</li>
                <li><strong>Simplicidad:</strong> Diseñamos interfaces intuitivas que no requieren manual de instrucciones.</li>
            </ul>

            <h2>Tecnología</h2>
            <p>
                Utilizamos las últimas tecnologías web (Next.js, WebAssembly) para llevar la potencia de un software de escritorio directamente a tu navegador web, sin instalaciones ni esperas.
            </p>
        </div>
    );
}
