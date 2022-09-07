import type { LinksFunction } from '@remix-run/node';
import type { ReactNode } from 'react';

import navigationStyles from './navigation.css';

type NavContent = {
  value: string;
  route: string;
};

type NavigationProps = {
  items: Array<NavContent>;
  content: (props: NavContent) => ReactNode;
};

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: navigationStyles }
];

export const Navigation = ({ items, content }: NavigationProps) => (
  <nav aria-label='primary'>
    <ul className='navigation-list'>
      {items.map(({ value, route }) => (
        <li className='px-2' key={value}>
          {content({ value, route })}
        </li>
      ))}
    </ul>
  </nav>
);
