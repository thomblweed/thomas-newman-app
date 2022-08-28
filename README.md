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

To get the environment variables working with the Netlify Edge Functions, ensure to set the variables with Netlify as below. Please read the PlanetScale documentation on where to get the database values in the settings.

```
netlify env:set PLANETSCALE_HOST "<host value>"
netlify env:set PLANETSCALE_USERNAME "<username value>"
netlify env:set PLANETSCALE_PASSWORD "<password value>"
netlify env:set SESSION_SECRET "<session value>"
```
