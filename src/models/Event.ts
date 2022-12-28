import mongoose, { Schema } from 'mongoose';
import crypto from 'crypto';

export interface IEvent {
    _id : string;
}

export const EventSchema = new Schema<IEvent>({
    _id : {
        type: String,
        default: () => { return crypto.randomUUID(); },
        required: true,
    }
});
export const Event = mongoose.model<IEvent>("Event", EventSchema);