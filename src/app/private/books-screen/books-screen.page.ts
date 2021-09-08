import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadBooks } from 'src/app/store/actions/books';
import { loadRooms } from 'src/app/store/actions/rooms';
import { AppState } from 'src/app/store/app.reducers';
import { Book } from '../models/books.interfaces';
import { Room } from '../models/room.model';

@Component({
  selector: 'app-books-screen',
  templateUrl: './books-screen.page.html',
  styleUrls: ['./books-screen.page.scss'],
})
export class BooksScreenPage implements OnInit {
  rooms: Room[] = [];
  books: Book[] = [];
  roomSelected: Room = null;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(loadRooms());
    this.store.dispatch(loadBooks());
    this.store.select('rooms').subscribe(({ rooms }) => {
      this.rooms = rooms;
    });
    this.store.select('books').subscribe(({ books }) => {
      this.books = books;
      console.log(books);
    });
  }
}
