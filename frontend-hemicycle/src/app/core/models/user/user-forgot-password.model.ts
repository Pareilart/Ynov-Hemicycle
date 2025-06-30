import { User } from "@core/models/user/user.model";

/**
 * Type UserForgotPassword
 * @type UserForgotPassword
 *
 * @description
 * Représente un utilisateur à mot
 * de passe oublié
 *
 * @version 1.0.0
 *
 * @property {Email} email - Email de l'utilisateur
 *
 * @example
 * ```typescript
 * const userForgotPassword: UserForgotPassword = {
 *   email: "contact@valentin-fortin.pro"
 * };
 * ```
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export type UserForgotPassword = {
  -readonly [K in keyof Pick<User,
    | 'email'
  >]: User[K];
};
