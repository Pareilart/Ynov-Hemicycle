import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

import * as AccountActions from './account.actions';
import { AccountService } from '@app/core/services/api/account.service';
import { ApiReponse } from '@app/core/models/api/api-response.model';
import { User } from '@app/core/models/user/user.model';
import { StoreOperationStatus } from '@app/core/models/store/store-operation-status.model';

/**
 * Classe AccountEffects
 * @class AccountEffects
 *
 * @description
 * Effets pour le store account
 *
 * @version 1.0.0
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
@Injectable()
export class AccountEffects {
  //#region Propriétés
  /**
   * Propriété actions
   * @readonly
   *
   * @description
   * Actions de l'effet
   *
   * @access public
   * @memberof AccountEffects
   * @since 1.0.0
   *
   * @type {Actions} actions
   */
  private readonly actions: Actions =
    inject<Actions>(Actions);

  /**
   * Propriété accountService
   * @readonly
   *
   * @description
   * Service de gestion du compte
   *
   * @access public
   * @memberof AccountEffects
   * @since 1.0.0
   *
   * @type {AccountService} accountService
   */
  private readonly accountService: AccountService =
    inject<AccountService>(AccountService);
  //#endregion

  //#region Effets
  /**
   * Effet fetchAccount$
   * @readonly
   *
   * @description
   * Effet pour récupérer les informations du compte utilisateur
   *
   * @access public
   * @memberof AccountEffects
   * @since 1.0.0
   */
  public fetchAccount$ = createEffect(() =>
    this.actions.pipe(
      ofType(AccountActions.fetchAccount),
      switchMap(() =>
        this.accountService.getAccount().pipe(
          map((response: HttpResponse<ApiReponse<User>>) => {
            return AccountActions.fetchAccountSuccess({
              user: response.body?.data as User,
              status: {
                code: response.status,
                label: 'Account fetched successfully',
                message: 'Account fetched successfully'
              }
            });
          }),
          catchError((error) => {
            return of(AccountActions.fetchAccountFailure({
              status: {
                code: error.status,
                label: 'Account fetch failed',
                message: 'Account fetch failed'
              }
             }));
          })
        )
      )
    )
  );

  /**
   * Effet updateAccount$
   * @readonly
   *
   * @description
   * Effet pour mettre à jour les informations du compte utilisateur
   *
   * @access public
   * @memberof AccountEffects
   * @since 1.0.0
   */
  public updateAccount$ = createEffect(() =>
    this.actions.pipe(
      ofType(AccountActions.updateAccount),
      switchMap(({ payload }) =>
        this.accountService.updateAccount(payload).pipe(
          map((response: HttpResponse<ApiReponse<User>>) => {
            return AccountActions.updateAccountSuccess({
              user: response.body?.data as User,
              status: {
                code: response.status,
                label: 'Account updated successfully',
                message: 'Account updated successfully'
              }
            });
          }),
          catchError((error) => {
            return of(AccountActions.updateAccountFailure({
              status: {
                code: error.status,
                label: 'Account update failed',
                message: 'Account update failed'
              }
            }));
          })
        )
      )
    )
  );

  /**
   * Effet deleteAccount$
   * @readonly
   *
   * @description
   * Effet pour supprimer le compte utilisateur
   *
   * @access public
   * @memberof AccountEffects
   * @since 1.0.0
   */
  public deleteAccount$ = createEffect(() =>
    this.actions.pipe(
      ofType(AccountActions.deleteAccount),
      switchMap(() =>
        this.accountService.deleteAccount().pipe(
          map((response: HttpResponse<ApiReponse<void>>) => {
            return AccountActions.deleteAccountSuccess({
              status: {
                code: response.status,
                label: 'Account deleted successfully',
                message: 'Account deleted successfully'
              }
            });
          }),
          catchError((error) => {
            return of(AccountActions.deleteAccountFailure({
              status: {
                code: error.status,
                label: 'Account delete failed',
                message: 'Account delete failed'
              }
            }));
          })
        )
      )
    )
  );
  //#endregion
}
