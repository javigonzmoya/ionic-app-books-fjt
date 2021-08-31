import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrivatePage } from './private.page';

const routes: Routes = [
  {
    path: '',
    component: PrivatePage,
    children: [
      {
        path: 'calendar-screen',
        loadChildren: () =>
          import('./calendar-screen/calendar-screen.module').then(
            (m) => m.CalendarScreenPageModule
          ),
      },
      {
        path: 'rooms-screen',
        loadChildren: () =>
          import('./rooms-screen/rooms-screen.module').then(
            (m) => m.RoomsScreenPageModule
          ),
      },
      {
        path: 'books-screen',
        loadChildren: () =>
          import('./books-screen/books-screen.module').then(
            (m) => m.BooksScreenPageModule
          ),
      },
      {
        path: '',
        redirectTo: '/private/calendar-screen',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivatePageRoutingModule {}
