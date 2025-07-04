import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { Model, Types } from 'mongoose';
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
import { SecurityCodeService } from '../../services/SecurityCodeService';
import { sendEmailWrapper } from '../../services/EmailService';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email })
      .select('+password')
      .populate('role')
      .populate('address')
      .populate('votingSurvey') as IUserDocument | null;

    if (!user) {
      return ResponseHandler.unauthorized(res, 'Email ou mot de passe incorrect');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return ResponseHandler.unauthorized(res, 'Email ou mot de passe incorrect');
    }

    // Si l'utilisateur a activé la 2FA
    if (user.twoFactorEnabled) {
      // Génère un nouveau code de sécurité valide pendant 5 minutes
      const securityCode = await SecurityCodeService.createSecurityCode(user, User as Model<IUserDocument>, 5);

      // Envoyer le code par email
      await sendEmailWrapper({
        to: user.email,
        template_uuid: 'c2f0396e-2cd1-4e0d-821a-7de1a8638176',
        template_variables: {
          company_info_name: 'Hemicycle',
          firstname: user.firstname,
          lastname: user.lastname,
          security_code: securityCode.plainCode,
          company_info_address: '123 Rue de la Paix, 75000 Paris, France',
          company_info_city: 'Paris',
          company_info_zip_code: '75000',
          company_info_country: 'France',
        },
      });

      return ResponseHandler.success(res, {
        requiresTwoFactor: true,
        expiresAt: securityCode.expireAt,
      }, 'Code de sécurité envoyé par email');
    }

    // Si pas de 2FA, on procède normalement
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

    const { user: createdUser } = await UserService.createUser(userData);

    // Génère un code de vérification d'email valide pendant 30 minutes
    const securityCode = await SecurityCodeService.createSecurityCode(
      { _id: new Types.ObjectId(createdUser.id) } as IUserDocument,
      User as Model<IUserDocument>,
      30,
    );

    // Envoyer le code par email
    await sendEmailWrapper({
      to: createdUser.email,
      template_uuid: '13a6e90c-236b-4d8a-a49d-bf4554ab1aa5',
      template_variables: {
        company_info_name: 'Hemicycle',
        firstname: createdUser.firstname,
        lastname: createdUser.lastname,
        security_code: securityCode.plainCode,
        company_info_address: '123 Rue de la Paix, 75000 Paris, France',
        company_info_city: 'Paris',
        company_info_zip_code: '75000',
        company_info_country: 'France',
      },
    });

    const token = generateToken(new Types.ObjectId(createdUser.id), userRole.name);

    createdUser.token = {
      token: token.token,
      refreshToken: token.refreshToken,
      expiresIn: token.expiresIn,
      exp: token.expiresAt.getTime(),
    };

    ResponseHandler.success(res, createdUser, 'Un code de vérification a été envoyé à votre adresse email', 201);
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
      .populate('address')
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

/**
 * Vérifie un code de sécurité pour l'authentification à deux facteurs
 */
export const verify2FACode = async (req: Request, res: Response) => {
  try {
    const { code, email } = req.body;
    const emailLowerCase = email.toLowerCase();

    const user = await User.findOne({ email: emailLowerCase })
      .exec() as IUserDocument | null;

    if (!user) {
      return ResponseHandler.notFound(res, 'Utilisateur non trouvé');
    }

    const isValid = await SecurityCodeService.verifyCode(user, User as Model<IUserDocument>, code);
    if (!isValid) {
      return ResponseHandler.badRequest(res, 'Code invalide');
    }

    // Le code est valide, on le supprime
    await SecurityCodeService.deleteSecurityCode(user, User as Model<IUserDocument>);

    // Génération du token JWT
    const tokens = generateToken(user._id, user.role.name);
    const userResponse = UserDto.toResponse(user);
    userResponse.token = {
      token: tokens.token,
      refreshToken: tokens.refreshToken,
      expiresIn: tokens.expiresIn,
      exp: tokens.expiresAt.getTime(),
    };

    return ResponseHandler.success(res, userResponse, 'Code vérifié avec succès');
  } catch (error: any) {
    console.error('Erreur 2FA:', error);
    return ResponseHandler.error(res, 'Erreur lors de la vérification du code', error);
  }
};

