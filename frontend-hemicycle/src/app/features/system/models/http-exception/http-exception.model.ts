
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
    title: 'Not Found',
    message: 'The requested resource was not found on this server.'
  },
  {
    code: 500,
    title: 'Internal Server Error',
    message: 'An unexpected error occurred on the server.'
  },
  {
    code: 401,
    title: 'Unauthorized',
    message: 'You are not authorized to access this resource.'
  },
  {
    code: 403,
    title: 'Forbidden',
    message: 'You are not allowed to access this resource.'
  },
  {
    code: 400,
    title: 'Bad Request',
    message: 'The request could not be understood by the server due to malformed syntax.'
  }
];

