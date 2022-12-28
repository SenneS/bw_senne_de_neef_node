import fastifyCookie from '@fastify/cookie';
import fastifyCors from '@fastify/cors';
import fastifyFormbody from '@fastify/formbody';
import fastifyJwt from '@fastify/jwt';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { appConfig } from './config';

export function installMiddleware(server : FastifyInstance) {
    server.register(fastifyCors, {
        origin: true
    });
    server.register(fastifyCookie, {
        secret: appConfig.COOKIE_SECRET
    })
    server.register(fastifyJwt, {
        secret: appConfig.JWT_SECRET
    })
    server.register(fastifyFormbody);

    server.decorate('authenticate', async (request : FastifyRequest, reply : FastifyReply) => {
        try {
            await request.jwtVerify();
        }
        catch {
            return reply.status(401).send({status: 401, message: 'You need to be authorized to access this route.', data: null})
        }
    });
}

declare module 'fastify' {
    interface FastifyInstance {
        authenticate: any
    }
}