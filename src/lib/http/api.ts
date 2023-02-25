import { getClient } from './axios'
import { type AxiosInstance, type AxiosResponse } from 'axios'

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

  async get (url: string, conf = {}): PromiseAxiosResponse {
    return await this.client
      .get(url, conf)
      .then(async (response: any) => await Promise.resolve(response))
      .catch(async (error: any) => await Promise.reject(error))
  }

  async post (url: string, conf = {}): PromiseAxiosResponse {
    return await this.client
      .post(url, conf)
      .then(async (response: any) => await Promise.resolve(response))
      .catch(async (error: any) => await Promise.reject(error))
  }

  async put (url: string, conf = {}): PromiseAxiosResponse {
    return await this.client
      .put(url, conf)
      .then(async (response: any) => await Promise.resolve(response))
      .catch(async (error: any) => await Promise.reject(error))
  }

  async delete (url: string, conf = {}): PromiseAxiosResponse {
    return await this.client
      .delete(url, conf)
      .then(async (response: any) => await Promise.resolve(response))
      .catch(async (error: any) => await Promise.reject(error))
  }
}

export {
  ApiClient
}
