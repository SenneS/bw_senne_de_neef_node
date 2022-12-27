import fastify from 'fastify';
import { ServerApiVersion } from 'mongodb';
import path from 'path';
import mongoose from 'mongoose';

const certificatePath = path.join(__dirname, '../cert.pem');

mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://cluster0.h748kzp.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority',
    {
        sslKey: certificatePath,
        sslCert: certificatePath,
        serverApi: ServerApiVersion.v1,
    }
).then((mongo) => {
    console.log('connected');
}).catch((reason) => {
    console.log(`failed to connect: ${reason}`);
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