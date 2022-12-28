import mongoose, { Schema } from 'mongoose';
import crypto from 'crypto';

export interface IEvent {
    _id : string;
    _calendarId : string;
    name : string;
    description : string;
    startDate : Date;
    endDate : Date;
}

export const EventSchema = new Schema<IEvent>({
    _id : {
        type: String,
        default: () => { return crypto.randomUUID(); },
        required: true,
    }
});
export const Event = mongoose.model<IEvent>("Event", EventSchema);