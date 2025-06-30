import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../types';
import User from '../models/User';
import { RoleEnum } from '../enum/RoleEnum';

export interface AuthenticatedRequest extends Request {
    user?: IUser;
}

export const auth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ message: 'Authentification requise' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
        const user = await User.findById(decoded.userId).populate('role');

        if (!user) {
            return res.status(401).json({ message: 'Utilisateur non trouvé' });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token invalide' });
    }
};

export const isAdmin = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Authentification requise' });
        }

        const user = await User.findById(req.user._id).populate('role');
        
        if (!user || !user.role || (user.role as any).name !== RoleEnum.ADMIN) {
            return res.status(403).json({ message: 'Accès refusé. Droits administrateur requis' });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la vérification des droits' });
    }
};

export const isDeputy = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Authentification requise' });
        }

        const user = await User.findById(req.user._id).populate('role');
        
        if (!user || !user.role || (user.role as any).name !== RoleEnum.DEPUTY) {
            return res.status(403).json({ message: 'Accès refusé. Droits de député requis' });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la vérification des droits' });
    }
}; 