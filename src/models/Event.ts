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
    },
    _calendarId: {
        type: String,
        required: true,
        ref: 'Calendar'
    },
    name: {
        type: String,
        required: true,
        index: 'text'
    },
    description: {
        type: String,
        required: true,
        index: 'text'
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    }
});
export const Event = mongoose.model<IEvent>("Event", EventSchema);