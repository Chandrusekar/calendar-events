import mongoose, { Document, Schema, Model } from "mongoose";
import { Appointment } from '../config/roles';
import { boolean } from "joi";

// Define a TypeScript interface for Employee document
// export interface AppointmentDocument extends Document {
//     title: string;
//     appId: string;
//     date: string;
//     start_time: string;
//     end_time: string;
//     userId: string;
//     status: string;
// }

export interface AppointmentDocument extends Document {
    id?: string | number;
    start: Date;
    end?: Date;
    title: string;
    allDay?: boolean;
    created_date?: Date;
    userId: string;
    status:string;
}

// Define a TypeScript interface for Employee Model
interface AppointmentModel extends Model<AppointmentDocument> {
    // Optional: Add static methods if needed
}

const appointmentSchema = new Schema<AppointmentDocument, AppointmentModel>(
    {
        title: {
            type: String,
        },
        id: {
            type: String,
        },
        created_date:{
            type: Date,
        },
        start: {
            type: Date,
        },
        end: {
            type: Date,
        },
        userId: {
            type: String
        },
        status: {
            type: String,
            enum: Appointment,
            default: "Scheduled",
        },
        allDay:{
            type: Boolean,
            default:true
        }
    },
    {
        collection: 'appointments'
    }
);


// Create and export the Employee model
const Appointments = mongoose.model<AppointmentDocument, AppointmentModel>('Appointment', appointmentSchema);
export default Appointments;

