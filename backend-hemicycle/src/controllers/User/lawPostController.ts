import { Response } from 'express';
import mongoose from 'mongoose';
import { AuthenticatedRequest } from '../../middleware/auth';
import LawPost from '../../models/LawPost';
import LawPostReporting from '../../models/LawPostReporting';
import { ResponseHandler } from '../../utils/responseHandler';
import { LawReactionType, LawReactionEmoji } from '../../enum/LawReactionTypeEnum';
import LawReaction from '../../models/LawReaction';
import { LawPostDto } from '../../types/dto/LawPostDto';
import { LawPostReportingResponse } from '../../types/responses/LawPostReportingResponse';
import { IUser } from '../../types/interfaces/IUser';
import { ILawPostReporting } from '../../types/interfaces/ILawPostReporting';

export const addLawReaction = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      ResponseHandler.unauthorized(res, 'Utilisateur non authentifié');
      return;
    }

    const { lawPostId } = req.params;
    const { reactionType, reactionEmoji } = req.body;

    // Validation des paramètres
    if (!lawPostId || !reactionType) {
      ResponseHandler.badRequest(res, 'L\'ID de la loi et le type de réaction sont requis');
      return;
    }

    // Vérifier si l'ID est un ObjectId MongoDB valide
    if (!mongoose.Types.ObjectId.isValid(lawPostId)) {
      ResponseHandler.badRequest(res, 'ID de loi invalide');
      return;
    }

    const lawPost = await LawPost.findById(lawPostId).populate(
      'userId',
      'firstName lastName email hasOnBoarding',
    );
    if (!lawPost) {
      ResponseHandler.notFound(res, 'Loi non trouvée');
      return;
    }

    // Vérification que le type de réaction est valide
    if (!Object.values(LawReactionType).includes(reactionType as LawReactionType)) {
      ResponseHandler.badRequest(res, 'Type de réaction invalide');
      return;
    }

    // Vérification que l'emoji de réaction est valide si fourni
    if (reactionEmoji && !Object.values(LawReactionEmoji).includes(reactionEmoji as LawReactionEmoji)) {
      ResponseHandler.badRequest(res, 'Emoji de réaction invalide');
      return;
    }

    // Recherche d'une réaction existante pour cet utilisateur et ce post
    const existingReaction = await LawReaction.findOne({
      userId: req.user._id,
      lawPostId: lawPost._id,
    });

    // Si une réaction existe, on met à jour son type et l'emoji si fourni
    if (existingReaction) {
      existingReaction.reactionType = reactionType;
      if (reactionEmoji !== undefined) {
        existingReaction.reactionEmoji = reactionEmoji || undefined;
      }
      await existingReaction.save();
    } else {
      // Si aucune réaction existante n'a été trouvée, on en crée une nouvelle
      const newReaction = new LawReaction({
        userId: req.user._id,
        lawPostId: lawPost._id,
        reactionType,
        reactionEmoji,
      });
      await newReaction.save();
    }

    // Transformer la réponse en utilisant LawPostDto sans les réactions
    const response = LawPostDto.toResponse(lawPost, []);
    ResponseHandler.success(
      res,
      response,
      existingReaction ? 'Réaction mise à jour avec succès' : 'Réaction ajoutée avec succès',
      existingReaction ? 200 : 201,
    );
  } catch (error: unknown) {
    if (error instanceof mongoose.Error.ValidationError) {
      ResponseHandler.badRequest(res, 'Données de réaction invalides', error as Error);
    } else {
      ResponseHandler.error(res, 'Erreur lors de l\'ajout de la réaction', error as Error);
    }
  }
};

export const getLawPost = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { lawId } = req.params;
    if (!lawId) {
      ResponseHandler.badRequest(res, 'L\'ID de la loi est requis');
      return;
    }

    // Vérifier si l'ID est un ObjectId MongoDB valide
    if (!mongoose.Types.ObjectId.isValid(lawId)) {
      ResponseHandler.badRequest(res, 'ID de loi invalide');
      return;
    }

    // Récupérer la loi avec les informations de l'utilisateur
    const lawPost = await LawPost.findById(lawId)
      .populate('userId', 'firstName lastName email hasOnBoarding');

    if (!lawPost) {
      ResponseHandler.notFound(res, 'Loi non trouvée');
      return;
    }

    // Récupérer toutes les réactions pour cette loi avec les informations des utilisateurs
    const reactions = await LawReaction.find({ lawPostId: lawPost._id })
      .populate('userId', 'firstName lastName email hasOnBoarding')
      .sort({ createdAt: -1 }); // Trier par date de création décroissante

    const response = LawPostDto.toResponse(lawPost, reactions);
    ResponseHandler.success(res, response, 'Loi récupérée avec succès');
  } catch (error: unknown) {
    ResponseHandler.error(res, 'Erreur lors de la récupération de la loi', error as Error);
  }
};

export const reportLawPost = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const user = req.user as IUser;
    if (!user) {
      ResponseHandler.unauthorized(res, 'Utilisateur non authentifié');
      return;
    }

    const { lawPostId } = req.params;
    const { reason, description } = req.body;

    if (!mongoose.Types.ObjectId.isValid(lawPostId)) {
      ResponseHandler.badRequest(res, 'ID de loi invalide');
      return;
    }

    const lawPost = await LawPost.findById(lawPostId);
    if (!lawPost) {
      ResponseHandler.notFound(res, 'Publication non trouvée');
      return;
    }

    const existingReport = await LawPostReporting.findOne({ userId: user._id, lawPostId });
    if (existingReport) {
      ResponseHandler.badRequest(res, 'Vous avez déjà signalé cette publication');
      return;
    }

    const newReport = await LawPostReporting.create({
      userId: user._id,
      lawPostId,
      reason,
      description,
    }) as ILawPostReporting;

    const response: LawPostReportingResponse = {
      id: newReport._id.toString(),
      lawPost: await LawPostDto.toResponse(lawPost),
      reason: newReport.reason,
      description: newReport.description,
      createdAt: newReport.createdAt.toISOString(),
      updatedAt: newReport.updatedAt.toISOString(),
    };

    ResponseHandler.success(res, response, 'Publication signalée avec succès', 201);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      ResponseHandler.badRequest(res, 'Données de signalement invalides', error);
    } else {
      ResponseHandler.error(res, 'Erreur lors du signalement de la publication', error as Error);
    }
  }
};
