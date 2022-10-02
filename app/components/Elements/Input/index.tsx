import type { LinksFunction } from '@remix-run/node';
import type { InputHTMLAttributes } from 'react';

import inputStyles from './input.css';

const inputClasses =
  'w-full rounded-md border-solid h-12 border-primary outline-none ' +
  'p-4 border hover:shadow focus:shadow-fs focus:ring-primary focus:border-primary focus:ring-0 ' +
  'transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed bg-inherit';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: inputStyles }
];

export const Input = (
  props: InputHTMLAttributes<HTMLInputElement>
): JSX.Element => <input className='input' {...props} />;
