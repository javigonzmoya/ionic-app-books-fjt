import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as authActions from '../actions/auth';
import { of } from 'rxjs'; //crea observable
import { AuthService } from 'src/app/auth/services/auth.service';
import { RespAuth } from 'src/app/core/models/respAuth.model';
import { Router } from '@angular/router';
import { LocalDataService } from 'src/app/core/services/local-data.service';
import { stopLoading } from '../actions/ui/ui.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducers';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private ionStorage: LocalDataService,
    private store: Store<AppState>
  ) {}

  callLoginSuccess(resp: RespAuth) {
    return authActions.loginSuccess({
      user: resp.user,
      token: resp.token,
    });
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.login), //ofType: filtamos que este pendiente de una accion
      // switchMap: pedimos la data al servicio hhtp
      switchMap((action) =>
        this.authService.login(action.email, action.password).pipe(
          map(this.callLoginSuccess),
          catchError((error) => {
            console.log('error');
            this.store.dispatch(stopLoading());
            return of(authActions.authError({ payload: error }));
          })
        )
      )
    )
  );
  // eslint-disable-next-line @typescript-eslint/member-ordering
  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.loginSuccess),
        tap(async (action) => {
          await this.ionStorage.set('token', action.token);
          this.store.dispatch(stopLoading());
          this.router.navigate(['/private']);
        })
      ),
    { dispatch: false } //sin llamada api
  );
  // eslint-disable-next-line @typescript-eslint/member-ordering
  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.logout),
        tap(async (action) => {
          await this.ionStorage.remove('token');
          this.router.navigate(['/public']);
        })
      ),
    { dispatch: false } //sin llamada api
  );
  // eslint-disable-next-line @typescript-eslint/member-ordering
  renewToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.renewToken), //ofType: filtamos que este pendiente de una accion
      // switchMap: pedimos la data al servicio hhtp
      switchMap((action) =>
        this.authService.rewToken().pipe(
          map(this.callLoginSuccess),
          catchError((error) => {
            console.log('error');
            this.store.dispatch(stopLoading());
            return of(authActions.authError({ payload: error }));
          })
        )
      )
    )
  );
  // eslint-disable-next-line @typescript-eslint/member-ordering
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.register), //ofType: filtamos que este pendiente de una accion
      // switchMap: pedimos la data al servicio hhtp
      switchMap((action) =>
        this.authService.register(action).pipe(
          map(this.callLoginSuccess),
          catchError((error) => {
            console.log(error);
            this.store.dispatch(stopLoading());
            return of(authActions.authError({ payload: error }));
          })
        )
      )
    )
  );
}
