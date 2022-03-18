import request from './request';

interface Params {
  [key: string]: string | undefined;
  id?: string | undefined;
  customerid?: string | undefined;
}

class Contacts {
  token: string;
  customerid?: string;
  constructor(token: string, customerid?: string) {
    this.token = token;
    this.customerid = customerid;
  }
  async get(contactid?: string) {
    const params: Params = {};
    if (this.customerid) params.customerid = this.customerid;
    if (contactid) params.id = contactid;
    const queryString = Object.keys(params)
      .map(key => key + '=' + params[key])
      .join('&');
    const resp = await request.get(`contacts?${queryString}`);
    return resp.data;
  }
}

export default Contacts;
