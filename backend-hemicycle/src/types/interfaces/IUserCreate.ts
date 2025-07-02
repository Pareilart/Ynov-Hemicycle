import { Types } from 'mongoose';

export interface IUserCreate {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  sexe: string;
  birthday: Date;
  role: Types.ObjectId;
}
