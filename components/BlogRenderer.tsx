import { BlockData } from '@/types/blog';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

interface Props {
    content: string | BlockData[];
}

export default function BlogRenderer({ content }: Props) {
    let blocks: BlockData[] = [];
    let isLegacy = false;

    if (typeof content === 'string') {
        try {
            const parsed = JSON.parse(content);
            if (Array.isArray(parsed)) {
                blocks = parsed;
            } else {
                isLegacy = true;
            }
        } catch {
            isLegacy = true;
        }
    } else {
        blocks = content;
    }

    const markdownComponents = {
        img: (props: any) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img {...props} className="w-full h-auto rounded-xl my-8 shadow-md border border-gray-100" loading="lazy" />
        ),
        a: (props: any) => (
            <a {...props} className="text-blue-600 font-bold hover:underline" target={props.href?.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                {props.children}
            </a>
        ),
        code: ({ className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || '')
            const isInline = !match && !String(children).includes('\n');
            if (isInline) {
                return <code className="bg-gray-100 text-red-500 px-1 py-0.5 rounded text-sm font-mono" {...props}>{children}</code>
            }
            return <code className={className} {...props}>{children}</code>
        }
    };

    if (isLegacy) {
        return (
            <div className="prose prose-lg prose-slate prose-headings:font-bold prose-a:text-blue-600 max-w-none">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight, rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]]}
                    components={markdownComponents}
                >
                    {content as string}
                </ReactMarkdown>
            </div>
        );
    }

    return (
        <div className="space-y-6 text-gray-800 leading-relaxed">
            {blocks.map((block) => {
                switch (block.type) {
                    case 'heading':
                        const Tag = `h${block.level || 2}` as any;
                        let headingClass = 'font-bold text-gray-900 mt-12 mb-6 scroll-mt-20 ';
                        switch (block.level) {
                            case 1: headingClass += 'text-4xl md:text-5xl'; break;
                            case 2: headingClass += 'text-3xl md:text-4xl'; break;
                            case 3: headingClass += 'text-2xl md:text-3xl'; break;
                            case 4: headingClass += 'text-xl md:text-2xl'; break;
                            case 5: headingClass += 'text-lg font-bold uppercase tracking-wide'; break;
                            case 6: headingClass += 'text-base font-bold uppercase tracking-wider text-gray-700'; break;
                            default: headingClass += 'text-3xl md:text-4xl'; // Default H2
                        }

                        return (
                            <Tag key={block.id} id={block.content?.toLowerCase().replace(/\s+/g, '-')} className={headingClass}>
                                {block.content}
                            </Tag>
                        );
                    case 'paragraph':
                        return (
                            <div key={block.id} className="text-lg mb-6 prose prose-lg prose-slate max-w-none">
                                {/* We allow markdown inside paragraphs for links/bold */}
                                <ReactMarkdown
                                    components={{
                                        ...markdownComponents,
                                        p: React.Fragment // Don't wrap in <p> again
                                    }}
                                    remarkPlugins={[remarkGfm]}
                                >
                                    {block.content || ''}
                                </ReactMarkdown>
                            </div>
                        );
                    case 'image':
                        return (
                            <figure key={block.id} className="my-10">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={block.url} alt={block.alt} className="w-full h-auto rounded-2xl shadow-lg" loading="lazy" />
                                {block.alt && <figcaption className="text-center text-sm text-gray-500 mt-3 italic">{block.alt}</figcaption>}
                            </figure>
                        );
                    case 'list':
                        const ListTag = block.style === 'ordered' ? 'ol' : 'ul';
                        return (
                            <ListTag key={block.id} className={`my-6 pl-6 space-y-2 ${block.style === 'ordered' ? 'list-decimal' : 'list-disc'} text-lg`}>
                                {(block.items || []).map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ListTag>
                        );
                    case 'quote':
                        return (
                            <blockquote key={block.id} className="my-8 border-l-4 border-blue-500 pl-6 italic text-xl text-gray-700 font-serif">
                                {block.content}
                            </blockquote>
                        );
                    case 'code':
                        return (
                            <div key={block.id} className="my-8 rounded-lg overflow-hidden shadow-lg border border-gray-800 bg-[#1e1e1e]">
                                <div className="bg-[#2d2d2d] px-4 py-1 text-xs text-gray-400 border-b border-gray-700 font-mono flex justify-between">
                                    <span>{block.language || 'code'}</span>
                                </div>
                                <pre className="p-4 overflow-x-auto text-sm md:text-base font-mono leading-relaxed text-gray-300">
                                    <code>{block.content}</code>
                                </pre>
                            </div>
                        );
                    case 'divider':
                        return <hr key={block.id} className="my-12 border-gray-200" />;
                    case 'cta':
                        return (
                            <div key={block.id} className="my-12 text-center">
                                <a
                                    href={block.url}
                                    target="_blank"
                                    rel={block.rel || "noopener noreferrer"}
                                    className="inline-block bg-blue-600 text-white font-bold text-lg px-8 py-4 rounded-full shadow-xl shadow-blue-200 hover:bg-blue-700 hover:scale-105 transition-all"
                                >
                                    {block.content || 'Click Here'}
                                </a>
                            </div>
                        );
                    case 'video':
                        const getEmbedUrl = (url: string) => {
                            if (!url) return '';
                            if (url.includes('youtube.com') || url.includes('youtu.be')) {
                                const v = url.split('v=')[1]?.split('&')[0] || url.split('/').pop();
                                return `https://www.youtube.com/embed/${v}`;
                            }
                            return url;
                        };
                        return (
                            <figure key={block.id} className="my-10">
                                <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-lg bg-black">
                                    <iframe
                                        src={getEmbedUrl(block.url || '')}
                                        className="w-full h-full"
                                        title={block.caption || 'Video'}
                                        allowFullScreen
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    />
                                </div>
                                {block.caption && <figcaption className="text-center text-sm text-gray-500 mt-3 italic">{block.caption}</figcaption>}
                            </figure>
                        );
                    case 'callout':
                        const variant = block.variant || 'info';
                        const getStyles = () => {
                            switch (variant) {
                                case 'info': return { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', icon: 'ℹ️' };
                                case 'warning': return { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-800', icon: '⚠️' };
                                case 'error': return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', icon: '🚫' };
                                case 'success': return { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800', icon: '✅' };
                                default: return { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', icon: 'ℹ️' };
                            }
                        };
                        const styles = getStyles();
                        return (
                            <div key={block.id} className={`my-8 p-6 rounded-xl border ${styles.bg} ${styles.border} flex gap-4`}>
                                <div className="text-2xl mt-1">{styles.icon}</div>
                                <div className={`text-lg ${styles.text} leading-relaxed font-medium`}>
                                    {block.content}
                                </div>
                            </div>
                        );
                    case 'pros_cons':
                        return (
                            <div key={block.id} className="my-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="border border-green-200 bg-green-50/50 rounded-2xl p-6">
                                    <h4 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">👍 Pros</h4>
                                    <ul className="space-y-3">
                                        {(block.pros || []).map((item, i) => (
                                            <li key={i} className="flex items-start gap-3 text-green-900">
                                                <span className="text-green-500 mt-1 shrink-0">✔</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="border border-red-200 bg-red-50/50 rounded-2xl p-6">
                                    <h4 className="text-xl font-bold text-red-800 mb-4 flex items-center gap-2">👎 Cons</h4>
                                    <ul className="space-y-3">
                                        {(block.cons || []).map((item, i) => (
                                            <li key={i} className="flex items-start gap-3 text-red-900">
                                                <span className="text-red-500 mt-1 shrink-0">✖</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        );
                    case 'link_card':
                        return (
                            <a
                                key={block.id}
                                href={block.url}
                                target="_blank"
                                rel={block.rel || "noopener noreferrer"}
                                className="block my-8 group no-underline"
                            >
                                <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-200 transition-all bg-white flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                                    <div className="flex-1">
                                        <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2 flex items-center gap-2">
                                            🔗 Recommended Resource
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                                            {block.title || 'Link Title'}
                                        </h3>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            {block.description || 'Check out this helpful resource.'}
                                        </p>
                                    </div>
                                    <div className="shrink-0 bg-gray-50 p-3 rounded-full group-hover:bg-blue-50 transition-colors">
                                        <svg className="w-6 h-6 text-gray-400 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                    </div>
                                </div>
                            </a>
                        );
                    default:
                        return null;
                }
            })}
        </div>
    );
}
