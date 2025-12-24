import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import 'highlight.js/styles/github-dark.css';

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </>
    );
}
