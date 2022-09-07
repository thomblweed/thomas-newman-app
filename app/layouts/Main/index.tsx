import type { LinksFunction } from '@remix-run/node';
import type { ReactNode } from 'react';

import mainStyles from './main.css';
import { Footer, links as footerStyles } from '~/components/Footer';
import { Header } from '~/components/Header';
import { links as headerStyles } from '~/components/Header/Desktop';
import { DeviceProvider } from '~/state/provider/DeviceProvider';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: mainStyles },
  ...headerStyles(),
  ...footerStyles()
];

export const Main = ({ children }: { children: ReactNode }) => (
  // <div className='bg-gradient-to-b from-dark via-dark-secondary to-dark'>
  <>
    <DeviceProvider>
      <Header />
    </DeviceProvider>
    <main className='container main'>{children}</main>
    <Footer footerText='thomblweed' />
  </>
);
