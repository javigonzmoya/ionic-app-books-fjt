import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { ToastService } from 'src/app/core/services/toast.service';
import { AppState } from '../../../store/app.reducers';
import { Room } from '../../models/room.interface';
import { Book } from '../../models/books.interfaces';
import * as actions from '../../../store/actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getSelectedBookAsync } from 'src/app/store/helpers/book.helper';

@Component({
  selector: 'app-modal-book',
  templateUrl: './modal-book.page.html',
  styleUrls: ['./modal-book.page.scss'],
})
export class ModalBookPage implements OnInit {
  bookForm: FormGroup;
  minDate: string;
  minHour: string;
  maxYear = new Date().getFullYear() + 1;
  room = '';
  rooms: Room[];
  bookSelected: Book;
  constructor(
    public modalController: ModalController,
    private store: Store<AppState>,
    private fb: FormBuilder,
    private toasCrt: ToastService
  ) {}

  async ngOnInit() {
    this.bookSelected = await getSelectedBookAsync(this.store);
    this.store.select('rooms').subscribe(({ rooms }) => {
      this.rooms = rooms;
    });
    this.loadForm();
    this.minDate = this.getDateString();
  }

  loadForm() {
    this.bookForm = this.fb.group({
      title: [this.bookSelected?.title || '', Validators.required],
      startDay: [this.bookSelected?.start || '', Validators.required],
      startHour: [this.bookSelected?.start || '', Validators.required],
      endDay: [this.bookSelected?.end || '', Validators.required],
      endHour: [this.bookSelected?.end || '', Validators.required],
      notes: [this.bookSelected?.notes || ''],
      destinatario: [
        this.bookSelected?.destinatario || '',
        Validators.required,
      ],
      roomSelectedId: [this.bookSelected?.room || '', Validators.required],
    });
  }

  saveBook() {
    const [start, end] = this.getStartEnd();
    console.log(this.isValidForm(start, end));

    if (!this.isValidForm(start, end)) {
      return this.toasCrt.presentToast(
        'Formulario Erroneo revisar fechas y campos requeridos'
      );
    }
    const { title, notes, destinatario, roomSelectedId } = this.bookForm.value;
    const book: Book = {
      start,
      end,
      title,
      notes,
      destinatario,
      room: roomSelectedId,
    };
    console.log(book);

    this.store.dispatch(actions.addBook({ book }));
    this.exit();
  }

  isValidForm(startDate: Date, endDate: Date) {
    if (this.bookForm.invalid) {
      return false;
    }
    return startDate.getTime() > endDate.getTime();
  }

  getStartEnd(): Date[] {
    const { startDay, startHour, endDay, endHour } = this.bookForm.controls;
    if (startDay.invalid) {
      return [new Date(), new Date()];
    }
    const start = new Date(startDay.value);
    const startHourDate = new Date(startHour.value);
    start.setHours(startHourDate.getHours(), startHourDate.getMinutes(), 0);
    const end = new Date(endDay.value);
    const endHourDate = new Date(endHour.value);
    end.setHours(endHourDate.getHours(), endHourDate.getMinutes(), 0);
    return [start, end];
  }

  loadMinDate(event: string) {
    this.bookForm.controls.endDay.setValue('');
    this.minDate = this.getDateString(new Date(event));
  }

  loadMinHour(event: string) {
    this.bookForm.controls.endHour.setValue('');
    const date = new Date(event);
    const min = date.getMinutes();
    date.setMinutes(min + 30);
    this.minHour = `${date.getHours()}:${date.getMinutes()}`;
  }

  getDateString(date: Date = new Date()): string {
    return date.toISOString().split('T')[0];
  }

  deleteBook() {}

  exit() {
    this.store.dispatch(actions.unSelectBook());
    this.modalController.dismiss();
  }
}
