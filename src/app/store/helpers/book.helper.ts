import { Store } from '@ngrx/store';
import { AppState } from '../app.reducers';
import { Book } from '../../private/models/books.interfaces';
import * as actions from '../actions';

export const getSelectedBookAsync = (store: Store<AppState>) =>
  new Promise<Book>((resolve) => {
    store.select('books').subscribe(({ bookSelected }) => {
      resolve(bookSelected);
    });
  });

export const loadBooks = (store: Store<AppState>) => {
  store.dispatch(actions.loadBooks());
};

export const selectBookById = (store: Store<AppState>, id: string) => {
   store.dispatch(actions.selectBook({ bookId: id }));
};
