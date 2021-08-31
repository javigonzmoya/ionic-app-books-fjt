import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoomsScreenPage } from './rooms-screen.page';

const routes: Routes = [
  {
    path: '',
    component: RoomsScreenPage,
  },
  {
    path: 'modal-form-room',
    loadChildren: () =>
      import('./modal-form-room/modal-form-room.module').then(
        (m) => m.ModalFormRoomPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomsScreenPageRoutingModule {}
