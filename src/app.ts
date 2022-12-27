import fastify from 'fastify';
import { setupDatabase } from './database';
import { installRoutes } from './routes';

async function startServer() {

    if(!(await setupDatabase())) {
        console.log('failed to connect to database.');
        return;
    }
    console.log('[INFO] connected to database.');

    const server = fastify({});

    installRoutes(server);

    server.listen({port: 8080}).catch((reason) => {
        console.log(`exception: ${reason}`);
    })
}

startServer();