import { Types } from 'mongoose';

export interface IUserUpdate {
  firstname?: string;
  lastname?: string;
  birthday?: Date;
  sexe?: string;
  email?: string;
  password?: string;
}
