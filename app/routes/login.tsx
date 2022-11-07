import type {
  ActionFunction,
  ErrorBoundaryComponent,
  LinksFunction
} from '@remix-run/node';
import { useActionData, useTransition } from '@remix-run/react';

import { Section, links as sectionStyles } from '~/components/Section';
import { Form, links as formStyles } from '~/components/Form';
import { ButtonType, FieldType } from '~/components/Form/enums';
import loginStyles from '~/styles/routes/login.css';
import { loginHandler } from '~/handlers/login-handler';
import { LoginFields } from '~/enums/login-fields.enum';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: loginStyles },
  ...sectionStyles(),
  ...formStyles()
];

export const action: ActionFunction = async ({ request }) => {
  loginHandler(request);
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
                name: LoginFields.EMAIL,
                label: 'Email Address',
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
