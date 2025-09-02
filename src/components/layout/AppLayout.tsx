import Sidebar from './Sidebar';
import Header from './Header';
import DesktopOnly from './DesktopOnly';
import Script from 'next/script';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <DesktopOnly>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 overflow-y-auto relative">
            {/* Gradient overlay for smooth scroll effect */}
            <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-gray-100 to-transparent pointer-events-none z-10"></div>
            {children}
          </main>
        </div>
        <Script
          src="//in.fw-cdn.com/32542845/1407985.js"
          strategy="afterInteractive"
        />
      </div>
    </DesktopOnly>
  );
}