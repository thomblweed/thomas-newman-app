import { axiosService, createAxiosInstance } from './axios.service';
import type { Credentials, User } from '~/types';
import type { Environment } from '~/config';
import { config } from '~/config';

const env = (process.env.NODE_ENV as Environment) ?? 'development';
const authAPIConfig = config[env].api.auth;

const axiosInstance = createAxiosInstance(authAPIConfig.baseUrl);

export const getCurrentUser = async () =>
  (await axiosService<User | null>(axiosInstance, authAPIConfig.getUser)).data;

export const signoutUser = async () =>
  (
    await axiosService<null>(axiosInstance, authAPIConfig.logout, {
      method: 'POST'
    })
  ).data;

export const signinUser = async (credentials: Credentials) =>
  (
    await axiosService<User>(axiosInstance, authAPIConfig.login, {
      method: 'POST',
      data: credentials
    })
  ).data;
