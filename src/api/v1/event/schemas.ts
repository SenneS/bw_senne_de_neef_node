export namespace EventSchemas {
    export const createRequestBodySchema = {
        type: 'object',
        properties: {
            calendarId: {
                type: 'string',
                format: 'uuid'
            },
            name: {
                type: 'string',
                minLength: 5,
                maxLength: 255
            },
            description: {
                type: 'string',
                minLength: 20,
                maxLength: 8192
            },
            startDate: {
                type: 'string',
                format: 'date-time'
            },
            endDate: {
                type: 'string',
                format: 'date-time'
            }
        },
        required: ['calendarId', 'name', 'description', 'startDate', 'endDate']
    };
    export const createResponseBodySchema = {
        type: 'object',
        properties: {
            status: {
                type: 'integer'
            },
            message: {
                type: 'string',
                nullable: true
            },
            data: {
                type: 'object',
                nullable: true,
                additionalProperties: true
            }
        },
        required: ['status', 'message', 'data']
    };

    export const readRequestParamsSchema = {
        type: 'object',
        properties: {
            id: {
                type: 'string',
                format: 'uuid'
            }
        }
    };
    export const readResponseBodySchema = {
        type: 'object',
        properties: {
            status: {
                type: 'integer'
            },
            message: {
                type: 'string',
                nullable: true
            },
            data: {
                type: 'object',
                nullable: true,
                additionalProperties: true
            }
        },
        required: ['status', 'message', 'data']
    };

    export const updateRequestParamsSchema = {

    };
    export const updateRequestBodySchema = {

    };
    export const updateResponseBodySchema = {
        type: 'object',
        properties: {
            status: {
                type: 'integer'
            },
            message: {
                type: 'string',
                nullable: true
            },
            data: {
                type: 'object',
                nullable: true,
                additionalProperties: true
            }
        },
        required: ['status', 'message', 'data']
    };

    export const deleteRequestParamsSchema = {

    };
    export const deleteResponseBodySchema = {
        type: 'object',
        properties: {
            status: {
                type: 'integer'
            },
            message: {
                type: 'string',
                nullable: true
            },
            data: {
                type: 'object',
                nullable: true,
                additionalProperties: true
            }
        },
        required: ['status', 'message', 'data']
    };
}