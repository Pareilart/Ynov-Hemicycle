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
      adopted: false,
      voteYes: 0,
      voteNo: 0,
      voteAbstention: 0,
      hasReevaluable: false,
      reevaluableCount: 0,
    });

    const savedLawPost = await lawPost.save();
    const populatedLawPost = await LawPost.findById(savedLawPost._id).populate('userId', 'firstName lastName email');

    if (!populatedLawPost) {
      throw new Error('Erreur lors de la récupération de la loi créée');
    }

    const response = await LawPostDto.toResponse(populatedLawPost);
    ResponseHandler.success(res, response, 'Proposition de loi créée avec succès', 201);
  } catch (error: unknown) {
    ResponseHandler.error(res, 'Erreur lors de la création de la proposition de loi', error as Error);
  }
};
