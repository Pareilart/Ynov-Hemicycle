/**
 * Modèle UserRole
 * @interface UserRole
 *
 * @description
 * Représente un rôle d'utilisateur
 *
 * @version 1.0.0
 *
 * @property {string} id - Identifiant unique du rôle
 * @property {string} name - Nom du rôle
 * @property {string} description - Description du rôle
 *
 * @example
 * ```typescript
 * const userRole: UserRole = {
 *   id: "426za61417f400qa0",
 *   name: "Admin",
 *   description: "Rôle admin"
 * };
 * ```
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export interface UserRole {
  //#region Propriétés
  /**
   * Propriété id
   * @readonly
   *
   * @description
   * Identifiant unique du rôle
   *
   * @memberof UserRole
   * @since 1.0.0
   *
   * @type {string} id
   */
  readonly id: string;

  /**
   * Propriété name
   * @readonly
   *
   * @description
   * Nom du rôle
   *
   * @memberof UserRole
   * @since 1.0.0
   *
   * @type {string} name
   */
  readonly name: string;

  /**
   * Propriété description
   * @readonly
   *
   * @description
   * Description du rôle
   *
   * @memberof UserRole
   * @since 1.0.0
   *
   * @type {string} description
   */
  readonly description: string;
  //#endregion
}
