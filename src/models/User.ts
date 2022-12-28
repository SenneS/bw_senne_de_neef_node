import mongoose, { Schema, SchemaTypes, Types } from 'mongoose';
import crypto from 'crypto';
export interface IUser {
    _id : string;
    username : string;
    email : string;
    passwordHash : string;
    passwordSalt : string;
}

export const UserSchema = new Schema<IUser>({
    _id : {
        type: String,
        default: () => { return crypto.randomUUID(); },
        required: true,
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    passwordSalt: {
        type: String,
        required: true
    }
});

export interface IUserJWT {
    username : string;
    email : string;

    sub?: string;
    jti?: string;
}


export const User = mongoose.model<IUser>("User", UserSchema);