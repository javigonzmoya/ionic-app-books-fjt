import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarScreenPageRoutingModule } from './calendar-screen-routing.module';

import { CalendarScreenPage } from './calendar-screen.page';

import { NgCalendarModule } from 'ionic2-calendar';
import { ModalBookPage } from './modal-book/modal-book.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    NgCalendarModule,
    CalendarScreenPageRoutingModule,
  ],
  declarations: [CalendarScreenPage, ModalBookPage],
})
export class CalendarScreenPageModule {}
