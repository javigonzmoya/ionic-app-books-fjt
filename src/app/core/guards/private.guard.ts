import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { renewToken } from 'src/app/store/actions/auth';
import { AppState } from 'src/app/store/app.reducers';

@Injectable({
  providedIn: 'root',
})
export class PrivateGuard implements CanActivate, CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.rewToken().pipe(
      map((resp) => {
        if (!resp.ok) {
          throwError('error de token');
        }
        this.store.dispatch(renewToken());
        return resp.ok;
      }),
      catchError((err) => {
        this.router.navigate(['/auth/login']);
        return of(false);
      })
    );
  }
  canLoad(route: Route): Observable<boolean> {
    return this.authService.rewToken().pipe(
      map((resp) => {
        if (!resp.ok) {
          console.log(resp);
          throwError('error de token');
        }
        this.store.dispatch(renewToken());
        return resp.ok;
      }),
      catchError((err) => {
        console.log(err);
        this.router.navigate(['/auth/login']);
        return of(false);
      })
    );
  }
}
