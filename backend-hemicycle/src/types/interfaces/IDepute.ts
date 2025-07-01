import { Document } from 'mongoose';

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
