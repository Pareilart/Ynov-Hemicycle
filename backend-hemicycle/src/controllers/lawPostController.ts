import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';
import LawPost from '../models/LawPost';
import { ResponseHandler } from '../utils/responseHandler';
import { LawReactionType } from '../enum/LawReactionTypeEnum';
import { LawReactionEmoji } from '../enum/LawReactionTypeEnum';
import LawReaction from '../models/LawReaction';
import mongoose from 'mongoose';

export const createLawPost = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            ResponseHandler.unauthorized(res, "Utilisateur non authentifié");
            return;
        }

        const {
            title,
            article_constitutionnel,
            vote_type,
            date_proposition,
            date_adoption,
            legislature
        } = req.body;

        // Vérification des champs requis
        if (!title || !article_constitutionnel || !vote_type || !date_proposition || !date_adoption || !legislature) {
            ResponseHandler.badRequest(res, "Tous les champs sont requis", {
                required: ["title", "article_constitutionnel", "vote_type", "date_proposition", "date_adoption", "legislature"]
            });
            return;
        }

        // Création de la proposition de loi
        const lawPost = new LawPost({
            ...req.body,
            user_id: req.user._id,
            adopted: false, // Par défaut, une nouvelle proposition n'est pas adoptée
            vote_yes: 0,
            vote_no: 0,
            vote_abstention: 0,
            has_reevaluable: false,
            reevaluable_count: 0
        });

        const savedLawPost = await lawPost.save();
        ResponseHandler.success(res, savedLawPost, "Proposition de loi créée avec succès", 201);
    } catch (error: any) {
        console.error('Erreur lors de la création de la proposition de loi:', error);
        ResponseHandler.error(res, "Erreur lors de la création de la proposition de loi", error.message);
    }
};

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
            law_post_id
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
            law_post_id,
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