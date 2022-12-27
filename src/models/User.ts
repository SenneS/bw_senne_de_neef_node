import mongoose, { Schema } from 'mongoose';

export const UserSchema = new Schema({
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
    }
});

export const User = mongoose.model("User", UserSchema);