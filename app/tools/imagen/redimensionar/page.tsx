import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt, faBolt, faLock, faCheckCircle, faImage } from '@fortawesome/free-solid-svg-icons';

export default function ResizeImage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-semibold text-text mb-2">Redimensionar Imagen</h1>
                <p className="text-text/60">Cambia el tamaño de tus imágenes en segundos sin perder calidad.</p>
            </div>

            <div className="bg-surface rounded-xl shadow-md border border-gray-200 overflow-hidden hover:border-primary/50 transition-colors">
                <div className="p-12 text-center bg-background border-2 border-dashed border-gray-300 m-4 rounded-xl hover:border-primary hover:bg-primary/5 transition-all cursor-pointer group">
                    <div className="mx-auto h-20 w-20 bg-white rounded-full shadow-md flex items-center justify-center text-text/40 group-hover:scale-110 group-hover:text-primary transition-all duration-300">
                        <FontAwesomeIcon icon={faImage} className="text-4xl" />
                    </div>
                    <h3 className="mt-6 text-lg font-semibold text-text group-hover:text-primary transition-colors">Arrastra tu imagen aquí</h3>
                    <p className="mt-2 text-sm text-text/60">o haz clic para seleccionar archivos</p>
                    <p className="mt-1 text-xs text-text/50 uppercase tracking-widest">Soporta PNG, JPG, WEBP</p>

                    <button className="mt-8 px-8 py-3 bg-primary hover:bg-secondary text-white font-semibold rounded-xl transition-all shadow-md transform group-hover:-translate-y-1">
                        <FontAwesomeIcon icon={faCloudUploadAlt} className="mr-2" />
                        Seleccionar Imagen
                    </button>
                </div>
            </div>

            <div className="max-w-2xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="p-4 group">
                    <div className="text-2xl mb-2 text-primary/50 group-hover:text-primary transition-colors">
                        <FontAwesomeIcon icon={faBolt} />
                    </div>
                    <h4 className="font-semibold text-text">Ultrarrápido</h4>
                    <p className="text-sm text-text/60">Procesamiento local.</p>
                </div>
                <div className="p-4 group">
                    <div className="text-2xl mb-2 text-primary/50 group-hover:text-primary transition-colors">
                        <FontAwesomeIcon icon={faLock} />
                    </div>
                    <h4 className="font-semibold text-text">100% Seguro</h4>
                    <p className="text-sm text-text/60">Privacidad total.</p>
                </div>
                <div className="p-4 group">
                    <div className="text-2xl mb-2 text-primary/50 group-hover:text-primary transition-colors">
                        <FontAwesomeIcon icon={faCheckCircle} />
                    </div>
                    <h4 className="font-semibold text-text">Alta Calidad</h4>
                    <p className="text-sm text-text/60">Resultado óptimo.</p>
                </div>
            </div>
        </div>
    );
}
