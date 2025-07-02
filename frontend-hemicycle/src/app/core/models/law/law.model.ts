import { Timestampable } from "../timestampable/timestampable.model";

/**
 * Modèle Law
 * @interface Law
 *
 * @description
 * Représente une loi
 *
 * @version 1.0.0
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export interface Law extends Timestampable {
  readonly id: string;
  readonly legislature: number;
  readonly title: string;
  readonly adopted: boolean;
  readonly dateProposition: Date;
  readonly dateAdoption: Date;
  readonly voteYes: number;
  readonly voteNo: number;
  readonly voteAbstention: number;
  readonly hasReevaluable: boolean;
  readonly reevaluableCount: number;
  readonly reactionsStats: {
    readonly total: number;
    readonly types: Record<string, number>,
    readonly emojis: Record<string, number>
  }
}
