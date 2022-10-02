import { Form as RemixForm } from '@remix-run/react';
import type { FormMethod } from '@remix-run/react';
import type { LinksFunction } from '@remix-run/node';

import formStyles from './form.css';
import type { FormField, FormSchema } from './types';
import { Field, links as fieldStyles } from './Fields/Field';
import { Button, links as buttonStyles } from '../Elements/Button';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: formStyles },
  ...fieldStyles(),
  ...buttonStyles()
];

type FormProps = {
  schema: FormSchema;
  method: FormMethod;
  busy: boolean;
  action?: string;
  error?: string;
  className?: string;
};

export const Form = ({
  schema,
  busy = false,
  method,
  action,
  error,
  ...rest
}: FormProps): JSX.Element => {
  return (
    <RemixForm className='form' method={method} action={action} {...rest}>
      {schema.fields?.map((field: FormField) => (
        <Field
          key={field.name}
          name={field.name}
          label={field.label}
          type={field.type}
          disabled={busy}
          required={field.required}
        />
      ))}
      {schema.buttons?.map((button) => (
        <Button key={button.id} disabled={busy} type={button.type} width='full'>
          {button.label}
        </Button>
      ))}
      {error ? <p className='text-red-600'>{error}</p> : null}
    </RemixForm>
  );
};
