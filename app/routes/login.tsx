import { useTransition } from '@remix-run/react';
import { Form } from '~/components/Form';
import { ButtonType, FieldType } from '~/components/Form/enums';

const enum LoginFields {
  USERNAME = 'username',
  PASSWORD = 'password'
}

export default function Login() {
  const { state } = useTransition();
  return (
    <div className='flex h-full'>
      <Form
        method='post'
        schema={{
          fields: [
            {
              type: FieldType.EMAIL,
              name: LoginFields.USERNAME,
              label: 'Username',
              required: true
            },
            {
              type: FieldType.PASSWORD,
              name: LoginFields.PASSWORD,
              label: 'Password',
              required: true
            }
          ],
          buttons: [
            {
              label: 'Login',
              type: ButtonType.SUBMIT,
              id: 'login-button'
            }
          ]
        }}
        busy={state === 'submitting' || state === 'loading'}
      />
    </div>
  );
}
