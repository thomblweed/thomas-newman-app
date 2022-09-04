import type { LoaderFunction } from '@remix-run/node';

import { getSession } from '~/service/session.service';

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));
  const user = session.get('user');
  console.log({ user });

  return null;
};

export default function Blog() {
  return <h2>Blog</h2>;
}
