import { Document, Types } from 'mongoose';
import { IRole } from './IRole';
import { IAddresses } from './IAddresses';
import { IVotingSurvey } from './IVotingSurvey';

export interface IUser extends Document {
  firstname: string;
  lastname: string;
  birthday?: Date;
  sexe?: string;
  address?: Types.ObjectId | IAddresses;
  password: string;
  email: string;
  emailVerifiedAt?: Date;
  role: Types.ObjectId | IRole;
  votingSurvey?: Types.ObjectId | IVotingSurvey;
  hasOnBoarding: boolean;
  twoFactorEnabled: boolean;
}

export interface IUserPopulated extends Omit<IUser, 'role' | 'address'> {
  _id: Types.ObjectId;
  role: IRole;
  address?: IAddresses;
}
