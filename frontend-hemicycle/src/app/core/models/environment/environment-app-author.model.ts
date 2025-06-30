
/**
 * Modèle EnvironmentAppAuthor
 * @interface EnvironmentAppAuthor
 *
 * @description
 * Modèle de configuration pour l'auteur de l'application.
 *
 * @version 1.0.0
 *
 * @property {string} name - Nom de l'auteur
 * @property {string} email - Email de l'auteur
 * @property {string} role - Role de l'auteur
 *
 * @example
 * ```typescript
 * const environmentAppAuthor: EnvironmentAppAuthor = {
 *   name: 'John Doe',
 *   email: 'john.doe@example.com',
 *   role: 'Developer'
 * };
 * ```
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export interface EnvironmentAppAuthor {
  //#region Propriétés
  /**
   * Propriété name
   *
   * @description
   * Nom de l'auteur
   *
   * @memberof EnvironmentAppAuthor
   * @since 1.0.0
   *
   * @type {string} name
   */
  name: string;

  /**
   * Propriété email
   *
   * @description
   * Email de l'auteur
   *
   * @memberof EnvironmentAppAuthor
   * @since 1.0.0
   *
   * @type {string} email
   */
  email?: string;

  /**
   * Propriété role
   *
   * @description
   * Role de l'auteur
   *
   * @memberof EnvironmentAppAuthor
   * @since 1.0.0
   *
   * @type {'Developer' | 'Designer' | 'Manager' | 'Other'} role
   */
  role?: 'Developer' | 'Designer' | 'Manager' | 'Other';
  //#endregion
}
