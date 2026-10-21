import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { MobileBottomBar } from './MobileBottomBar';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function PageLayout({ children, className = '' }: PageLayoutProps) {
  const ref = useScrollReveal<HTMLDivElement>();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-ink">
      <Navbar />
      <main ref={ref} className={`flex-1 pt-16 lg:pt-20 pb-16 lg:pb-0 ${className}`}>
        {children}
      </main>
      <Footer />
      <MobileBottomBar />
    </div>
  );
}
