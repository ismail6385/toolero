import React from 'react';
import type { Metadata } from 'next';
import HashtagGeneratorClient from './HashtagGeneratorClient';

export const metadata: Metadata = {
    title: 'Generador de Hashtags para Instagram, TikTok y Twitter | Toolero',
    description: 'Genera hashtags populares y relevantes para aumentar el alcance de tus publicaciones en redes sociales.',
    keywords: 'generador hashtags, hashtags instagram, hashtags tiktok, hashtags trending, social media'
};

export default function HashtagGeneratorPage() {
    return <HashtagGeneratorClient />;
}
