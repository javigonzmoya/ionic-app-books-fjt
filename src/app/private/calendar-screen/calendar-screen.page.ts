import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CalendarMode, Step } from 'ionic2-calendar/calendar';
import { ModalBookPage } from './modal-book/modal-book.page';
import { AppState } from '../../store/app.reducers';
import { Store } from '@ngrx/store';
import * as actions from '../../store/actions';
import { Room } from '../models/room.interface';
import { selectBookById } from 'src/app/store/helpers/book.helper';

@Component({
  selector: 'app-calendar-screen',
  templateUrl: './calendar-screen.page.html',
  styleUrls: ['./calendar-screen.page.scss'],
})
export class CalendarScreenPage implements OnInit {
  eventSource: any;
  viewTitle: string;
  isNewEvent = true;
  rooms: Room[] = [];

  isToday: boolean;
  calendar = {
    mode: 'month' as CalendarMode,
    step: 30 as Step,
    currentDate: new Date(),
    dateFormatter: {
      formatMonthViewDay: (date: Date) => date.getDate().toString(),
      formatMonthViewDayHeader: (date: Date) => 'MonMH',
      formatMonthViewTitle: (date: Date) => 'testMT',
      formatWeekViewDayHeader: (date: Date) => 'MonWH',
      formatWeekViewTitle: (date: Date) => 'testWT',
      formatWeekViewHourColumn: (date: Date) => 'testWH',
      formatDayViewHourColumn: (date: Date) => 'testDH',
      formatDayViewTitle: (date: Date) => 'testDT',
    },
  };

  constructor(
    public modalCtrl: ModalController,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.store.dispatch(actions.loadBooks());
    this.store.dispatch(actions.loadRooms());
    this.store.select('rooms').subscribe(({ rooms }) => {
      this.rooms = rooms;
    });
  }

  loadEvents() {
    this.getEvents();
    console.log(this.eventSource);
  }

  onViewTitleChanged(title: string) {
    this.viewTitle = title;
  }

  onEventSelected(event: any) {
    console.log('onEventSelected');

    this.isNewEvent = false;
    selectBookById(this.store, event.id);
  }

  changeMode(mode) {
    this.calendar.mode = mode;
  }

  today() {
    this.calendar.currentDate = new Date();
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: ModalBookPage,
    });
    return await modal.present();
  }

  onTimeSelected(ev) {
    this.isNewEvent = true;
    console.log('onTimeSelected');
  }

  onCurrentDateChanged(event: Date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === event.getTime();
  }

  getRoomById(idSala: string) {
    return this.rooms.find(({ id }) => id === idSala);
  }

  getEvents() {
    this.store.select('books').subscribe(({ books }) => {
      this.eventSource = books.map((ev) => ({
        title: `Sala: ${this.getRoomById(ev.room).name} / Destinatario: ${
          ev.destinatario
        } (${ev.title})`,
        startTime: new Date(ev.start),
        endTime: new Date(ev.end),
        allDay: false,
        id: ev.id,
      }));
    });
  }

  createRandomEvents() {
    const events = [];
    for (let i = 0; i < 50; i += 1) {
      const date = new Date();
      const eventType = Math.floor(Math.random() * 2);
      const startDay = Math.floor(Math.random() * 90) - 45;
      let endDay = Math.floor(Math.random() * 2) + startDay;
      let startTime;
      let endTime;
      if (eventType === 0) {
        startTime = new Date(
          Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate() + startDay
          )
        );
        if (endDay === startDay) {
          endDay += 1;
        }
        endTime = new Date(
          Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate() + endDay
          )
        );
        events.push({
          title: 'All Day - ' + i,
          startTime,
          endTime,
          allDay: true,
        });
      } else {
        const startMinute = Math.floor(Math.random() * 24 * 60);
        const endMinute = Math.floor(Math.random() * 180) + startMinute;
        startTime = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + startDay,
          0,
          date.getMinutes() + startMinute
        );
        endTime = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + endDay,
          0,
          date.getMinutes() + endMinute
        );
        events.push({
          title: 'Event - ' + i,
          startTime,
          endTime,
          allDay: false,
        });
      }
    }
    return events;
  }

  onRangeChanged(ev) {
    console.log(
      'range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime
    );
  }

  markDisabled = (date: Date) => {
    const current = new Date();
    current.setHours(0, 0, 0);
    return date < current;
  };
}
