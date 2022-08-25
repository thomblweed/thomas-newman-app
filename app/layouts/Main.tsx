import type { ReactNode } from 'react';

import { Footer } from '~/components/Footer';

export const Main = ({ children }: { children: ReactNode }) => (
  <div className='flex flex-col h-screen bg-gradient-to-b from-dark via-dark-secondary to-dark'>
    <main className='h-full mx-auto w-11/12 max-w-screen-xl'>{children}</main>
    <Footer footerText='thomblweed' />
  </div>
);
