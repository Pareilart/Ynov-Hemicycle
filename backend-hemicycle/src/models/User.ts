import mongoose, { Schema } from 'mongoose';
import { IUser } from '../types';

const userSchema = new Schema<IUser>(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        birthday: {
            type: Date,
            required: false,
        },
        sexe: {
            type: String,
            enum: ["Homme", "Femme", "Autre"],
            required: false,
        },
        addresses: {
            type: Schema.Types.ObjectId,
            ref: "Addresses",
            required: false,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /.+\@.+\..+/,
        },
        password: {
            type: String,
            required: true,
            select: false
        },
        emailVerifiedAt: {
            type: Date,
            required: false,
        },
        role: {
            type: Schema.Types.ObjectId,
            ref: "Role",
            required: true,
        },
        votingSurveys: {
            type: Schema.Types.ObjectId,
            ref: "votingSurveys",
            required: false
        }
    },
);

export default mongoose.model<IUser>("User", userSchema, "users");