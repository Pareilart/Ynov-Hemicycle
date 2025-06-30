import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { UserCredentials } from "@app/core/models/user/user-credentials.model";
import { UserRegistration } from "@app/core/models/user/user-registration.model";
import { User } from "@app/core/models/user/user.model";
import { environment } from "@environments/environment";
import { Observable } from "rxjs";

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
   * @returns {Observable<User>} - Retourne un Observable<User>
   */
  public login(credentials: UserCredentials): Observable<User> {
    const url: string = `${AuthService.API_URL}/login`;
    return this.httpClient.post<User>(url, credentials);
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
   * @returns {Observable<User>} - Retourne un Observable<User>
   */
  public register(payload: UserRegistration): Observable<User> {
    const url: string = `${AuthService.API_URL}/register`;
    return this.httpClient.post<User>(url, payload);
  }
  //#endregion
}

