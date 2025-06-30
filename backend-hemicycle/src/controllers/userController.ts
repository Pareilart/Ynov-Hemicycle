import { Request, Response } from 'express';
import User from '../models/User';
import { AuthenticatedRequest } from '../middleware/auth';
import VotingSurvey from '../models/VotingSurvey';
import { VotingFrequencyEnum } from '../enum/VotingFrequencyEnum';
import { ElectoralRegistrationEnum } from '../enum/ElectoralRegistrationEnum';
import { PoliticalPositioningEnum } from '../enum/PoliticalPositioningEnum';
import { PoliticalProximityEnum } from '../enum/PoliticalProximityEnum';
import { Types } from 'mongoose';
import { UserDto } from '../types/dto/UserDto';
import { IUserDocument } from '../types/interfaces/IUserDocument';
import { ResponseHandler } from '../utils/responseHandler';

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

export const userOnboarding = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const userDoc = await User.findById(req.user?._id)
            .populate('role')
            .populate('addresses');
            
        if (!userDoc) {
            ResponseHandler.notFound(res, "Utilisateur non trouvé");
            return;
        }

        if (userDoc.hasOnBoarding) {
            ResponseHandler.badRequest(res, "L'utilisateur a déjà complété le onboarding");
            return;
        }

        if (!req.body.voting_frequency || !Object.values(VotingFrequencyEnum).includes(req.body.voting_frequency)) {
            ResponseHandler.badRequest(res, "Fréquence de vote invalide");
            return;
        }
        if (!req.body.electoral_registration || !Object.values(ElectoralRegistrationEnum).includes(req.body.electoral_registration)) {
            ResponseHandler.badRequest(res, "Inscription électorale invalide");
            return;
        }
        if (!req.body.positioning || !Object.values(PoliticalPositioningEnum).includes(req.body.positioning)) {
            ResponseHandler.badRequest(res, "Positionnement politique invalide");
            return;
        }
        if (!req.body.proximity || !Object.values(PoliticalProximityEnum).includes(req.body.proximity)) {
            ResponseHandler.badRequest(res, "Proximité politique invalide");
            return;
        }

        const votingSurvey = new VotingSurvey({
            voting_frequency: req.body.voting_frequency as VotingFrequencyEnum,
            electoral_registration: req.body.electoral_registration as ElectoralRegistrationEnum,
            positioning: req.body.positioning as PoliticalPositioningEnum,
            proximity: req.body.proximity as PoliticalProximityEnum
        });

        const savedVotingSurvey = await votingSurvey.save();

        userDoc.votingSurvey = savedVotingSurvey._id as Types.ObjectId;
        userDoc.hasOnBoarding = true;
        await userDoc.save();

        const updatedUser = await User.findById(userDoc._id)
            .populate('role')
            .populate('addresses')
            .populate('votingSurvey');

        if (updatedUser) {
            ResponseHandler.success(
                res,
                UserDto.toResponse(updatedUser as unknown as IUserDocument),
                "Onboarding complété avec succès"
            );
        } else {
            ResponseHandler.error(res, "Erreur lors de la mise à jour de l'utilisateur");
        }
    } catch (error) {
        ResponseHandler.error(res, (error as Error).message);
    }
};