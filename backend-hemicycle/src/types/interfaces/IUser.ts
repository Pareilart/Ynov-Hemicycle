import { Document, Types } from 'mongoose';
import { IRole } from './IRole';
import { IAddresses } from './IAddresses';
import { IVotingSurvey } from './IVotingSurvey';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  birthday?: Date;
  sexe?: string;
  addresses?: Types.ObjectId | IAddresses;
  password: string;
  email: string;
  emailVerifiedAt?: Date;
  role: Types.ObjectId | IRole;
  votingSurvey?: Types.ObjectId | IVotingSurvey;
  hasOnBoarding: boolean;
}

export interface IUserPopulated extends Omit<IUser, 'role' | 'addresses'> {
  _id: Types.ObjectId;
  role: IRole;
  addresses?: IAddresses;
}
