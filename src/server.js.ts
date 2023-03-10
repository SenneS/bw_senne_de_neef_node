import { fastifyStatic } from '@fastify/static';
import fastify, { FastifyInstance } from 'fastify';
import path from 'path';
import { installAPIs } from './api/APIs';
import { appConfig } from './config';
import { setupDatabase } from './database';
import { installMiddleware } from './middleware';

export let serverInstance : FastifyInstance = null;

export async function startServer() {

    if(!(await setupDatabase())) {
        console.log('failed to connect to database.');
        return;
    }
    console.log('[INFO] connected to database.');

    serverInstance = fastify({});
    serverInstance.register(fastifyStatic, {
        root: path.join(__dirname, '../public'),
        wildcard: false
    });

    installMiddleware(serverInstance);

    installAPIs(serverInstance);

    serverInstance.listen({port: appConfig.PORT, host: appConfig.HOST}).then(() => {
        console.log(`[INFO] listening on http://${appConfig.HOST}:${appConfig.PORT}`);
    }).catch((reason) => {
        console.log(`[ERROR] exception: ${reason}`);
    })
}