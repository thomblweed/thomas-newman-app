import { NavLink } from '@remix-run/react';
import type { LinksFunction } from '@remix-run/node';
// import { useContext } from 'react';

// import { DeviceContext } from '~/state/context/DeviceContext';
import headerStyles from './header.css';
import { Logo } from '../Logo';
import { Navigation, links as navigationStyles } from '~/components/Navigation';

// const Placeholder = () => <div className='h-[68px]'></div>;

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: headerStyles },
  ...navigationStyles()
];

export const Header = () => {
  // const device = useContext(DeviceContext);

  return (
    // <>
    //   {device === undefined ? <Placeholder /> : null}
    //   {device === 'desktop' || device === 'tablet' ? (
    //     <Suspense fallback={<Placeholder />}>
    //       <DesktopHeader />
    //     </Suspense>
    //   ) : null}
    //   {device === 'mobile' ? (
    //     <Suspense fallback={<Placeholder />}>
    //       <MobileHeader />
    //     </Suspense>
    //   ) : null}
    // </>
    <header className='container'>
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
                'nav-link '.concat(
                  isActive ? 'nav-link-active' : 'text-alternate'
                )
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
