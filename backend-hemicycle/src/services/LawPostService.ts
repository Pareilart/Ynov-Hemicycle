import mongoose from 'mongoose';
import LawPost from '../models/LawPost';
import { ILawPost } from '../types/interfaces/ILawPost';

export class LawPostService {
  private static REEVALUATION_THRESHOLD = 5;

  /**
   * Incrémente le compteur de réévaluation et met à jour le statut de réévaluation si nécessaire
   * @param lawPostId - L'ID de la publication
   * @returns La publication mise à jour
   * @throws Error si la publication n'est pas trouvée ou si la mise à jour échoue
   */
  public static async incrementReevaluation(lawPostId: string): Promise<ILawPost> {
    if (!mongoose.Types.ObjectId.isValid(lawPostId)) {
      throw new Error('ID de publication invalide');
    }

    const lawPost = await LawPost.findById(lawPostId);
    if (!lawPost) {
      throw new Error('Publication non trouvée');
    }

    lawPost.reevaluableCount += 1;
    lawPost.hasReevaluable = lawPost.reevaluableCount >= this.REEVALUATION_THRESHOLD;

    const updatedLawPost = await lawPost.save();

    return updatedLawPost as ILawPost;
  }

  /**
   * Réinitialise le compteur de réévaluation et le statut de réévaluation
   * @param lawPostId - L'ID de la publication
   * @returns La publication mise à jour
   * @throws Error si la publication n'est pas trouvée ou si la mise à jour échoue
   */
  public static async resetReevaluation(lawPostId: string): Promise<ILawPost> {
    if (!mongoose.Types.ObjectId.isValid(lawPostId)) {
      throw new Error('ID de publication invalide');
    }

    const updatedLawPost = await LawPost.findByIdAndUpdate(
      lawPostId,
      {
        $set: {
          reevaluableCount: 0,
          hasReevaluable: false,
        },
      },
      { new: true },
    );

    if (!updatedLawPost) {
      throw new Error('Publication non trouvée');
    }

    return updatedLawPost;
  }

  /**
   * Vérifie si une publication nécessite une réévaluation
   * @param lawPostId - L'ID de la publication
   * @returns true si la publication nécessite une réévaluation, false sinon
   * @throws Error si la publication n'est pas trouvée
   */
  public static async needsReevaluation(lawPostId: string): Promise<boolean> {
    if (!mongoose.Types.ObjectId.isValid(lawPostId)) {
      throw new Error('ID de publication invalide');
    }

    const lawPost = await LawPost.findById(lawPostId);
    if (!lawPost) {
      throw new Error('Publication non trouvée');
    }

    return lawPost.hasReevaluable;
  }
}
