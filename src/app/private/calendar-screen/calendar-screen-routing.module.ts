import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarScreenPage } from './calendar-screen.page';

const routes: Routes = [
  {
    path: '',
    component: CalendarScreenPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarScreenPageRoutingModule {}
