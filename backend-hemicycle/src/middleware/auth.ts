import { Request, Response, NextFunction } from 'express';
import { IUser } from '../types';

export interface AuthenticatedRequest extends Request {
    user?: IUser;
}

export const auth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // TODO: Implémenter la logique d'authentification réelle
    next();
}; 