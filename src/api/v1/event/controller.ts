import { FastifyInstance } from 'fastify';

namespace EventController {

}

export function installAPIv1Event(server : FastifyInstance) {
    server.register((instance, opts, done) => {
        done();
    }, {prefix: '/event'});
}