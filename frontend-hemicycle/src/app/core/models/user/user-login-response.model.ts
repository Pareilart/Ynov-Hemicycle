import { User } from '@core/models/user/user.model';
import { JwtToken } from '@core/models/jwt/jwt-token.model';
import { UserRequire2FA } from '@core/models/user/user-require-2fa';

/**
 * Modèle UserLoginResponse
 * @type UserLoginResponse
 *
 * @description
 * Modèle représentant la réponse de la connexion
 *
 * @version 1.0.0
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export type UserLoginResponse = (User & { token: JwtToken }) | UserRequire2FA;
