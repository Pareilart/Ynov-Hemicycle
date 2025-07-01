import { Types } from 'mongoose';

export interface IUserUpdate {
  firstName?: string;
  lastName?: string;
  birthday?: Date;
  sexe?: string;
  email?: string;
  password?: string;
}
