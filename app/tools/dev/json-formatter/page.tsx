import React from 'react';
import type { Metadata } from 'next';
import JsonFormatterClient from './JsonFormatterClient';

export const metadata: Metadata = {
    title: 'Formateador y Validador JSON Online | Minify JSON | Toolero',
    description: 'Valida, formatea y minifica código JSON al instante. Detecta errores de sintaxis y embellece tu JSON con un click.',
    keywords: 'json formatter, validador json, minify json, beautify json, json validator, pretty print json'
};

export default function JsonFormatterPage() {
    return <JsonFormatterClient />;
}
