import { Form as RemixForm } from '@remix-run/react';
import type { FormMethod } from '@remix-run/react';
import type { FormField, FormSchema } from './types';
import { Field } from './Fields/Field';

type FormProps = {
  schema: FormSchema;
  method: FormMethod;
  busy: boolean;
  action?: string;
  errors?: string[];
};

export const Form = ({
  schema,
  busy = false,
  method,
  action,
  errors
}: FormProps): JSX.Element => {
  return (
    <RemixForm method={method} action={action} className='m-auto'>
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
        <button
          key={button.id}
          //   label={button.label}
          //   loading={busy}
          disabled={busy}
          type={button.type}
        >
          {button.label}
        </button>
      ))}
      {errors?.map((error: string) => (
        <p className='text-red-600' key={error}>
          {error}
        </p>
      ))}
    </RemixForm>
  );
};
