import { FastifyInstance } from 'fastify';
import { installAPIv1 } from './v1/APIv1';

export function installAPIs(server : FastifyInstance) {

    server.register((instance, opts, done) => {
        installAPIv1(instance);
        done();
    }, { prefix: '/api'});
}