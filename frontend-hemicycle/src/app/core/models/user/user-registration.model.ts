import { User } from "./user.model";

/**
 * Type UserRegistration
 * @type UserRegistration
 *
 * @description
 * Représente les informations nécessaires pour l'enregistrement d'un utilisateur
 *
 * @version 1.0.0
 *
 * @property {string} firstname - Prénom de l'utilisateur
 * @property {string} lastname - Nom de l'utilisateur
 * @property {Email} email - Email de l'utilisateur
 *
 * @example
 * ```typescript
 * const userRegistration: UserRegistration = {
 *   email: "contact@valentin-fortin.pro",
 *   firstname: "Valentin",
 *   lastname: "FORTIN"
 * };
 * ```
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export type UserRegistration = {
  -readonly [K in keyof Pick<User,
    | 'firstname'
    | 'lastname'
    | 'email'
    | 'gender'
    | 'city'
    | 'postalCode'
  >]: User[K];
} & { password: string; }
