import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadBooks } from 'src/app/store/actions';
import { loadRooms } from 'src/app/store/actions';
import { AppState } from 'src/app/store/app.reducers';
import { Book } from '../models/books.interfaces';
import { Room } from '../models/room.interface';

@Component({
  selector: 'app-books-screen',
  templateUrl: './books-screen.page.html',
  styleUrls: ['./books-screen.page.scss'],
})
export class BooksScreenPage implements OnInit {
  rooms: Room[] = [];
  books: Book[] = [];
  generator = this.generatorFn();
  roomSelected: Room = null;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    console.log(this.generator.next());
    console.log(this.generator.next());
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

  *generatorFn() {
    yield 2;
    yield 3;
  }
}
