import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

namespace EventController {
    export async function createEvent(this : FastifyInstance, request : FastifyRequest, reply : FastifyReply) {
        try {

        }
        catch (e) {
            console.log(`error: ${e}`);
            return reply.status(500).send({status: 500, message: 'internal server error.', data: null})
        }
    }

    export async function readEvent(this : FastifyInstance, request : FastifyRequest, reply : FastifyReply) {
        try {

        }
        catch (e) {
            console.log(`error: ${e}`);
            return reply.status(500).send({status: 500, message: 'internal server error.', data: null})
        }
    }

    export async function updateEvent(this : FastifyInstance, request : FastifyRequest, reply : FastifyReply) {
        try {

        }
        catch (e) {
            console.log(`error: ${e}`);
            return reply.status(500).send({status: 500, message: 'internal server error.', data: null})
        }
    }

    export async function deleteEvent(this : FastifyInstance, request : FastifyRequest, reply : FastifyReply) {
        try {

        }
        catch (e) {
            console.log(`error: ${e}`);
            return reply.status(500).send({status: 500, message: 'internal server error.', data: null})
        }
    }
}

export function installAPIv1Event(server : FastifyInstance) {
    server.register((instance, opts, done) => {
        instance.post('/', EventController.createEvent); //create
        instance.get('/:id', EventController.readEvent); //read
        instance.delete('/:id', EventController.deleteEvent); //delete
        instance.patch('/:id', EventController.updateEvent); //update
        done();
    }, {prefix: '/event'});
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