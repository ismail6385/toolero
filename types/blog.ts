export type BlockType = 'paragraph' | 'heading' | 'image' | 'list' | 'quote' | 'code' | 'divider' | 'cta' | 'video' | 'link_card' | 'callout' | 'pros_cons' | 'toc';

export interface BlockData {
    id: string;
    type: BlockType;
    content?: string; // HTML/Text for text-based blocks
    level?: 1 | 2 | 3 | 4 | 5 | 6; // For headings
    url?: string; // For images, cta, link_card
    alt?: string; // For images
    caption?: string; // For images, video
    items?: string[]; // For lists
    style?: 'bullet' | 'ordered'; // For lists
    language?: string; // For code
    rel?: 'dofollow' | 'nofollow' | 'noreferrer'; // For cta, link_card
    title?: string; // For link_card
    description?: string; // For link_card
    variant?: 'info' | 'warning' | 'error' | 'success'; // For callout
    pros?: string[]; // For pros_cons
    cons?: string[]; // For pros_cons
}

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    content: string | BlockData[]; // Supports both legacy string and new JSON blocks
    excerpt: string;
    status: 'draft' | 'published';
    featured_image?: string;
    category_id?: string;
    tags?: string[];
    seo_title?: string;
    seo_description?: string;
    created_at: string;
    updated_at: string;
    published_at?: string;
    blog_categories?: BlogCategory; // Optional join
    linked_tool_ids?: string[]; // IDs of tools mentioned in this blog
    internal_link_count?: number; // Outgoing links to other blogs/tools
    is_orphan?: boolean; // True if no linked tools and no internal links
}

export interface BlogCategory {
    id: string;
    name: string;
    slug: string;
}
