'use client';

import { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical, faTrash, faImage, faLightbulb, faLink, faListUl, faListOl, faQuoteRight, faCode, faMinus, faExternalLinkAlt, faVideo, faBold, faItalic, faInfoCircle, faExclamationTriangle, faBan, faCheckCircle, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { BlockData } from '@/types/blog';
import { LinkSuggester, SuggestionTool, LinkMatch } from '@/lib/linkSuggestions';
import debounce from 'lodash.debounce';

interface Props {
    block: BlockData;
    onChange: (b: BlockData) => void;
    onDelete: () => void;
    onEnter: () => void;
    uploadHandler: (file: File) => Promise<string>;
    tools?: SuggestionTool[]; // SEO Tools Data
}

function HeadingBlock({ block, onChange, onEnter }: any) {
    const activeLevel = block.level || 2;

    const setLevel = (l: number) => {
        onChange({ ...block, level: l });
    };

    const getSizeClass = () => {
        switch (activeLevel) {
            case 1: return 'text-5xl font-black tracking-tight';
            case 2: return 'text-4xl font-bold tracking-tight';
            case 3: return 'text-3xl font-bold';
            case 4: return 'text-2xl font-bold';
            case 5: return 'text-xl font-bold uppercase tracking-wide text-gray-800';
            case 6: return 'text-lg font-bold uppercase tracking-wider text-gray-600';
            default: return 'text-3xl font-bold';
        }
    };

    return (
        <div className="relative group/heading">
            {/* Level Selector - Visible on hover or when focusing (using group functionality) */}
            <div className="absolute -top-8 left-0 flex gap-1 bg-white border border-gray-200 rounded-lg p-1 shadow-lg shadow-gray-200/50 opacity-0 group-hover/heading:opacity-100 transition-all duration-200 z-10 translate-y-2 group-hover/heading:translate-y-0 text-sm">
                {[1, 2, 3, 4, 5, 6].map(level => (
                    <button
                        key={level}
                        onClick={() => setLevel(level)}
                        className={`w-8 h-8 flex items-center justify-center rounded-md font-bold transition-colors ${activeLevel === level ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'}`}
                        title={`Heading ${level}`}
                    >
                        H{level}
                    </button>
                ))}
            </div>

            <input
                value={block.content || ''}
                onChange={e => onChange({ ...block, content: e.target.value })}
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        onEnter();
                    }
                }}
                placeholder={`Heading ${activeLevel}`}
                className={`w-full bg-transparent border-none outline-none text-gray-900 placeholder-gray-300 ${getSizeClass()} mb-4 mt-6 transition-all duration-200 ease-in-out`}
                autoFocus
            />
        </div>
    );
}

