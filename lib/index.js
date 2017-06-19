'use strict';

const Intercom = require('intercom-client');

exports.register = (server, options, next) => {

    if (!options.token) {
        throw new Error('No Intercom token found. Please specify using the `token` option.');
    }

    // Create the Intercom client instance at `server.app.intercom`
    const client = new Intercom.Client({ token: options.token });
    server.app.intercom = client;
    server.decorate('request', 'intercom', client);

    return next();
};


exports.register.attributes = {
    pkg: require('../package.json')
};
