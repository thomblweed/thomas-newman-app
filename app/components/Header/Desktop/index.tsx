import type { LinksFunction } from '@remix-run/node';
import { NavLink } from '@remix-run/react';

import headerStyles from './desktop-header.css';
import { Logo } from '~/components/Logo';
import { Navigation, links as navigationStyles } from '~/components/Navigation';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: headerStyles },
  ...navigationStyles()
];

const DesktopHeader = () => {
  return (
    <header className='flex items-center columns-3 mt-2 mb-5'>
      <div className='header-container'>
        <Logo />
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
