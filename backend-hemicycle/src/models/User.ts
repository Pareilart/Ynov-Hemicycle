import mongoose, { Schema } from 'mongoose';
import { IUser } from '../types';

const userSchema = new Schema<IUser>(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    birthday: {
      type: Date,
      required: true,
    },
    sexe: {
      type: String,
      enum: ['Homme', 'Femme', 'Autre'],
      required: true,
    },
    address: {
      type: Schema.Types.ObjectId,
      ref: 'Addresses',
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /.+\@.+\..+/,
    },
    emailVerifiedAt: {
      type: Date,
      default: null,
      required: false,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: 'Role',
      required: true,
    },
    votingSurvey: {
      type: Schema.Types.ObjectId,
      ref: 'VotingSurvey',
      required: false,
    },
    hasOnBoarding: {
      type: Boolean,
      default: false,
    },
    twoFactorEnabled: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IUser>('User', userSchema, 'users');
