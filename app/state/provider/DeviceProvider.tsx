import type { FC, ReactNode } from 'react';

import { useDevice } from '~/hooks/useDevice';
import { DeviceContext } from '../context/DeviceContext';

export const DeviceProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const device = useDevice();

  return (
    <DeviceContext.Provider value={device}>{children}</DeviceContext.Provider>
  );
};
