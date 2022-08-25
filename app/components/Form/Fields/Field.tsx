import type { ReactElement } from 'react';
import { Input } from '~/components/Elements/Input';

import type { InputType } from '../types';

type FieldProps = {
  name: string;
  label: string;
  type: InputType;
  disabled: boolean;
  required: boolean;
};

export const Field = ({
  name,
  label,
  type,
  disabled,
  required
}: FieldProps): ReactElement => {
  return (
    <div className='mb-4' id={name} role='group'>
      <label className='inline-block mb-2 text-secondary' htmlFor={name}>
        {label}
      </label>
      <Input
        aria-label={`${label}`}
        type={type}
        name={name}
        disabled={disabled}
        required={required}
      />
    </div>
  );
};
