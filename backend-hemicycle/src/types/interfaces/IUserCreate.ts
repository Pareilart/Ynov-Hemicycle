import { Types } from 'mongoose';

export interface IUserCreate {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: Types.ObjectId;
}
