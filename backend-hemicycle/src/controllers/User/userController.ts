import { Response } from 'express';
import { Types, Document, Model } from 'mongoose';
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
import { SecurityCodeService } from '../../services/SecurityCodeService';
import { sendEmailWrapper } from '../../services/EmailService';

export const userOnboarding = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  try {
    const userDoc = await User.findById(req.user?._id)
      .populate('role')
      .populate('address');

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
      .populate('address')
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
      .populate('address')
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
      .populate('address')
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
      const userReactions = await LawReaction.find({ userId: req.user?._id })
        .populate<{ lawPostId: Document<unknown, {}, ILawPost> }>('lawPostId')
        .sort({ createdAt: -1 });

      exportData.lawReactions = userReactions.map((reaction) => {
        const lawPost = reaction.lawPostId as Document<unknown, {}, ILawPost>;
        return {
          reaction_id: ((reaction as unknown) as ILawReaction)._id.toString(),
          loi_titre: lawPost.get('title') || '',
          type_reaction: reaction.reactionType,
          emoji_reaction: reaction.reactionEmoji || '',
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
          prenom: exportData.profile.firstname,
          nom: exportData.profile.lastname,
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
          adresse_ligne1: exportData.profile.address?.line1 || '',
          adresse_ligne2: exportData.profile.address?.line2 || '',
          code_postal: exportData.profile.address?.postalCode || '',
          ville: exportData.profile.address?.city || '',
          region: exportData.profile.address?.state || '',
          pays: exportData.profile.address?.country || '',
          frequence_vote:
          exportData.profile.votingSurvey?.votingFrequency || '',
          inscription_electorale:
          exportData.profile.votingSurvey?.electoralRegistration || '',
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
              reaction_id: reaction.reactionId,
              loi_titre: reaction.loiTitre,
              type_reaction: reaction.typeReaction,
              emoji_reaction: reaction.emojiReaction,
              date_reaction: reaction.dateReaction,
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

/**
 * Active ou désactive l'authentification à deux facteurs pour un utilisateur
 */
export const toggleTwoFactor = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return ResponseHandler.unauthorized(res, 'Utilisateur non authentifié');
    }

    const user = await User.findById(req.user._id) as IUserDocument;
    if (!user) {
      return ResponseHandler.notFound(res, 'Utilisateur non trouvé');
    }

    // Vérifie si l'email est vérifié avant d'activer la 2FA
    if (!user.emailVerifiedAt) {
      return ResponseHandler.badRequest(res, 'Vous devez vérifier votre email avant d\'activer la 2FA');
    }

    // Inverse l'état actuel de la 2FA
    user.twoFactorEnabled = !user.twoFactorEnabled;
    await user.save();

    // Si la 2FA vient d'être activée, envoyer un code de test
    if (user.twoFactorEnabled) {
      const securityCode = await SecurityCodeService.createSecurityCode(user, User as Model<IUserDocument>, 5);

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
        twoFactorEnabled: true,
        message: 'Un code de vérification a été envoyé à votre email pour tester la 2FA',
      });
    }

    return ResponseHandler.success(res, {
      twoFactorEnabled: false,
      message: 'L\'authentification à deux facteurs a été désactivée',
    });
  } catch (error: any) {
    console.error('Erreur lors de la modification de la 2FA:', error);
    return ResponseHandler.error(res, 'Erreur lors de la modification de la 2FA', error.message);
  }
};
