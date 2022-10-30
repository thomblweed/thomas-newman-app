import * as bcrypt from 'https://deno.land/x/bcrypt@v0.4.0/mod.ts';
import { connect } from 'https://unpkg.com/@planetscale/database@1.4.0/dist/index.js';

const getPlanetScaleConnection = () =>
  connect({
    host: Deno.env.get('PLANETSCALE_HOST'),
    username: Deno.env.get('PLANETSCALE_USERNAME'),
    password: Deno.env.get('PLANETSCALE_PASSWORD')
  });

const badRequest = (message: string) =>
  new Response(message, {
    status: 400
  });

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
    // dumb fix for wrong types
    [email] as unknown as null
  );
  if (rows?.length !== 1) {
    return badRequest(`User with email "${email}" does not exist`);
  }

  const [firstRow] = rows;
  const passwordsMatch = await compare(firstRow.password, password);
  if (!passwordsMatch) {
    return badRequest('Invalid password provided');
  }

  return new Response(JSON.stringify({ user: { email } }), { status: 200 });
};
