import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as booksActions from '../actions';
import { of } from 'rxjs'; //crea observable
import { stopLoading } from '../actions/ui/ui.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducers';
import { BooksService } from 'src/app/private/services/books.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { addBook } from '../actions/books/books.actions';

@Injectable()
export class BooksEffects {

  loadBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(booksActions.loadBooks),
      switchMap((action) =>
        this.booksService.getBooks().pipe(
          map((resp) => booksActions.loadBooksSuccess({ books: resp.books })),
          catchError((error) => {
            this.toasService.presentToast(`Error!! ${error.error.msg}`);
            this.store.dispatch(stopLoading());
            return of(booksActions.booksError({ payload: error }));
          })
        )
      )
    )
  );

  loadBooksSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(booksActions.loadBooksSuccess),
        tap((action) => {
          this.store.dispatch(stopLoading());
        })
      ),
    { dispatch: false } //sin llamada api
  );

  addBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(booksActions.addBook),
      switchMap((action) =>
        this.booksService.addBook(action.book).pipe(
          map((resp) => booksActions.addBookSuccess({ book: resp.book })),
          catchError((error) => {
            this.toasService.presentToast(`Error!! ${error.error.msg}`);
            this.store.dispatch(stopLoading());
            return of(booksActions.booksError({ payload: error }));
          })
        )
      )
    )
  );

  addBookSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(booksActions.addBookSuccess),
        tap((action) => {
          this.store.dispatch(stopLoading());
        })
      ),
    { dispatch: false } //sin llamada api
  );

  editBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(booksActions.editBook), //ofType: filtamos que este pendiente de una accion
      // switchMap: pedimos la data al servicio hhtp
      switchMap((action) =>
        this.booksService.editBook(action.id, action.book).pipe(
          map((resp) =>
            booksActions.editBookSuccess({ id: action.id, book: action.book })
          ),
          catchError((error) => {
            this.toasService.presentToast(`Error!! ${error.error.msg}`);
            console.log('error');
            this.store.dispatch(stopLoading());
            return of(booksActions.booksError({ payload: error }));
          })
        )
      )
    )
  );

  editBookSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(booksActions.editBookSuccess),
        tap((action) => {
          this.store.dispatch(stopLoading());
        })
      ),
    { dispatch: false } //sin llamada api
  );

  deleteBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(booksActions.deleteBook),
      switchMap((action) =>
        this.booksService.deleteBook(action.id).pipe(
          map((resp) => booksActions.deleteBookSuccess({ id: action.id })),
          catchError((error) => {
            this.toasService.presentToast(`Error!! ${error.error.msg}`);
            console.log('error');
            this.store.dispatch(stopLoading());
            return of(booksActions.booksError({ payload: error }));
          })
        )
      )
    )
  );

  deleteBookSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(booksActions.deleteBookSuccess),
        tap((action) => {
          this.store.dispatch(stopLoading());
        })
      ),
    { dispatch: false } //sin llamada api
  );
  constructor(
    private actions$: Actions,
    private booksService: BooksService,
    private store: Store<AppState>,
    private toasService: ToastService
  ) {}
}
