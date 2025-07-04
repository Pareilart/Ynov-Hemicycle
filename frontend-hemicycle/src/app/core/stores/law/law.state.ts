import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";
import { StoreOperation } from "@core/models/store/store-operation.model";
import { Law } from "@core/models/law/law.model";
import { EntityState } from "@ngrx/entity";

/**
 * Constante LAW_FEATURE_KEY
 * @const LAW_FEATURE_KEY
 *
 * @description
 * Clé de la fonctionnalité des lois
 *
 * @version 1.0.0
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export const LAW_FEATURE_KEY: string = 'law';

/**
 * Interface LawState
 * @interface LawState
 *
 * @description
 * Représente l'état des lois
 *
 * @version 1.0.0
 *
 * @property {EntityState<Law>} entities - Entités des lois
 * @property {string | null} selectedLawId - Identifiant de la loi sélectionnée
 * @property {StoreOperation} operation - Opération en cours
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export interface LawState extends EntityState<Law> {
  //#region Propriétés
  /**
   * Propriété selectedLawId
   *
   * @description
   * Identifiant de la loi sélectionnée
   *
   * @memberof LawState
   * @since 1.0.0
   *
   * @type {string | null} selectedLawId
   */
  selectedLawId: string | null;

  /**
   * Propriété operation
   *
   * @description
   * Opération en cours
   *
   * @memberof LawState
   * @since 1.0.0
   *
   * @type {StoreOperation} operation
   */
  operation: StoreOperation;
  //#endregion
};

/**
 * Constante lawAdapter
 * @const lawAdapter
 *
 * @description
 * Adaptateur des lois
 *
 * @version 1.0.0
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export const lawAdapter: EntityAdapter<Law> = createEntityAdapter<Law>({
  selectId: (law: Law) => law.id,
});

/**
 * Constante initialLawState
 * @const initialLawState
 *
 * @description
 * État initial des lois
 *
 * @version 1.0.0
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export const initialLawState: LawState = lawAdapter.getInitialState({
  selectedLawId: null,
  operation: {
    loading: false,
    status: null
  }
});

