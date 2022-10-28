import type { RefAttributes } from 'react';
import { Form as RemixForm } from '@remix-run/react';
import type { FormMethod } from '@remix-run/react';
import type { LinksFunction } from '@remix-run/node';

import type { FormField, FormSchema } from './types';
import { Field, links as fieldStyles } from './Field';
import { Button, links as buttonStyles } from '../Elements/Button';

export const links: LinksFunction = () => [...fieldStyles(), ...buttonStyles()];

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
}: FormProps & RefAttributes<HTMLFormElement>) => (
  <RemixForm method={method} action={action} {...rest}>
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
    {schema.buttons?.map(({ id, type, label }) => (
      <Button key={id} disabled={busy} type={type} width='full'>
        {label}
      </Button>
    ))}
    {error ? <p>{error}</p> : null}
  </RemixForm>
);
