import { json, redirect } from '@remix-run/node';

import { commitSession, getSession } from '~/service/session.service';
import { signinUser } from '~/service/user.service';
import type { Credentials } from '~/types';

export const login = async (
  request: Request,
  { email, password }: Credentials
) => {
  const session = await getSession(request.headers.get('Cookie'));
  try {
    const user = await signinUser({ email, password });
    session.set('user', user);
    return redirect('/', {
      headers: {
        'set-cookie': await commitSession(session)
      }
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const errorMessage =
      error?.response?.status === 400 && error.response?.data
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
