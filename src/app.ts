import fastify from 'fastify';
import path from 'path';
import { installAPIs } from './api/APIs';
import { setupDatabase } from './database';
import { fastifyStatic } from '@fastify/static';
import { installMiddleware } from './middleware';

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

    installMiddleware(server);

    installAPIs(server);

    server.listen({port: 8080}).catch((reason) => {
        console.log(`exception: ${reason}`);
    })
}

startServer();