import { randomBytes, scryptSync } from 'crypto';
import { HydratedDocument } from 'mongoose';
import { appConfig } from '../../../config';
import { IUser, User } from '../../../models/User';

export namespace AuthService {
    export async function getUserByEmail(email : string) : Promise<HydratedDocument<IUser> | null> {
        return await User.findOne({
            email: email
        });
    }

    export function getSalt() {
        return randomBytes(16).toString('hex');
    }

    export function getPasswordHash(password : string, salt : string) {
        const bathSalt = appConfig.PASSWORD_SALT;
        const lastSalt = bathSalt.concat(salt);

        console.log(`bathsalth: ${bathSalt}`);
        console.log(`userSalt: ${salt}`);
        console.log(`lastSalt: ${lastSalt}`);

        return scryptSync(password, lastSalt, 32).toString("hex");
    }
}