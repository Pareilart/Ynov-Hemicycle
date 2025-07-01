import { Request } from 'express';
import { IUser } from './IUser';

export interface IAuthenticatedRequest extends Request {
  user?: IUser;
}
