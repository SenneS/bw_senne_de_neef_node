export namespace CalendarSchemas {

    export const createRequestBodySchema = {
        type: 'object',
        properties: {
            name: {
                type: 'string',
                minLength: 5,
                maxLength: 255
            },
            description: {
                type: 'string',
                minLength: 20,
                maxLength: 8192
            }
        },
        required: ['name', 'description']
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
        },
        required: [ 'id' ],
    };

    export const readRequestQuerySchema = {
        type: 'object',
        properties: {
            page: { type: 'integer', minimum: 1, default: 1},
            items: { type: 'integer', minimum: 1, maximum: 25, default: 5},
            search: { type: 'string', minLength: 1, maxLength: 20}
        }
    }

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
        type: 'object',
        properties: {
            id: {
                type: 'string',
                format: 'uuid'
            }
        },
        required: [ 'id' ],
    };

    export const updateRequestBodySchema = {
        type: 'object',
        properties: {
            name: {
                type: 'string',
                minLength: 5,
                maxLength: 255
            },
            description: {
                type: 'string',
                minLength: 20,
                maxLength: 8192
            }
        },
        anyOf: [
            {
                required: ['name']
            },
            {
                required: ['description']
            },
        ]
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
        type: 'object',
        properties: {
            id: {
                type: 'string',
                format: 'uuid'
            }
        },
        required: [ 'id' ],
    };

    export const deleteResponseSchema = {
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

    export const getRequestQuerySchema = {
        type: 'object',
        properties: {
            page: { type: 'integer', minimum: 1, default: 1},
            items: { type: 'integer', minimum: 1, maximum: 25, default: 5},
            search: { type: 'string', minLength: 1, maxLength: 20}
        }
    }

    export const getResponseBodySchema = {
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
    }
}