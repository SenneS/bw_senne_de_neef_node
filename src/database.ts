import { ServerApiVersion } from 'mongodb';
import mongoose from 'mongoose';
import path from 'path';

export async function setupDatabase() {
    const certificatePath = path.join(__dirname, '../cert.pem');

    mongoose.set('strictQuery', false);
    return await mongoose.connect('mongodb+srv://cluster0.h748kzp.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority',
        {
            sslKey: certificatePath,
            sslCert: certificatePath,
            serverApi: ServerApiVersion.v1,
        }).then(() => true).catch(() => false);
}