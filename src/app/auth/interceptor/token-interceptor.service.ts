import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { LocalDataService } from 'src/app/core/services/local-data.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private ionStorage: LocalDataService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(this.ionStorage.get('token')).pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          'x-token': token || '',
        });
        const cloneReq = req.clone({
          headers,
        });
        return next.handle(cloneReq).pipe(catchError(this.handleError));
      })
    );
  }

  handleError(e: HttpErrorResponse) {
    console.log('error manejado');
    console.warn(e);
    return throwError(e);
  }
}
