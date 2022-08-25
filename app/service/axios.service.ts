import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Method
} from 'axios';

import { Environment } from '~/config';
const env = (process.env.NODE_ENV as Environment) ?? 'development';

const defaultConfig: AxiosRequestConfig = {
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: env === 'development' ? true : false
};

export const createAxiosInstance = (
  baseURL: string,
  configOverride?: AxiosRequestConfig
): AxiosInstance =>
  axios.create({
    baseURL,
    ...defaultConfig,
    ...configOverride
  });

export const axiosService = async <Body, Response>(
  instance: AxiosInstance,
  url: string,
  method?: Method,
  data?: Body
): Promise<AxiosResponse<Response>> =>
  await instance.request({
    url,
    method: method || 'GET',
    ...(data && { data })
  });
