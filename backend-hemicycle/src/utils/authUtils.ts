import bcrypt from 'bcrypt';
import { IAuthenticatedRequest } from '../types/interfaces/IAuthenticatedRequest';
import User from '../models/User';
import { RoleEnum } from '../enum/RoleEnum';
import { IRole } from '../types/interfaces/IRole';

export class AuthUtils {
  private static readonly SALT_ROUNDS = 10;

  public static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.SALT_ROUNDS);
  }

  public static async checkIsAdmin(req: IAuthenticatedRequest): Promise<boolean> {
    if (!req.user) {
      return false;
    }

    const user = await User.findById(req.user._id).populate('role');

    if (!user || !user.role || (user.role as IRole).name !== RoleEnum.ADMIN) {
      return false;
    }

    return true;
  }

  public static async checkIsDeputy(req: IAuthenticatedRequest): Promise<boolean> {
    if (!req.user) {
      return false;
    }

    const user = await User.findById(req.user._id).populate('role');

    if (!user || !user.role || (user.role as IRole).name !== RoleEnum.DEPUTY) {
      return false;
    }

    return true;
  }
}
