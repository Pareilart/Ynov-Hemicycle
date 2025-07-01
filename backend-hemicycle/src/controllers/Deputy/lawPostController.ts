import { Response } from 'express';
import { AuthenticatedRequest } from '../../middleware/auth';
import LawPost from '../../models/LawPost';
import { ResponseHandler } from '../../utils/responseHandler';
import { LawPostDto } from '../../types/dto/LawPostDto';
import { RoleEnum } from '../../enum/RoleEnum';

export const createLawPost = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            ResponseHandler.unauthorized(res, "Utilisateur non authentifié");
            return;
        }

        if (!req.user.role || (req.user.role as any).name !== RoleEnum.DEPUTY) {
            ResponseHandler.forbidden(res, "Seuls les députés peuvent créer des propositions de loi");
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
        const populatedLawPost = await LawPost.findById(savedLawPost._id).populate('user_id', 'firstName lastName email');
        
        if (!populatedLawPost) {
            throw new Error("Erreur lors de la récupération de la loi créée");
        }

        const response = LawPostDto.toResponse(populatedLawPost);
        ResponseHandler.success(res, response, "Proposition de loi créée avec succès", 201);
    } catch (error: any) {
        console.error('Erreur lors de la création de la proposition de loi:', error);
        ResponseHandler.error(res, "Erreur lors de la création de la proposition de loi", error.message);
    }
};