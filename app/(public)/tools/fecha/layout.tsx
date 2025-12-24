import RelatedToolsSidebar from '@/components/RelatedToolsSidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 lg:order-1">
                    {children}
                </div>
                <aside className="lg:col-span-4 lg:order-2">
                    <RelatedToolsSidebar slug="fecha" />
                </aside>
            </div>
        </div>
    );
}
