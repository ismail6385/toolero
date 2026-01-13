'use client';

import GenericTextTool from '@/components/GenericTextTool';
import { faLink } from '@fortawesome/free-solid-svg-icons';

export default function SlugGeneratorClient() {
    const toSlug = (input: string) => {
        return input
            .toString()
            .normalize('NFD') // Split accents from letters
            .replace(/[\u0300-\u036f]/g, '') // Remove accents
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-') // Replace spaces with -
            .replace(/[^\w\-]+/g, '') // Remove all non-word chars
            .replace(/\-\-+/g, '-'); // Replace multiple - with single -
    };

    return (
        <GenericTextTool
            title="Convertidor de Texto a Slug"
            description="Convierte títulos o texto en URLs amigables (slugs) para SEO. Ideal para bloggers y desarrolladores."
            icon={faLink}
            onTransform={toSlug}
            inputLabel="Texto Original"
            outputLabel="Slug URL Friendly"
        />
    );
}
