import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { ToastService } from 'src/app/core/services/toast.service';
import { AppState } from '../../../store/app.reducers';
import { Room } from '../../models/room.interface';
import { Book } from '../../models/books.interfaces';
import { addBook } from '../../../store/actions/books/books.actions';
import { loadRooms } from '../../../store/actions/rooms/rooms.actions';

@Component({
  selector: 'app-modal-book',
  templateUrl: './modal-book.page.html',
  styleUrls: ['./modal-book.page.scss'],
})
export class ModalBookPage implements OnInit {
  title = '';
  startDay: string;
  startHour: string;
  endDay: string;
  endHour: string;
  notes = '';
  room = '';
  destinatario = '';
  rooms: Room[];
  roomSelectedId: string;
  constructor(
    public modalController: ModalController,
    private store: Store<AppState>,
    private toasCrt: ToastService
  ) {}

  ngOnInit() {
    this.store.dispatch(loadRooms());
    this.store.select('rooms').subscribe(({ rooms }) => {
      console.log(rooms);

      this.rooms = rooms;
    });
  }

  saveBook() {
    const start = new Date(this.startDay);
    start.setHours(new Date(this.startHour).getHours());
    const end = new Date(this.endDay);
    end.setHours(new Date(this.endHour).getHours());
    const book: Book = {
      start,
      end,
      title: this.title,
      notes: this.notes,
      destinatario: this.destinatario,
      room: this.roomSelectedId,
    };
    this.store.dispatch(addBook({ book }));
  }

  deleteBook() {}

  exit() {
    this.modalController.dismiss();
  }
}
