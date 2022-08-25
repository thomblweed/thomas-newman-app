import { createContext } from 'react';

import type { Device } from '~/types/device.type';

export const DeviceContext = createContext<Device>(undefined);
