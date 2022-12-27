import { FastifyInstance } from 'fastify';

export function installRoutes(server : FastifyInstance) {
    server.get('/error', async (request, reply) => {
        return reply.status(500).send('error');
    })
}
