import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { CalendarSchemas } from './schemas';

namespace CalendarController {

    export async function createCalendar(this : FastifyInstance, request : FastifyRequest, reply : FastifyReply) {
        try {
            console.log('hello');
            return reply.status(200);
        }
        catch (e) {
            console.log(`error: ${e}`);
            return reply.status(500).send({status: 500, message: 'internal server error.', data: null})
        }
    }

    export async function getCalendar(this : FastifyInstance, request : FastifyRequest, reply : FastifyReply) {
        try {
            return reply.status(200).send({});
        }
        catch (e) {
            console.log(`error: ${e}`);
            return reply.status(500).send({status: 500, message: 'internal server error.', data: null})
        }
    }

    export async function updateCalendar(this : FastifyInstance, request : FastifyRequest, reply : FastifyReply) {
        try {
            return reply.status(200);
        }
        catch (e) {
            console.log(`error: ${e}`);
            return reply.status(500).send({status: 500, message: 'internal server error.', data: null})
        }
    }

    export async function deleteCalendar(this : FastifyInstance, request : FastifyRequest, reply : FastifyReply) {
        try {
            return reply.status(200);
        }
        catch (e) {
            console.log(`error: ${e}`);
            return reply.status(500).send({status: 500, message: 'internal server error.', data: null})
        }
    }
}

export function installAPIv1Calendar(server : FastifyInstance) {
    server.register((instance, opts, done) => {
        instance.post('/', {
            schema: {
                body: CalendarSchemas.createRequestBodySchema
            }
        },CalendarController.createCalendar); //create

        instance.delete('/:id', {
            schema: {
                params: CalendarSchemas.deleteRequestParamsSchema
            }
        }, CalendarController.deleteCalendar); //delete

        instance.patch('/:id', {
            schema: {
                params: CalendarSchemas.updateRequestParamsSchema,
                body: CalendarSchemas.updateRequestBodySchema,
            }
        }, CalendarController.updateCalendar); //update

        instance.get('/:id', {
            schema: {
                params: CalendarSchemas.readRequestParamsSchema
            }
        }, CalendarController.getCalendar); //read

        done();
    }, {prefix: '/calendar'});
}

/*
    export async function xxxxxx(this : FastifyInstance, request : FastifyRequest, reply : FastifyReply) {
        try {

        }
        catch (e) {
            console.log(`error: ${e}`);
            return reply.status(500).send({status: 500, message: 'internal server error.', data: null})
        }
    }
 */