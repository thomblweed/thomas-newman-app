import { NavLink } from '@remix-run/react';

import { Logo } from '~/components/Logo';
import { Navigation } from '~/components/Navigation';

const DesktopHeader = () => {
  return (
    <header className='flex items-center columns-3 mt-2 mb-5'>
      <div className='w-2/5 min-w-[260px]'>
        <Logo />
      </div>
      <div className='w-3/5'>
        <Navigation
          items={[
            { value: 'Home', route: '/' },
            { value: 'Blog', route: '/blog' }
          ]}
          content={({ value, route }) => (
            <NavLink
              className={({ isActive }) =>
                isActive ? 'underline underline-offset-8' : 'text-alternate'
              }
              to={route}
            >
              {value}
            </NavLink>
          )}
        />
      </div>
    </header>
  );
};

export default DesktopHeader;
