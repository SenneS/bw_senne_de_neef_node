import { FastifyInstance } from 'fastify';

export function installRoutes(server : FastifyInstance) {
    server.get('/', async (request, reply) => {
        return reply.status(200).send('hello world');
    })

    server.get('/error', async (request, reply) => {
        return reply.status(500).send('error');
    })
}
