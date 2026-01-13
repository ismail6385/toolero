import React from 'react';
import type { Metadata } from 'next';
import YouTubeTagsClient from './YouTubeTagsClient';

export const metadata: Metadata = {
    title: 'Extractor de Tags de YouTube | Ver Etiquetas de Videos | Toolero',
    description: 'Extrae las etiquetas (tags) de cualquier video de YouTube para mejorar tu SEO y descubrir qué keywords usan otros creadores.',
    keywords: 'youtube tags, extractor tags youtube, etiquetas youtube, seo youtube, keywords youtube'
};

export default function YouTubeTagsPage() {
    return <YouTubeTagsClient />;
}
