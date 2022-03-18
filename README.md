# NodePing API client in nodejs

This module is not maintained or supported by NodePing

The name nodeping belongs to NodePing LLC and is being used with the permission of NodePing LLC.

### NodePing - Uptime Monitoring for Websites and Services

https://nodeping.com/

## Installation

```
npm install nodeping --save

```

## Usage and Initialization

```js
const NodePing = require('node-ping');
const nodeping = new NodePing('O3WIL82W-8I20-39QQ-E9WW-I3WWL9W0WKW9');
```

## API Reference and Usage

- Accounts
- Checks
- Diagnostics
- Results and Uptime
- Contacts

### Accounts

Get all accounts

```js
const accounts = await nodeping.accounts();
```

Add new account

```js
const newAccount = await nodeping.accounts().add({
  name: 'test account',
  contactname: 'andrew',
  email: 'andrew@siply.io',
  timezone: '2.0',
  location: 'nam',
  emailme: 'no',
});
```

Update account

```js
const updatedAccount = await nodeping.accounts('FE270953JKN111XMC').update({
  email: 'andrew@siply.io',
  emailme: 'no',
});
```

Delete account

```js
await nodeping.accounts('FE270953JKN111XMC').delete();
```

Get account checks

```js
const checks = await nodeping.accounts('FE270953JKN111XMC').checks();
```

Enable Notifications

```js
const checks = await nodeping
  .accounts('FE270953JKN111XMC')
  .enableNotifcations();
```

Disable Notifications

```js
const checks = await nodeping
  .accounts('FE270953JKN111XMC')
  .disableNotifcations();
```

### Checks

Get all checks from parents accont

```js
const checks = await nodeping.checks();
```

Add check to parent account

```js
await nodeping.checks().add({});
```

Get all parent account checks

```js
const check = await nodeping.checks().get();
```

Get customer account checks

```js
await nodeping.checks('FE270953JKN111XMC').get();
```

Get check from customer account

```js
const check = await nodeping
  .checks('FE270953JKN111XMC')
  .get('X327095DJKNISOXMB');
```

Get check from parent account

```js
const check = await nodeping.checks().get('FE270953JKN111XMC');
```

Delete check from customer account

```js
await nodeping.checks('332202270952BOFXB').delete('X327095DJKNISOXMB');
```

Add check to parent account

```js
await nodeping.checks().add({
  type: 'HTTP',
  target: 'http://siply.io',
});
```

Add check to customer account

```js
await nodeping.checks('332202270952BOFXB').add({
  type: 'HTTP',
  target: 'http://siply.io',
});
```
