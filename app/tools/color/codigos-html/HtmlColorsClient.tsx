'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCheck, faCopy } from '@fortawesome/free-solid-svg-icons';

const COLORS = [
    { name: "AliceBlue", hex: "#F0F8FF" },
    { name: "AntiqueWhite", hex: "#FAEBD7" },
    { name: "Aqua", hex: "#00FFFF" },
    { name: "Aquamarine", hex: "#7FFFD4" },
    { name: "Azure", hex: "#F0FFFF" },
    { name: "Beige", hex: "#F5F5DC" },
    { name: "Bisque", hex: "#FFE4C4" },
    { name: "Black", hex: "#000000" },
    { name: "BlanchedAlmond", hex: "#FFEBCD" },
    { name: "Blue", hex: "#0000FF" },
    { name: "BlueViolet", hex: "#8A2BE2" },
    { name: "Brown", hex: "#A52A2A" },
    { name: "BurlyWood", hex: "#DEB887" },
    { name: "CadetBlue", hex: "#5F9EA0" },
    { name: "Chartreuse", hex: "#7FFF00" },
    { name: "Chocolate", hex: "#D2691E" },
    { name: "Coral", hex: "#FF7F50" },
    { name: "CornflowerBlue", hex: "#6495ED" },
    { name: "Cornsilk", hex: "#FFF8DC" },
    { name: "Crimson", hex: "#DC143C" },
    { name: "Cyan", hex: "#00FFFF" },
    { name: "DarkBlue", hex: "#00008B" },
    { name: "DarkCyan", hex: "#008B8B" },
    { name: "DarkGoldenRod", hex: "#B8860B" },
    { name: "DarkGray", hex: "#A9A9A9" },
    { name: "DarkGreen", hex: "#006400" },
    { name: "DarkKhaki", hex: "#BDB76B" },
    { name: "DarkMagenta", hex: "#8B008B" },
    { name: "DarkOliveGreen", hex: "#556B2F" },
    { name: "DarkOrange", hex: "#FF8C00" },
    { name: "DarkOrchid", hex: "#9932CC" },
    { name: "DarkRed", hex: "#8B0000" },
    { name: "DarkSalmon", hex: "#E9967A" },
    { name: "DarkSeaGreen", hex: "#8FBC8F" },
    { name: "DarkSlateBlue", hex: "#483D8B" },
    { name: "DarkSlateGray", hex: "#2F4F4F" },
    { name: "DarkTurquoise", hex: "#00CED1" },
    { name: "DarkViolet", hex: "#9400D3" },
    { name: "DeepPink", hex: "#FF1493" },
    { name: "DeepSkyBlue", hex: "#00BFFF" },
    { name: "DimGray", hex: "#696969" },
    { name: "DodgerBlue", hex: "#1E90FF" },
    { name: "FireBrick", hex: "#B22222" },
    { name: "FloralWhite", hex: "#FFFAF0" },
    { name: "ForestGreen", hex: "#228B22" },
    { name: "Fuchsia", hex: "#FF00FF" },
    { name: "Gainsboro", hex: "#DCDCDC" },
    { name: "GhostWhite", hex: "#F8F8FF" },
    { name: "Gold", hex: "#FFD700" },
    { name: "GoldenRod", hex: "#DAA520" },
    { name: "Gray", hex: "#808080" },
    { name: "Green", hex: "#008000" },
    { name: "GreenYellow", hex: "#ADFF2F" },
    { name: "HoneyDew", hex: "#F0FFF0" },
    { name: "HotPink", hex: "#FF69B4" },
    { name: "IndianRed", hex: "#CD5C5C" },
    { name: "Indigo", hex: "#4B0082" },
    { name: "Ivory", hex: "#FFFFF0" },
    { name: "Khaki", hex: "#F0E68C" },
    { name: "Lavender", hex: "#E6E6FA" },
    { name: "LavenderBlush", hex: "#FFF0F5" },
    { name: "LawnGreen", hex: "#7CFC00" },
    { name: "LemonChiffon", hex: "#FFFACD" },
    { name: "LightBlue", hex: "#ADD8E6" },
    { name: "LightCoral", hex: "#F08080" },
    { name: "LightCyan", hex: "#E0FFFF" },
    { name: "LightGoldenRodYellow", hex: "#FAFAD2" },
    { name: "LightGray", hex: "#D3D3D3" },
    { name: "LightGreen", hex: "#90EE90" },
    { name: "LightPink", hex: "#FFB6C1" },
    { name: "LightSalmon", hex: "#FFA07A" },
    { name: "LightSeaGreen", hex: "#20B2AA" },
    { name: "LightSkyBlue", hex: "#87CEFA" },
    { name: "LightSlateGray", hex: "#778899" },
    { name: "LightSteelBlue", hex: "#B0C4DE" },
    { name: "LightYellow", hex: "#FFFFE0" },
    { name: "Lime", hex: "#00FF00" },
    { name: "LimeGreen", hex: "#32CD32" },
    { name: "Linen", hex: "#FAF0E6" },
    { name: "Magenta", hex: "#FF00FF" },
    { name: "Maroon", hex: "#800000" },
    { name: "MediumAquaMarine", hex: "#66CDAA" },
    { name: "MediumBlue", hex: "#0000CD" },
    { name: "MediumOrchid", hex: "#BA55D3" },
    { name: "MediumPurple", hex: "#9370DB" },
    { name: "MediumSeaGreen", hex: "#3CB371" },
    { name: "MediumSlateBlue", hex: "#7B68EE" },
    { name: "MediumSpringGreen", hex: "#00FA9A" },
    { name: "MediumTurquoise", hex: "#48D1CC" },
    { name: "MediumVioletRed", hex: "#C71585" },
    { name: "MidnightBlue", hex: "#191970" },
    { name: "MintCream", hex: "#F5FFFA" },
    { name: "MistyRose", hex: "#FFE4E1" },
    { name: "Moccasin", hex: "#FFE4B5" },
    { name: "NavajoWhite", hex: "#FFDEAD" },
    { name: "Navy", hex: "#000080" },
    { name: "OldLace", hex: "#FDF5E6" },
    { name: "Olive", hex: "#808000" },
    { name: "OliveDrab", hex: "#6B8E23" },
    { name: "Orange", hex: "#FFA500" },
    { name: "OrangeRed", hex: "#FF4500" },
    { name: "Orchid", hex: "#DA70D6" },
    { name: "PaleGoldenRod", hex: "#EEE8AA" },
    { name: "PaleGreen", hex: "#98FB98" },
    { name: "PaleTurquoise", hex: "#AFEEEE" },
    { name: "PaleVioletRed", hex: "#DB7093" },
    { name: "PapayaWhip", hex: "#FFEFD5" },
    { name: "PeachPuff", hex: "#FFDAB9" },
    { name: "Peru", hex: "#CD853F" },
    { name: "Pink", hex: "#FFC0CB" },
    { name: "Plum", hex: "#DDA0DD" },
    { name: "PowderBlue", hex: "#B0E0E6" },
    { name: "Purple", hex: "#800080" },
    { name: "RebeccaPurple", hex: "#663399" },
    { name: "Red", hex: "#FF0000" },
    { name: "RosyBrown", hex: "#BC8F8F" },
    { name: "RoyalBlue", hex: "#4169E1" },
    { name: "SaddleBrown", hex: "#8B4513" },
    { name: "Salmon", hex: "#FA8072" },
    { name: "SandyBrown", hex: "#F4A460" },
    { name: "SeaGreen", hex: "#2E8B57" },
    { name: "SeaShell", hex: "#FFF5EE" },
    { name: "Sienna", hex: "#A0522D" },
    { name: "Silver", hex: "#C0C0C0" },
    { name: "SkyBlue", hex: "#87CEEB" },
    { name: "SlateBlue", hex: "#6A5ACD" },
    { name: "SlateGray", hex: "#708090" },
    { name: "Snow", hex: "#FFFAFA" },
    { name: "SpringGreen", hex: "#00FF7F" },
    { name: "SteelBlue", hex: "#4682B4" },
    { name: "Tan", hex: "#D2B48C" },
    { name: "Teal", hex: "#008080" },
    { name: "Thistle", hex: "#D8BFD8" },
    { name: "Tomato", hex: "#FF6347" },
    { name: "Turquoise", hex: "#40E0D0" },
    { name: "Violet", hex: "#EE82EE" },
    { name: "Wheat", hex: "#F5DEB3" },
    { name: "White", hex: "#FFFFFF" },
    { name: "WhiteSmoke", hex: "#F5F5F5" },
    { name: "Yellow", hex: "#FFFF00" },
    { name: "YellowGreen", hex: "#9ACD32" }
];

