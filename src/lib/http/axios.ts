import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import { env } from '@/env'

const API_URL = `${env.REACT_APP_API_URL}/api`

export const getClient = (): AxiosInstance => {
  const options: AxiosRequestConfig = {
    baseURL: `${API_URL}`
  }

  const client: AxiosInstance = axios.create(options)

  // client.interceptors.request.use(async (config: any) => {
  //         const access_token = await localStorage.getItem('access_token');
  //         if (access_token) {
  //             config.headers['Authorization'] = 'Bearer ' + access_token;
  //         }
  //         config.headers['Content-Type'] = 'application/json';
  //
  //         config.headers['Access-Control-Allow-Origin'] = '*';
  //
  //         return config;
  //     },
  //     (error) => {
  //         Promise.reject(error);
  //     }
  // );
  //
  // client.interceptors.response.use(
  //     (response) => {
  //         return response
  //     },
  //     async error => {
  //         if (error.response.status === 401) {
  //             // await getAuthorizationCode();
  //             // return Promise.reject(error.response.data.code);
  //         }
  //
  //         return Promise.reject(error.response.data);
  //     }
  // );

  return client
}
