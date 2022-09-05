import type { ReactNode } from 'react';

import { Footer } from '~/components/Footer';

export const Main = ({ children }: { children: ReactNode }) => (
  <div className='flex flex-col h-screen justify-between bg-gradient-to-b from-dark via-dark-secondary to-dark'>
    <main className='mx-auto w-11/12 max-w-screen-xl h-full'>{children}</main>
    <Footer footerText='thomblweed' />
  </div>
);