export default function HtmlColorsClient() {
    const [search, setSearch] = useState('');
    const [copied, setCopied] = useState<string | null>(null);

    const filtered = COLORS.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.hex.toLowerCase().includes(search.toLowerCase())
    );

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(text);
        setTimeout(() => setCopied(null), 1500);
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4 text-primary">
                    <FontAwesomeIcon icon={faSearch} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Buscador Códigos de Color HTML</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Lista completa de los 140 colores estándar HTML/CSS por nombre y código HEX.
                </p>
            </div>

            <div className="max-w-xl mx-auto mb-10">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Buscar color (ej: blue, #FF00, tomato)..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 rounded-full border border-gray-200 shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-lg"
                    />
                    <FontAwesomeIcon icon={faSearch} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {filtered.map((c) => (
                    <div
                        key={c.name}
                        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group flex flex-col"
                    >
                        <div
                            className="h-24 w-full cursor-pointer relative"
                            style={{ backgroundColor: c.hex }}
                            onClick={() => copyToClipboard(c.hex)}
                        >
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/10 transition-opacity">
                                <span className="bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-gray-800 shadow-sm">
                                    {copied === c.hex ? 'Copiado' : 'Copiar HEX'}
                                </span>
                            </div>
                        </div>
                        <div className="p-3 flex flex-col gap-1">
                            <span className="font-bold text-gray-800 text-sm truncate" title={c.name}>{c.name}</span>
                            <div className="flex justify-between items-center text-xs text-gray-500 font-mono uppercase">
                                <span>{c.hex}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                    <p>No se encontraron colores que coincidan.</p>
                </div>
            )}
        </div>
    );
}
