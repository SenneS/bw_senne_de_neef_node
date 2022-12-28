import {config} from 'dotenv';

if(config().error !== undefined) {
    console.error("ERRROR: .env file parsing error (are you missing .env?).")
    process.exit(1);
}

function getStringFromEnv(name : string) : string {
    const value = process.env[name]
    if(!value) {
        console.error(`[ERROR] environment variable ${name} was not set.`);
        process.exit(1);
    }
    return value;
}

function getNumberFromEnv(name : string) : number {
    const value = process.env[name]
    if(!value) {
        console.error(`[ERROR] environment variable ${name} was not set.`);
        process.exit(1);
    }
    return parseInt(value);
}

export const appConfig = {
    PORT: getNumberFromEnv('NODEAPP_PORT'),
    HOST: getStringFromEnv('NODEAPP_HOST'),
    PASSWORD_SALT: getStringFromEnv('NODEAPP_PASSWORD_SALT'),
    JWT_SECRET: getStringFromEnv('NODEAPP_JWT_SECRET'),
    COOKIE_SECRET: getStringFromEnv('NODEAPP_COOKIE_SECRET'),
    MONGOOSE_URI: getStringFromEnv('NODEAPP_MONGOOSE_URI'),

    GOOGLE_CLIENT_ID: getStringFromEnv('NODEAPP_GOOGLE_CLIENT_ID'),
    GOOGLE_CLIENT_SECRET: getStringFromEnv('NODEAPP_GOOGLE_CLIENT_SECRET'),
}