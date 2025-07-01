import { Response } from 'express';
import { AuthenticatedRequest } from '../../middleware/auth';
import LawPost from '../../models/LawPost';
import { ResponseHandler } from '../../utils/responseHandler';
import { LawReactionType } from '../../enum/LawReactionTypeEnum';
import { LawReactionEmoji } from '../../enum/LawReactionTypeEnum';
import LawReaction from '../../models/LawReaction';
import mongoose from 'mongoose';
import { LawPostDto } from '../../types/dto/LawPostDto';

export const addLawReaction = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            ResponseHandler.unauthorized(res, "Utilisateur non authentifié");
            return;
        }

        const { law_post_id } = req.params;
        const { reaction_type, reaction_emoji } = req.body;

        // Validation des paramètres
        if (!law_post_id || !reaction_type) {
            ResponseHandler.badRequest(res, "L'ID de la loi et le type de réaction sont requis");
            return;
        }

        // Vérifier si l'ID est un ObjectId MongoDB valide
        if (!mongoose.Types.ObjectId.isValid(law_post_id)) {
            ResponseHandler.badRequest(res, "ID de loi invalide");
            return;
        }

        const lawPost = await LawPost.findById(law_post_id);
        if (!lawPost) {
            ResponseHandler.notFound(res, "Loi non trouvée");
            return;
        }

        // Vérification que le type de réaction est valide
        if (!Object.values(LawReactionType).includes(reaction_type as LawReactionType)) {
            ResponseHandler.badRequest(res, "Type de réaction invalide");
            return;
        }

        // Vérification que l'emoji de réaction est valide si fourni
        if (reaction_emoji && !Object.values(LawReactionEmoji).includes(reaction_emoji as LawReactionEmoji)) {
            ResponseHandler.badRequest(res, "Emoji de réaction invalide");
            return;
        }

        // Recherche d'une réaction existante pour cet utilisateur et ce post
        let existingReaction = await LawReaction.findOne({
            user_id: req.user._id,
            law_post_id: lawPost._id
        });

        // Si une réaction existe, on met à jour son type et l'emoji si fourni
        if (existingReaction) {
            existingReaction.reaction_type = reaction_type;
            if (reaction_emoji !== undefined) {
                existingReaction.reaction_emoji = reaction_emoji || undefined;
            }
            const updatedReaction = await existingReaction.save();
            ResponseHandler.success(res, updatedReaction, "Réaction mise à jour avec succès");
            return;
        }

        // Si aucune réaction existante n'a été trouvée, on en crée une nouvelle
        const newReaction = new LawReaction({
            user_id: req.user._id,
            law_post_id: lawPost._id,
            reaction_type,
            ...(reaction_emoji && { reaction_emoji })
        });

        const savedReaction = await newReaction.save();
        ResponseHandler.success(res, savedReaction, "Réaction ajoutée avec succès", 201);

    } catch (error: any) {
        if (error instanceof mongoose.Error.ValidationError) {
            ResponseHandler.badRequest(res, "Données de réaction invalides", error.message);
        } else {
            console.error('Erreur lors de l\'ajout de la réaction:', error);
            ResponseHandler.error(res, "Erreur lors de l'ajout de la réaction", error.message);
        }
    }
};

export const getLawPost = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const { law_id } = req.params;
        if (!law_id) {
            ResponseHandler.badRequest(res, "L'ID de la loi est requis");
            return;
        }

        // Vérifier si l'ID est un ObjectId MongoDB valide
        if (!mongoose.Types.ObjectId.isValid(law_id)) {
            ResponseHandler.badRequest(res, "ID de loi invalide");
            return;
        }

        // Récupérer la loi avec les informations de l'utilisateur
        const lawPost = await LawPost.findById(law_id)
            .populate('user_id', 'firstName lastName email');

        if (!lawPost) {
            ResponseHandler.notFound(res, "Loi non trouvée");
            return;
        }

        // Récupérer toutes les réactions pour cette loi avec les informations des utilisateurs
        const reactions = await LawReaction.find({ law_post_id: lawPost._id })
            .sort({ created_at: -1 }); // Trier par date de création décroissante

        const response = LawPostDto.toResponse(lawPost, reactions);
        ResponseHandler.success(res, response, "Loi récupérée avec succès");
    } catch (error: any) {
        console.error('Erreur lors de la récupération de la loi:', error);
        ResponseHandler.error(res, "Erreur lors de la récupération de la loi", error.message);
    }
}; 