function ParagraphBlock({ block, onChange, onEnter, tools }: any) {
    const ref = useRef<HTMLTextAreaElement>(null);
    const [suggestion, setSuggestion] = useState<LinkMatch | null>(null);
    const [showToolbar, setShowToolbar] = useState(false);

    // SEO Engine
    const suggester = useMemo(() => new LinkSuggester(tools || []), [tools]);

    // Resize Logic
    useEffect(() => {
        if (ref.current) {
            ref.current.style.height = 'auto';
            ref.current.style.height = ref.current.scrollHeight + 'px';
        }
    }, [block.content]);

    // Suggestion Logic (Debounced)
    const checkSuggestions = useCallback(
        debounce((text: string, cursorIndex: number) => {
            if (!tools || tools.length === 0) return;
            const match = suggester.findMatches(text, cursorIndex);
            setSuggestion(match);
        }, 500),
        [suggester, tools]
    );

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value;
        onChange({ ...block, content: val });
        checkSuggestions(val, e.target.selectionEnd);
    };

    const applyFormat = (type: 'bold' | 'italic') => {
        if (!ref.current) return;
        const start = ref.current.selectionStart;
        const end = ref.current.selectionEnd;
        const text = block.content || '';

        if (start === end) return; // No selection

        const before = text.substring(0, start);
        const selected = text.substring(start, end);
        const after = text.substring(end);

        const wrapper = type === 'bold' ? '**' : '*';
        const newText = before + wrapper + selected + wrapper + after;

        onChange({ ...block, content: newText });

        // Restore focus (cursor pos moves)
        setTimeout(() => {
            if (ref.current) {
                ref.current.focus();
                ref.current.selectionStart = start + wrapper.length;
                ref.current.selectionEnd = end + wrapper.length;
            }
        }, 10);
    };

    const applySuggestion = () => {
        if (!suggestion || !ref.current) return;

        const text = block.content || '';
        const before = text.substring(0, suggestion.range[0]);
        const after = text.substring(suggestion.range[1]);
        const link = `[${suggestion.matchText}](/tools/${suggestion.tool.slug})`;

        const newContent = before + link + after;
        onChange({ ...block, content: newContent });
        setSuggestion(null);

        // Return focus
        setTimeout(() => ref.current?.focus(), 50);
    };

    return (
        <div
            className="relative group/para"
            onMouseEnter={() => setShowToolbar(true)}
            onMouseLeave={() => setShowToolbar(false)}
        >
            {/* Formatting Toolbar */}
            <div className={`absolute -top-9 right-0 bg-white border border-gray-200 shadow-sm rounded-md flex overflow-hidden transition-opacity duration-200 ${showToolbar ? 'opacity-100' : 'opacity-0'}`}>
                <button
                    onClick={() => applyFormat('bold')}
                    className="p-1.5 px-3 hover:bg-gray-50 text-gray-500 hover:text-gray-900 border-r border-gray-100"
                    title="Bold (Ctrl+B)"
                >
                    <FontAwesomeIcon icon={faBold} size="xs" />
                </button>
                <button
                    onClick={() => applyFormat('italic')}
                    className="p-1.5 px-3 hover:bg-gray-50 text-gray-500 hover:text-gray-900 icon-italic"
                    title="Italic (Ctrl+I)"
                >
                    <FontAwesomeIcon icon={faItalic} size="xs" />
                </button>
            </div>

            <textarea
                ref={ref}
                value={block.content || ''}
                onChange={handleChange}
                onKeyDown={e => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        onEnter();
                    }
                    if (e.ctrlKey || e.metaKey) {
                        if (e.key === 'b') { e.preventDefault(); applyFormat('bold'); }
                        if (e.key === 'i') { e.preventDefault(); applyFormat('italic'); }
                    }
                    // Dismiss suggestion on escape
                    if (e.key === 'Escape') setSuggestion(null);
                }}
                onFocus={() => setShowToolbar(true)}
                onBlur={() => setTimeout(() => setShowToolbar(false), 200)}
                placeholder="Type '/'"
                className="w-full bg-transparent border-none outline-none text-lg text-gray-700 placeholder-gray-300 resize-none overflow-hidden leading-relaxed py-2"
                rows={1}
                autoFocus={!block.content}
            />

            {/* Inline Suggestion Tooltip (SEO) */}
            {suggestion && (
                <div
                    className="absolute z-50 bottom-full left-0 mb-2 bg-white border border-blue-200 shadow-xl rounded-lg p-2 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-1 cursor-pointer hover:bg-blue-50 transition-colors max-w-sm"
                    onClick={applySuggestion}
                >
                    <div className="bg-blue-100 text-blue-600 p-1.5 rounded-md">
                        <FontAwesomeIcon icon={faLightbulb} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Internal Link Suggestion</p>
                        <p className="text-sm font-semibold text-gray-800 truncate">
                            Link <span className="text-blue-600">"{suggestion.matchText}"</span> to <span className="underline">{suggestion.tool.name}</span>?
                        </p>
                    </div>
                    <button className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-md font-bold hover:bg-blue-700 shadow-sm whitespace-nowrap">
                        Link It ↵
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); setSuggestion(null); }}
                        className="text-gray-400 hover:text-gray-600 px-1"
                    >
                        ×
                    </button>
                </div>
            )}
        </div>
    );
}

