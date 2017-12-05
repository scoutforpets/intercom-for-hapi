# Intercom for Hapi [![Build Status](https://travis-ci.org/scoutforpets/intercom-for-hapi.svg?branch=master)](https://travis-ci.org/scoutforpets/intercom-for-hapi)

A [Hapi](https://github.com/hapijs/hapi) plugin for quickly accessing the [Intercom for Node](https://github.com/intercom/intercom-node) client.

## Installation

`npm install intercom-for-hapi --save`

`yarn add intercom-for-hapi --save`

## Getting Started

The purpose of this plugin is simply to allow you to instantiate the Intercom client once and then make it accessible to your entire Hapi application.

### Example

```js
const Hapi = require('hapi');
const server = new Hapi.Server();

const options = {
    token: '123sds88'   // REQUIRED
};

// Register the plugin
await server.register({
    plugin: require('intercom-for-hapi'),
    options: options
});

// Declare a route that uses it
server.route( {
    'method': 'GET',
    'path': '/users',
    'handler': usersHandler
});

await server.start();

function usersHandler (request, h) {

    var client = request.intercom;     // also available via request.server.app.intercom

    client.users.list(function (res) {
      return res;
    });
};
```
