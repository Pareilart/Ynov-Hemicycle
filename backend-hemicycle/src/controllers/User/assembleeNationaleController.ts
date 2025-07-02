import { Request, Response } from 'express';
import Depute from '../../models/AssembleeNationale/Depute';
import { PaginationUtils } from '../../utils/paginationUtils';

/**
 * Récupère la liste des députés
 * @param req La requête Express
 * @param res La réponse Express
 * @returns La liste des députés
 */
export const getDeputes = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page, limit } = PaginationUtils.getPaginationParams(req);
    const skip = PaginationUtils.getSkipValue(page, limit);

    const total = await Depute.countDocuments();
    const deputes = await Depute.find()
      .select('uid civilite nom prenom dateNaissance lieuNaissance profession mandats')
      .sort({ nom: 1, prenom: 1 })
      .skip(skip)
      .limit(limit);

    const result = PaginationUtils.createPaginatedResult(deputes, total, page, limit);

    res.status(200).json({
      success: true,
      ...result,
      message: 'Liste des députés récupérée avec succès',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: `Erreur lors de la récupération des députés: ${error.message}`,
    });
  }
};