function ImageBlock({ block, onChange, uploadHandler }: any) {
    const [uploading, setUploading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;
        const file = e.target.files[0];
        setUploading(true);
        try {
            const url = await uploadHandler(file);
            onChange({ ...block, url, alt: file.name.split('.')[0] });
        } catch (err: any) {
            alert('Upload failed: ' + err.message);
        } finally {
            setUploading(false);
        }
    };

    if (block.url) {
        return (
            <div className="relative group my-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={block.url} alt={block.alt} className="w-full rounded-lg shadow-sm" />
                <input
                    value={block.alt || ''}
                    onChange={e => onChange({ ...block, alt: e.target.value })}
                    placeholder="Image alt text (SEO)"
                    className="mt-2 w-full text-sm text-gray-500 border-b border-transparent hover:border-gray-200 focus:border-blue-500 bg-transparent outline-none text-center"
                />
                <button
                    onClick={() => onChange({ ...block, url: undefined })}
                    className="absolute top-2 right-2 bg-white text-gray-700 p-2 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold"
                >
                    Replace
                </button>
            </div>
        );
    }

    return (
        <div
            onClick={() => inputRef.current?.click()}
            className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors my-4 group"
        >
            <FontAwesomeIcon icon={faImage} className="text-3xl text-gray-300 group-hover:text-blue-400 mb-2 transition-colors" />
            <p className="text-gray-400 font-medium">{uploading ? 'Uploading...' : 'Click to upload image'}</p>
            <input type="file" ref={inputRef} onChange={handleUpload} accept="image/*" className="hidden" />
        </div>
    );
}

