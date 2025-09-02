import BeamSidebar from '@/components/beam-setup/BeamSidebar';
import BeamHeader from '@/components/beam-setup/BeamHeader';

interface BeamSetupLayoutProps {
  children: React.ReactNode;
}

export default function BeamSetupLayout({ children }: BeamSetupLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-100">
      <BeamSidebar />
      <div className="flex-1 flex flex-col">
        <BeamHeader />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}