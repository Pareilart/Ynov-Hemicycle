import { Injectable } from "@angular/core";
import { inject } from "@angular/core";
import { environment } from "@environments/environment";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiReponse } from "@app/core/models/api/api-response.model";
import { Law } from "@app/core/models/law/law.model";

@Injectable({ providedIn: 'root' })
export class LawService {
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
   * @memberof LawService
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
   * @memberof LawService
   * @since 1.0.0
   *
   * @type {string} API_URL
   */
  private static readonly API_URL: string = `${environment.apis['main'].url}/users/lawPosts`;
  //#endregion

  //#region Méthodes
  /**
   * Méthode getLaws
   * @method getLaws
   *
   * @description
   * Méthode getLaws pour récupérer les lois
   *
   * @access public
   * @memberof LawService
   * @since 1.0.0
   *
   * @returns {Observable<HttpResponse<ApiReponse<Law[]>>>} - Retourne la réponse de l'API
   */
  public getLaws(): Observable<HttpResponse<ApiReponse<Law[]>>> {
    const url: string = `${LawService.API_URL}/all`;
    return this.httpClient.get<ApiReponse<Law[]>>(url, {
      observe: 'response'
    });
  }

  /**
   * Méthode getLaw
   * @method getLaw
   *
   * @description
   * Méthode getLaw pour récupérer une loi
   *
   * @access public
   * @memberof LawService
   * @since 1.0.0
   *
   * @param {string} id - ID de la loi
   *
   * @returns {Observable<HttpResponse<ApiReponse<Law>>>} - Retourne la réponse de l'API
   */
  public getLaw(id: string): Observable<HttpResponse<ApiReponse<Law>>> {
    const url: string = `${LawService.API_URL}/${id}`;
    return this.httpClient.get<ApiReponse<Law>>(url, {
      observe: 'response'
    });
  }
  //#endregion
}

