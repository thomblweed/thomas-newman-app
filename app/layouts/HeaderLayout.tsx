import type { ReactNode } from 'react';
import { Header } from '~/components/Header';
import { DeviceProvider } from '~/state/provider/DeviceProvider';

export const HeadingLayout = ({ children }: { children: ReactNode }) => (
  <>
    <DeviceProvider>
      <Header />
    </DeviceProvider>
    {children}
  </>
);
