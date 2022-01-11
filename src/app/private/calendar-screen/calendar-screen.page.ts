import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CalendarMode, Step } from 'ionic2-calendar/calendar';
import { ModalBookPage } from './modal-book/modal-book.page';

@Component({
  selector: 'app-calendar-screen',
  templateUrl: './calendar-screen.page.html',
  styleUrls: ['./calendar-screen.page.scss'],
})
export class CalendarScreenPage implements OnInit {
  eventSource: any;
  viewTitle: string;
  selectDate: Date;

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

  constructor(public modalCtrl: ModalController) {}

  ngOnInit() {}

  loadEvents() {
    this.eventSource = this.createRandomEvents();
    console.log(this.eventSource);
  }

  onViewTitleChanged(title: string) {
    this.viewTitle = title;
  }

  onEventSelected(event) {
    console.log(
      'Event selected:' +
        event.startTime +
        '-' +
        event.endTime +
        ',' +
        event.title
    );
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
    this.selectDate = new Date(ev.selectedTime);
    console.log(this.selectDate);

    console.log(
      'Selected time: ' +
        ev.selectedTime +
        ', hasEvents: ' +
        (ev.events !== undefined && ev.events.length !== 0) +
        ', disabled: ' +
        ev.disabled
    );
  }

  onCurrentDateChanged(event: Date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === event.getTime();
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
