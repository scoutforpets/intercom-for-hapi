'use strict';

// Load modules

const Code = require('code');
const Hapi = require('hapi');
const Hoek = require('hoek');
const Lab = require('lab');
const Intercom = require('../lib');

// Test shortcuts

const lab = exports.lab = Lab.script();
const it = lab.it;
const expect = Code.expect;

// Mock data
const fakeToken = '1d23x88';


it('cannot be registered (no token)', (done) => {

    const fn = (options) => {

        return () => {

            const server = new Hapi.Server();
            server.connection();
            server.register({ register: Intercom }, Hoek.ignore);
            return server;
        };
    };

    expect(fn()).to.throw();
    done();
});


it('can be registered (with token)', (done) => {

    const server = new Hapi.Server();
    const plugin = {
        register: Intercom,
        options: { token: fakeToken }
    };

    server.register(plugin, (err) => {

        expect(err).to.not.exist();
        expect(server.app.intercom).to.exist();
        done();
    });
});


it('decorates the request object with a intercom prop', (done) => {

    const server = new Hapi.Server();
    const plugin = {
        register: Intercom,
        options: { token: fakeToken }
    };

    server.register(plugin, (err) => {

        expect(err).to.not.exist();

        server.connection();
        server.route({
            method: 'GET',
            path: '/',
            config: {
                handler: (request, reply) => {

                    expect(request.intercom).to.exist();
                    return reply('GREAT SUCCESS!');
                }
            }
        });

        const payload = {
            method: 'GET',
            url: '/'
        };

        server.inject(payload, (response) => {

            expect(response.statusCode).to.equal(200);
            expect(response.result).to.equal('GREAT SUCCESS!');
            done();
        });
    });
});
