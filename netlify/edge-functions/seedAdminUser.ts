import type { Context } from 'https://edge.netlify.com';
import * as bcrypt from 'https://deno.land/x/bcrypt@v0.4.0/mod.ts';

import { connect } from 'https://unpkg.com/@planetscale/database@^1.3.0';

const getPlanetScaleConnection = () =>
  connect({
    host: Deno.env.get('PLANETSCALE_HOST'),
    username: Deno.env.get('PLANETSCALE_USERNAME'),
    password: Deno.env.get('PLANETSCALE_PASSWORD')
  });

type Credentials = {
  email: string;
  password: string;
};

const toHash = async (password: string): Promise<string> => {
  const salt: string = await bcrypt.genSalt(8);
  const hashedPassword: string = await bcrypt.hash(password, salt);

  return hashedPassword;
};

// function disabled for now
export default async (request: Request, _context: Context) => {
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

  const { rows } = await connection.execute('SELECT * FROM credentials', []);
  const userExists = rows?.find((row: Credentials) => row.email === email);
  if (userExists) {
    return new Response(`User with email: ${email} already exists`, {
      status: 400
    });
  }

  const hashedPassword = await toHash(password);
  await connection.execute(
    'INSERT INTO credentials (email, password) VALUES (?, ?);',
    [email, hashedPassword]
  );

  return new Response('ok', { status: 201 });
};
