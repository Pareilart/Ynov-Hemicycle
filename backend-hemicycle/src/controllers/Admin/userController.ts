import { Request, Response } from 'express';
import User from '../../models/User';
import { AuthenticatedRequest } from '../../middleware/auth';
import VotingSurvey from '../../models/VotingSurvey';
import { VotingFrequencyEnum } from '../../enum/VotingFrequencyEnum';
import { ElectoralRegistrationEnum } from '../../enum/ElectoralRegistrationEnum';
import { PoliticalPositioningEnum } from '../../enum/PoliticalPositioningEnum';
import { PoliticalProximityEnum } from '../../enum/PoliticalProximityEnum';
import { Types } from 'mongoose';
import { UserDto } from '../../types/dto/UserDto';
import { IUserDocument } from '../../types/interfaces/IUserDocument';
import { ResponseHandler } from '../../utils/responseHandler';

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
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

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
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

export const createUser = async (req: Request, res: Response): Promise<void> => {
    const user = new User(req.body);
    try {
        const newUser = await user.save();
        const populatedUser = await User.findById(newUser._id)
            .populate('role')
            .populate('addresses')
            .populate('votingSurvey');
            
        if (populatedUser) {
            ResponseHandler.success(
                res, 
                UserDto.toResponse(populatedUser as unknown as IUserDocument),
                "Utilisateur créé avec succès",
                201
            );
        } else {
            ResponseHandler.error(res, "Erreur lors de la création de l'utilisateur");
        }
    } catch (error) {
        ResponseHandler.badRequest(res, (error as Error).message);
    }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            Object.assign(user, req.body);
            const updatedUser = await user.save();
            const populatedUser = await User.findById(updatedUser._id)
                .populate('role')
                .populate('addresses')
                .populate('votingSurvey');
                
            if (populatedUser) {
                ResponseHandler.success(
                    res, 
                    UserDto.toResponse(populatedUser as unknown as IUserDocument),
                    "Utilisateur mis à jour avec succès"
                );
            } else {
                ResponseHandler.error(res, "Erreur lors de la mise à jour de l'utilisateur");
            }
        } else {
            ResponseHandler.notFound(res, "Utilisateur non trouvé");
        }
    } catch (error) {
        ResponseHandler.badRequest(res, (error as Error).message);
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            await user.deleteOne();
            ResponseHandler.success(res, null, "Utilisateur supprimé avec succès");
        } else {
            ResponseHandler.notFound(res, "Utilisateur non trouvé");
        }
    } catch (error) {
        ResponseHandler.error(res, (error as Error).message);
    }
};