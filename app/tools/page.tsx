import ToolCard from '@/components/ToolCard';
import {
    faFont,
    faImage,
    faLock,
    faHeading
} from '@fortawesome/free-solid-svg-icons';

export const metadata = {
    title: 'Catálogo de Herramientas - Toolero.es',
    description: 'Explora nuestra colección completa de herramientas gratuitas.',
};

export default function ToolsPage() {
    const allTools = [
        {
            title: "Contador de Palabras",
            description: "Análisis de texto completo: palabras, caracteres, párrafos y densidad.",
            href: "/tools/texto/contador-palabras",
            icon: faFont
        },
        {
            title: "Redimensionar Imagen",
            description: "Optimiza dimensiones de imágenes para web y rrss súper rápido.",
            href: "/tools/imagen/redimensionar",
            icon: faImage
        },
        {
            title: "Generador de Contraseñas",
            description: "Crea credenciales imposibles de hackear en un clic.",
            href: "#",
            icon: faLock
        },
        {
            title: "Conversor de Mayúsculas",
            description: "Alterna entre mayúsculas, minúsculas y capitalización de títulos.",
            href: "#",
            icon: faHeading
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            <div className="bg-surface border-b border-gray-200 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-semibold text-text mb-4">Catálogo de Herramientas</h1>
                    <p className="text-text/60 max-w-2xl mx-auto text-lg">
                        Navega por nuestra selección de utilidades gratuitas.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {allTools.map((tool, index) => (
                        <ToolCard
                            key={index}
                            title={tool.title}
                            description={tool.description}
                            href={tool.href}
                            icon={tool.icon}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
