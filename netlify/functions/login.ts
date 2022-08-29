import type { Handler, HandlerEvent } from '@netlify/functions';
import { connect } from '@planetscale/database';
import bcrypt from 'bcrypt';

const compare = async (
  storedPassword: string,
  suppliedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(suppliedPassword, storedPassword);
};

const planetscaleConfig = {
  host: process.env.PLANETSCALE_HOST,
  username: process.env.PLANETSCALE_USERNAME,
  password: process.env.PLANETSCALE_PASSWORD
};

export const handler: Handler = async (event: HandlerEvent) => {
  if (!event.body) {
    return {
      statusCode: 400,
      body: 'missing body'
    };
  }
  const { email, password } = JSON.parse(event.body);
  if (!email || !password) {
    return {
      statusCode: 400,
      body: 'Missing values for email and/or password'
    };
  }

  const connection = connect(planetscaleConfig);
  const { rows } = await connection.execute(
    'SELECT * FROM credentials WHERE email = ?',
    [email]
  );
  if (rows?.length !== 1) {
    return {
      statusCode: 400,
      body: `User with email "${email}" does not exist`
    };
  }

  const passwordsMatch = await compare(rows[0].password, password);
  if (!passwordsMatch) {
    return {
      statusCode: 400,
      body: 'Invalid password provided'
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ thom: 'rules' })
  };
};
