import type { Handler, HandlerEvent } from '@netlify/functions';
import { connect } from '@planetscale/database';
import bcrypt from 'bcrypt';

const compare = async (
  storedPassword: string,
  suppliedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(suppliedPassword, storedPassword);
};

const badRequest = (message: string) => ({
  statusCode: 400,
  body: message
});

const willParseJSON = (value: string): boolean => {
  try {
    JSON.parse(value);
    return true;
  } catch (error) {
    return false;
  }
};

const planetscaleConfig = {
  host: process.env.PLANETSCALE_HOST,
  username: process.env.PLANETSCALE_USERNAME,
  password: process.env.PLANETSCALE_PASSWORD
};

export const handler: Handler = async (event: HandlerEvent) => {
  // TODO: invesigate if this is nessessary or middleware options
  if (event.httpMethod !== 'POST') {
    return badRequest('Please ensure http method is of type POST');
  }
  // TODO: move body validation to middleware
  const { body } = event;
  if (!body || !willParseJSON(body)) {
    return badRequest('Request body must be a JSON object');
  }
  const { email, password } = JSON.parse(body);
  if (!email || !password) {
    return badRequest('Missing values for email and/or password');
  }

  const connection = connect(planetscaleConfig);
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

  return {
    statusCode: 200,
    body: 'Login successful'
  };
};
