import { Response } from 'express';
import { Types, Document } from 'mongoose';
import { Parser } from 'json2csv';
import User from '../../models/User';
import { AuthenticatedRequest } from '../../middleware/auth';
import VotingSurvey from '../../models/VotingSurvey';
import { VotingFrequencyEnum } from '../../enum/VotingFrequencyEnum';
import { ElectoralRegistrationEnum } from '../../enum/ElectoralRegistrationEnum';
import { PoliticalPositioningEnum } from '../../enum/PoliticalPositioningEnum';
import { PoliticalProximityEnum } from '../../enum/PoliticalProximityEnum';
import { UserDto } from '../../types/dto/UserDto';
import { IUserDocument } from '../../types/interfaces/IUserDocument';
import { ResponseHandler } from '../../utils/responseHandler';
import { UserService } from '../../services/userService';
import Role from '../../models/Role';
import { RoleEnum } from '../../enum/RoleEnum';
import LawReaction from '../../models/LawReaction';
import { ILawPost } from '../../types/interfaces/ILawPost';
import { ILawReaction } from '../../types/interfaces/ILawReaction';

export const userOnboarding = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  try {
    const userDoc = await User.findById(req.user?._id)
      .populate('role')
      .populate('addresses');

    if (!userDoc) {
      ResponseHandler.notFound(res, 'Utilisateur non trouvé');
      return;
    }

    if (userDoc.hasOnBoarding) {
      ResponseHandler.badRequest(
        res,
        'L\'utilisateur a déjà complété le onboarding',
      );
      return;
    }

    if (
      !req.body.voting_frequency
      || !Object.values(VotingFrequencyEnum).includes(req.body.voting_frequency)
    ) {
      ResponseHandler.badRequest(res, 'Fréquence de vote invalide');
      return;
    }
    if (
      !req.body.electoral_registration
      || !Object.values(ElectoralRegistrationEnum).includes(
        req.body.electoral_registration,
      )
    ) {
      ResponseHandler.badRequest(res, 'Inscription électorale invalide');
      return;
    }
    if (
      !req.body.positioning
      || !Object.values(PoliticalPositioningEnum).includes(req.body.positioning)
    ) {
      ResponseHandler.badRequest(res, 'Positionnement politique invalide');
      return;
    }
    if (
      !req.body.proximity
      || !Object.values(PoliticalProximityEnum).includes(req.body.proximity)
    ) {
      ResponseHandler.badRequest(res, 'Proximité politique invalide');
      return;
    }

    const votingSurvey = new VotingSurvey({
      voting_frequency: req.body.voting_frequency as VotingFrequencyEnum,
      electoral_registration: req.body
        .electoral_registration as ElectoralRegistrationEnum,
      positioning: req.body.positioning as PoliticalPositioningEnum,
      proximity: req.body.proximity as PoliticalProximityEnum,
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
        'Onboarding complété avec succès',
      );
    } else {
      ResponseHandler.error(
        res,
        'Erreur lors de la mise à jour de l\'utilisateur',
      );
    }
  } catch (error) {
    ResponseHandler.error(res, (error as Error).message);
  }
};

export const updateProfile = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user?._id) {
      ResponseHandler.unauthorized(res, 'Utilisateur non authentifié');
      return;
    }

    const { user, message } = await UserService.updateProfile(
      req.user._id.toString(),
      req.body,
    );
    ResponseHandler.success(res, user, message);
  } catch (error) {
    ResponseHandler.badRequest(res, (error as Error).message);
  }
};

export const getProfile = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  try {
    const user = await User.findById(req.user?._id)
      .populate('role')
      .populate('addresses')
      .populate('votingSurvey');

    if (!user) {
      ResponseHandler.notFound(res, 'Utilisateur non trouvé');
      return;
    }

    ResponseHandler.success(
      res,
      UserDto.toResponse(user as unknown as IUserDocument),
      'Profil récupéré avec succès',
    );
  } catch (error) {
    ResponseHandler.error(res, (error as Error).message);
  }
};

export const deleteUser = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  try {
    const user = await User.findById(req.user?._id).populate('role');
    if (!user) {
      ResponseHandler.notFound(res, 'Utilisateur non trouvé');
      return;
    }

    // Vérifier si l'utilisateur est un admin
    if (user.role && (user.role as any).name === RoleEnum.ADMIN) {
      // Compter le nombre total d'administrateurs
      const adminRole = await Role.findOne({ name: RoleEnum.ADMIN });
      if (!adminRole) {
        ResponseHandler.error(res, 'Erreur: rôle administrateur non trouvé');
        return;
      }

      const adminCount = await User.countDocuments({ role: adminRole._id });

      if (adminCount <= 1) {
        ResponseHandler.forbidden(
          res,
          'Impossible de supprimer votre compte car vous êtes le dernier administrateur du système',
        );
        return;
      }
    }

    await user.deleteOne();
    ResponseHandler.success(res, null, 'Utilisateur supprimé avec succès');
  } catch (error) {
    ResponseHandler.error(res, (error as Error).message);
  }
};

