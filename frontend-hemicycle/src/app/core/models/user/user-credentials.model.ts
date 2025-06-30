import { User } from "@core/models/user/user.model";

/**
 * Modèle UserCredentials
 * @type UserCredentials
 *
 * @description
 * Représente les identifiants d'un utilisateur
 *
 * @version 1.0.0
 *
 * @property {string} email - Email de l'utilisateur
 * @property {string} password - Mot de passe de l'utilisateur
 *
 * @example
 * ```typescript
 * const userCredentials: UserCredentials = {
 *   email: "contact@valentin-fortin.pro",
 *   password: "password"
 * };
 * ```
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export type UserCredentials = {
  -readonly [K in keyof Pick<User,
    | 'email'
  >]: User[K];
} & { password: string; };
