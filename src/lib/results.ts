import request from './request';

export interface ResultsType {
  customerid?: string | undefined;
  span?: string;
  limit?: number;
  start?: string;
  end?: string;
  clean?: string;
}

export interface UptimeType {
  customerid?: string | undefined;
  span?: string;
  limit?: number;
  start?: string;
  end?: string;
  clean?: string;
}

export interface DataModel {
  [key: string]: string | ResultsType | UptimeType;
}

class Results {
  constructor() {}
  queryString(params: DataModel) {
    return Object.keys(params)
      .map(key => key + '=' + params[key])
      .join('&');
  }
  async get(data: DataModel) {
    if (!data.id) {
      return 'missing check id';
    }
    const params: DataModel = {};
    if (data) {
      if (data.customerid) params.customerid = data.customerid;
      if (data.span) params.span = data.span;
      if (data.limit) params.limit = data.limit;
      if (data.start) params.start = data.start;
      if (data.end) params.end = data.end;
      if (data.clean) params.clean = data.clean;
    }
    console.log(params);
    const resp = await request.get(
      `results/${data.id}?${this.queryString(params)}`
    );
    return resp.data;
  }
  async uptime(data: DataModel) {
    if (!data.id) {
      return 'missing check id';
    }
    const params: DataModel = {};
    if (data) {
      if (data.customerid) params.customerid = data.customerid;
      if (data.interval) params.interval = data.interval;
      if (data.start) params.start = data.start;
      if (data.end) params.end = data.end;
      if (data.offset) params.offset = data.offset;
    }
    const resp = await request.get(
      `results/uptime/${data.id}?${this.queryString(params)}`
    );
    return resp.data;
  }
  async events(data: DataModel) {
    if (!data.id) {
      return 'missing check id';
    }
    const params: DataModel = {};
    if (data) {
      if (data.customerid) params.customerid = data.customerid;
      if (data.start) params.start = data.start;
      if (data.end) params.end = data.end;
      if (data.limit) params.limit = data.limit;
    }
    const resp = await request.get(
      `results/events/${data.id}?${this.queryString(params)}`
    );
    return resp.data;
  }
  async current(customerid?: string) {
    const params: DataModel = {};
    if (customerid) params.customerid = customerid;
    const resp = await request.get(
      `results/current?${this.queryString(params)}`
    );
    return resp.data;
  }
}

export default Results;
