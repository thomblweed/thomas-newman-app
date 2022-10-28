import type { LinksFunction } from '@remix-run/node';
import type { ButtonHTMLAttributes, FC } from 'react';

import buttonStyles from './button.css';

const buttonType = {
  full: 'button-width-full',
  normal: 'button-width-normal'
};

type ButtonProps = {
  width: 'full' | 'normal';
};

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: buttonStyles }
];

export const Button: FC<
  ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>
> = ({ width, ...rest }) => {
  const buttonClasses = 'button'.concat(' ').concat(buttonType[width]);

  return <button className={buttonClasses} {...rest} />;
};
