import { ActionFunction, ErrorBoundaryComponent } from '@remix-run/node';
import { useTransition } from '@remix-run/react';

import { Form } from '~/components/Form';
import { ButtonType, FieldType } from '~/components/Form/enums';
import { signinUser } from '~/service/user.service';
import { Credentials } from '~/types';
import { getFormValuesFromRequest } from '~/utils';

const EMAIL = 'email';
const PASSWORD = 'password';

export const action: ActionFunction = async ({
  request
}): Promise<Response> => {
  const [email, password] = await getFormValuesFromRequest(request, [
    EMAIL,
    PASSWORD
  ]);
  const response = await signinUser({ email, password } as Credentials);
  console.log({ response });

  return new Response();
};

export default function Login() {
  const { state } = useTransition();
  return (
    <div className='flex flex-col h-full'>
      <h2>Admin Login</h2>
      <Form
        method='post'
        schema={{
          fields: [
            {
              type: FieldType.EMAIL,
              name: EMAIL,
              label: 'Email Address',
              required: true
            },
            {
              type: FieldType.PASSWORD,
              name: PASSWORD,
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

export const ErrorBoundary: ErrorBoundaryComponent = () => {
  return (
    <div className='flex h-full'>
      <div className='m-auto text-red-600'>
        Bad things have happened when trying to login
      </div>
    </div>
  );
};
