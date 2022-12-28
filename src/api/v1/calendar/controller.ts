import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

namespace CalendarController {

    export async function createCalendar(this : FastifyInstance, request : FastifyRequest, reply : FastifyReply) {
        try {

        }
        catch (e) {
            console.log(`error: ${e}`);
            return reply.status(500).send({status: 500, message: 'internal server error.', data: null})
        }
    }

    export async function getCalendar(this : FastifyInstance, request : FastifyRequest, reply : FastifyReply) {
        try {

        }
        catch (e) {
            console.log(`error: ${e}`);
            return reply.status(500).send({status: 500, message: 'internal server error.', data: null})
        }
    }

    export async function updateCalendar(this : FastifyInstance, request : FastifyRequest, reply : FastifyReply) {
        try {

        }
        catch (e) {
            console.log(`error: ${e}`);
            return reply.status(500).send({status: 500, message: 'internal server error.', data: null})
        }
    }

    export async function deleteCalendar(this : FastifyInstance, request : FastifyRequest, reply : FastifyReply) {
        try {

        }
        catch (e) {
            console.log(`error: ${e}`);
            return reply.status(500).send({status: 500, message: 'internal server error.', data: null})
        }
    }
}

export function installAPIv1Calendar(server : FastifyInstance) {
    server.register((instance, opts, done) => {
        instance.post('/', CalendarController.createCalendar); //create
        instance.delete('/:id', CalendarController.deleteCalendar); //delete
        instance.patch('/:id', CalendarController.updateCalendar); //update
        instance.get('/:id', CalendarController.getCalendar); //read
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