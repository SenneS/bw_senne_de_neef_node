import mongoose, { Schema, SchemaType, SchemaTypes, Types } from 'mongoose';

export interface IRefreshToken {
    _userId : string;
    jti : string;
    expiresAt : Date;
}

export const RefreshTokenSchema = new Schema<IRefreshToken>({
    _userId: {
        type: String,
        required: true,
        ref: 'User'
    },
    jti: {
        type: String,
        required: true,
        minlength: 36,
        maxlength: 36
    },
    expiresAt: {
        type: Date,
        default: Date.now,
        index: {
            expires: (24 * 60 * 60)
        }
    }
});

export const RefreshToken = mongoose.model<IRefreshToken>("RefreshToken", RefreshTokenSchema);