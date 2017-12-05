'use strict';

// Load modules

const Code = require('code');
const Hapi = require('hapi');
const Lab = require('lab');
const Intercom = require('../lib');

// Test shortcuts

const lab = exports.lab = Lab.script();
const it = lab.it;
const expect = Code.expect;

// Mock data
const fakeToken = '1d23x88';


it('cannot be registered (no token)', async () => {

    const fn = async (options) => {
        const server = new Hapi.Server();
        await server.start();
        await server.register({ plugin: Intercom });
        return server;
    };

    await expect(fn()).to.reject();
});


it('can be registered (with token)', async () => {

    const server = new Hapi.Server();
    const plugin = {
        plugin: Intercom,
        options: { token: fakeToken }
    };
    
    await server.register(plugin);

    expect(server.app.intercom).to.exist();
});


it('decorates the request object with a intercom prop', async () => {

    const server = new Hapi.Server();
    const plugin = {
        plugin: Intercom,
        options: { token: fakeToken }
    };

    await server.register(plugin);

    await server.start();
    server.route({
        method: 'GET',
        path: '/',
        config: {
            handler: (request, h) => {

                expect(request.intercom).to.exist();
                return 'GREAT SUCCESS!';
            }
        }
    });

    const payload = {
        method: 'GET',
        url: '/'
    };

    const response = await server.inject(payload);

    expect(response.statusCode).to.equal(200);
    expect(response.result).to.equal('GREAT SUCCESS!');
});
