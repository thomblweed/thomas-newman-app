import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// import type { Environment } from '~/config';
// const env = (process.env.NODE_ENV as Environment) ?? 'development';

const defaultConfig: AxiosRequestConfig = {
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
  // TODO: double check this
  // withCredentials: env === 'development' ? true : false
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

export const axiosService = async <Response>(
  instance: AxiosInstance,
  url: string,
  options?: AxiosRequestConfig
): Promise<AxiosResponse<Response>> =>
  await instance.request({
    url,
    ...options
  });
