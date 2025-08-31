'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to general settings by default
    router.replace('/dashboard/settings/general');
  }, [router]);

  return null; // This component just redirects
}