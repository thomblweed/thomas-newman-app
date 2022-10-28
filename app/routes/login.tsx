import type {
  ActionFunction,
  ErrorBoundaryComponent,
  LinksFunction
} from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { useActionData, useTransition } from '@remix-run/react';

import { Section, links as sectionStyles } from '~/components/Section';
import { Form, links as formStyles } from '~/components/Form';
import { ButtonType, FieldType } from '~/components/Form/enums';
import { commitSession, getSession } from '~/service/session.service';
import { signinUser } from '~/service/user.service';
import type { Credentials } from '~/types';
import { getFormValuesFromRequest } from '~/utils';
import loginStyles from '~/styles/routes/login.css';

const EMAIL = 'email';
const PASSWORD = 'password';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: loginStyles },
  ...sectionStyles(),
  ...formStyles()
];

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
    <Section>
      <h2>Admin Login</h2>
      <div className='formContainer'>
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
          error={actionData?.loginError}
        />
      </div>
    </Section>
  );
}

// eslint-disable-next-line react/prop-types
export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => (
  <div>
    {/* eslint-disable-next-line react/prop-types */}
    <div>{error.message}</div>
  </div>
);
