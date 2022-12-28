import { FastifyInstance } from 'fastify';

namespace CalendarController {

}

export function installAPIv1Calendar(server : FastifyInstance) {
    server.register((instance, opts, done) => {
        done();
    }, {prefix: '/calendar'});
}