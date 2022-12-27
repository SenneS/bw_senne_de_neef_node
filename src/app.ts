import fastify from 'fastify';
import path from 'path';
import { setupDatabase } from './database';
import { installRoutes } from './routes';
import { fastifyStatic } from '@fastify/static';

async function startServer() {

    if(!(await setupDatabase())) {
        console.log('failed to connect to database.');
        return;
    }
    console.log('[INFO] connected to database.');

    const server = fastify({});
    server.register(fastifyStatic, {
        root: path.join(__dirname, '../public'),
        wildcard: false
    });

    installRoutes(server);

    server.listen({port: 8080}).catch((reason) => {
        console.log(`exception: ${reason}`);
    })
}

startServer();