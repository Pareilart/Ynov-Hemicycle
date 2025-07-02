import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../types';
import User from '../models/User';
import { AuthUtils } from '../utils/authUtils';
import { ResponseHandler } from '../utils/responseHandler';

export interface AuthenticatedRequest extends Request {
  user?: IUser;
}

export const auth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return ResponseHandler.unauthorized(res, 'Authentification requise');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
    const user = await User.findById(decoded.userId).populate('role');

    if (!user) {
      return ResponseHandler.unauthorized(res, 'Utilisateur non trouvé');
    }

    req.user = user;
    next();
  } catch (error) {
    ResponseHandler.unauthorized(res, 'Token invalide');
  }
};

export const isAdmin = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const hasAdminRole = await AuthUtils.checkIsAdmin(req);

    if (!hasAdminRole) {
      return ResponseHandler.forbidden(res, 'Accès refusé. Droits administrateur requis');
    }

    next();
  } catch (error) {
    ResponseHandler.error(res, 'Erreur lors de la vérification des droits');
  }
};

export const isDeputy = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const hasDeputyRole = await AuthUtils.checkIsDeputy(req);

    if (!hasDeputyRole) {
      return ResponseHandler.forbidden(res, 'Accès refusé. Droits de député requis');
    }

    next();
  } catch (error) {
    ResponseHandler.error(res, 'Erreur lors de la vérification des droits');
  }
};

export const isEmailVerified = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return ResponseHandler.unauthorized(res, 'Utilisateur non authentifié');
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return ResponseHandler.unauthorized(res, 'Utilisateur non trouvé');
    }

    if (!user.emailVerifiedAt) {
      return ResponseHandler.forbidden(res, 'Veuillez vérifier votre adresse email avant de continuer');
    }

    next();
  } catch (error: any) {
    return ResponseHandler.error(res, 'Erreur lors de la vérification de l\'email', error.message);
  }
};
