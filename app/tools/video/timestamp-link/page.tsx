import React from 'react';
import type { Metadata } from 'next';
import TimestampLinkClient from './TimestampLinkClient';

export const metadata: Metadata = {
    title: 'Generador de Enlaces con Timestamp de YouTube | Toolero',
    description: 'Crea enlaces de YouTube que empiecen en un momento específico. Comparte videos desde el segundo exacto que quieres.',
    keywords: 'youtube timestamp, link tiempo youtube, compartir video momento, youtube time link'
};

export default function TimestampLinkPage() {
    return <TimestampLinkClient />;
}
