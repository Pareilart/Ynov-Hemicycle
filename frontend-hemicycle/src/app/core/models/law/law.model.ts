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
  readonly title: string;

}
