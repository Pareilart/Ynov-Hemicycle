import { Document, Types } from 'mongoose';
import { IRole } from './IRole';
import { IAddresses } from './IAddresses';
import { IVotingSurvey } from './IVotingSurvey';

export interface IUserDocument extends Document {
  _id: Types.ObjectId;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthday?: Date;
  sexe?: string;
  emailVerifiedAt?: Date;
  role: IRole & { _id: Types.ObjectId };
  addresses?: IAddresses & { _id: Types.ObjectId };
  votingSurvey?: IVotingSurvey & { _id: Types.ObjectId };
  hasOnBoarding: boolean;
}
