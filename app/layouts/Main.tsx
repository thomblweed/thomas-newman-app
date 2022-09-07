import type { LinksFunction } from '@remix-run/node';
import type { ReactNode } from 'react';

import { Footer, links as footerStyles } from '~/components/Footer';
import { Header } from '~/components/Header';
import { links as headerStyles } from '~/components/Header/Desktop';
import { DeviceProvider } from '~/state/provider/DeviceProvider';

export const links: LinksFunction = () => [
  ...headerStyles(),
  ...footerStyles()
];

export const Main = ({ children }: { children: ReactNode }) => (
  // <div className='bg-gradient-to-b from-dark via-dark-secondary to-dark'>
  <>
    <DeviceProvider>
      <Header />
    </DeviceProvider>
    <main className='container mx-auto w-11/12 max-w-screen-xl h-full'>
      {children}
    </main>
    <Footer footerText='thomblweed' />
  </>
);
