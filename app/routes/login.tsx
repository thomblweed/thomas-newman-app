import type {
  ActionFunction,
  ErrorBoundaryComponent,
  LinksFunction
} from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { useActionData, useTransition } from '@remix-run/react';

import { Form, links as formStyles } from '~/components/Form';
import { ButtonType, FieldType } from '~/components/Form/enums';
import { commitSession, getSession } from '~/service/session.service';
import { signinUser } from '~/service/user.service';
import type { Credentials } from '~/types';
import { getFormValuesFromRequest } from '~/utils';

const EMAIL = 'email';
const PASSWORD = 'password';

export const links: LinksFunction = () => [...formStyles()];

export const action: ActionFunction = async ({ request }) => {
  const [email, password] = await getFormValuesFromRequest(request, [
    EMAIL,
    PASSWORD
  ]);
  const session = await getSession(request.headers.get('Cookie'));
  try {
    const user = await signinUser({ email, password } as Credentials);
    session.set('user', user);
    return redirect('/', {
      headers: {
        'set-cookie': await commitSession(session)
      }
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // eslint-disable-next-line no-unsafe-optional-chaining
    const { status } = error?.response;
    const errorMessage =
      status === 400 && error.response?.data
        ? error.response.data
        : 'An error occured when logging in';
    session.flash('error', errorMessage);
    return json(
      { loginError: errorMessage },
      {
        headers: {
          'set-cookie': await commitSession(session)
        }
      }
    );
  }
};

export default function Login() {
  const { state } = useTransition();
  const actionData = useActionData<{ loginError?: string }>();
  return (
    <section className='flex flex-col'>
      <h2>Admin Login</h2>
      <Form
        method='post'
        className='m-auto'
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
        error={actionData?.loginError}
      />
    </section>
  );
}

// eslint-disable-next-line react/prop-types
export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => (
  <div className='flex h-full'>
    {/* eslint-disable-next-line react/prop-types */}
    <div className='m-auto text-red-600'>{error.message}</div>
  </div>
);
