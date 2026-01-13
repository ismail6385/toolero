'use client';

import GenericTextTool from '@/components/GenericTextTool';
import { faLink } from '@fortawesome/free-solid-svg-icons';

export default function UrlParserClient() {
    const parseUrl = (input: string) => {
        try {
            const url = new URL(input);
            const params = new URLSearchParams(url.search);
            const paramsObj: Record<string, string> = {};
            params.forEach((v, k) => paramsObj[k] = v);

            const result = {
                Protocolo: url.protocol,
                Host: url.host,
                Hostname: url.hostname,
                Puerto: url.port,
                Path: url.pathname,
                Query: url.search,
                Hash: url.hash,
                Origin: url.origin,
                Parámetros: paramsObj
            };

            return JSON.stringify(result, null, 2);
        } catch (e) {
            return `Error: URL inválida.\n\nAsegúrate de incluir el protocolo (http:// o https://).`;
        }
    };

    return (
        <GenericTextTool
            title="Parser de URL"
            description="Analiza y desglosa una URL en sus componentes: protocolo, host, path, parámetros query y más."
            icon={faLink}
            onTransform={parseUrl}
            inputLabel="URL Completa (https://...)"
            outputLabel="Detalles (JSON)"
        />
    );
}
