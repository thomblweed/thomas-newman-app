import type { ReactNode } from 'react';

import { Footer } from '~/components/Footer';
import { Header } from '~/components/Header';
import { DeviceProvider } from '~/state/provider/DeviceProvider';

export const Main = ({ children }: { children: ReactNode }) => (
  // <div className='bg-gradient-to-b from-dark via-dark-secondary to-dark'>
  <>
    <DeviceProvider>
      <Header />
    </DeviceProvider>
    <main className='mx-auto w-11/12 max-w-screen-xl h-full'>{children}</main>
    <Footer footerText='thomblweed' />
  </>
);
