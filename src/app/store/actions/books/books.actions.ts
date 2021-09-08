import { createAction, props } from '@ngrx/store';
import { Book } from 'src/app/private/models/books.interfaces';

export const loadBooks = createAction('[Books] Load Books');

export const loadBooksSuccess = createAction(
  '[Books] Load Books success',
  props<{ books: Book[] }>()
);

export const selectBook = createAction(
  '[Books] Select Book',
  props<{ bookSelected: Book }>()
);

export const unSelectBook = createAction('[Books] UnSelect Book');

export const addBook = createAction(
  '[Books] Add Book',
  props<{ book: Book }>()
);

export const addBookSuccess = createAction(
  '[Books] Add Book Success',
  props<{ book: Book }>()
);

export const editBook = createAction(
  '[Books] Edit Book',
  props<{ id: string; book: Book }>()
);

export const editBookSuccess = createAction(
  '[Books] Edit Book Success',
  props<{ id: string; book: Book }>()
);

export const deleteBook = createAction(
  '[Books] Delete Book',
  props<{ id: string }>()
);

export const deleteBookSuccess = createAction(
  '[Books] Delete Book Success',
  props<{ id: string }>()
);

export const booksError = createAction(
  '[Books] Books Error',
  props<{ payload: any }>()
);
