import {getClient} from './axios';

class ApiClient {
    private client: any;
    private static _instance: ApiClient;

    private constructor() {
        this.client = getClient();
    }

    public static Instance() {
        return this._instance || (this._instance = new this());
    }

    get(url: string, conf = {}) {
        return this.client
            .get(url, conf)
            .then((response: any) => Promise.resolve(response))
            .catch((error: any) => Promise.reject(error));
    }

    post(url: string, conf = {}) {
        return this.client
            .post(url, conf)
            .then((response: any) => Promise.resolve(response))
            .catch((error: any) => Promise.reject(error));
    }

    put(url: string, conf = {}) {
        return this.client
            .put(url, conf)
            .then((response: any) => Promise.resolve(response))
            .catch((error: any) => Promise.reject(error));
    }

    delete(url: string, conf = {}) {
        return this.client
            .delete(url, conf)
            .then((response: any) => Promise.resolve(response))
            .catch((error: any) => Promise.reject(error));
    }
}

export {
    ApiClient
};