/**
 * Vérifie l'email d'un utilisateur avec un code de sécurité
 */
export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { code, email } = req.body;
    const emailLowerCase = email.toLowerCase();

    const user = await User.findOne({ email: emailLowerCase })
      .exec() as IUserDocument | null;

    if (!user) {
      return ResponseHandler.notFound(res, 'Utilisateur non trouvé');
    }

    // Si l'email est déjà vérifié
    if (user.emailVerifiedAt) {
      return ResponseHandler.badRequest(res, 'L\'email a déjà été vérifié');
    }

    const isValid = await SecurityCodeService.verifyCode(user, User as Model<IUserDocument>, code);
    if (!isValid) {
      return ResponseHandler.badRequest(res, 'Code invalide');
    }

    // Le code est valide, on le supprime et on marque l'email comme vérifié
    await SecurityCodeService.deleteSecurityCode(user, User as Model<IUserDocument>);
    user.emailVerifiedAt = new Date();
    await user.save();

    const userWithDetails = await User.findById(user._id)
      .populate('role')
      .populate('address')
      .populate('votingSurvey')
      .exec() as IUserDocument | null;

    if (!userWithDetails) {
      return ResponseHandler.notFound(res, 'Utilisateur non trouvé après la vérification');
    }

    
    const tokens = generateToken(userWithDetails._id, userWithDetails.role.name);
    const userResponse = UserDto.toResponse(userWithDetails);
    userResponse.token = {
      token: tokens.token,
      refreshToken: tokens.refreshToken,
      expiresIn: tokens.expiresIn,
      exp: tokens.expiresAt.getTime(),
    };

    return ResponseHandler.success(res, userResponse, 'Email vérifié avec succès');
  } catch (error: any) {
    return ResponseHandler.error(res, 'Erreur lors de la vérification de l\'email', error);
  }
};

/**
 * Renvoie un email de vérification à l'utilisateur
 */
export const resendVerificationEmail = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return ResponseHandler.unauthorized(res, 'Utilisateur non authentifié');
    }

    const user = await User.findById(req.user._id)
      .exec() as IUserDocument | null;

    if (!user) {
      return ResponseHandler.notFound(res, 'Utilisateur non trouvé');
    }

    // Si l'email est déjà vérifié
    if (user.emailVerifiedAt) {
      return ResponseHandler.badRequest(res, 'L\'email a déjà été vérifié');
    }

    // Supprime l'ancien code de vérification s'il existe
    await SecurityCodeService.deleteSecurityCode(user, User as Model<IUserDocument>);

    // Génère un nouveau code de vérification d'email valide pendant 30 minutes
    const securityCode = await SecurityCodeService.createSecurityCode(user, User as Model<IUserDocument>, 30);

    // Envoyer le code par email
    await sendEmailWrapper({
      to: user.email,
      template_uuid: '13a6e90c-236b-4d8a-a49d-bf4554ab1aa5',
      template_variables: {
        company_info_name: 'Hemicycle',
        firstname: user.firstname,
        lastname: user.lastname,
        security_code: securityCode.plainCode,
        company_info_address: '123 Rue de la Paix, 75000 Paris, France',
        company_info_city: 'Paris',
        company_info_zip_code: '75000',
        company_info_country: 'France',
      },
    });

    return ResponseHandler.success(res, null, 'Un nouveau code de vérification a été envoyé à votre adresse email');
  } catch (error: any) {
    return ResponseHandler.error(res, 'Erreur lors du renvoi de l\'email de vérification', error.message);
  }
};
