import Footer from '@/components/footer';
import Navigation from '@/components/navigation';
import { PropsWithChildren } from 'react';

const ClientLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className='bg-base-dark text-white'>
      <Navigation />
      {children}
      <Footer />
    </main>
  );
};
export default ClientLayout;
