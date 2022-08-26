import { useContext, Suspense } from 'react';

import { DeviceContext } from '~/state/context/DeviceContext';
import DesktopHeader from './desktop/DesktopHeader';
import MobileHeader from './mobile/MobileHeader';

const Placeholder = () => <div className='h-[68px]'></div>;

export const Header = () => {
  const device = useContext(DeviceContext);

  return (
    <>
      {device === undefined ? <Placeholder /> : null}
      {device === 'desktop' || device === 'tablet' ? (
        <Suspense fallback={<Placeholder />}>
          <DesktopHeader />
        </Suspense>
      ) : null}
      {device === 'mobile' ? (
        <Suspense fallback={<Placeholder />}>
          <MobileHeader />
        </Suspense>
      ) : null}
    </>
  );
};
