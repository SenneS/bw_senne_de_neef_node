import fastify from 'fastify';
import { MongoClient, ServerApiVersion } from 'mongodb';
import path from 'path';

const certificatePath = path.join(__dirname, '../cert.pem');

const client = new MongoClient(
    'mongodb+srv://cluster0.h748kzp.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority',
    {
        sslKey: certificatePath,
        sslCert: certificatePath,
        serverApi: ServerApiVersion.v1
    }
);

client.connect().then(database => {
    console.log(database);
    client.close();
}).catch((reason) => {
    console.log(reason);
})

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