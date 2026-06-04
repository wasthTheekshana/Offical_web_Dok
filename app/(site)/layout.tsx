import { Suspense } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import SplashScreen from '@/components/shared/SplashScreen';
import ChatBot from '@/components/ui/ChatBot';
import ProgressBar from '@/components/ui/ProgressBar';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SplashScreen />
      <CustomCursor />
      <Suspense><ProgressBar /></Suspense>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <ChatBot />
    </>
  );
}
