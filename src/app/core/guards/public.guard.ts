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
import { renewToken } from 'src/app/store/actions';
import { AppState } from 'src/app/store/app.reducers';

@Injectable({
  providedIn: 'root',
})
export class PublicGuard implements CanActivate, CanLoad {
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
        if (resp.ok) {
          this.router.navigate(['/private']);
          throwError('ya esta logeado');
        }
        return resp.ok;
      }),
      catchError((err) => {
        console.log(err);
        return of(true);
      })
    );
  }
  canLoad(route: Route): Observable<boolean> {
    return this.authService.rewToken().pipe(
      map((resp) => {
        if (resp.ok) {
          this.router.navigate(['/private']);
          throwError('ya esta logeado');
        }
        return resp.ok;
      }),
      catchError((err) => {
        console.log(err);
        return of(true);
      })
    );
  }
}
