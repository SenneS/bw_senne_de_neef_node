import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { Calendar, CalendarSchema } from '../../../models/Calendar';
import { IUserJWT } from '../../../models/User';
import { CalendarSchemas } from './schemas';

namespace CalendarController {

    type ReadCalendarRequest = FastifyRequest<{
        Params: {
            id: string;
        }
    }>;

    type UpdateCalendarRequest = FastifyRequest<{
        Params: {
            id: string;
        },
        Body: {
            name?: string;
            description?: string;
        }
    }>;

    type DeleteCalendarRequest = FastifyRequest<{
        Params: {
            id: string;
        }
    }>;

    type GetCalendarsRequest = FastifyRequest<{
        Querystring: {
            page: number,
            items: number
        }
    }>;

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

    export async function readCalendar(this : FastifyInstance, request : ReadCalendarRequest, reply : FastifyReply) {
        try {
            const { id } = request.params;
            const user = request.user as IUserJWT;

            const calendar = await Calendar.findById(id);
            if(!calendar) {
                return reply.status(404).send({status: 404, message: 'id does not correspond to a calendar.', data: null});
            }
            if(calendar._userId != user.sub) {
                return reply.status(404).send({status: 403, message: 'You are not allowed to read someone elses calendar.', data: null});
            }

            return reply.status(200).send({});
        }
        catch (e) {
            console.log(`error: ${e}`);
            return reply.status(500).send({status: 500, message: 'internal server error.', data: null})
        }
    }

    export async function updateCalendar(this : FastifyInstance, request : UpdateCalendarRequest, reply : FastifyReply) {
        try {
            const { id } = request.params;
            const { name, description } = request.body;

            const user = request.user as IUserJWT;

            const calendar = await Calendar.findById(id);
            if(!calendar) {
                return reply.status(404).send({status: 404, message: 'id does not correspond to a calendar.', data: null});
            }
            if(calendar._userId != user.sub) {
                return reply.status(404).send({status: 403, message: 'You are not allowed to update someone elses calendar.', data: null});
            }

            if(name) {
                calendar.name = name;
            }
            if(description) {
                calendar.description = description;
            }
            await calendar.save();

            return reply.status(200).send({status: 200, message: null, data: null});
        }
        catch (e) {
            console.log(`error: ${e}`);
            return reply.status(500).send({status: 500, message: 'internal server error.', data: null})
        }
    }

    export async function deleteCalendar(this : FastifyInstance, request : DeleteCalendarRequest, reply : FastifyReply) {
        try {
            const { id } = request.params;
            const user = request.user as IUserJWT;

            const calendar = await Calendar.findOne({_id: id});
            if(!calendar) {
                return reply.status(404).send({status: 404, message: 'id does not correspond to a calendar.', data: null});
            }
            if(calendar._userId != user.sub) {
                return reply.status(404).send({status: 403, message: 'You are not allowed to delete someone elses calendar.', data: null});
            }
            await Calendar.findByIdAndDelete(id);
            return reply.status(200).send({status: 200, message: null, data: null});
        }
        catch (e) {
            console.log(`error: ${e}`);
            return reply.status(500).send({status: 500, message: 'internal server error.', data: null})
        }
    }

    export async function getCalendars(this : FastifyInstance, request : GetCalendarsRequest, reply : FastifyReply) {
        try {
            const { page, items } = request.query;
            const user = request.user as IUserJWT;

            const count = await Calendar.find({_userId: user.sub})
            const calendars = await Calendar.find({}).skip(page * items).limit(items);

            const data = calendars.map((calendar) => {
                return {name: calendar.name, description: calendar.description};
            });

            return reply.status(200).send({status: 200, message: null, data: {count: count, calendars: data}});
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
            onRequest: instance.authenticate,
            schema: {
                body: CalendarSchemas.createRequestBodySchema,
                response: {
                    200: CalendarSchemas.createResponseBodySchema
                }
            }
        },CalendarController.createCalendar); //create

        instance.get('/:id', {
            onRequest: instance.authenticate,
            schema: {
                params: CalendarSchemas.readRequestParamsSchema,
                response: {
                    200: CalendarSchemas.readResponseBodySchema
                }
            }
        }, CalendarController.readCalendar); //read

        instance.patch('/:id', {
            onRequest: instance.authenticate,
            schema: {
                params: CalendarSchemas.updateRequestParamsSchema,
                body: CalendarSchemas.updateRequestBodySchema,
                response: {
                    200: CalendarSchemas.updateResponseBodySchema
                }
            }
        }, CalendarController.updateCalendar); //update

        instance.delete('/:id', {
            onRequest: instance.authenticate,
            schema: {
                params: CalendarSchemas.deleteRequestParamsSchema,
                response: {
                    200: CalendarSchemas.deleteResponseSchema
                }
            }
        }, CalendarController.deleteCalendar); //delete

        instance.get('/', {
            onRequest: instance.authenticate,
            schema: {
                querystring: CalendarSchemas.getRequestQuerySchema,
                response: {
                    200: CalendarSchemas.getResponseBodySchema
                }
            }
        }, CalendarController.getCalendars); //list

        done();
    }, {prefix: '/calendar'});
}