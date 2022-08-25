import { useContext, Suspense } from 'react';

import { DeviceContext } from '~/state/context/DeviceContext';
import DesktopHeader from './desktop/DesktopHeader';
import MobileHeader from './mobile/MobileHeader';

export const Header = () => {
  const device = useContext(DeviceContext);

  return (
    <>
      {device === 'desktop' || device === 'tablet' ? (
        <Suspense>
          <DesktopHeader />
        </Suspense>
      ) : null}
      {device === 'mobile' ? (
        <Suspense>
          <MobileHeader />
        </Suspense>
      ) : null}
    </>
  );
};
