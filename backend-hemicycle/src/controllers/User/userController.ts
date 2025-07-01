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
import { UserService } from '../../services/userService';
import Role from '../../models/Role';
import { RoleEnum } from '../../enum/RoleEnum';

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

export const updateProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        if (!req.user?._id) {
            ResponseHandler.unauthorized(res, "Utilisateur non authentifié");
            return;
        }

        const { user, message } = await UserService.updateProfile(req.user._id.toString(), req.body);
        ResponseHandler.success(res, user, message);
    } catch (error) {
        ResponseHandler.badRequest(res, (error as Error).message);
    }
};

export const getProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.user?._id)
            .populate('role')
            .populate('addresses')
            .populate('votingSurvey');

        if (!user) {
            ResponseHandler.notFound(res, "Utilisateur non trouvé");
            return;
        }

        ResponseHandler.success(res, UserDto.toResponse(user as unknown as IUserDocument), "Profil récupéré avec succès");
    } catch (error) {
        ResponseHandler.error(res, (error as Error).message);
    }
};

export const deleteUser = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.user?._id).populate('role');
        if (!user) {
            ResponseHandler.notFound(res, "Utilisateur non trouvé");
            return;
        }

        // Vérifier si l'utilisateur est un admin
        if (user.role && (user.role as any).name === RoleEnum.ADMIN) {
            // Compter le nombre total d'administrateurs
            const adminRole = await Role.findOne({ name: RoleEnum.ADMIN });
            if (!adminRole) {
                ResponseHandler.error(res, "Erreur: rôle administrateur non trouvé");
                return;
            }

            const adminCount = await User.countDocuments({ role: adminRole._id });
            
            if (adminCount <= 1) {
                ResponseHandler.forbidden(res, "Impossible de supprimer votre compte car vous êtes le dernier administrateur du système");
                return;
            }
        }

        await user.deleteOne();
        ResponseHandler.success(res, null, "Utilisateur supprimé avec succès");
    } catch (error) {
        ResponseHandler.error(res, (error as Error).message);
    }
};

export const exportProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.user?._id)
            .populate('role')
            .populate('addresses')
            .populate('votingSurvey');

        if (!user) {
            ResponseHandler.notFound(res, "Utilisateur non trouvé");
            return;
        }

        const profile = UserDto.toResponse(user as unknown as IUserDocument);
        
        // Définir les en-têtes du CSV
        const headers = [
            'ID',
            'Prénom',
            'Nom',
            'Date de naissance',
            'Sexe',
            'Email',
            'Email vérifié le',
            'Onboarding complété',
            'Rôle',
            'Adresse ligne 1',
            'Adresse ligne 2',
            'Code postal',
            'Ville',
            'État/Région',
            'Pays',
            'Fréquence de vote',
            'Inscription électorale',
            'Positionnement politique',
            'Proximité politique'
        ].join(',');

        // Préparer les données
        const data = [
            profile.id,
            profile.firstName,
            profile.lastName,
            profile.birthday ? new Date(profile.birthday).toLocaleDateString('fr-FR') : '',
            profile.sexe || '',
            profile.email,
            profile.emailVerifiedAt ? new Date(profile.emailVerifiedAt).toLocaleDateString('fr-FR') : '',
            profile.hasOnBoarding ? 'Oui' : 'Non',
            profile.role?.name || '',
            profile.addresses?.line1 || '',
            profile.addresses?.line2 || '',
            profile.addresses?.postalCode || '',
            profile.addresses?.city || '',
            profile.addresses?.state || '',
            profile.addresses?.country || '',
            profile.votingSurvey?.voting_frequency || '',
            profile.votingSurvey?.electoral_registration || '',
            profile.votingSurvey?.positioning || '',
            profile.votingSurvey?.proximity || ''
        ].map(field => `"${String(field).replace(/"/g, '""')}"`).join(',');

        const csvContent = `${headers}\n${data}`;

        res.setHeader('Content-Disposition', 'attachment; filename="profile.csv"');
        res.setHeader('Content-Type', 'text/csv');
        res.send(csvContent);
    } catch (error) {
        ResponseHandler.error(res, (error as Error).message);
    }
};