import type { ReactNode } from 'react';

type NavContent = {
  value: string;
  route: string;
};

type NavigationProps = {
  items: Array<NavContent>;
  content: (props: NavContent) => ReactNode;
};

export const Navigation = ({ items, content }: NavigationProps) => (
  <nav className=''>
    <ul className='flex'>
      {items.map(({ value, route }) => (
        <li className='px-2' key={value}>
          {content({ value, route })}
        </li>
      ))}
    </ul>
  </nav>
);
