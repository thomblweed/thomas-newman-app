import * as bcrypt from 'https://deno.land/x/bcrypt@v0.4.0/mod.ts';

import { getPlanetScaleConnection } from '../shared.ts';

const compare = async (
  storedPassword: string,
  suppliedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(suppliedPassword, storedPassword);
};

export default async (request: Request) => {
  if (request.method !== 'POST') {
    return new Response(
      'Please ensure POST request with a valid body e.g. { "email": "test@testing.com", "password": "password" }',
      {
        status: 400
      }
    );
  }
  const connection = getPlanetScaleConnection();
  const { email, password } = await request.json();

  const { rows } = await connection.execute(
    'SELECT * FROM credentials WHERE email = ?',
    [email]
  );
  if (rows?.length !== 1) {
    return new Response(`User with email: ${email} does not exist`, {
      status: 400
    });
  }

  const passwordsMatch = await compare(rows[0].password, password);
  if (!passwordsMatch) {
    return new Response('Invalid password provided', {
      status: 400
    });
  }

  return new Response('ok', { status: 200 });
};
