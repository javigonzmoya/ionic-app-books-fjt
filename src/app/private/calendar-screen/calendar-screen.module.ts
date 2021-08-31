import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarScreenPageRoutingModule } from './calendar-screen-routing.module';

import { CalendarScreenPage } from './calendar-screen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarScreenPageRoutingModule
  ],
  declarations: [CalendarScreenPage]
})
export class CalendarScreenPageModule {}
