'use client';

import { useEffect, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { LoadingScreen } from '@/components/LoadingScreen';
import { Toaster } from '@/components/ui/sonner';
import { VisualEditsMessenger } from 'orchids-visual-edits';

interface ClientRootLayoutProps {
  children: React.ReactNode;
}

export default function ClientRootLayout({ children }: ClientRootLayoutProps) {
  const [isAdminPage, setIsAdminPage] = useState(false);

  useEffect(() => {
    // Check if we're on an admin page
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname;
      console.log('Current path:', pathname);
      const adminPage = pathname.startsWith('/admin');
      console.log('Is admin page:', adminPage);
      setIsAdminPage(adminPage);
    }
  }, []);

  console.log('Rendering ClientRootLayout, isAdminPage:', isAdminPage);

  return (
    <>
      <LoadingScreen />
      <div className="scanline" aria-hidden="true" />
      {!isAdminPage && <Navbar />}
      <main className={!isAdminPage ? 'pt-20' : ''}>
        {children}
      </main>
      {!isAdminPage && <Footer />}
      <Toaster theme="dark" position="bottom-right" richColors />
      <VisualEditsMessenger />
    </>
  );
}
