import type { LinksFunction } from '@remix-run/node';
import type { FC, ReactNode } from 'react';

import sectionStyles from './section.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: sectionStyles }
];

type SectionProps = {
  children: ReactNode;
};

export const Section: FC<SectionProps> = ({ children }) => (
  <section className='section'>{children}</section>
);
