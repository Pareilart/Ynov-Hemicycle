import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User';
import Role from '../models/Role';
import { RoleEnum } from '../enum/RoleEnum';
import { AuthenticatedRequest } from '../middleware/auth';
import { UserResponse, IUserPopulated } from '../types';
import { generateToken } from '../utils/jwtUtils';
import { IRole } from '../types/interfaces/IRole';
import { IUserDocument } from '../types/interfaces/IUserDocument';
import { IUserCreate } from '../types/interfaces/IUserCreate';
import { Types } from 'mongoose';
import { ResponseHandler } from '../utils/responseHandler';

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return ResponseHandler.badRequest(res, "Email et mot de passe requis");
        }

        // Vérifier si l'utilisateur existe
        const user = await User.findOne({ email })
            .select('+password')
            .populate<{ role: IRole }>('role') as IUserDocument | null;
            
        if (!user) {
            return ResponseHandler.unauthorized(res, "Email ou mot de passe incorrect");
        }

        // Vérifier le mot de passe
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return ResponseHandler.unauthorized(res, "Email ou mot de passe incorrect");
        }

        try {
            const token = generateToken(user._id, user.role.name);
            ResponseHandler.success(res, {
                userId: user._id,
                token: {
                    token: token,
                    expiresIn: 24 * 60 * 60 * 1000,
                    exp: Date.now() + 24 * 60 * 60 * 1000
                }
            });
        } catch (error) {
            return ResponseHandler.error(res, "Erreur lors de la génération du token");
        }
    } catch (error: any) {
        console.error('Erreur de connexion:', error);
        ResponseHandler.error(res, "Erreur lors de la connexion", error.message);
    }
};

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, firstName, lastName } = req.body;

        // Vérification des champs requis
        if (!email || !password || !firstName || !lastName) {
            return ResponseHandler.badRequest(res, "Tous les champs sont requis", {
                required: ["email", "password", "firstName", "lastName"]
            });
        }

        // Validation du format de l'email
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return ResponseHandler.badRequest(res, "Format d'email invalide");
        }

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return ResponseHandler.badRequest(res, "Cet email est déjà utilisé");
        }

        // Trouver le rôle "user"
        const userRole = await Role.findOne({ name: RoleEnum.USER });
        if (!userRole) {
            return ResponseHandler.error(res, "Erreur: le rôle 'user' n'existe pas dans la base de données");
        }

        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer le nouvel utilisateur
        const userData: IUserCreate = {
            email,
            password: hashedPassword,
            firstName,
            lastName,
            role: userRole._id,
        };

        const user = await User.create(userData);

        try {
            const token = generateToken(user._id as Types.ObjectId, userRole.name);
            ResponseHandler.success(res, {
                userId: user._id,
                token: {
                    token: token,
                    expiresIn: 24 * 60 * 60 * 1000,
                    exp: Date.now() + 24 * 60 * 60 * 1000
                }
            }, "Utilisateur créé avec succès", 201);
        } catch (error) {
            return ResponseHandler.error(res, "Erreur lors de la génération du token");
        }
    } catch (error: any) {
        console.error('Erreur d\'inscription:', error);
        ResponseHandler.error(res, "Erreur lors de l'inscription", error.message);
    }
};

export const me = async (req: AuthenticatedRequest, res: Response) => {
    try {
        if (!req.user) {
            return ResponseHandler.unauthorized(res, "Utilisateur non authentifié");
        }

        const user = await User.findById(req.user._id)
            .populate('role')
            .populate('addresses')
            .select('-password') as IUserPopulated | null;

        if (!user) {
            return ResponseHandler.notFound(res, "Utilisateur non trouvé");
        }

        const userResponse: UserResponse = {
            id: user._id.toString(),
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            birthday: user.birthday,
            sexe: user.sexe,
            emailVerifiedAt: user.emailVerifiedAt,
            role: {
                id: user.role._id.toString(),
                name: user.role.name,
                description: user.role.description,
            },
            addresses: user.addresses ? {
                line1: user.addresses.line1,
                line2: user.addresses.line2,
                postalCode: user.addresses.postalCode,
                city: user.addresses.city,
                state: user.addresses.state,
                country: user.addresses.country,
            } : undefined
        };

        ResponseHandler.success(res, userResponse);
    } catch (error: any) {
        console.error('Erreur lors de la récupération du profil:', error);
        ResponseHandler.error(res, "Erreur lors de la récupération du profil", error.message);
    }
}; 