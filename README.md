# Intercom for Hapi [![Build Status](https://travis-ci.org/scoutforpets/intercom-for-hapi.svg?branch=master)](https://travis-ci.org/scoutforpets/intercom-for-hapi)

A [Hapi](https://github.com/hapijs/hapi) plugin for quickly accessing the [Intercom for Node](https://github.com/intercom/intercom-node) client.

## Installation

`npm install intercom-for-hapi --save`

`yarn add intercom-for-hapi --save`

## Getting Started

The purpose of this plugin is simply to allow you to instantiate the Intercom client once and then make it accessible to your entire Hapi application.

### Example

```js
var Hapi = require('hapi');
var server = new Hapi.Server();
server.connection({ host: 'localhost' });

var options = {
    token: '123sds88'   // REQUIRED
};

// Register the plugin
server.register({
    register: require('intercom-for-hapi'),
    options: options
}, function (err) {

    if (err) {
        console.error(err);
    }
    else {
        server.start(function () {

            console.info('Server started at ' + server.info.uri);
        });
    }
});

// Declare a route that uses it
server.route( {
    'method': 'GET',
    'path': '/users',
    'handler': usersHandler
});

function usersHandler (request, reply) {

    var client = request.intercom;     // also available via request.server.app.intercom

    client.users.list(function (res) {
      return reply(res);
    });
};

server.start(function() {

    console.log("Server started at " + server.info.uri);
});
```
