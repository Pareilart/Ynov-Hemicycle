import { Types } from 'mongoose';
import { IPermission } from './IPermission';

export interface IRole {
  _id?: Types.ObjectId;
  name: string;
  permissions: Types.ObjectId[] | IPermission[];
  description: string;
}
