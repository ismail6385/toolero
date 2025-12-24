import Breadcrumbs from '@/components/ui/Breadcrumbs';

export default function ToolsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-gray-50/50">
            <Breadcrumbs />
            {children}
        </div>
    );
}
