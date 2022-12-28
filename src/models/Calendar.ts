import mongoose, { Schema } from 'mongoose';
import crypto from 'crypto';

export interface ICalendar {
    _id : string;
    _userId : string;
    name : string;
}

export const CalendarSchema = new Schema<ICalendar>({
    _id : {
        type: String,
        default: () => { return crypto.randomUUID(); },
        required: true,
    }
});
export const Calendar = mongoose.model<ICalendar>("Calendar", CalendarSchema);