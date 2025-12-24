import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Política de Privacidad - Toolero',
    description: 'Conoce cómo protegemos tus datos en Toolero. Transparencia total sobre el uso de cookies y procesamiento de datos.',
};

export default function PrivacyPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16 prose prose-slate">
            <h1>Política de Privacidad</h1>
            <p className="text-sm text-gray-500">Última actualización: Diciembre 2024</p>

            <h2>1. Procesamiento de Datos</h2>
            <p>
                En Toolero, priorizamos el procesamiento del lado del cliente (Client-side). Esto significa que para la mayoría de nuestras herramientas (editores de imagen, conversores, calculadoras),
                <strong>tus datos nunca abandonan tu dispositivo</strong>. El procesamiento ocurre directamente en tu navegador web.
            </p>

            <h2>2. Cookies y Analíticas</h2>
            <p>
                Utilizamos cookies técnicas esenciales para el funcionamiento del sitio. También podemos usar servicios de análisis anónimos (como Google Analytics o similares) para entender cómo se usa nuestro sitio y mejorarlo.
                No vendemos ni compartimos tu información personal con terceros para fines publicitarios.
            </p>

            <h2>3. Publicidad</h2>
            <p>
                Podemos mostrar anuncios de terceros (como Google AdSense) para sostener los costos del servidor. Estos proveedores pueden usar cookies para mostrar anuncios relevantes basados en tus visitas anteriores.
            </p>

            <h2>4. Contacto</h2>
            <p>
                Si tienes dudas sobre nuestra política de privacidad, contáctanos en <a href="mailto:privacy@toolero.com">privacy@toolero.com</a>.
            </p>
        </div>
    );
}
