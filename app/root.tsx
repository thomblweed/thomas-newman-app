import type {
  ErrorBoundaryComponent,
  LinksFunction,
  LoaderFunction,
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

import { HeadingLayout } from '~/layouts/HeaderLayout';
import { Main } from '~/layouts/Main';
import fontStyles from '~/styles/font.css';
import styles from '~/styles/global.css';

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: styles },
    { rel: 'stylesheet', href: fontStyles }
  ];
};

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Thomas Newman',
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
        <HeadingLayout>
          <Outlet />
        </HeadingLayout>
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