function ListBlock({ block, onChange }: any) {
    const items = block.items || [''];
    const style = block.style || 'bullet';

    const updateItem = (index: number, val: string) => {
        const newItems = [...items];
        newItems[index] = val;
        onChange({ ...block, items: newItems });
    };

    const addItem = (index: number) => {
        const newItems = [...items];
        newItems.splice(index + 1, 0, '');
        onChange({ ...block, items: newItems });
    };

    const removeItem = (index: number) => {
        if (items.length === 1) return;
        const newItems = items.filter((_: any, i: number) => i !== index);
        onChange({ ...block, items: newItems });
    };

    return (
        <div className="my-4">
            <div className="flex gap-2 mb-2">
                <button
                    onClick={() => onChange({ ...block, style: 'bullet' })}
                    className={`p-1.5 rounded text-xs ${style === 'bullet' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:bg-gray-100'}`}
                >
                    <FontAwesomeIcon icon={faListUl} /> Bullet
                </button>
                <button
                    onClick={() => onChange({ ...block, style: 'ordered' })}
                    className={`p-1.5 rounded text-xs ${style === 'ordered' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:bg-gray-100'}`}
                >
                    <FontAwesomeIcon icon={faListOl} /> Numbered
                </button>
            </div>
            <div className="space-y-2">
                {items.map((item: string, i: number) => (
                    <div key={i} className="flex items-start gap-2">
                        <span className="mt-2 text-gray-400 text-xs w-4 text-right">
                            {style === 'bullet' ? '•' : `${i + 1}.`}
                        </span>
                        <input
                            value={item}
                            onChange={(e) => updateItem(i, e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    addItem(i);
                                }
                                if (e.key === 'Backspace' && !item && items.length > 1) {
                                    e.preventDefault();
                                    removeItem(i);
                                }
                            }}
                            className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-300 py-1"
                            placeholder="List item..."
                            autoFocus={!item}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

function QuoteBlock({ block, onChange }: any) {
    return (
        <div className="flex gap-4 my-6">
            <div className="w-1 bg-blue-500 rounded-full shrink-0"></div>
            <textarea
                value={block.content || ''}
                onChange={(e) => {
                    onChange({ ...block, content: e.target.value });
                    e.target.style.height = 'auto';
                    e.target.style.height = e.target.scrollHeight + 'px';
                }}
                placeholder="Enter quote..."
                className="w-full bg-transparent border-none outline-none text-xl italic text-gray-600 placeholder-gray-300 resize-none font-serif"
                rows={2}
            />
        </div>
    );
}

function CodeBlock({ block, onChange }: any) {
    return (
        <div className="my-6 bg-gray-900 rounded-lg p-4 font-mono text-sm relative group">
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <input
                    value={block.language || 'javascript'}
                    onChange={(e) => onChange({ ...block, language: e.target.value })}
                    className="bg-gray-800 text-gray-400 text-xs p-1 rounded border border-gray-700 outline-none"
                    placeholder="Language"
                />
            </div>
            <textarea
                value={block.content || ''}
                onChange={(e) => {
                    onChange({ ...block, content: e.target.value });
                    e.target.style.height = 'auto';
                    e.target.style.height = e.target.scrollHeight + 'px';
                }}
                placeholder="// Type code here..."
                className="w-full bg-transparent border-none outline-none text-green-400 placeholder-gray-600 resize-none"
                spellCheck={false}
                rows={3}
            />
        </div>
    );
}

function DividerBlock() {
    return (
        <div className="py-8 flex items-center justify-center text-gray-200">
            <div className="h-px bg-gray-200 w-full"></div>
            <div className="px-2 text-xs uppercase tracking-widest font-bold text-gray-300">Divider</div>
            <div className="h-px bg-gray-200 w-full"></div>
        </div>
    );
}

function CTABlock({ block, onChange }: any) {
    return (
        <div className="my-8 p-6 bg-blue-50 border border-blue-100 rounded-xl flex flex-col items-center gap-4 text-center w-full max-w-full">
            <div className="w-full space-y-2">
                <input
                    value={block.content || ''}
                    onChange={(e) => onChange({ ...block, content: e.target.value })}
                    placeholder="Button Text (e.g. Get Started)"
                    className="w-full text-center bg-transparent border-none outline-none text-xl font-bold text-blue-900 placeholder-blue-300"
                />
                <div className="flex flex-col sm:flex-row items-center gap-2 justify-center w-full max-w-md mx-auto">
                    <div className="flex items-center gap-2 bg-white p-2 rounded-lg border border-blue-100 shadow-sm w-full">
                        <FontAwesomeIcon icon={faExternalLinkAlt} className="text-gray-400 text-xs shrink-0" />
                        <input
                            value={block.url || ''}
                            onChange={(e) => onChange({ ...block, url: e.target.value })}
                            placeholder="https://..."
                            className="flex-1 text-sm bg-transparent border-none outline-none text-gray-600 placeholder-gray-300 w-full min-w-0"
                        />
                    </div>
                    <select
                        value={block.rel || 'dofollow'}
                        onChange={(e) => onChange({ ...block, rel: e.target.value })}
                        className="p-2 rounded-lg border border-blue-100 text-xs bg-white text-gray-600 cursor-pointer hover:border-blue-300 transition-colors w-full sm:w-auto"
                    >
                        <option value="dofollow">Dofollow</option>
                        <option value="nofollow">Nofollow</option>
                        <option value="noreferrer">Noreferrer</option>
                    </select>
                </div>
            </div>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-blue-200 opacity-50 cursor-default pointer-events-none w-full sm:w-auto">
                {block.content || 'Button Preview'}
            </button>
        </div>
    );
}

function VideoBlock({ block, onChange }: any) {
    const getEmbedUrl = (url: string) => {
        if (!url) return '';
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            const v = url.split('v=')[1]?.split('&')[0] || url.split('/').pop();
            return `https://www.youtube.com/embed/${v}`;
        }
        return url; // Fallback or direct embed
    };

    return (
        <div className="my-6 p-4 border border-gray-200 rounded-xl w-full max-w-full">
            <div className="flex items-center gap-2 mb-4 bg-gray-50 p-2 rounded-lg">
                <FontAwesomeIcon icon={faVideo} className="text-gray-400" />
                <input
                    value={block.url || ''}
                    onChange={(e) => onChange({ ...block, url: e.target.value })}
                    placeholder="YouTube Video URL..."
                    className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 w-full"
                />
            </div>
            {block.url ? (
                <div className="aspect-video w-full rounded-lg overflow-hidden bg-black/5 shadow-inner">
                    <iframe
                        src={getEmbedUrl(block.url)}
                        className="w-full h-full"
                        title="Video Preview"
                        allowFullScreen
                    />
                </div>
            ) : (
                <div className="aspect-video w-full rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 flex-col gap-2">
                    <FontAwesomeIcon icon={faVideo} className="text-3xl opacity-20" />
                    <span className="text-xs font-medium opacity-50">Enter a URL to preview</span>
                </div>
            )}
            <input
                value={block.caption || ''}
                onChange={(e) => onChange({ ...block, caption: e.target.value })}
                placeholder="Video Caption (optional)"
                className="mt-2 text-center w-full text-xs text-gray-400 bg-transparent outline-none"
            />
        </div>
    );
}

function LinkCardBlock({ block, onChange }: any) {
    return (
        <div className="my-6 p-4 border border-gray-200 rounded-xl bg-white hover:shadow-sm transition-shadow w-full max-w-full">
            <div className="flex items-center gap-2 mb-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                <FontAwesomeIcon icon={faLink} /> Link Card
            </div>

            <div className="space-y-3">
                <input
                    value={block.title || ''}
                    onChange={(e) => onChange({ ...block, title: e.target.value })}
                    placeholder="Link Title (e.g. Recommended Tool)"
                    className="w-full text-lg font-bold text-gray-800 placeholder-gray-300 border-none outline-none bg-transparent"
                />
                <input
                    value={block.description || ''}
                    onChange={(e) => onChange({ ...block, description: e.target.value })}
                    placeholder="Short description..."
                    className="w-full text-sm text-gray-500 placeholder-gray-300 border-none outline-none bg-transparent"
                />
                <div className="flex flex-col sm:flex-row gap-2 bg-gray-50 p-2 rounded-lg border border-gray-100">
                    <input
                        value={block.url || ''}
                        onChange={(e) => onChange({ ...block, url: e.target.value })}
                        placeholder="https://example.com"
                        className="flex-1 text-sm bg-transparent border-none outline-none text-blue-600 placeholder-blue-300 w-full"
                    />
                    <div className="flex gap-2 shrink-0">
                        <select
                            value={block.rel || 'dofollow'}
                            onChange={(e) => onChange({ ...block, rel: e.target.value })}
                            className="bg-white border border-gray-200 text-xs rounded px-2 py-1 text-gray-600 outline-none hover:border-blue-300 cursor-pointer"
                        >
                            <option value="dofollow">Dofollow</option>
                            <option value="nofollow">Nofollow</option>
                            <option value="noreferrer">Noreferrer</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ... (Existing LinkCardBlock)

function CalloutBlock({ block, onChange }: any) {
    const variant = block.variant || 'info';

    const getStyles = () => {
        switch (variant) {
            case 'info': return { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', icon: faInfoCircle, iconColor: 'text-blue-500' };
            case 'warning': return { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-800', icon: faExclamationTriangle, iconColor: 'text-yellow-500' };
            case 'error': return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', icon: faBan, iconColor: 'text-red-500' };
            case 'success': return { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800', icon: faCheckCircle, iconColor: 'text-green-500' };
            default: return { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', icon: faInfoCircle, iconColor: 'text-blue-500' };
        }
    };

    const styles = getStyles();

    return (
        <div className={`my-6 p-4 rounded-lg border ${styles.bg} ${styles.border} flex items-start gap-4 transition-colors w-full max-w-full relative group`}>
            <div className={`mt-1 ${styles.iconColor} text-xl shrink-0`}>
                <FontAwesomeIcon icon={styles.icon} />
            </div>
            <div className="flex-1 min-w-0">
                <textarea
                    value={block.content || ''}
                    onChange={(e) => {
                        onChange({ ...block, content: e.target.value });
                        e.target.style.height = 'auto';
                        e.target.style.height = e.target.scrollHeight + 'px';
                    }}
                    placeholder={`Type ${variant} message...`}
                    className={`w-full bg-transparent border-none outline-none resize-none ${styles.text} placeholder-opacity-50 text-base`}
                    rows={2}
                />
            </div>
            {/* Variant Selector - Visible on hover */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white border border-gray-200 rounded-lg shadow-sm flex gap-1 p-1">
                {['info', 'success', 'warning', 'error'].map(v => (
                    <button
                        key={v}
                        onClick={() => onChange({ ...block, variant: v })}
                        className={`w-6 h-6 rounded flex items-center justify-center text-xs transition-colors ${variant === v ? 'bg-gray-100 font-bold' : 'hover:bg-gray-50'}`}
                        title={v}
                    >
                        <div className={`w-3 h-3 rounded-full ${v === 'info' ? 'bg-blue-500' : v === 'success' ? 'bg-green-500' : v === 'warning' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                    </button>
                ))}
            </div>
        </div>
    );
}

function ProsConsBlock({ block, onChange }: any) {
    const pros = block.pros || [''];
    const cons = block.cons || [''];

    const updateList = (type: 'pros' | 'cons', index: number, val: string) => {
        const list = type === 'pros' ? [...pros] : [...cons];
        list[index] = val;
        onChange({ ...block, [type]: list });
    };

    const addLine = (type: 'pros' | 'cons', index: number) => {
        const list = type === 'pros' ? [...pros] : [...cons];
        list.splice(index + 1, 0, '');
        onChange({ ...block, [type]: list });
    };

    const removeLine = (type: 'pros' | 'cons', index: number) => {
        const list = type === 'pros' ? [...pros] : [...cons];
        if (list.length === 1) return;
        const newList = list.filter((_: any, i: number) => i !== index);
        onChange({ ...block, [type]: newList });
    };

    return (
        <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-full">
            {/* Pros */}
            <div className="border border-green-200 bg-green-50/30 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-4 text-green-700 font-bold border-b border-green-200 pb-2">
                    <FontAwesomeIcon icon={faThumbsUp} /> Pros
                </div>
                <div className="space-y-2">
                    {pros.map((item: string, i: number) => (
                        <div key={`pro-${i}`} className="flex items-start gap-2">
                            <span className="text-green-500 mt-1.5 text-xs"><FontAwesomeIcon icon={faCheckCircle} /></span>
                            <input
                                value={item}
                                onChange={(e) => updateList('pros', i, e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') { e.preventDefault(); addLine('pros', i); }
                                    if (e.key === 'Backspace' && !item && pros.length > 1) { e.preventDefault(); removeLine('pros', i); }
                                }}
                                className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-green-800/20"
                                placeholder="Add a pro..."
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Cons */}
            <div className="border border-red-200 bg-red-50/30 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-4 text-red-700 font-bold border-b border-red-200 pb-2">
                    <FontAwesomeIcon icon={faThumbsDown} /> Cons
                </div>
                <div className="space-y-2">
                    {cons.map((item: string, i: number) => (
                        <div key={`con-${i}`} className="flex items-start gap-2">
                            <span className="text-red-500 mt-1.5 text-xs"><FontAwesomeIcon icon={faBan} /></span>
                            <input
                                value={item}
                                onChange={(e) => updateList('cons', i, e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') { e.preventDefault(); addLine('cons', i); }
                                    if (e.key === 'Backspace' && !item && cons.length > 1) { e.preventDefault(); removeLine('cons', i); }
                                }}
                                className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-red-800/20"
                                placeholder="Add a con..."
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function BlockItem({ block, onChange, onDelete, onEnter, listeners, uploadHandler, tools }: any) {
    const { attributes, setNodeRef, transform, transition, isDragging } = useSortable({ id: block.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.3 : 1,
        zIndex: isDragging ? 999 : 'auto',
    };

    return (
        <div ref={setNodeRef} style={style} className="group relative flex items-start -ml-10 pl-10 py-1 mb-2 hover:bg-gray-50/50 rounded-lg transition-colors pr-2">
            {/* Handle - Always visible now */}
            <div
                className={`absolute left-0 top-3 text-gray-300 hover:text-gray-600 cursor-grab active:cursor-grabbing flex items-center gap-1 transition-opacity`}
                {...listeners}
                {...attributes}
            >
                <div className="p-1 px-2"><FontAwesomeIcon icon={faGripVertical} /></div>
            </div>

            <div className="absolute right-full top-3 pr-2 hidden group-hover:block">
                <button onClick={onDelete} className="text-gray-300 hover:text-red-500 p-1"><FontAwesomeIcon icon={faTrash} /></button>
            </div>

            {/* Content */}
            <div className="w-full">
                {block.type === 'heading' && <HeadingBlock block={block} onChange={onChange} onEnter={onEnter} />}
                {block.type === 'paragraph' && <ParagraphBlock block={block} onChange={onChange} onEnter={onEnter} tools={tools} />}
                {block.type === 'image' && <ImageBlock block={block} onChange={onChange} uploadHandler={uploadHandler} />}
                {block.type === 'list' && <ListBlock block={block} onChange={onChange} />}
                {block.type === 'quote' && <QuoteBlock block={block} onChange={onChange} />}
                {block.type === 'code' && <CodeBlock block={block} onChange={onChange} />}
                {block.type === 'divider' && <DividerBlock />}
                {block.type === 'cta' && <CTABlock block={block} onChange={onChange} />}
                {block.type === 'video' && <VideoBlock block={block} onChange={onChange} />}
                {block.type === 'link_card' && <LinkCardBlock block={block} onChange={onChange} />}
                {block.type === 'callout' && <CalloutBlock block={block} onChange={onChange} />}
                {block.type === 'pros_cons' && <ProsConsBlock block={block} onChange={onChange} />}

                {!['heading', 'paragraph', 'image', 'list', 'quote', 'code', 'divider', 'cta', 'video', 'link_card', 'callout', 'pros_cons'].includes(block.type) && (
                    <div className="p-3 bg-gray-100 rounded text-gray-500 text-sm font-mono border border-gray-200">
                        Unknown block type: {block.type}
                    </div>
                )}
            </div>
        </div>
    );
}
