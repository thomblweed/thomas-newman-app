import type { LinksFunction } from '@remix-run/node';

import { Input, links as inputStyles } from '~/components/Elements/Input';
import { Label, links as labelStyles } from '~/components/Elements/Label';
import type { InputType } from '../types';
import fieldStyles from './field.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: fieldStyles },
  ...labelStyles(),
  ...inputStyles()
];

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
}: FieldProps) => (
  <div className='field' id={name} role='group'>
    <Label text={label} htmlFor={name} />
    <Input
      aria-label={`${label}`}
      type={type}
      name={name}
      disabled={disabled}
      required={required}
    />
  </div>
);
