import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { Types } from 'mongoose';
import User from '../../models/User';
import Role from '../../models/Role';
import { RoleEnum } from '../../enum/RoleEnum';
import { AuthenticatedRequest } from '../../middleware/auth';
import { generateToken, refreshAccessToken } from '../../utils/jwtUtils';
import { IUserDocument } from '../../types/interfaces/IUserDocument';
import { IUserCreate } from '../../types/interfaces/IUserCreate';
import { ResponseHandler } from '../../utils/responseHandler';
import { UserDto } from '../../types/dto/UserDto';
import { UserService } from '../../services/userService';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email })
      .select('+password')
      .populate('role')
      .populate('addresses')
      .populate('votingSurvey') as IUserDocument | null;

    if (!user) {
      return ResponseHandler.unauthorized(res, 'Email ou mot de passe incorrect');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return ResponseHandler.unauthorized(res, 'Email ou mot de passe incorrect');
    }

    const tokens = generateToken(user._id, user.role.name);
    const userResponse = UserDto.toResponse(user);
    userResponse.token = {
      token: tokens.token,
      refreshToken: tokens.refreshToken,
      expiresIn: tokens.expiresIn,
      exp: tokens.expiresAt.getTime(),
    };

    return ResponseHandler.success(res, userResponse);
  } catch (error: any) {
    return ResponseHandler.error(res, 'Erreur lors de la connexion', error.message);
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return ResponseHandler.badRequest(res, 'Refresh token manquant');
    }

    const newTokens = refreshAccessToken(refreshToken);
    if (!newTokens) {
      return ResponseHandler.unauthorized(res, 'Refresh token invalide ou expiré');
    }

    return ResponseHandler.success(res, {
      token: newTokens.token,
      refreshToken: newTokens.refreshToken,
      expiresIn: newTokens.expiresIn,
      exp: newTokens.expiresAt.getTime(),
    });
  } catch (error: any) {
    return ResponseHandler.error(res, 'Erreur lors du rafraîchissement du token', error.message);
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const userRole = await Role.findOne({ name: RoleEnum.USER });
    if (!userRole) {
      return ResponseHandler.error(res, 'Erreur: le rôle \'user\' n\'existe pas dans la base de données');
    }

    const userData: IUserCreate = {
      ...req.body,
      role: userRole._id,
    };

    const { user: createdUser, message } = await UserService.createUser(userData);
    const token = generateToken(new Types.ObjectId(createdUser.id), userRole.name);

    createdUser.token = {
      token: token.token,
      refreshToken: token.refreshToken,
      expiresIn: token.expiresIn,
      exp: token.expiresAt.getTime(),
    };

    ResponseHandler.success(res, createdUser, message, 201);
  } catch (error: any) {
    console.error('Erreur d\'inscription:', error);
    ResponseHandler.error(res, 'Erreur lors de l\'inscription', error.message);
  }
};

export const me = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return ResponseHandler.unauthorized(res, 'Utilisateur non authentifié');
    }

    const user = await User.findById(req.user._id)
      .populate('role')
      .populate('addresses')
      .populate('votingSurvey')
      .select('-password') as IUserDocument;

    if (!user) {
      return ResponseHandler.notFound(res, 'Utilisateur non trouvé');
    }

    const userResponse = UserDto.toResponse(user);
    ResponseHandler.success(res, userResponse);
  } catch (error: any) {
    console.error('Erreur lors de la récupération du profil:', error);
    ResponseHandler.error(res, 'Erreur lors de la récupération du profil', error.message);
  }
};
