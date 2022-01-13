import { createReducer, on } from '@ngrx/store';
import { Book } from 'src/app/private/models/books.interfaces';

import {
  addBook,
  addBookSuccess,
  editBook,
  editBookSuccess,
  loadBooks,
  loadBooksSuccess,
  selectBook,
  unSelectBook,
  deleteBook,
  deleteBookSuccess,
} from '../actions/books/books.actions';

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface BooksState {
  books: Book[] | null;
  bookSelected: Book | null;
  error: any;
}

export const bookInitialState: BooksState = {
  books: [],
  bookSelected: null,
  error: null,
};

// eslint-disable-next-line no-underscore-dangle
const _booksReducer = createReducer(
  bookInitialState,
  on(loadBooks, (state) => ({ ...state })),
  on(loadBooksSuccess, (state, { books }) => ({ ...state, books })),
  on(selectBook, (state, { bookId }) => ({
    ...state,
    bookSelected: state.books.find(({ id }) => id === bookId),
  })),
  on(unSelectBook, (state) => ({ ...state, bookSelected: null })),
  on(addBook, (state) => ({ ...state })),
  on(addBookSuccess, (state, { book }) => ({
    ...state,
    books: [...state.books, book],
  })),
  on(editBook, (state) => ({ ...state })),
  on(editBookSuccess, (state, { id, book }) => ({
    ...state,
    books: state.books.map((oldBook) => {
      if (oldBook.id === id) {
        return { id, ...book };
      }
      return oldBook;
    }),
  })),
  on(deleteBook, (state) => ({ ...state })),
  on(deleteBookSuccess, (state, { id }) => ({
    ...state,
    books: state.books.filter((oldBook) => oldBook.id !== id),
  }))
);

export const booksReducer = (state, action) => _booksReducer(state, action);
