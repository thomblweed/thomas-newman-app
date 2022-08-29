import * as bcrypt from 'https://deno.land/x/bcrypt@v0.4.0/mod.ts';

import { getPlanetScaleConnection, badRequest } from '../shared.ts';

const compare = async (
  storedPassword: string,
  suppliedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(suppliedPassword, storedPassword);
};

export default async (request: Request) => {
  if (request.method !== 'POST') {
    return badRequest(
      'Please ensure to send a POST request with a valid body e.g. { "email": "test@testing.com", "password": "password" }'
    );
  }
  const { email, password } = await request.json();
  if (!email || !password) {
    return badRequest('Missing values for email and/or password');
  }

  const connection = getPlanetScaleConnection();
  const { rows } = await connection.execute(
    'SELECT * FROM credentials WHERE email = ?',
    [email]
  );
  if (rows?.length !== 1) {
    return badRequest(`User with email "${email}" does not exist`);
  }

  const passwordsMatch = await compare(rows[0].password, password);
  if (!passwordsMatch) {
    return badRequest('Invalid password provided');
  }

  return new Response(JSON.stringify({ user: { email } }), { status: 200 });
};
