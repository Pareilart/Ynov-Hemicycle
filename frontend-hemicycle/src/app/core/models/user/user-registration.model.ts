import { UserGender } from "./user-gender.enum";
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
 * @property {string} firstName - Prénom de l'utilisateur
 * @property {string} lastName - Nom de l'utilisateur
 * @property {Email} email - Email de l'utilisateur
 * @property {string} password - Mot de passe de l'utilisateur
 *
 * @example
 * ```typescript
 * const userRegistration: UserRegistration = {
 *   email: "contact@valentin-fortin.pro",
 *   firstName: "Valentin",
 *   lastName: "FORTIN",
 *   password: "password"
 * };
 * ```
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export type UserRegistration = {
  -readonly [K in keyof Pick<User,
    | 'firstName'
    | 'lastName'
    | 'email'
  >]: User[K];
} & {
  password: string,
  gender: UserGender,
  birthday: Date,
}
