import { connect } from 'https://unpkg.com/@planetscale/database@^1.3.0';

export const getPlanetScaleConnection = () =>
  connect({
    host: Deno.env.get('PLANETSCALE_HOST'),
    username: Deno.env.get('PLANETSCALE_USERNAME'),
    password: Deno.env.get('PLANETSCALE_PASSWORD')
  });
