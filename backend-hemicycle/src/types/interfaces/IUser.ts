import { Document, Types } from 'mongoose';
import { IRole } from './IRole';
import { IAddresses } from './IAddresses';

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

export interface IUserPopulated extends Omit<IUser, 'role' | 'addresses'> {
  _id: Types.ObjectId;
  role: IRole;
  addresses?: IAddresses;
} 