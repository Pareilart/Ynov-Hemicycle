import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthState } from "../stores/auth/auth.state";
import { Store } from "@ngrx/store";
import { inject, Signal } from "@angular/core";
import { selectAuthAccessToken } from "../stores/auth/auth.selectors";

export const jwtInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  /**
   * Constant store
   * @const store
   *
   * @description
   * Service de stockage
   *
   * @type {Store<AuthState>} store
   */
  const store: Store<AuthState> =
    inject<Store<AuthState>>(Store<AuthState>);

  /**
   * Constant accessToken
   * @const accessToken
   *
   * @description
   * Token d'accès
   *
   * @type {Signal<string | undefined>} accessToken
   */
  const accessToken: Signal<string | undefined> =
    store.selectSignal<string | undefined>(selectAuthAccessToken);

  if (accessToken()) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken()}`
      }
    });
  }

  return next(req);
}



