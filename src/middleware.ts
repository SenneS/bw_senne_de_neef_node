import fastifyCors from '@fastify/cors';
import fastifyFormbody from '@fastify/formbody';
import fastifyJwt from '@fastify/jwt';
import { FastifyInstance } from 'fastify';
import { appConfig } from './config';

export function installMiddleware(server : FastifyInstance) {
    server.register(fastifyCors, {
        origin: true
    });
    server.register(fastifyJwt, {
        secret: appConfig.JWT_SECRET
    })
    server.register(fastifyFormbody);
}