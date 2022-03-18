import Checks from './checks';
import request from './request';

interface AccountData {
  name: string;
  contactname: string;
  email: string;
  timezone: string;
  location: string;
  emailme?: string;
}

interface AccountDetails {
  customerid?: string;
  name?: string;
  timezone?: string;
  location?: string;
  emailme?: string;
  status?: string;
  autodiagnotifications?: string;
}

class Accounts {
  token: string;
  customerid?: string;
  constructor(token: string, customerid?: string) {
    this.token = token;
    this.customerid = customerid;
  }
  async get() {
    if (this.customerid) {
      const resp = await request.get(`accounts/${this.customerid}`);
      return resp.data;
    }
    const resp = await request.get('accounts');
    return resp.data;
  }
  async add(data: AccountData) {
    if (!data.name) {
      return 'account name missing';
    }
    if (!data.email) {
      return 'email missing';
    }
    if (!data.contactname) {
      return 'contact name is missing';
    }
    const params = {
      name: data.name,
      contactname: data.contactname,
      timezone: data.timezone || '2.0',
      location: data.location || 'nam',
      emailme: data.emailme || 'no',
      email: data.email,
    };
    const resp = await request.post('accounts/', params);
    return resp.data;
  }
  async update(data: AccountDetails) {
    const resp = await request.put('accounts/', data);
    return resp.data;
  }
  async delete() {
    const resp = await request.delete(`accounts?customerid=${this.customerid}`);
    return resp.data;
  }
  async disableNotifcations() {
    const params = {
      customerid: this.customerid,
      accountsuppressall: true,
    };
    const resp = await request.put('accounts/', params);
    return resp.data;
  }
  async enableNotifcations() {
    const params = {
      customerid: this.customerid,
      accountsuppressall: false,
    };
    const resp = await request.put('accounts/', params);
    return resp.data;
  }
  checks() {
    const checks = new Checks(this.token, this.customerid);
    return checks.get();
  }
}

export default Accounts;
