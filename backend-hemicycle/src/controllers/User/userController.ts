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