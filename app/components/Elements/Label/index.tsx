import type { FC, LabelHTMLAttributes } from 'react';
import type { LinksFunction } from '@remix-run/node';

import labelStyles from './label.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: labelStyles }
];

type LabelProps = {
  text: string;
};

export const Label: FC<LabelProps & LabelHTMLAttributes<HTMLLabelElement>> = ({
  text,
  ...rest
}) => (
  <label className='label text-secondary' {...rest}>
    {text}
  </label>
);
