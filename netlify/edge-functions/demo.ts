import type { Context } from 'https://edge.netlify.com';
import { connect } from 'https://unpkg.com/@planetscale/database@^1.3.0';

const getPlanetScaleConnection = () =>
  connect({
    host: Deno.env.get('PLANETSCALE_HOST'),
    username: Deno.env.get('PLANETSCALE_USERNAME'),
    password: Deno.env.get('PLANETSCALE_PASSWORD')
  });

export default async (request: Request, _context: Context) => {
  const url = request.url;
  const search = new URL(url).search;
  const params = new URLSearchParams(search);
  const connection = getPlanetScaleConnection();
  if (!params.has('city')) {
    const { rows } = await connection.execute(`SELECT * FROM Persons`, []);

    return new Response(JSON.stringify(rows), { status: 200 });
  }
  const city = params.get('city');
  const { rows } = await connection.execute(
    `SELECT * FROM Persons WHERE City = ?`,
    [city]
  );

  return new Response(JSON.stringify(rows), { status: 200 });
};
