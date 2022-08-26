import type { ButtonHTMLAttributes, FC } from 'react';

const buttonClassesDefaults =
  'flex flex-col justify-center items-center border-0 leading-none leading-6 bg-primary ' +
  'py-3.5 px-3.5 rounded-md hover:bg-alternate transition duration-300 active:bg-grey ' +
  'disabled:cursor-not-allowed disabled:bg-grey disabled:opacity-60 tracking-wider ' +
  'text-black font-bold';

const buttonType = {
  full: 'w-full',
  normal: 'min-w-[85px]'
};

type ButtonProps = {
  width: 'full' | 'normal';
};

export const Button: FC<
  ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>
> = ({ width, ...rest }) => {
  const buttonClasses = buttonClassesDefaults
    .concat(' ')
    .concat(buttonType[width]);

  return <button className={buttonClasses} {...rest} />;
};
