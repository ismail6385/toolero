'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faFilePdf, faDownload, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { PDFDocument } from 'pdf-lib';

export default function ProtectPdfClient() {
    const [file, setFile] = useState<File | null>(null);
    const [password, setPassword] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [protectedPdfUrl, setProtectedPdfUrl] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            if (e.target.files[0].type === 'application/pdf') {
                setFile(e.target.files[0]);
                setProtectedPdfUrl(null);
            } else {
                alert('Por favor selecciona un archivo PDF válido.');
            }
        }
    };

    const protectPdf = async () => {
        if (!file || !password) return;

        setIsProcessing(true);
        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer);

            // Encrypt
            pdfDoc.encrypt({
                userPassword: password,
                ownerPassword: password, // Same for simplicity, usually owner has full rights
                permissions: {
                    printing: 'highResolution',
                    modifying: false,
                    copying: false,
                    annotating: false,
                    fillingForms: false,
                    contentAccessibility: false,
                    documentAssembly: false,
                },
            });

            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            setProtectedPdfUrl(url);
        } catch (error) {
            console.error(error);
            alert('Error al proteger el PDF. Puede que el archivo esté dañado o ya tenga contraseña.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-red-100 rounded-full mb-4 text-red-600">
                    <FontAwesomeIcon icon={faShieldAlt} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Proteger PDF</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Encripta tus documentos PDF con contraseña. 100% Client-side.
                </p>
            </div>

            <div className="bg-surface rounded-3xl shadow-xl border border-gray-200 p-8 md:p-12 mb-8 text-center">

                {!file ? (
                    <div className="border-4 border-dashed border-gray-200 rounded-3xl p-12 hover:bg-gray-50 transition-colors cursor-pointer relative">
                        <input
                            type="file"
                            accept=".pdf"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                                <FontAwesomeIcon icon={faFilePdf} className="text-4xl text-red-500" />
                            </div>
                            <h3 className="text-xl font-bold text-text">Selecciona tu archivo PDF</h3>
                            <p className="text-text/50">o arrastra y suelta aquí</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-6 animate-fade-in">
                        <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center">
                            <FontAwesomeIcon icon={faFilePdf} className="text-3xl text-red-500" />
                        </div>
                        <div className="text-lg font-bold text-text">{file.name}</div>
                        <button
                            onClick={() => { setFile(null); setProtectedPdfUrl(null); }}
                            className="text-sm text-red-500 hover:underline"
                        >
                            Cambiar archivo
                        </button>
                    </div>
                )}

                {file && !protectedPdfUrl && (
                    <div className="mt-8 max-w-md mx-auto">
                        <label className="block text-sm font-bold text-text mb-2 text-left">Contraseña de Protección</label>
                        <div className="relative mb-6">
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-red-500 outline-none"
                                placeholder="Ingresa una contraseña segura"
                            />
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                <FontAwesomeIcon icon={faLock} />
                            </div>
                        </div>

                        <button
                            onClick={protectPdf}
                            disabled={!password || isProcessing}
                            className={`w-full py-4 bg-red-600 text-white font-bold text-lg rounded-xl shadow-lg hover:bg-red-700 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 ${(!password || isProcessing) ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isProcessing ? (
                                <span>Procesando...</span>
                            ) : (
                                <>
                                    <FontAwesomeIcon icon={faShieldAlt} /> Proteger PDF
                                </>
                            )}
                        </button>
                    </div>
                )}

                {protectedPdfUrl && (
                    <div className="mt-8 animate-fade-in-up">
                        <div className="p-6 bg-green-50 rounded-2xl border border-green-200 mb-6 flex flex-col items-center">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2">
                                <FontAwesomeIcon icon={faLock} />
                            </div>
                            <h3 className="text-lg font-bold text-green-800">¡PDF Protegido con éxito!</h3>
                        </div>

                        <a
                            href={protectedPdfUrl}
                            download={`protected_${file?.name}`}
                            className="inline-flex py-4 px-8 bg-gray-900 text-white font-bold text-lg rounded-xl shadow-xl hover:bg-black hover:scale-105 transition-all items-center gap-3"
                        >
                            <FontAwesomeIcon icon={faDownload} /> Descargar PDF Protegido
                        </a>
                    </div>
                )}

            </div>

            {/* Privacy Notice */}
            <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100 text-center">
                <p className="text-sm text-text/70">
                    🔒 <strong>100% Privado:</strong> El cifrado se realiza localmente en tu navegador. Tu PDF y contraseña nunca se envían a ningún servidor.
                </p>
            </div>

            {/* SEO Content Section */}
            <div className="mt-16 space-y-12">
                {/* Features Section */}
                <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <h2 className="text-3xl font-bold text-text mb-6">¿Por qué proteger tus PDF con contraseña?</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">✓</div>
                                <div>
                                    <h3 className="font-semibold text-text mb-1">Seguridad Total</h3>
                                    <p className="text-sm text-text/70">Protege documentos confidenciales, contratos, facturas y archivos personales con encriptación robusta.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">✓</div>
                                <div>
                                    <h3 className="font-semibold text-text mb-1">100% Gratis y Sin Límites</h3>
                                    <p className="text-sm text-text/70">Encripta todos los PDF que necesites sin pagar. Sin marcas de agua ni restricciones.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">✓</div>
                                <div>
                                    <h3 className="font-semibold text-text mb-1">Privacidad Garantizada</h3>
                                    <p className="text-sm text-text/70">El cifrado se realiza localmente en tu navegador. Tus archivos nunca se suben a servidores externos.</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">✓</div>
                                <div>
                                    <h3 className="font-semibold text-text mb-1">Encriptación Fuerte</h3>
                                    <p className="text-sm text-text/70">Usa estándares de cifrado PDF para proteger tus documentos contra accesos no autorizados.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">✓</div>
                                <div>
                                    <h3 className="font-semibold text-text mb-1">Rápido y Fácil</h3>
                                    <p className="text-sm text-text/70">Protege tus PDFs en segundos con solo seleccionar el archivo e ingresar una contraseña.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">✓</div>
                                <div>
                                    <h3 className="font-semibold text-text mb-1">Compatible con Todo</h3>
                                    <p className="text-sm text-text/70">Los PDFs protegidos funcionan en cualquier lector PDF: Adobe, Chrome, Edge, etc.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How to Use Section */}
                <section className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 border border-red-100">
                    <h2 className="text-3xl font-bold text-text mb-6">Cómo proteger un PDF con contraseña en 3 pasos</h2>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">1</div>
                            <div>
                                <h3 className="font-semibold text-text text-lg mb-2">Selecciona tu archivo PDF</h3>
                                <p className="text-text/70">Haz clic en el área de carga o arrastra el documento PDF que quieres proteger con contraseña.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">2</div>
                            <div>
                                <h3 className="font-semibold text-text text-lg mb-2">Ingresa una contraseña segura</h3>
                                <p className="text-text/70">Escribe la contraseña que quieres usar para proteger tu PDF. Asegúrate de recordarla o guardarla en un lugar seguro.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">3</div>
                            <div>
                                <h3 className="font-semibold text-text text-lg mb-2">Descarga tu PDF protegido</h3>
                                <p className="text-text/70">Haz clic en "Proteger PDF" y descarga tu documento encriptado. Ahora solo se podrá abrir con la contraseña.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Security Tips Section */}
                <section className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100">
                    <h2 className="text-3xl font-bold text-text mb-6">Consejos para crear contraseñas seguras</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white/80 rounded-lg p-4 border border-purple-100">
                            <h3 className="font-semibold text-text mb-2">🔐 Usa al menos 8 caracteres</h3>
                            <p className="text-sm text-text/70">Cuanto más larga sea la contraseña, más difícil será de descifrar.</p>
                        </div>
                        <div className="bg-white/80 rounded-lg p-4 border border-purple-100">
                            <h3 className="font-semibold text-text mb-2">🔤 Combina mayúsculas y minúsculas</h3>
                            <p className="text-sm text-text/70">Mezcla letras en mayúsculas y minúsculas para mayor seguridad.</p>
                        </div>
                        <div className="bg-white/80 rounded-lg p-4 border border-purple-100">
                            <h3 className="font-semibold text-text mb-2">🔢 Incluye números y símbolos</h3>
                            <p className="text-sm text-text/70">Añade números (0-9) y caracteres especiales (!@#$%^&*) a tu contraseña.</p>
                        </div>
                        <div className="bg-white/80 rounded-lg p-4 border border-purple-100">
                            <h3 className="font-semibold text-text mb-2">❌ Evita palabras comunes</h3>
                            <p className="text-sm text-text/70">No uses palabras del diccionario, nombres propios o fechas obvias.</p>
                        </div>
                    </div>
                </section>

                {/* Use Cases Section */}
                <section className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100">
                    <h2 className="text-3xl font-bold text-text mb-6">¿Cuándo proteger un PDF con contraseña?</h2>
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <span className="text-blue-600 font-bold">•</span>
                            <p className="text-text/70"><strong>Documentos legales:</strong> Contratos, acuerdos, testamentos y documentos notariales.</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-blue-600 font-bold">•</span>
                            <p className="text-text/70"><strong>Información financiera:</strong> Facturas, estados de cuenta, declaraciones de impuestos.</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-blue-600 font-bold">•</span>
                            <p className="text-text/70"><strong>Datos personales:</strong> Documentos de identidad, certificados médicos, información confidencial.</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-blue-600 font-bold">•</span>
                            <p className="text-text/70"><strong>Archivos empresariales:</strong> Reportes confidenciales, estrategias de negocio, información de clientes.</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-blue-600 font-bold">•</span>
                            <p className="text-text/70"><strong>Documentos académicos:</strong> Tesis, investigaciones, exámenes y material educativo protegido.</p>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <h2 className="text-3xl font-bold text-text mb-8">Preguntas Frecuentes</h2>
                    <div className="space-y-6">
                        <div className="border-b border-gray-100 pb-6">
                            <h3 className="font-semibold text-text text-lg mb-2">¿Es gratis proteger PDF con contraseña?</h3>
                            <p className="text-text/70">Sí, nuestra herramienta es 100% gratuita. No hay costos ocultos, límites de archivos ni necesidad de registro.</p>
                        </div>
                        <div className="border-b border-gray-100 pb-6">
                            <h3 className="font-semibold text-text text-lg mb-2">¿Qué tan segura es la encriptación?</h3>
                            <p className="text-text/70">Usamos los estándares de encriptación PDF estándar de la industria. La seguridad depende principalmente de la fortaleza de tu contraseña.</p>
                        </div>
                        <div className="border-b border-gray-100 pb-6">
                            <h3 className="font-semibold text-text text-lg mb-2">¿Mi archivo se sube a algún servidor?</h3>
                            <p className="text-text/70">No. Todo el proceso de encriptación se realiza localmente en tu navegador. Tu PDF y contraseña nunca salen de tu dispositivo.</p>
                        </div>
                        <div className="border-b border-gray-100 pb-6">
                            <h3 className="font-semibold text-text text-lg mb-2">¿Puedo recuperar la contraseña si la olvido?</h3>
                            <p className="text-text/70">No. Si olvidas la contraseña, no hay forma de recuperar el contenido del PDF. Asegúrate de guardar tu contraseña en un lugar seguro.</p>
                        </div>
                        <div className="border-b border-gray-100 pb-6">
                            <h3 className="font-semibold text-text text-lg mb-2">¿El PDF protegido funciona en cualquier lector?</h3>
                            <p className="text-text/70">Sí, los PDFs encriptados con contraseña son compatibles con todos los lectores PDF modernos como Adobe Reader, Chrome, Edge, etc.</p>
                        </div>
                        <div className="border-b border-gray-100 pb-6">
                            <h3 className="font-semibold text-text text-lg mb-2">¿Puedo proteger PDFs grandes?</h3>
                            <p className="text-text/70">Sí, pero el tiempo de procesamiento dependerá del tamaño del archivo y la potencia de tu dispositivo, ya que todo se procesa localmente.</p>
                        </div>
                        <div className="pb-6">
                            <h3 className="font-semibold text-text text-lg mb-2">¿Puedo cambiar la contraseña de un PDF ya protegido?</h3>
                            <p className="text-text/70">Primero necesitarás desbloquear el PDF con la contraseña actual, y luego podrás volver a protegerlo con una nueva contraseña.</p>
                        </div>
                    </div>
                </section>

                {/* Additional Info Section */}
                <section className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                    <h2 className="text-3xl font-bold text-text mb-4">Proteger PDF con Contraseña: Seguridad y Privacidad</h2>
                    <div className="prose prose-sm max-w-none text-text/70 space-y-4">
                        <p>
                            Cuando necesitas <strong>proteger PDF con contraseña</strong>, nuestra herramienta online es la solución más segura y privada. Ya sea que necesites <strong>encriptar PDF</strong> con información confidencial o simplemente <strong>poner contraseña a PDF</strong> para controlar quién puede acceder a tus documentos, nuestro <strong>protector de PDF</strong> te permite hacerlo de forma rápida, segura y completamente gratuita.
                        </p>
                        <p>
                            A diferencia de otras herramientas que requieren subir tus archivos a servidores externos, nuestra aplicación procesa todo localmente en tu navegador. Esto significa que cuando usas nuestra herramienta para <strong>proteger documento PDF</strong>, tus archivos y contraseñas nunca salen de tu dispositivo, garantizando la máxima privacidad y seguridad de tus documentos confidenciales.
                        </p>
                        <p>
                            Ya sea que necesites <strong>añadir contraseña PDF</strong> para documentos legales, financieros, personales o empresariales, nuestra herramienta te ofrece una experiencia sin complicaciones. Sin límites de tamaño, sin marcas de agua, sin registro y sin costos ocultos. Simplemente selecciona tu PDF, ingresa una contraseña segura, y descarga tu documento protegido en segundos.
                        </p>
                        <p>
                            Nuestra herramienta para <strong>encriptar PDF con contraseña</strong> es compatible con todos los navegadores modernos y dispositivos, permitiéndote <strong>bloquear PDF con contraseña</strong> desde cualquier lugar y en cualquier momento. El proceso es tan simple que cualquiera puede usarlo, sin necesidad de conocimientos técnicos o software especializado.
                        </p>
                        <p>
                            Además, al <strong>proteger PDF online</strong> usando nuestra herramienta, mantienes el control total de tus documentos. Tú decides quién puede acceder a ellos mediante la contraseña que elijas. Los PDFs protegidos son compatibles con todos los lectores PDF estándar, asegurando que tus documentos encriptados puedan ser abiertos en cualquier dispositivo, siempre que se ingrese la contraseña correcta.
                        </p>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100">
                    <h2 className="text-3xl font-bold text-text mb-6">Ventajas de encriptar tus PDFs</h2>
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <span className="text-green-600 font-bold">✓</span>
                            <p className="text-text/70"><strong>Confidencialidad:</strong> Protege información sensible de accesos no autorizados.</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-green-600 font-bold">✓</span>
                            <p className="text-text/70"><strong>Control de acceso:</strong> Solo quienes tengan la contraseña podrán abrir el documento.</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-green-600 font-bold">✓</span>
                            <p className="text-text/70"><strong>Cumplimiento legal:</strong> Ayuda a cumplir con regulaciones de protección de datos.</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-green-600 font-bold">✓</span>
                            <p className="text-text/70"><strong>Tranquilidad:</strong> Envía documentos por email o almacénalos en la nube con confianza.</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-green-600 font-bold">✓</span>
                            <p className="text-text/70"><strong>Prevención de edición:</strong> Evita modificaciones no autorizadas de tus documentos.</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
