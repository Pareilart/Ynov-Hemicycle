import { HttpClient, HttpResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ApiReponse } from "@app/core/models/api/api-response.model";
import { JwtToken } from "@app/core/models/jwt/jwt-token.model";
import { UserCredentials } from "@app/core/models/user/user-credentials.model";
import { User2FAVerification } from "@app/core/models/user/user-2fa-verification.model";
import { UserRegistration } from "@app/core/models/user/user-registration.model";
import { User } from "@app/core/models/user/user.model";
import { environment } from "@environments/environment";
import { Observable } from "rxjs";
import { UserLoginResponse } from "@app/core/models/user/user-login-response.model";
import { UserEmailVerification } from "@app/core/models/user/user-email-verification.model";

@Injectable({ providedIn: 'root' })
export class AuthService {
  //#region Propriétés
  /**
   * Propriété httpClient
   * @readonly
   *
   * @description
   * Propriété httpClient pour injecter
   * le service HttpClient
   *
   * @access private
   * @memberof AuthService
   * @since 1.0.0
   *
   * @type {HttpClient} httpClient
   */
  private readonly httpClient: HttpClient =
    inject<HttpClient>(HttpClient);

  /**
   * Propriété API_URL
   * @readonly
   *
   * @description
   * Propriété API_URL pour stocker
   * l'URL de l'API
   *
   * @access private
   * @memberof AuthService
   * @since 1.0.0
   *
   * @type {string} API_URL
   */
  private static readonly API_URL: string = `${environment.apis['main'].url}/auth`;
  //#endregion

  //#region Méthodes
  /**
   * Méthode login
   * @method login
   *
   * @description
   * Méthode login pour se connecter
   *
   * @access public
   * @memberof AuthService
   * @since 1.0.0
   *
   * @param {UserCredentials} credentials - Identifiants de connexion
   *
   * @returns {Observable<HttpResponse<ApiReponse<UserLoginResponse>>>} - Retourne la réponse de l'API
   */
  public login(credentials: UserCredentials): Observable<HttpResponse<ApiReponse<UserLoginResponse>>> {
    const url: string = `${AuthService.API_URL}/login`;
    return this.httpClient.post<ApiReponse<UserLoginResponse>>(url, credentials, {
      observe: 'response'
    });
  }

  /**
   * Méthode verify2FA
   * @method verify2FA
   *
   * @description
   * Méthode verify2FA pour vérifier le code 2FA
   *
   * @access public
   * @memberof AuthService
   * @since 1.0.0
   *
   * @param {User2FAVerification} payload - Identifiants de connexion
   *
   * @returns {Observable<HttpResponse<ApiReponse<User & { token: JwtToken }>>>} - Retourne la réponse de l'API
   */
  public verify2FA(payload: User2FAVerification): Observable<HttpResponse<ApiReponse<User & { token: JwtToken }>>> {
    const url: string = `${AuthService.API_URL}/verify-2fa-code`;
    return this.httpClient.post<ApiReponse<User & { token: JwtToken }>>(url, payload, {
      observe: 'response'
    });
  }

  /**
   * Méthode verifyEmail
   * @method verifyEmail
   *
   * @description
   * Méthode verifyEmail pour vérifier le code de vérification
   *
   * @access public
   * @memberof AuthService
   * @since 1.0.0
   *
   * @param {UserEmailVerification} payload - Identifiants de connexion
   *
   * @returns {Observable<HttpResponse<ApiReponse<void>>>} - Retourne la réponse de l'API
   */
  public verifyEmail(payload: UserEmailVerification): Observable<HttpResponse<ApiReponse<void>>> {
    const url: string = `${AuthService.API_URL}/verify-email`;
    return this.httpClient.post<ApiReponse<void>>(url, payload, {
      observe: 'response'
    });
  }

  /**
   * Méthode me
   * @method me
   *
   * @description
   * Méthode me pour récupérer les informations de l'utilisateur
   *
   * @access public
   * @memberof AuthService
   * @since 1.0.0
   *
   * @returns {Observable<HttpResponse<ApiReponse<User>>>} - Retourne la réponse de l'API
   */
  public me(): Observable<HttpResponse<ApiReponse<User>>> {
    const url: string = `${AuthService.API_URL}/me`;
    return this.httpClient.get<ApiReponse<User>>(url, {
      observe: 'response'
    });
  }

  /**
   * Méthode register
   * @method register
   *
   * @description
   * Méthode register pour s'inscrire
   *
   * @access public
   * @memberof AuthService
   * @since 1.0.0
   *
   * @param {UserRegistration} payload - Identifiants d'inscription
   *
   * @returns {Observable<HttpResponse<ApiReponse<User>>>} - Retourne la réponse de l'API
   */
  public register(payload: UserRegistration): Observable<HttpResponse<ApiReponse<User>>> {
    const url: string = `${AuthService.API_URL}/register`;

    return this.httpClient.post<ApiReponse<User>>(url, {
      sexe: payload.gender,
      lastname: payload.lastname,
      firstname: payload.firstname,
      email: payload.email,
      password: payload.password,
      birthday: payload.birthday,
    }, {
      observe: 'response'
    });
  }

  /**
   * Méthode refreshToken
   * @method refreshToken
   *
   * @description
   * Méthode refreshToken pour rafraîchir le token
   *
   * @access public
   * @memberof AuthService
   * @since 1.0.0
   *
   * @param {string} refreshToken - Token de rafraîchissement
   *
   * @returns {Observable<HttpResponse<ApiReponse<JwtToken>>>} - Retourne la réponse de l'API
   */
  public refreshToken(refreshToken: string): Observable<HttpResponse<ApiReponse<JwtToken>>> {
    const url: string = `${AuthService.API_URL}/refresh-token`;
    return this.httpClient.post<ApiReponse<JwtToken>>(url, {
      refreshToken: refreshToken
    }, {
      observe: 'response'
    });
  }
  //#endregion
}

