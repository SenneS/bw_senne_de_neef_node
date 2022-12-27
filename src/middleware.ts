import fastifyFormbody from '@fastify/formbody';
import { FastifyInstance } from 'fastify';

export function installMiddleware(server : FastifyInstance) {
    server.register(fastifyFormbody);
}