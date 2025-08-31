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
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
        <Script
          src="//in.fw-cdn.com/32542845/1407985.js"
          strategy="afterInteractive" // ensures it loads after page is ready
        />
      </div>
    </DesktopOnly>
  );
}