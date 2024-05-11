import { getClient } from './axios'
import { type AxiosRequestConfig, type AxiosInstance, type AxiosResponse } from 'axios'

type PromiseAxiosResponse = Promise<AxiosResponse<any, any>>

class ApiClient {
  private readonly client: AxiosInstance
  private static _instance: ApiClient

  private constructor () {
    this.client = getClient()
  }

  public static Instance (): ApiClient {
    return this._instance || (this._instance = new this())
  }

  async get (url: string, conf: AxiosRequestConfig<any> | undefined = {}): PromiseAxiosResponse {
    return await this.client
      .get(url, conf)
      .then(async (response: any) => await Promise.resolve(response))
      .catch(async (error: any) => await Promise.reject(error))
  }

  async post (url: string, data: any, conf: AxiosRequestConfig<any> | undefined = {}): PromiseAxiosResponse {
    return await this.client
      .post(url, data, conf)
      .then(async (response: any) => await Promise.resolve(response))
      .catch(async (error: any) => await Promise.reject(error))
  }

  async put (url: string, data: any, conf: AxiosRequestConfig<any> | undefined = {}): PromiseAxiosResponse {
    return await this.client
      .put(url, data, conf)
      .then(async (response: any) => await Promise.resolve(response))
      .catch(async (error: any) => await Promise.reject(error))
  }

  async delete (url: string, conf: AxiosRequestConfig<any> | undefined = {}): PromiseAxiosResponse {
    return await this.client
      .delete(url, conf)
      .then(async (response: any) => await Promise.resolve(response))
      .catch(async (error: any) => await Promise.reject(error))
  }
}

export {
  ApiClient
}
