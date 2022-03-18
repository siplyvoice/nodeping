import axios, {Axios} from 'axios';

class Request {
  static request: Axios;
  constructor(baseURL: string, token: string) {
    Request.request = axios.create({
      baseURL,
      auth: {
        username: token,
        password: '',
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  static async get(url: string) {
    return await this.request.get(url);
  }
  static async delete(url: string) {
    return await this.request.delete(url);
  }
  static async post(url: string, data: unknown) {
    // @todo create interface for nodeping account
    return await this.request.post(url, data);
  }
  static async put(url: string, data: unknown) {
    // @todo create interface for nodeping account
    return await this.request.put(url, data);
  }
}

export default Request;
