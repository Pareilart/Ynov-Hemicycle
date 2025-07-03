import { HttpClient, HttpResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ApiReponse } from "@app/core/models/api/api-response.model";
import { User, UserUpdatePayload } from "@app/core/models/user/user.model";
import { environment } from "@environments/environment";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AccountService {
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
   * @memberof AccountService
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
   * @memberof AccountService
   * @since 1.0.0
   *
   * @type {string} API_URL
   */
  private static readonly API_URL: string = `${environment.apis['main'].url}`;

  /**
   * Propriété API_AUTH_ENDPOINT
   * @readonly
   *
   * @description
   * Propriété API_AUTH_ENDPOINT pour stocker
   * l'URL de l'API d'authentification
   *
   * @access private
   * @memberof AccountService
   * @since 1.0.0
   *
   * @type {string} API_AUTH_ENDPOINT
   */
  private static readonly API_AUTH_ENDPOINT: string = '/auth';

  /**
   * Propriété API_USERS_ENDPOINT
   * @readonly
   *
   * @description
   * Propriété API_USERS_ENDPOINT pour stocker
   * l'URL de l'API des utilisateurs
   *
   * @access private
   * @memberof AccountService
   * @since 1.0.0
   *
   * @type {string} API_USERS_ENDPOINT
   */
  private static readonly API_USERS_ENDPOINT: string = '/users';
  //#endregion

  //#region Méthodes
  /**
   * Méthode getAccount
   * @method getAccount
   *
   * @description
   * Méthode getAccount pour récupérer les informations de l'utilisateur
   *
   * @access public
   * @memberof AccountService
   * @since 1.0.0
   *
   * @returns {Observable<HttpResponse<ApiReponse<User>>>} - Retourne la réponse de l'API
   */
  public getAccount(): Observable<HttpResponse<ApiReponse<User>>> {
    const url: string = `${AccountService.API_URL}${AccountService.API_AUTH_ENDPOINT}/me`;
    return this.httpClient.get<ApiReponse<User>>(url, {
      observe: 'response',
      withCredentials: true,
    });
  }

  /**
   * Méthode updateAccount
   * @method updateAccount
   *
   * @description
   * Méthode updateAccount pour mettre à jour les informations de l'utilisateur
   *
   * @access public
   * @memberof AccountService
   * @since 1.0.0
   *
   * @param {UserUpdatePayload} payload - Données de mise à jour de l'utilisateur
   *
   * @returns {Observable<HttpResponse<ApiReponse<User>>>} - Retourne la réponse de l'API
   */
  public updateAccount(payload: UserUpdatePayload): Observable<HttpResponse<ApiReponse<User>>> {
    const url: string = `${AccountService.API_URL}${AccountService.API_AUTH_ENDPOINT}/me`;
    return this.httpClient.put<ApiReponse<User>>(url, payload, {
      observe: 'response',
      withCredentials: true,
    });
  }

  /**
   * Méthode deleteAccount
   * @method deleteAccount
   *
   * @description
   * Méthode deleteAccount pour supprimer l'utilisateur
   *
   * @access public
   * @memberof AccountService
   * @since 1.0.0
   *
   * @returns {Observable<HttpResponse<ApiReponse<void>>>} - Retourne la réponse de l'API
   */
  public deleteAccount(): Observable<HttpResponse<ApiReponse<void>>> {
    const url: string = `${AccountService.API_URL}${AccountService.API_AUTH_ENDPOINT}/me`;
    return this.httpClient.delete<ApiReponse<void>>(url, {
      observe: 'response',
      withCredentials: true,
    });
  }
  //#endregion
}
