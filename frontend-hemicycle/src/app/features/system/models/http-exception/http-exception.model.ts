
/**
 * Modèle HTTPException
 * @interface HTTPException
 *
 * @description
 * Représente une exception HTTP
 *
 * @version 1.0.0
 *
 * @property {number} code - Code de l'exception
 * @property {string} title - Titre de l'exception
 * @property {string} message - Message de l'exception
 *
 * @example
 * ```typescript
 * const httpException: HTTPException = {
 *   code: 404,
 *   title: 'Not Found',
 *   message: 'The requested resource was not found on this server.'
 * };
 * ```
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export interface HTTPException {
  //#region Propriétés
  /**
   * Propriété code
   *
   * @description
   * Code de l'exception
   *
   * @memberof HTTPException
   * @since 1.0.0
   *
   * @type {number} code
   */
  code: number;

  /**
   * Propriété title
   *
   * @description
   * Titre de l'exception
   *
   * @memberof HTTPException
   * @since 1.0.0
   *
   * @type {string} title
   */
  title: string;

  /**
   * Propriété message
   *
   * @description
   * Message de l'exception
   *
   * @memberof HTTPException
   * @since 1.0.0
   *
   * @type {string} message
   */
  message: string;
  //#endregion
};

/**
 * Constante HTTP_EXCEPTIONS
 * @const HTTP_EXCEPTIONS
 *
 * @description
 * Constante pour les exceptions HTTP
 *
 * @version 1.0.0
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 *
 * @see https://angular.dev/api/router/Resolve
 */
export const HTTP_EXCEPTIONS: HTTPException[] = [
  {
    code: 404,
    title: 'Ressource non trouvée',
    message: 'La ressource demandée n\'a pas été trouvée sur ce serveur.'
  },
  {
    code: 500,
    title: 'Erreur interne du serveur',
    message: 'Une erreur inattendue est survenue sur le serveur.'
  },
  {
    code: 401,
    title: 'Non autorisé',
    message: 'Vous n\'êtes pas autorisé à accéder à cette ressource.'
  },
  {
    code: 403,
    title: 'Interdit',
    message: 'Vous n\'êtes pas autorisé à accéder à cette ressource.'
  },
  {
    code: 400,
    title: 'Requête invalide',
    message: 'La requête n\'a pas pu être comprise par le serveur en raison d\'une syntaxe mal formée.'
  }
];

