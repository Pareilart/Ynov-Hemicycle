import { Request, Response } from 'express';
import User from '../../models/User';
import { UserDto } from '../../types/dto/UserDto';
import { IUserDocument } from '../../types/interfaces/IUserDocument';
import { ResponseHandler } from '../../utils/responseHandler';
import { AuthUtils } from '../../utils/authUtils';
import { AuthenticatedRequest } from '../../middleware/auth';
import { UserService } from '../../services/userService';
import { IUserCreate } from '../../types/interfaces/IUserCreate';
import Role from '../../models/Role';
import { RoleEnum } from '../../enum/RoleEnum';

export const getAllUsers = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const isAdmin = await AuthUtils.checkIsAdmin(req, res);
        if (!isAdmin) {
            ResponseHandler.forbidden(res, "Accès refusé. Droits administrateur requis");
            return;
        }

        const users = await User.find()
            .populate('role')
            .populate('addresses')
            .populate('votingSurvey');
        
        const userResponses = users.map(user => UserDto.toResponse(user as unknown as IUserDocument));
        ResponseHandler.success(res, userResponses, 'Liste des utilisateurs récupérée avec succès');
    } catch (error) {
        ResponseHandler.error(res, (error as Error).message);
    }
};

export const getUserById = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const isAdmin = await AuthUtils.checkIsAdmin(req, res);
        if (!isAdmin) {
            ResponseHandler.forbidden(res, "Accès refusé. Droits administrateur requis");
            return;
        }

        const user = await User.findById(req.params.id)
            .populate('role')
            .populate('addresses')
            .populate('votingSurvey');
            
        if (user) {
            ResponseHandler.success(res, UserDto.toResponse(user as unknown as IUserDocument), 'Utilisateur trouvé avec succès');
        } else {
            ResponseHandler.notFound(res, "Utilisateur non trouvé");
        }
    } catch (error) {
        ResponseHandler.error(res, (error as Error).message);
    }
};

export const createUser = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const isAdmin = await AuthUtils.checkIsAdmin(req, res);
        console.log(req.body);
        if (!isAdmin) {
            ResponseHandler.forbidden(res, "Accès refusé. Droits administrateur requis");
            return;
        }

        const userRole = await Role.findOne({ name: req.body.role });
        if (!userRole) {
            ResponseHandler.error(res, "Erreur: le rôle '" + req.body.role + "' n'existe pas dans la base de données");
            return;
        }

        const userData: IUserCreate = {
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            role: userRole._id
        };

        const { user: createdUser, message } = await UserService.createUser(userData);
        ResponseHandler.success(res, createdUser, message, 201);
    } catch (error) {
        ResponseHandler.badRequest(res, (error as Error).message);
    }
};

export const updateUser = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const isAdmin = await AuthUtils.checkIsAdmin(req, res);
        if (!isAdmin) {
            ResponseHandler.forbidden(res, "Accès refusé. Droits administrateur requis");
            return;
        }

        const { user, message } = await UserService.updateUser(req.params.id, req.body);
        ResponseHandler.success(res, user, message);
    } catch (error) {
        ResponseHandler.badRequest(res, (error as Error).message);
    }
};

export const deleteUser = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const isAdmin = await AuthUtils.checkIsAdmin(req, res);
        if (!isAdmin) {
            ResponseHandler.forbidden(res, "Accès refusé. Droits administrateur requis");
            return;
        }

        const userToDelete = await User.findById(req.params.id).populate('role');
        if (!userToDelete) {
            ResponseHandler.notFound(res, "Utilisateur non trouvé");
            return;
        }

        // Vérifier si l'utilisateur à supprimer est un admin
        if (userToDelete.role && (userToDelete.role as any).name === RoleEnum.ADMIN) {
            // Compter le nombre total d'administrateurs
            const adminRole = await Role.findOne({ name: RoleEnum.ADMIN });
            if (!adminRole) {
                ResponseHandler.error(res, "Erreur: rôle administrateur non trouvé");
                return;
            }

            const adminCount = await User.countDocuments({ role: adminRole._id });
            
            if (adminCount <= 1) {
                ResponseHandler.forbidden(res, "Impossible de supprimer le dernier administrateur du système");
                return;
            }
        }

        await userToDelete.deleteOne();
        ResponseHandler.success(res, null, "Utilisateur supprimé avec succès");
    } catch (error) {
        ResponseHandler.error(res, (error as Error).message);
    }
};