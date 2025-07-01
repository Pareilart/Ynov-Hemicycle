import { Response } from 'express';
import { AuthenticatedRequest } from '../../middleware/auth';
import LawPost from '../../models/LawPost';
import { ResponseHandler } from '../../utils/responseHandler';
import { LawPostDto } from '../../types/dto/LawPostDto';
import { RoleEnum } from '../../enum/RoleEnum';
import { IRole } from '../../types/interfaces/IRole';

export const createLawPost = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      ResponseHandler.unauthorized(res, 'Utilisateur non authentifié');
      return;
    }

    if (!req.user.role || (req.user.role as unknown as IRole).name !== RoleEnum.DEPUTY) {
      ResponseHandler.forbidden(res, 'Seuls les députés peuvent créer des propositions de loi');
      return;
    }

    // Création de la proposition de loi
    const lawPost = new LawPost({
      ...req.body,
      userId: req.user._id,
      adopted: false, // Par défaut, une nouvelle proposition n'est pas adoptée
      voteYes: 0,
      voteNo: 0,
      voteAbstention: 0,
      hasReevaluable: false,
      reevaluableCount: 0,
    });

    console.log('Données de la loi avant sauvegarde:', lawPost);
    const savedLawPost = await lawPost.save();
    console.log('Données de la loi après sauvegarde:', savedLawPost);
    
    const populatedLawPost = await LawPost.findById(savedLawPost._id).populate('userId', 'firstName lastName email');
    console.log('Données de la loi après population:', populatedLawPost);

    if (!populatedLawPost) {
      throw new Error('Erreur lors de la récupération de la loi créée');
    }

    const response = await LawPostDto.toResponse(populatedLawPost);
    console.log('Données après transformation DTO:', response);
    
    ResponseHandler.success(res, response, 'Proposition de loi créée avec succès', 201);
  } catch (error: unknown) {
    console.error('Erreur complète:', error);
    ResponseHandler.error(res, 'Erreur lors de la création de la proposition de loi', error as Error);
  }
};
