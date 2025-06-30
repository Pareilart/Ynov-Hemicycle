import { Document, Types } from 'mongoose';

export interface IAddresses extends Document {
    line1: string;
    line2: string;
    postalCode: string;
    city: string;
    state: string;
    country: string;
}


export interface IDepute extends Document {
  nom: string;
  prenom: string;
  parti: string;
  circonscription: string;
  dateNaissance: Date;
  photo: string;
  mandats: {
    debut: Date;
    fin: Date;
    type: string;
  }[];
  contact: {
    email: string;
    telephone: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface IPermission extends Document {
  name: string;
  description: string;
}

export interface IRole extends Document {
  name: string;
  permissions: Types.ObjectId[];
  description: string;
}

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  birthday: Date;
  sexe: 'Homme' | 'Femme' | 'Autre';
  addresses: Types.ObjectId;
  password: string;
  email: string;
  emailVerifiedAt?: Date;
  role: Types.ObjectId;
  votingSurveys?: Types.ObjectId;
} 