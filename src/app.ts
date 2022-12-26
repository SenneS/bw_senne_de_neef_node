import fastify from 'fastify';

const server = fastify({});

server.get('/', async (request, reply) => {
    return reply.status(200).send('hello world');
})

server.get('/error', async (request, reply) => {
    return reply.status(500).send('error');
})

server.listen({port: 8080}).catch((reason) => {
    console.log(`exception: ${reason}`);
})

console.log('hello world');