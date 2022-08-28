import { createCookieSessionStorage } from '@remix-run/node';

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: 'thombleed__session',
      maxAge: 60,
      httpOnly: true,
      secure: true,
      isSigned: true,
      secrets: [process.env.SESSION_SECRET!]
    }
  });

export { getSession, commitSession, destroySession };
