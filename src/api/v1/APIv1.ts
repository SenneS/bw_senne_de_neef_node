import { FastifyInstance } from 'fastify';
import { installAPIv1Auth } from './auth/controller';
import { installAPIv1Calendar } from './calendar/controller';
import { installAPIv1Event } from './event/controller';
export function installAPIv1(server : FastifyInstance) {
    server.register((instance, opts, done) => {
        installAPIv1Auth(instance);
        installAPIv1Calendar(instance);
        installAPIv1Event(instance);
        done();
    }, {prefix: '/v1'})
}