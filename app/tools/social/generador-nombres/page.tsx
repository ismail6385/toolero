import React from 'react';
import type { Metadata } from 'next';
import NicknameGeneratorClient from './NicknameGeneratorClient';

export const metadata: Metadata = {
    title: 'Generador de Nicknames para Juegos y Redes Sociales | Toolero',
    description: 'Crea nombres de usuario únicos, apodos y nicknames para Instagram, TikTok, Twitter, Discord y juegos online como Free Fire y Fortnite.',
    keywords: 'generador de nicknames, nombres para juegos, apodos para instagram, nombres para free fire, generador de nombres de usuario'
};

export default function NicknameGeneratorPage() {
    return <NicknameGeneratorClient />;
}
