import {config} from 'dotenv';

if(config().error !== undefined) {
    console.error("ERRROR: .env file parsing error (are you missing .env?).")
    process.exit(1);
}

function getStringFromEnv(name : string) : string {
    const value = process.env[name]
    if(!value) {
        console.error(`environment variable ${name} was not set.`);
        process.exit(1);
    }
    return value;
}

export const appConfig = {
    PASSWORD_SALT: getStringFromEnv('NODEAPP_PASSWORD_SALT')
}