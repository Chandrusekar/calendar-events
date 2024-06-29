import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from 'bcryptjs';
import { roles } from '../config/roles';

// Define a TypeScript interface for Employee document
export interface UserDocument extends Document {
    email: string;
    userId: string;
    username: string;
    password: string;
    DOB: string;
    Experience: string;
    Role: string;
    correctPassword(typedPassword: string, originalPassword: string): Promise<boolean>;
}

// Define a TypeScript interface for Employee Model
interface UserModel extends Model<UserDocument> {
    // Optional: Add static methods if needed
}

const userSchema = new Schema<UserDocument, UserModel>(
    {
        email: {
            type: String,
        },
        userId: {
            type: String,
        },
        username: {
            type: String,
        },
        password: {
            type: String,
        },
        DOB: {
            type: String
        },
        Role: {
            type: String,
            enum: roles,
            default: "admin",
        }
    },
    {
        collection: 'employee'
    }
);

// Instance method to compare passwords
userSchema.methods.correctPassword = async function (
    typedPassword: string,
    originalPassword: string
): Promise<boolean> {
    return await bcrypt.compare(typedPassword, originalPassword);
};

// Middleware (pre hook) to hash password before saving
userSchema.pre<UserDocument>('save', async function (next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 12);
    }
    next();
});

// Create and export the Employee model
const Users = mongoose.model<UserDocument, UserModel>('Users', userSchema);
export default Users;
