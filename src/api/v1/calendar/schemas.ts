export namespace CalendarSchemas {

    export const createRequestBodySchema = {
        type: 'object',
        properties: {

        },
        required: ['']
    };

    export const createResponseBodySchema = {
        type: 'object',
        properties: {

        },
        required: ['']
    };

    export const readRequestParamsSchema = {
        type: 'object',
        properties: {
            id: {
                type: 'string',
                pattern: '[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}'
            }
        },
        required: [ 'id' ],
    };

    export const readResponseBodySchema = {
        type: 'object',
        properties: {

        },
        required: ['']
    };

    export const updateRequestParamsSchema = {
        type: 'object',
        properties: {
            id: {
                type: 'string',
                pattern: '[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}'
            }
        },
        required: [ 'id' ],
    };

    export const updateRequestBodySchema = {
        type: 'object',
        properties: {

        },
        required: ['']
    };

    export const updateResponseBodySchema = {
        type: 'object',
        properties: {

        },
        required: ['']
    };

    export const deleteRequestParamsSchema = {
        type: 'object',
        properties: {
            id: {
                type: 'string',
                pattern: '[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}'
            }
        },
        required: [ 'id' ],
    };

    export const deleteResponseSchema = {
        type: 'object',
        properties: {

        },
        required: ['']
    };

}