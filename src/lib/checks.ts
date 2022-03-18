/*
GET
POST & PUT
DELETE
Disable

  await nodeping.checks();
  await nodeping.checks().add({});
  await nodeping.accounts('202202270952BOFXB').checks();

  await nodeping.checks().get(); // get all parent account checks
  await nodeping.checks('202202270952BOFXB').get(); // get customer account checks
  await nodeping.checks('202202270952BOFXB').get('X327095DJKNISOXMB'); // get customer account check
  await nodeping.checks().get('X327095DJKNISOXMB'); // get parent check

  await nodeping.checks().delete('X327095DJKNISOXMB');    // delete parent check
  await nodeping.checks('202202270952BOFXB).delete('X327095DJKNISOXMB'); //delete customer check

*/

import Diagnostics, {DiagnosticFields} from './diagnostics';
import request from './request';
import {DataModel} from './results';

const checktypes: any = {
  AGENT: ['checktoken'],
  AUDIO: ['verifyvolume', 'volume'],
  CLUSTER: ['data'],
  DOHDOT: [
    'contentstring',
    'dnstoresolve',
    'dnstype',
    'verify',
    'sendheaders',
    'method',
    'edns',
    'ipv6',
  ],
  DNS: [
    'contentstring',
    'dnssection',
    'port',
    'dnstoresolve',
    'dnstype',
    'dnsrd',
    'transport',
    'verify',
  ],
  FTP: ['invert', 'conteststring', 'port', 'password', 'username'],
  HTTP: ['ipv6'],
  HTTPADV: [
    'invert',
    'contentstring',
    'regex',
    'data',
    'method',
    'postdata',
    'receiveheaders',
    'sendheaders',
    'statuscode',
    'ipv6',
  ],
  HTTPCONTENT: ['invert', 'contentstring', 'regex', 'ipv6'],
  HTTPPARSE: ['sendheaders', 'fields'],
  IMAP4: [
    'port',
    'verify',
    'email',
    'password',
    'secure',
    'username,',
    'warningdays',
  ],
  MYSQL: [],
  NTP: ['invert', 'port'],
  PING: ['ipv6'],
  POP3: ['port', 'verify', 'password', 'secure', 'username', 'warningdays'],
  PORT: ['invert', 'port'],
  PUSH: ['fields', 'checktoken'],
  RBL: ['ignore'],
  RDP: [],
  SIP: ['transport'],
  SMTP: [
    'invert',
    'port',
    'verify',
    'email',
    'password',
    'secure',
    'username',
    'warningdays',
  ],
  SNMP: ['fields', 'snmpv', 'snmpcom'],
  SPEC10DNS: ['data'],
  SPEC10RDDS: ['data'],
  SSH: ['invert', 'contentstring', 'port', 'password', 'username'],
  SSL: ['warningdays', 'servername'],
  WEBSOCKET: ['invert', 'contentstring', 'data'],
  WHOIS: ['whoisserver', 'ipv6', 'invert', 'contentstring', 'warningdays'],
};

interface CheckParameters {
  id?: string;
  customerid?: string;
  type: string;
  target?: string;
  label?: string;
  interval?: string;
  enabled?: string;
  public?: string;
  runlocations?: string;
  homeloc?: string;
  threshold?: string;
  sens?: string;
  notifications?: string;
}

class Checks {
  token: string;
  customerid?: string;
  checkid?: string;
  constructor(token: string, customerid?: string) {
    this.token = token;
    this.customerid = customerid;
  }
  async get(checkid?: string) {
    let query = 'checks';
    if (checkid && this.customerid) {
      query = `checks/${checkid}?customerid=${this.customerid}`; // @todo turn this param into object instead
    }
    if (checkid && !this.customerid) {
      query = `checks/${checkid}`;
    }
    if (this.customerid) {
      query = `checks?customerid=${this.customerid}`;
    }

    const resp = await request.get(query);
    return resp.data;
  }

  targetRequired(type: string) {
    const nonRequiredTypes = [
      'AGENT',
      'DNS',
      'PUSH',
      'SPEC10DNS',
      'SPEC10RDDS',
    ];
    return nonRequiredTypes.includes(type);
  }

  checkTarget(target: string) {
    const httpTypes = ['HTTPCONTENT', 'HTTPPARSE', 'HTTPADV'];
    if (httpTypes.includes(target)) {
      if (
        target.substring(0, 7) === 'http://' ||
        target.substring(0, 8) === 'https://'
      ) {
        return true;
      }
    } else {
      return true;
    }

    return false;
  }
  async add(data: CheckParameters) {
    if (!data.type) {
      return 'check type missing';
    }
    if (!checktypes[data.type]) {
      return 'check type not valid';
    }
    if (this.targetRequired(data.type)) {
      if (!data.target) {
        return 'check target is required';
      }
      if (!this.checkTarget(data.target)) {
        return 'check target requires http:// or https://';
      }
    }

    const resp = await request.post('checks/', data);
    return resp.data;
  }
  async update(data: Object, checkid?: string) {
    const resp = await request.put(`checks/${checkid}`, data);
    return resp.data;
  }
  async enable(checkid?: string) {
    const resp = await request.put(`checks/${checkid}`, {
      enabled: true,
    });
    return resp.data;
  }
  async disable(checkid?: string) {
    const resp = await request.put(`checks/${checkid}`, {
      enabled: false,
    });
    return resp.data;
  }
  async delete(checkid?: string) {
    if (checkid && this.customerid) {
      await request.delete(`checks/${checkid}?customerid=${this.customerid}`);
    }
    if (checkid && !this.customerid) {
      await request.delete(`checks/${checkid}`);
    }
  }
  async diagnostics(params: DiagnosticFields) {
    const diag = new Diagnostics(this.token);
    if (this.customerid) params.customerid = this.customerid;
    return await diag.get(params);
  }
  queryString(params: DataModel) {
    return Object.keys(params)
      .map(key => key + '=' + params[key])
      .join('&');
  }

  async notifications(checkid: string) {
    const params: any = {};
    if (this.customerid) params.customerid = this.customerid;
    const resp = await request.get(
      `notifications/${checkid}?${this.queryString(params)}`
    );
    return resp.data;
  }
}

export default Checks;
