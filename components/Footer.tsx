export default function Footer() {
    return (
        <footer className="bg-text text-white mt-auto border-t border-text/20">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center text-xs font-bold shadow-md">T</div>
                            <span className="text-xl font-bold text-white">Toolero.es</span>
                        </div>
                        <p className="text-white/70 text-sm max-w-sm leading-relaxed">
                            Plataforma todo-en-uno con herramientas gratuitas para desarrolladores, creadores y estudiantes.
                            Sin registros, privado y seguro.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-secondary tracking-wider uppercase mb-4">Plataforma</h3>
                        <ul className="space-y-3 text-sm text-white/70">
                            <li><a href="/" className="hover:text-primary transition-colors">Inicio</a></li>
                            <li><a href="/categorias" className="hover:text-primary transition-colors">Categorías</a></li>
                            <li><a href="/tools" className="hover:text-primary transition-colors">Explorar Herramientas</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Novedades</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-secondary tracking-wider uppercase mb-4">Legal & Contacto</h3>
                        <ul className="space-y-3 text-sm text-white/70">
                            <li><a href="#" className="hover:text-primary transition-colors">Política de Privacidad</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Términos de Uso</a></li>
                            <li><a href="mailto:info@toolero.es" className="hover:text-primary transition-colors">info@toolero.es</a></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-text/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-white/60">
                        &copy; {new Date().getFullYear()} Toolero.es. Hecho con <span className="text-secondary">♥</span> en España.
                    </p>
                    <div className="flex space-x-6">
                        {/* Social icons could go here */}
                    </div>
                </div>
            </div>
        </footer>
    );
}
