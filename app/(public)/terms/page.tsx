import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Términos y Condiciones - Toolero',
    description: 'Condiciones de uso de las herramientas y servicios de Toolero.',
};

export default function TermsPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16 prose prose-slate">
            <h1>Términos y Condiciones de Uso</h1>
            <p className="text-sm text-gray-500">Última actualización: Diciembre 2024</p>

            <h2>1. Aceptación de los Términos</h2>
            <p>
                Al acceder y utilizar Toolero, aceptas cumplir con estos términos y condiciones. Si no estás de acuerdo, por favor no utilices nuestros servicios.
            </p>

            <h2>2. Uso de las Herramientas</h2>
            <p>
                Nuestras herramientas se proporcionan "tal cual". Aunque nos esforzamos por garantizar la precisión de los cálculos y conversiones,
                <strong>no garantizamos que los resultados sean libres de errores</strong>. No debes utilizar nuestras herramientas para cálculos críticos (médicos, financieros de alto riesgo, estructurales) sin verificación profesional.
            </p>

            <h2>3. Propiedad Intelectual</h2>
            <p>
                El contenido, diseño y código de este sitio web están protegidos por derechos de autor. No está permitida la copia masiva o el "scraping" de nuestros contenidos sin permiso.
            </p>

            <h2>4. Limitación de Responsabilidad</h2>
            <p>
                Toolero no se hace responsable de ningún daño directo, indirecto o consecuente derivado del uso o la imposibilidad de uso de nuestras herramientas.
            </p>
        </div>
    );
}
