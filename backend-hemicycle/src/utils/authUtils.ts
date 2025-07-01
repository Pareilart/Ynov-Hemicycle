import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';
import User from '../models/User';
import { RoleEnum } from '../enum/RoleEnum';
import bcrypt from 'bcrypt';

export class AuthUtils {
    private static readonly SALT_ROUNDS = 10;

    public static async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, this.SALT_ROUNDS);
    }

    public static async checkIsAdmin(req: AuthenticatedRequest, res: Response): Promise<boolean> {
        if (!req.user) {
            return false;
        }

        const user = await User.findById(req.user._id).populate('role');
        
        if (!user || !user.role || (user.role as any).name !== RoleEnum.ADMIN) {
            return false;
        }

        return true;
    }

    public static async checkIsDeputy(req: AuthenticatedRequest, res: Response): Promise<boolean> {
        if (!req.user) {
            return false;
        }

        const user = await User.findById(req.user._id).populate('role');
        
        if (!user || !user.role || (user.role as any).name !== RoleEnum.DEPUTY) {
            return false;
        }

        return true;
    }
} 