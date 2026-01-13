import { Metadata } from 'next';
import ListSorterClient from './ListSorterClient';

export const metadata: Metadata = {
    title: 'Ordenar Lista Alfabéticamente - Toolero.es',
    description: 'Herramienta para ordenar listas online. Alfabetizar (A-Z), ordenar números, ordenar por longitud o aleatoriamente.',
    keywords: ['ordenar lista', 'alfabetizar lista', 'ordenar a-z', 'sort list online', 'ordenar numeros']
};

export default function ListSorterPage() {
    return <ListSorterClient />;
}
