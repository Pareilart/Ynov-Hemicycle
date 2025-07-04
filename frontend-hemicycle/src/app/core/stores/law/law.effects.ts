import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions } from "@ngrx/effects";
import { LawService } from "@app/core/services/api/law.service";
import { createEffect } from "@ngrx/effects";
import { ofType } from "@ngrx/effects";
import { catchError, switchMap } from "rxjs/operators";
import { map } from "rxjs/operators";
import { HttpResponse } from "@angular/common/http";
import { ApiReponse } from "@app/core/models/api/api-response.model";
import { Law } from "@app/core/models/law/law.model";
import * as LawActions from "@core/stores/law/law.actions";
import { StoreOperationStatus } from "@app/core/models/store/store-operation-status.model";
import { of } from "rxjs";


@Injectable()
export class LawEffects {
    //#region Propriétés
  /**
   * Propriété actions
   * @readonly
   *
   * @description
   * Actions de l'effet
   *
   * @memberof LawEffects
   * @since 1.0.0
   *
   * @type {Actions} actions
   */
  private readonly actions: Actions =
    inject<Actions>(Actions);

  /**
   * Propriété authService
   * @readonly
   *
   * @description
   * Service des lois
   *
   * @memberof LawEffects
   * @since 1.0.0
   *
   * @type {LawService} lawService
   */
  private readonly lawService: LawService =
    inject<LawService>(LawService);

  /**
   * Propriété router
   * @readonly
   *
   * @description
   * Router de l'effet
   *
   * @memberof LawEffects
   * @since 1.0.0
   *
   * @type {Router} router
   */
  private readonly router: Router =
    inject<Router>(Router);
  //#endregion

  //#region Méthodes
  public fetchAllLaws$ = createEffect(() => this.actions.pipe(
    ofType(LawActions.fetchAllLaws),
    switchMap(() => this.lawService.getLaws().pipe(
      map((response: HttpResponse<ApiReponse<Law[]>>) => {
        if (!response.body?.data) {
          return LawActions.fetchAllLawsFailure({ status: {
            code: response.status,
            label: 'Fetch Laws Failure',
            message: 'Fetch Laws Failure'
          } });
        }

        return LawActions.fetchAllLawsSuccess({
          laws: response.body.data,
          status: {
            code: response.status,
            label: 'Fetch Laws Success',
            message: 'Fetch Laws Success'
          }
        });
      }),
      catchError(error => of(LawActions.fetchAllLawsFailure({
        status: error.status
      })))
    ))
  ));

  public fetchLaw$ = createEffect(() => this.actions.pipe(
    ofType(LawActions.fetchLaw),
    switchMap((action: { id: string }) => this.lawService.getLaw(action.id).pipe(
      map((response: HttpResponse<ApiReponse<Law>>) => {
        if (!response.body?.data) {
          return LawActions.fetchLawFailure({ status: {
            code: response.status,
            label: 'Fetch Law Failure',
            message: 'Fetch Law Failure'
          } });
        }

        return LawActions.fetchLawSuccess({
          law: response.body.data,
          status: {
            code: response.status,
            label: 'Fetch Law Success',
            message: 'Fetch Law Success'
          }
        });
      }),
      catchError(error => of(LawActions.fetchLawFailure({
        status: error.status
      })))
    ))
  ));
  //#endregion
}
