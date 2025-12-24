
import { Metadata } from 'next';
import PdfToExcelClient from './PdfToExcelClient';

export const metadata: Metadata = {
    title: 'Convertir PDF a Excel Gratis - Conversor PDF a XLS Online | Toolero',
    description: 'Convierte tablas de archivos PDF a hojas de cálculo Excel (XLS) editables gratis online. Extrae datos y mantén el formato de filas y columnas.',
    keywords: [
        'pdf a excel',
        'convertir pdf a excel',
        'pdf a excel gratis',
        'convertir pdf a excel gratis',
        'pdf a xls',
        'convertidor pdf a excel',
        'pdf to excel',
        'extraer tablas pdf',
        'pasar pdf a excel',
        'transformar pdf a excel',
        'exportar pdf a excel',
        'toolero'
    ],
};

export default function PdfToExcelPage() {
    return (
        <>
            <PdfToExcelClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Convertir PDF a Excel (XLS) Online</h2>
                    <p className="text-gray-600 mb-4">
                        Deja de copiar datos manualmente celda por celda. Nuestra herramienta convierte tus archivos PDF en hojas de cálculo de Excel listas para trabajar.
                        El sistema detecta las tablas y estructuras tabulares para volcar la información respetando filas y columnas.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-red-600 mb-3">Ahorra Tiempo</h3>
                        <p className="text-gray-600">
                            Automatiza la extracción de datos financieros, inventarios o listados en segundos.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-red-600 mb-3">Formato Editable</h3>
                        <p className="text-gray-600">
                            El archivo descargado se puede abrir directamente en Microsoft Excel, Google Sheets o LibreOffice Calc.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-red-600 mb-3">Reconocimiento Tabular</h3>
                        <p className="text-gray-600">
                            Algoritmos especializados en identificar bordes y alineaciones para reconstruir la tabla original.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Ideal para profesionales</h2>
                    <ul className="grid md:grid-cols-2 gap-4">
                        <li className="flex items-start gap-3">
                            <span className="text-red-500 font-bold">✓</span>
                            <span className="text-gray-600">Contables que necesitan pasar estados de cuenta a Excel</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-red-500 font-bold">✓</span>
                            <span className="text-gray-600">Analistas de datos trabajando con informes públicos en PDF</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-red-500 font-bold">✓</span>
                            <span className="text-gray-600">Gestores de inventario migrando catálogos</span>
                        </li>
                    </ul>
                </section>
            </article>
        </>
    );
}
