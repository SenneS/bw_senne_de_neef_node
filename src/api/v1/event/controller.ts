import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { Calendar } from '../../../models/Calendar';
import { Event } from '../../../models/Event';
import { IUserJWT } from '../../../models/User';
import { EventSchemas } from './schemas';

namespace EventController {

    type CreateEventRequest = FastifyRequest<{
        Body: {
            calendarId: string;
            name: string;
            description: string;
            startDate: string;
            endDate: string;
        }
    }>;

    type ReadEventRequest = FastifyRequest<{
       Params: {
           id : string;
       }
    }>;

    type UpdateEventRequest = FastifyRequest<{
        Params: {
            id : string;
        },
        Body: {
            name?: string;
            description?: string;
            startDate?: string;
            endDate?: string;
        }
    }>;

    type DeleteEventRequest = FastifyRequest<{
        Params: {
            id : string;
        }
    }>;

    export async function createEvent(this : FastifyInstance, request : CreateEventRequest, reply : FastifyReply) {
        try {
            const {calendarId, name, description, startDate, endDate} = request.body;
            const user = request.user as IUserJWT;

            const calendar = await Calendar.findById(calendarId);
            if(!calendar) {
                return reply.status(404).send({status: 404, message: 'id does not correspond to a calendar.', data: null});
            }
            if(calendar._userId != user.sub) {
                return reply.status(404).send({status: 403, message: 'you are not the owner of the calendar.', data: null});
            }

            const _startDate = new Date(startDate);
            const _endDate = new Date(endDate);

            if(_endDate < _startDate) {
                return reply.status(400).send({status: 400, message: 'the event cannot start after it has ended.', data: null});
            }

            const event = new Event();
            event._calendarId = calendarId;
            event.name = name;
            event.description = description;
            event.startDate = _startDate;
            event.endDate = _endDate;

            await event.save();

            return reply.status(201).send({status: 201, message: null, data: {id: event._id, calendarId: event._calendarId, name: event.name, description: event.description, startDate: event.startDate, endDate: event.endDate}});
        }
        catch (e) {
            console.log(`error: ${e}`);
            return reply.status(500).send({status: 500, message: 'internal server error.', data: null})
        }
    }

    export async function readEvent(this : FastifyInstance, request : ReadEventRequest, reply : FastifyReply) {
        try {
            const { id } = request.params;
            const user = request.user as IUserJWT;

            const event = await Event.findById(id);
            if(!event) {
                return reply.status(404).send({status: 404, message: 'id does not correspond to an event.', data: null});
            }
            const calendar = await Calendar.findById(event._calendarId);
            if(!calendar) {
                return reply.status(404).send({status: 404, message: 'the event does not belong to a valid calendar (how did this happen?)', data: null})
            }
            if(calendar._userId != user.sub) {
                return reply.status(404).send({status: 403, message: 'you are not the owner of the calendar..', data: null});
            }

            return reply.status(200).send({status: 200, message: null, data: {id: event._id, calendarId: event._calendarId, name: event.name, description: event.description, startDate: event.startDate, endDate: event.endDate}});
        }
        catch (e) {
            console.log(`error: ${e}`);
            return reply.status(500).send({status: 500, message: 'internal server error.', data: null})
        }
    }

    export async function updateEvent(this : FastifyInstance, request : UpdateEventRequest, reply : FastifyReply) {
        try {
            const { id } = request.params;
            const { name, description, startDate, endDate } = request.body;
            const user = request.user as IUserJWT;

            const event = await Event.findById(id);
            if(!event) {
                return reply.status(404).send({status: 404, message: 'id does not correspond to an event.', data: null});
            }
            const calendar = await Calendar.findById(event._calendarId);
            if(!calendar) {
                return reply.status(404).send({status: 404, message: 'the event does not belong to a valid calendar (how did this happen?)', data: null})
            }
            if(calendar._userId != user.sub) {
                return reply.status(404).send({status: 403, message: 'you are not the owner of the calendar..', data: null});
            }

            const _startDate = new Date(startDate ? startDate : event.startDate);
            const _endDate = new Date(endDate ? endDate : event.endDate);

            if(_endDate < _startDate) {
                return reply.status(400).send({status: 400, message: 'the event cannot start after it has ended.', data: null});
            }

            if(name) {
                event.name = name;
            }
            if(description) {
                event.description = description;
            }
            if(startDate) {
                event.startDate = _startDate;
            }
            if(endDate) {
                event.endDate = _endDate;
            }
            await event.save();

            return reply.status(200).send({status: 200, message: null, data: {id: event._id, calendarId: event._calendarId, name: event.name, description: event.description, startDate: event.startDate, endDate: event.endDate}});

        }
        catch (e) {
            console.log(`error: ${e}`);
            return reply.status(500).send({status: 500, message: 'internal server error.', data: null})
        }
    }

    export async function deleteEvent(this : FastifyInstance, request : DeleteEventRequest, reply : FastifyReply) {
        try {
            const { id } = request.params;
            const user = request.user as IUserJWT;

            const event = await Event.findById(id);
            if(!event) {
                return reply.status(404).send({status: 404, message: 'id does not correspond to an event.', data: null});
            }
            const calendar = await Calendar.findById(event._calendarId);
            if(!calendar) {
                return reply.status(404).send({status: 404, message: 'the event does not belong to a valid calendar (how did this happen?)', data: null})
            }
            if(calendar._userId != user.sub) {
                return reply.status(404).send({status: 403, message: 'you are not the owner of the calendar..', data: null});
            }

            await event.delete();

            return reply.status(200).send({status: 200, message: null, data: null});
        }
        catch (e) {
            console.log(`error: ${e}`);
            return reply.status(500).send({status: 500, message: 'internal server error.', data: null})
        }
    }
}

export function installAPIv1Event(server : FastifyInstance) {
    server.register((instance, opts, done) => {
        instance.post('/', {
            onRequest: instance.authenticate,
            schema: {
                body: EventSchemas.createRequestBodySchema,
                response: {
                    '2xx': EventSchemas.createResponseBodySchema
                }
            }
        }, EventController.createEvent); //create

        instance.get('/:id', {
            onRequest: instance.authenticate,
            schema: {
                params: EventSchemas.readRequestParamsSchema,
                response: {
                    '2xx': EventSchemas.readResponseBodySchema
                }
            }
        }, EventController.readEvent); //read

        instance.patch('/:id', {
            onRequest: instance.authenticate,
            schema: {
                params: EventSchemas.updateRequestParamsSchema,
                body: EventSchemas.updateRequestBodySchema,
                response: {
                    '2xx': EventSchemas.updateResponseBodySchema
                }
            }
        }, EventController.updateEvent); //update

        instance.delete('/:id', {
            onRequest: instance.authenticate,
            schema: {
                params: EventSchemas.deleteRequestParamsSchema,
                response: {
                    '2xx': EventSchemas.deleteResponseBodySchema
                }
            }
        }, EventController.deleteEvent); //delete

        done();
    }, {prefix: '/event'});
}