import type { LinksFunction } from '@remix-run/node';

import footerStyles from './footer.css';

type FooterProps = {
  footerText: string;
};

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: footerStyles }
];

export const Footer = ({ footerText }: FooterProps) => (
  <footer className='bg-gradient-to-t from-dark-grey footer container'>
    <div className='mx-auto w-11/12 max-w-screen-xl'>
      <p className='text-alternate'>{footerText}</p>
      <p className='text-small text-secondary'>
        Copyright &copy; {new Date().getFullYear()}
      </p>
    </div>
  </footer>
);
