import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import SplashScreen from '@/components/shared/SplashScreen';
import ChatBot from '@/components/ui/ChatBot';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SplashScreen />
      <CustomCursor />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <ChatBot />
    </>
  );
}
