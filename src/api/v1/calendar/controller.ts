import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { Calendar } from '../../../models/Calendar';
import { IUserJWT } from '../../../models/User';
import { CalendarSchemas } from './schemas';

namespace CalendarController {

    type CreateCalendarRequest = FastifyRequest<{
        Body: {
            name: string;
            description: string;
        }
    }>;

    type ReadCalendarRequest = FastifyRequest<{
        Params: {
            id: string;
        },
        Querystring: {
            page: number,
            items: number,
            search?: string;
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
            items: number,
            search?: string;
        }
    }>;

    export async function createCalendar(this : FastifyInstance, request : CreateCalendarRequest, reply : FastifyReply) {
        try {
            const { name, description } = request.body;
            const user = request.user as IUserJWT;

            const calendar = new Calendar();
            calendar.name = name;
            calendar.description = description;
            calendar._userId = user.sub;

            await calendar.save();

            return reply.status(200).send({status: 200, message: null, data: {id: calendar._id}});
        }
        catch (e) {
            console.log(`error: ${e}`);
            return reply.status(500).send({status: 500, message: 'internal server error.', data: null})
        }
    }

    export async function readCalendar(this : FastifyInstance, request : ReadCalendarRequest, reply : FastifyReply) {
        try {
            const { id } = request.params;
            let { page, items, search } = request.query;
            const offset = (page - 1) * items;
            const user = request.user as IUserJWT;

            const calendar = await Calendar.findById(id);
            if(!calendar) {
                return reply.status(404).send({status: 404, message: 'id does not correspond to a calendar.', data: null});
            }
            if(calendar._userId != user.sub) {
                return reply.status(404).send({status: 403, message: 'You are not allowed to read someone elses calendar.', data: null});
            }

            let res : any[];

            if(search) {
                res = await Calendar.aggregate([
                    {
                        $match: { "_id": id }
                    },
                    {
                        $lookup: {
                            from: "events",
                            let: {id: "$_id"},
                            pipeline: [
                                {
                                    $match: {
                                        $text: {
                                            $search: search
                                        }
                                    }
                                },
                                {
                                    $match: {
                                        $expr: {
                                            $eq: ["$$id", "$_calendarId"]
                                        }
                                    },
                                },
                                {
                                    $skip: offset,
                                },
                                {
                                    $limit: items
                                }
                            ],
                            as: "events"
                        }
                    }
                ]);
            }
            else {
                res = await Calendar.aggregate([
                    {
                        $match: { "_id": id }
                    },
                    {
                        $lookup: {
                            from: "events",
                            let: {id: "$_id"},
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $eq: ["$$id", "$_calendarId"]
                                        }
                                    },
                                },
                                {
                                    $skip: offset,
                                },
                                {
                                    $limit: items
                                }
                            ],
                            as: "events"
                        }
                    }
                ]);
            }

            let response = {
                id: calendar._id,
                name: calendar.name,
                description: calendar.description,
                events: <any>[]
            };

            if(res && Array.isArray(res)) {
                for(let ev of res[0].events) {
                    let event = {
                      id: ev._id,
                      name: ev.name,
                      description: ev.description,
                      startDate: ev.startDate,
                      endDate: ev.endDate,
                    };
                    response.events.push(event);
                }
            }

            return reply.status(200).send({status: 200, message: null, data: response});
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
            await calendar.delete();

            return reply.status(200).send({status: 200, message: null, data: null});
        }
        catch (e) {
            console.log(`error: ${e}`);
            return reply.status(500).send({status: 500, message: 'internal server error.', data: null})
        }
    }

    export async function getCalendars(this : FastifyInstance, request : GetCalendarsRequest, reply : FastifyReply) {
        try {
            const { page, items, search } = request.query;
            const offset = (page - 1) * items;

            const user = request.user as IUserJWT;

            interface QueryInterface {
              _userId : string;
              name? : any;
            }
            let query : QueryInterface = {
              _userId: user.sub
            };
            if(search) {
                query.name = { "$regex": search, "$options": "i" }
            }

            const count = await Calendar.find(query).count()
            const calendars = await Calendar.find(query).skip(offset).limit(items);

            const data = calendars.map((calendar) => {
                return {id: calendar._id, name: calendar.name, description: calendar.description};
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
                    '2xx': CalendarSchemas.createResponseBodySchema
                }
            }
        },CalendarController.createCalendar); //create

        instance.get('/:id', {
            onRequest: instance.authenticate,
            schema: {
                params: CalendarSchemas.readRequestParamsSchema,
                querystring: CalendarSchemas.readRequestQuerySchema,
                response: {
                    '2xx': CalendarSchemas.readResponseBodySchema
                }
            }
        }, CalendarController.readCalendar); //read

        instance.patch('/:id', {
            onRequest: instance.authenticate,
            schema: {
                params: CalendarSchemas.updateRequestParamsSchema,
                body: CalendarSchemas.updateRequestBodySchema,
                response: {
                    '2xx': CalendarSchemas.updateResponseBodySchema
                }
            }
        }, CalendarController.updateCalendar); //update

        instance.delete('/:id', {
            onRequest: instance.authenticate,
            schema: {
                params: CalendarSchemas.deleteRequestParamsSchema,
                response: {
                    '2xx': CalendarSchemas.deleteResponseSchema
                }
            }
        }, CalendarController.deleteCalendar); //delete

        instance.get('/', {
            onRequest: instance.authenticate,
            schema: {
                querystring: CalendarSchemas.getRequestQuerySchema,
                response: {
                    '2xx': CalendarSchemas.getResponseBodySchema
                }
            }
        }, CalendarController.getCalendars); //list

        done();
    }, {prefix: '/calendar'});
}