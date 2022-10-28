import type { LinksFunction } from '@remix-run/node';
import type { InputHTMLAttributes } from 'react';

import inputStyles from './input.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: inputStyles }
];

export const Input = (
  props: InputHTMLAttributes<HTMLInputElement>
): JSX.Element => <input className='input' {...props} />;
