import mongoose, { Schema } from 'mongoose';
import { IDepute } from '../types';

const deputeSchema = new Schema<IDepute>(
  {
    nom: {
      type: String,
      required: true,
    },
    prenom: {
      type: String,
      required: true,
    },
    parti: {
      type: String,
      required: true,
    },
    circonscription: {
      type: String,
      required: true,
    },
    dateNaissance: {
      type: Date,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    mandats: [
      {
        debut: Date,
        fin: Date,
        type: String,
      },
    ],
    contact: {
      email: String,
      telephone: String,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IDepute>('Depute', deputeSchema);
