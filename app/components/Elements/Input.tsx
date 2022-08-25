import type { InputHTMLAttributes } from 'react';

const inputStyles =
  'w-full rounded-md border-solid h-12 border-primary outline-none ' +
  'p-4 border hover:shadow focus:shadow-fs focus:ring-primary focus:border-primary focus:ring-0 ' +
  'transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed bg-inherit';

export const Input = (
  props: InputHTMLAttributes<HTMLInputElement>
): JSX.Element => <input {...props} className={inputStyles} />;
