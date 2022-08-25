import { axiosService, createAxiosInstance } from './axios.service';
import type { Credentials, User } from '~/types';
import { config, Environment } from '~/config';

const env = (process.env.NODE_ENV as Environment) ?? 'development';
const authAPIConfig = config[env].api.auth;

const axiosInstance = createAxiosInstance(authAPIConfig.baseUrl);

export const getCurrentUser = async () =>
  (await axiosService<null, User | null>(axiosInstance, authAPIConfig.getUser))
    .data;

export const signoutUser = async () =>
  (await axiosService<null, null>(axiosInstance, authAPIConfig.logout, 'POST'))
    .data;

export const signinUser = async (credentials: Credentials) =>
  (
    await axiosService<Credentials, User>(
      axiosInstance,
      authAPIConfig.login,
      'POST',
      credentials
    )
  ).data;
