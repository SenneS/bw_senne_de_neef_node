import fastifyCookie from '@fastify/cookie';
import fastifyCors from '@fastify/cors';
import fastifyFormbody from '@fastify/formbody';
import fastifyJwt from '@fastify/jwt';
import { fastifyOauth2, FastifyOAuth2Options } from '@fastify/oauth2';

import { FastifyInstance, FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';

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

    server.register(fastifyOauth2, {
        name: 'googleOAuth2',
        scope: ['email', 'profile'],
        credentials: {
            client: {
                id: appConfig.GOOGLE_CLIENT_ID,
                secret: appConfig.GOOGLE_CLIENT_SECRET
            },
            auth: fastifyOauth2.GOOGLE_CONFIGURATION
        },
        startRedirectPath: '/api/v1/auth/google',
        callbackUri: 'http://localhost:8080/api/v1/auth/google/callback'
    });
}

