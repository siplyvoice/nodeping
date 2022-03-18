import Accounts from './lib/accounts';
import Checks from './lib/checks';
import Contacts from './lib/contacts';
import Info from './lib/info';
import request from './lib/request';
import Results, {DataModel} from './lib/results';

class NodePing {
  token: string;
  constructor(token: string) {
    this.token = token;
    const baseURL = 'https://api.nodeping.com/api/1/';
    new request(baseURL, token);
  }
  accounts(customerid?: string) {
    return new Accounts(this.token, customerid);
  }
  checks(customerid?: string) {
    return new Checks(this.token, customerid);
  }
  contacts(customerid?: string) {
    return new Contacts(this.token, customerid);
  }
  info(action?: string) {
    return new Info(action);
  }
  async results(data: DataModel) {
    const results = new Results();
    return results.get(data);
  }
  async events(data: DataModel) {
    const results = new Results();
    return results.events(data);
  }
  async uptime(data: DataModel) {
    const results = new Results();
    return results.uptime(data);
  }
  async current() {
    const results = new Results();
    return results.current();
  }
}

module.exports = exports = NodePing;
Object.defineProperty(exports, '__esModule', {value: true});
export default NodePing;
