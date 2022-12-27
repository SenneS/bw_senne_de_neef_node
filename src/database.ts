import { ServerApiVersion } from 'mongodb';
import mongoose from 'mongoose';
import path from 'path';
import { appConfig } from './config';

export async function setupDatabase() {
    const certificatePath = path.join(__dirname, '../cert.pem');

    mongoose.set('strictQuery', false);
    return await mongoose.connect(appConfig.MONGOOSE_URI,
        {
            sslKey: certificatePath,
            sslCert: certificatePath,
            serverApi: ServerApiVersion.v1,
        }).then(() => true).catch(() => false);
}