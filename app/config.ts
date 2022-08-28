type Environment = 'development' | 'integration' | 'test' | 'production';

type Config = {
  [key in Environment]: {
    api: {
      auth: {
        baseUrl: string;
        login: string;
        logout: string;
        getUser: string;
      };
    };
  };
};

const config: Config = {
  development: {
    api: {
      auth: {
        baseUrl: 'http://localhost:2000/api/users',
        login: '/login',
        logout: '/signout',
        getUser: '/currentuser'
      }
    }
  },
  integration: {
    api: {
      auth: {
        baseUrl: 'http://integration',
        login: '/login',
        logout: '/logout',
        getUser: '/currentuser'
      }
    }
  },
  test: {
    api: {
      auth: {
        baseUrl: 'http://testurl',
        login: '/login',
        logout: '/logout',
        getUser: '/currentuser'
      }
    }
  },
  production: {
    api: {
      auth: {
        baseUrl: process.env.PROD_API_AUTH_URL || 'http://localhost:8080',
        login: '/login',
        logout: '/logout',
        getUser: '/currentuser'
      }
    }
  }
};

export type { Config, Environment };
export { config };
