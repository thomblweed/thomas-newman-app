import type { Context } from 'https://edge.netlify.com';
import { connect } from 'https://unpkg.com/@planetscale/database@^1.3.0';

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

export default async (request: Request, _context: Context) => {
  const url = request.url;
  const search = new URL(url).search;
  const params = new URLSearchParams(search);
  if (!params.has('city')) {
    return badRequest('Missing search value for city');
  }
  const city = params.get('city');
  const connection = getPlanetScaleConnection();
  const { rows } = await connection.execute(
    `SELECT * FROM Persons WHERE City = ?`,
    [city]
  );

  return new Response(JSON.stringify(rows), { status: 200 });
};
