import type {
  ErrorBoundaryComponent,
  LinksFunction,
  MetaFunction
} from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from '@remix-run/react';
import type { ReactNode } from 'react';

import { Main, links as mainLayoutStyles } from '~/layouts/Main';
import resetStyles from '~/styles/reset.css';
import fontStyles from '~/styles/font.css';
import styles from '~/styles/styles.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: resetStyles },
  { rel: 'stylesheet', href: styles },
  { rel: 'stylesheet', href: fontStyles },
  ...mainLayoutStyles()
];

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'thomblweed',
  viewport: 'width=device-width,initial-scale=1'
});

const Document = ({ children }: { children: ReactNode }) => (
  <html lang='en'>
    <head>
      <Meta />
      <Links />
    </head>
    <body>
      {children}
      <ScrollRestoration />
      <Scripts />
      {process.env.NODE_ENV === 'development' ? <LiveReload /> : null}
    </body>
  </html>
);

export default function Root() {
  return (
    <Document>
      <Main>
        <Outlet />
      </Main>
    </Document>
  );
}

export const ErrorBoundary: ErrorBoundaryComponent = () => (
  <Document>
    <Main>
      <div>Bad things have happened</div>
    </Main>
  </Document>
);
