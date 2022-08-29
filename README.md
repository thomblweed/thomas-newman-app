# thomblweed

## Prerequisites

- package manager > https://pnpm.io/installation
- task runner > https://taskfile.dev/installation/
- deno for Netlify edge fucntions > https://deno.land/

```sh
pnpm add -g netlify-cli
```

## Development

Install dependencies and run locally;

```sh
pnpm i
pnpm dev
```

To run locally with Netlify;

```sh
netlify dev
```

## Database

For the database I'm using Planetscale - https://planetscale.com/

### Tables

```
CREATE TABLE credentials (
   id int NOT NULL AUTO_INCREMENT
   email varchar(255) NOT NULL,
   password varchar(255) NOT NULL,
   PRIMARY KEY (id, email)
);
```

### Environment Variables

There are 2 ways to set environment variables with Netlify. You can either import from a file such as `.env` using;

```
netlify env:import .env
```

or set them one at a time as below.

Ensure to set the required Planetscale variables. Please read the PlanetScale documentation on where to get the database values in the settings.

```
netlify env:set PLANETSCALE_HOST "<host value>"
netlify env:set PLANETSCALE_USERNAME "<username value>"
netlify env:set PLANETSCALE_PASSWORD "<password value>"
```

Also need to set the environment variables for the admin auth functionality

```
netlify env:set PROD_API_AUTH_URL "<session value>"
netlify env:set SESSION_SECRET "<session value>"
```
