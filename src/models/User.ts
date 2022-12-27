import mongoose, { Schema } from 'mongoose';

export interface IUser {
    username : string;
    email : string;
    passwordHash : string;
    passwordSalt : string;
}

export const UserSchema = new Schema<IUser>({
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

export const User = mongoose.model<IUser>("User", UserSchema);