import { useMemo } from 'react';

import type { Device } from '~/types/device.type';
import { useWindowSize } from './useWindowSize';

export const useDevice = () => {
  const { width, height } = useWindowSize();

  const device = useMemo<Device>(() => {
    if (width === 0 && height === 0) {
      return undefined;
    }

    if (width < 480 || height < 480) {
      return 'mobile';
    } else if (
      (width > 480 && width < 768) ||
      (height > 481 && width < 768) ||
      (height > 767 && width < 1025)
    ) {
      return 'tablet';
    } else {
      return 'desktop';
    }
  }, [width, height]);

  return useMemo(() => device, [device]);
};
