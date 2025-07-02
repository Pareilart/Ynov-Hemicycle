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
  readonly title: string;
  readonly resume: string;
  readonly content: string;
  readonly adopted: boolean;
  readonly accountability: 1 | 2 | 3 | 4;
}
