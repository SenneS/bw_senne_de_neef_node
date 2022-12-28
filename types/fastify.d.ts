import { OAuth2Namespace } from '@fastify/oauth2';

declare module 'fastify' {
    interface FastifyInstance {
        authenticate: any;
        googleOAuth2: OAuth2Namespace;
    }
}