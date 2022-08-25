import { ButtonHTMLAttributes } from 'react';

const buttonClasses =
  'flex flex-col justify-center items-center border-0 leading-none leading-6 bg-primary py-3.5 px-3.5 ' +
  'rounded-md hover:bg-alternate transition duration-300 active:bg-grey disabled:cursor-not-allowed disabled:bg-grey ' +
  'disabled:opacity-60 tracking-wider min-w-[85px] text-black font-bold';

export const Button = (
  props: ButtonHTMLAttributes<HTMLButtonElement>
): JSX.Element => <button {...props} className={buttonClasses} />;
