import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BooksResponse, Book, BookResponse } from '../models/books.interfaces';

const URL = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private htpp: HttpClient) {}

  addBook(book: Book): Observable<BookResponse> {
    return this.htpp.post<BookResponse>(`${URL}/books`, book);
  }

  editBook(id: string, book: Book): Observable<BookResponse> {
    return this.htpp.put<BookResponse>(`${URL}/books/${id}`, book);
  }

  deleteBook(id: string): Observable<BookResponse> {
    return this.htpp.delete<BookResponse>(`${URL}/books/${id}`);
  }

  getBooks(): Observable<BooksResponse> {
    return this.htpp.get<BooksResponse>(`${URL}/books`);
  }
}
