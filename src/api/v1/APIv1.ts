import { FastifyInstance } from 'fastify';
import { installAPIv1Auth } from './auth/controller';
export function installAPIv1(server : FastifyInstance) {
    server.register((instance, opts, done) => {
        installAPIv1Auth(instance);
        done();
    }, {prefix: '/v1'})
}