export const exportProfile = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  try {
    const {
      exportFormat,
      profile: includeProfile,
      lawReaction: includeLawReaction,
    } = req.body;

    const user = await User.findById(req.user?._id)
      .populate('role')
      .populate('addresses')
      .populate('votingSurvey');

    if (!user) {
      ResponseHandler.notFound(res, 'Utilisateur non trouvé');
      return;
    }

    const exportData: any = {};

    // Ajouter les données du profil si demandé
    if (includeProfile) {
      exportData.profile = UserDto.toResponse(user as unknown as IUserDocument);
    }

    // Ajouter les réactions aux lois si demandé
    if (includeLawReaction) {
      const userReactions = await LawReaction.find({ user_id: req.user?._id })
        .populate<{ law_post_id: Document<unknown, {}, ILawPost> }>('law_post_id')
        .sort({ created_at: -1 });

      exportData.lawReactions = userReactions.map((reaction) => {
        const lawPost = reaction.law_post_id as Document<unknown, {}, ILawPost>;
        return {
          reaction_id: (reaction as ILawReaction)._id.toString(),
          loi_titre: lawPost.get('title') || '',
          type_reaction: reaction.reaction_type,
          emoji_reaction: reaction.reaction_emoji || '',
          date_reaction: new Date(reaction.createdAt).toLocaleDateString(
            'fr-FR',
          ),
        };
      });
    }

    if (exportFormat === 'JSON') {
      res.setHeader(
        'Content-Disposition',
        'attachment; filename=profile.json',
      );
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(exportData, null, 2));
    } else if (exportFormat === 'CSV') {
      let csvData: any[] = [];

      if (includeProfile) {
        const profileData = {
          id: exportData.profile.id,
          prenom: exportData.profile.firstName,
          nom: exportData.profile.lastName,
          date_naissance: exportData.profile.birthday
            ? new Date(exportData.profile.birthday).toLocaleDateString(
              'fr-FR',
            )
            : '',
          sexe: exportData.profile.sexe || '',
          email: exportData.profile.email,
          email_verifie_le: exportData.profile.emailVerifiedAt
            ? new Date(exportData.profile.emailVerifiedAt).toLocaleDateString(
              'fr-FR',
            )
            : '',
          onboarding_complete: exportData.profile.hasOnBoarding
            ? 'Oui'
            : 'Non',
          role: exportData.profile.role?.name || '',
          adresse_ligne1: exportData.profile.addresses?.line1 || '',
          adresse_ligne2: exportData.profile.addresses?.line2 || '',
          code_postal: exportData.profile.addresses?.postalCode || '',
          ville: exportData.profile.addresses?.city || '',
          region: exportData.profile.addresses?.state || '',
          pays: exportData.profile.addresses?.country || '',
          frequence_vote:
          exportData.profile.votingSurvey?.voting_frequency || '',
          inscription_electorale:
          exportData.profile.votingSurvey?.electoral_registration || '',
          positionnement_politique:
          exportData.profile.votingSurvey?.positioning || '',
          proximite_politique:
          exportData.profile.votingSurvey?.proximity || '',
        };

        if (!includeLawReaction) {
          csvData.push(profileData);
        } else {
          const reactions = exportData.lawReactions || [];
          csvData = reactions.length === 0
            ? [
              {
                ...profileData,
                reaction_id: '',
                loi_titre: '',
                type_reaction: '',
                emoji_reaction: '',
                date_reaction: '',
              },
            ]
            : reactions.map((reaction: any) => ({
              ...profileData,
              reaction_id: reaction.reaction_id,
              loi_titre: reaction.loi_titre,
              type_reaction: reaction.type_reaction,
              emoji_reaction: reaction.emoji_reaction,
              date_reaction: reaction.date_reaction,
            }));
        }
      } else if (includeLawReaction) {
        csvData = exportData.lawReactions;
      }

      const fields = [
        ...(includeProfile
          ? [
            { label: 'ID', value: 'id' },
            { label: 'Prénom', value: 'prenom' },
            { label: 'Nom', value: 'nom' },
            { label: 'Date de naissance', value: 'date_naissance' },
            { label: 'Sexe', value: 'sexe' },
            { label: 'Email', value: 'email' },
            { label: 'Email vérifié le', value: 'email_verifie_le' },
            { label: 'Onboarding complété', value: 'onboarding_complete' },
            { label: 'Rôle', value: 'role' },
            { label: 'Adresse ligne 1', value: 'adresse_ligne1' },
            { label: 'Adresse ligne 2', value: 'adresse_ligne2' },
            { label: 'Code postal', value: 'code_postal' },
            { label: 'Ville', value: 'ville' },
            { label: 'État/Région', value: 'region' },
            { label: 'Pays', value: 'pays' },
            { label: 'Fréquence de vote', value: 'frequence_vote' },
            {
              label: 'Inscription électorale',
              value: 'inscription_electorale',
            },
            {
              label: 'Positionnement politique',
              value: 'positionnement_politique',
            },
            { label: 'Proximité politique', value: 'proximite_politique' },
          ]
          : []),
        ...(includeLawReaction
          ? [
            { label: 'ID Réaction', value: 'reaction_id' },
            { label: 'Titre de la loi', value: 'loi_titre' },
            { label: 'Type de réaction', value: 'type_reaction' },
            { label: 'Emoji de réaction', value: 'emoji_reaction' },
            { label: 'Date de réaction', value: 'date_reaction' },
          ]
          : []),
      ];

      const json2csvParser = new Parser({ fields });
      const csv = json2csvParser.parse(csvData);
      res.setHeader(
        'Content-Disposition',
        'attachment; filename=profile.csv',
      );
      res.setHeader('Content-Type', 'text/csv');
      res.send(csv);
    } else {
      ResponseHandler.badRequest(res, 'Format d\'exportation non supporté');
    }
  } catch (error) {
    ResponseHandler.error(res, (error as Error).message);
  }
};
