import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

interface ToolCardProps {
    title: string;
    description: string;
    href: string;
    icon: IconDefinition;
}

export default function ToolCard({ title, description, href, icon }: ToolCardProps) {
    return (
        <Link href={href} className="group relative flex flex-col bg-surface rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg hover:-translate-y-1 hover:border-primary transition-all duration-300 overflow-hidden">
            <div className="absolute -right-12 -top-12 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors pointer-events-none" />

            <div className="relative flex items-center mb-4">
                <div className="w-12 h-12 rounded-xl bg-background group-hover:bg-primary flex items-center justify-center text-primary group-hover:text-white transition-all duration-300 shadow-md">
                    <FontAwesomeIcon icon={icon} className="text-xl" />
                </div>

                <h3 className="ml-4 text-lg font-semibold text-text group-hover:text-primary transition-colors">
                    {title}
                </h3>
            </div>

            <p className="relative text-text/60 text-sm leading-relaxed mb-6">
                {description}
            </p>

            <div className="mt-auto relative flex items-center text-sm font-semibold text-primary group-hover:text-secondary transition-colors">
                Probar Ahora
                <FontAwesomeIcon icon={faArrowRight} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
            </div>
        </Link>
    );
}
