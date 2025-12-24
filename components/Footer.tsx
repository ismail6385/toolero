import Image from 'next/image';
import { toolsData } from '@/data/tools';

export default function Footer() {
    return (
        <footer className="bg-text text-white mt-auto border-t border-text/20">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 border-b border-white/10 pb-8">
                    {toolsData.map(cat => (
                        <div key={cat.slug}>
                            <h3 className={`text-sm font-semibold tracking-wider uppercase mb-3 ${cat.color.replace('text-', 'text-')}`}>{cat.name}</h3>
                            <ul className="space-y-2 text-sm text-white/60">
                                <li><a href={`/tools/${cat.slug}`} className="hover:text-white transition-colors">Explorar {cat.name}</a></li>
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-2xl font-bold text-white">Toolero</span>
                        </div>
                        <p className="text-white/70 text-sm max-w-sm leading-relaxed">
                            Plataforma todo-en-uno con herramientas gratuitas para productividad, desarrollo y educación.
                            Optimizadas para SEO, rápidas y seguras.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-secondary tracking-wider uppercase mb-4">Empresa</h3>
                        <ul className="space-y-3 text-sm text-white/70">
                            <li><a href="/about" className="hover:text-primary transition-colors">Sobre Nosotros</a></li>
                            <li><a href="/contact" className="hover:text-primary transition-colors">Contacto</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-secondary tracking-wider uppercase mb-4">Legal</h3>
                        <ul className="space-y-3 text-sm text-white/70">
                            <li><a href="/privacy" className="hover:text-primary transition-colors">Política de Privacidad</a></li>
                            <li><a href="/terms" className="hover:text-primary transition-colors">Términos de Uso</a></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-text/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-white/60">
                        &copy; {new Date().getFullYear()} Toolero. Hecho con <span className="text-secondary">♥</span> en España.
                    </p>
                    <div className="flex space-x-6">
                        {/* Social icons could go here */}
                    </div>
                </div>
            </div>
        </footer>
    );
}
